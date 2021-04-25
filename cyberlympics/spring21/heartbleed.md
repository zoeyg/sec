nmap -A -p- 104.198.8.83 -Pn
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-04-16 16:19 EDT
Nmap scan report for 83.8.198.104.bc.googleusercontent.com (104.198.8.83)
Host is up (0.031s latency).
Not shown: 65531 filtered ports
PORT     STATE  SERVICE       VERSION
80/tcp   open   http          Apache httpd 2.2.22 ((Debian))
|_http-server-header: Apache/2.2.22 (Debian)
|_http-title: Vulnerables | HeartBleed
443/tcp  open   ssl/https     Apache/2.2.22 (Debian)
|_http-server-header: Apache/2.2.22 (Debian)
|_http-title: Vulnerables | HeartBleed
3389/tcp closed ms-wbt-server
8080/tcp closed http-proxy

