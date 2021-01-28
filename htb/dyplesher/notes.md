# User

## nmap

```
PORT      STATE SERVICE    VERSION
22/tcp    open  ssh        OpenSSH 8.0p1 Ubuntu 6build1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 7e:ca:81:78:ec:27:8f:50:60:db:79:cf:97:f7:05:c0 (RSA)
|   256 e0:d7:c7:9f:f2:7f:64:0d:40:29:18:e1:a1:a0:37:5e (ECDSA)
|_  256 9f:b2:4c:5c:de:44:09:14:ce:4f:57:62:0b:f9:71:81 (ED25519)
80/tcp    open  http       Apache httpd 2.4.41 ((Ubuntu))
|_http-server-header: Apache/2.4.41 (Ubuntu)
|_http-title: Dyplesher
3000/tcp  open  ppp?
| fingerprint-strings:
|   GenericLines, Help:
|     HTTP/1.1 400 Bad Request
|     Content-Type: text/plain; charset=utf-8
|     Connection: close
|     Request
|   GetRequest:
|     HTTP/1.0 200 OK
|     Content-Type: text/html; charset=UTF-8
|     Set-Cookie: lang=en-US; Path=/; Max-Age=2147483647
|     Set-Cookie: i_like_gogs=a69ea90b420d1687; Path=/; HttpOnly
|     Set-Cookie: _csrf=L7YUyOT9jCzmtAHtktzZOvxSboc6MTU5MTA2MjQ5NTg3MzE1NDkzNg%3D%3D; Path=/; Expires=Wed, 03 Jun 2020 01:48:15 GMT; HttpOnly
|     Date: Tue, 02 Jun 2020 01:48:15 GMT
|     <!DOCTYPE html>
|     <html>
|     <head data-suburl="">
|     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
|     <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
|     <meta name="author" content="Gogs" />
|     <meta name="description" content="Gogs is a painless self-hosted Git service" />
|     <meta name="keywords" content="go, git, self-hosted, gogs">
|     <meta name="referrer" content="no-referrer" />
|     <meta name="_csrf" content="L7YUyOT9jCzmtAHtktzZOvxSboc6MTU5MTA2MjQ5NTg3MzE1NDkzNg==" />
|     <meta name="_suburl" content="" />
|     <meta proper
|   HTTPOptions:
|     HTTP/1.0 404 Not Found
|     Content-Type: text/html; charset=UTF-8
|     Set-Cookie: lang=en-US; Path=/; Max-Age=2147483647
|     Set-Cookie: i_like_gogs=44e55219d49ef6b5; Path=/; HttpOnly
|     Set-Cookie: _csrf=TOsyDmAdkwF9_qmzXvhxKATd0_46MTU5MTA2MjUwMTMwNTM5Mzk2NQ%3D%3D; Path=/; Expires=Wed, 03 Jun 2020 01:48:21 GMT; HttpOnly
|     Date: Tue, 02 Jun 2020 01:48:21 GMT
|     <!DOCTYPE html>
|     <html>
|     <head data-suburl="">
|     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
|     <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
|     <meta name="author" content="Gogs" />
|     <meta name="description" content="Gogs is a painless self-hosted Git service" />
|     <meta name="keywords" content="go, git, self-hosted, gogs">
|     <meta name="referrer" content="no-referrer" />
|     <meta name="_csrf" content="TOsyDmAdkwF9_qmzXvhxKATd0_46MTU5MTA2MjUwMTMwNTM5Mzk2NQ==" />
|     <meta name="_suburl" content="" />
|_    <meta
4369/tcp  open  epmd       Erlang Port Mapper Daemon
| epmd-info:
|   epmd_port: 4369
|   nodes:
|_    rabbit: 25672
5672/tcp  open  amqp       RabbitMQ 3.7.8 (0-9)
| amqp-info:
|   capabilities:
|     publisher_confirms: YES
|     exchange_exchange_bindings: YES
|     basic.nack: YES
|     consumer_cancel_notify: YES
|     connection.blocked: YES
|     consumer_priorities: YES
|     authentication_failure_close: YES
|     per_consumer_qos: YES
|     direct_reply_to: YES
|   cluster_name: rabbit@dyplesher
|   copyright: Copyright (C) 2007-2018 Pivotal Software, Inc.
|   information: Licensed under the MPL.  See http://www.rabbitmq.com/
|   platform: Erlang/OTP 22.0.7
|   product: RabbitMQ
|   version: 3.7.8
|   mechanisms: PLAIN AMQPLAIN
|_  locales: en_US
11211/tcp open  memcache?
25562/tcp open  unknown
25565/tcp open  minecraft?
| fingerprint-strings:
|   DNSStatusRequestTCP, DNSVersionBindReqTCP, LDAPSearchReq, LPDString, SIPOptions, SSLSessionReq, TLSSessionReq, afp, ms-sql-s, oracle-tns:
|     '{"text":"Unsupported protocol version"}
|   NotesRPC:
|     q{"text":"Unsupported protocol version 0, please use one of these versions:
|_    1.8.x, 1.9.x, 1.10.x, 1.11.x, 1.12.x"}
25672/tcp open  unknown
```

## http server

### dyplesher.htb

```shell-session
╭─zoey@nomadic ~/htb/dyplesher ‹master*›
╰─$ gobuster dir -w /usr/share/wordlists/dirb/common.txt -l -t 30 -e -k -x .php,.html,.htm,.txt,.log,.xml -u http://dyplesher.htb -o gob-common-extensions.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://dyplesher.htb
[+] Threads:        30
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Show length:    true
[+] Extensions:     xml,php,html,htm,txt,log
[+] Expanded:       true
[+] Timeout:        10s
===============================================================
2020/06/01 20:09:48 Starting gobuster
===============================================================
http://dyplesher.htb/.htaccess (Status: 403) [Size: 278]
...
http://dyplesher.htb/.htpasswd (Status: 403) [Size: 278]
...
http://dyplesher.htb/cgi-bin/ (Status: 301) [Size: 315]
http://dyplesher.htb/css (Status: 301) [Size: 312]
http://dyplesher.htb/favicon.ico (Status: 200) [Size: 0]
http://dyplesher.htb/fonts (Status: 301) [Size: 314]
http://dyplesher.htb/home (Status: 302) [Size: 350]
http://dyplesher.htb/img (Status: 301) [Size: 312]
http://dyplesher.htb/index.php (Status: 200) [Size: 4252]
http://dyplesher.htb/index.php (Status: 200) [Size: 4252]
http://dyplesher.htb/js (Status: 301) [Size: 311]
http://dyplesher.htb/login (Status: 200) [Size: 4188]
http://dyplesher.htb/register (Status: 302) [Size: 350]
http://dyplesher.htb/robots.txt (Status: 200) [Size: 24]
http://dyplesher.htb/server-status (Status: 403) [Size: 278]
http://dyplesher.htb/staff (Status: 200) [Size: 4389]
===============================================================
2020/06/01 20:19:34 Finished
===============================================================
```

There's a web page that says `Worst Minecraft Server`. There's also a statusbox with the host `test.dyplesher.htb`. Lets add it to our `/etc/hosts` file.
The redirects seem to redirect to login. The staff page is interesting, as it has three names on it with titles, and some links:

```
MinatoTW - Owner - http://dyplesher.htb:8080/arrexel
felamos - Dev - http://dyplesher.htb:8080/felamos
yuntao - Admin - http://dyplesher.htb:8080/yuntao
```

The links don't resolve, so perhaps there's another hostname or these are internal to the server. Most everything else besides `index.php` seems to redirect
to the login page.

The requests have a cookie named `laravel_session`. Laravel is a php framework.

Hitting a 404 gives a title with `404 error - srtdash`. The `Back to Dashboard` doesn't work.

The login page is titled `dypleshero`.

### Gogs

There's an http server on port 3000.  An instance of Gogs.

### test.dyplesher.htb

Looks to be a single form with the title `Add key and value to memcache`. Entering values generates a GET request with `add` and `val` in the query string.

```shell-session
╭─zoey@nomadic ~/htb/dyplesher ‹master*›
╰─$ gobuster dir -w /usr/share/wordlists/dirb/common.txt -l -t 30 -e -k -x .php,.html,.htm,.txt,.log,.xml -u http://test.dyplesher.htb -o gob-test-common-extensions.txt
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://test.dyplesher.htb
[+] Threads:        30
[+] Wordlist:       /usr/share/wordlists/dirb/common.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Show length:    true
[+] Extensions:     txt,log,xml,php,html,htm
[+] Expanded:       true
[+] Timeout:        10s
===============================================================
2020/06/01 20:44:07 Starting gobuster
===============================================================
http://test.dyplesher.htb/.git/HEAD (Status: 200) [Size: 23]
...
http://test.dyplesher.htb/.htpasswd (Status: 403) [Size: 283]
...
http://test.dyplesher.htb/.htaccess (Status: 403) [Size: 283]
...
http://test.dyplesher.htb/index.php (Status: 200) [Size: 239]
http://test.dyplesher.htb/server-status (Status: 403) [Size: 283]
===============================================================
2020/06/01 20:46:50 Finished
===============================================================
```

## Git Directory

Ah, a git directory. Let's see what we can pull.

```shell-session
╭─zoey@nomadic ~/htb/dyplesher ‹master*›
╰─$ ../tools/GitTools/Dumper/gitdumper.sh http://test.dyplesher.htb/.git/ test-get
../tools/GitTools/Dumper/gitdumper.sh: line 6: cannot create temp file for here-document: No space left on device
[*] Destination folder does not exist
[+] Creating test-get/.git/
[+] Downloaded: HEAD
[-] Downloaded: objects/info/packs
[+] Downloaded: description
[+] Downloaded: config
[+] Downloaded: COMMIT_EDITMSG
[+] Downloaded: index
[-] Downloaded: packed-refs
[+] Downloaded: refs/heads/master
[-] Downloaded: refs/remotes/origin/HEAD
[-] Downloaded: refs/stash
[+] Downloaded: logs/HEAD
[+] Downloaded: logs/refs/heads/master
[-] Downloaded: logs/refs/remotes/origin/HEAD
[-] Downloaded: info/refs
[+] Downloaded: info/exclude
[-] Downloaded: /refs/wip/index/refs/heads/master
[-] Downloaded: /refs/wip/wtree/refs/heads/master
[+] Downloaded: objects/b1/fe9eddcdf073dc45bb406d47cde1704f222388
[-] Downloaded: objects/00/00000000000000000000000000000000000000
[+] Downloaded: objects/3f/91e452f3cbfa322a3fbd516c5643a6ebffc433
[+] Downloaded: objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
[+] Downloaded: objects/27/29b565f353181a03b2e2edb030a0e2b33d9af0
```

We've got an email, and an `index.php` file.

```shell-session
commit b1fe9eddcdf073dc45bb406d47cde1704f222388 (HEAD -> master)
Author: felamos <felamos@dyplesher.htb>
Date:   Thu Apr 23 14:17:19 2020 +0000

    first commit

 README.md |  0
 index.php | 27 +++++++++++++++++++++++++++
```

And the contents are

```php
<pre>
<?php
if($_GET['add'] != $_GET['val']){
	$m = new Memcached();
	$m->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
	$m->setSaslAuthData("felamos", "zxcvbnm");
	$m->addServer('127.0.0.1', 11211);
	$m->add($_GET['add'], $_GET['val']);
	echo "Done!";
}
else {
	echo "its equal";
}
?>
</pre>
```
