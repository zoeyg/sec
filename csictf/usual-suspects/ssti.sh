#!/bin/sh

curl --silent -G "http://chall.csivit.com:30279/" --data-urlencode "icecream=${1}" \
  -H 'Cookie: admin="2|1:0|10:1595312283|5:admin|8:ZmFsc2U=|c0911c20adb2d4c8c090da1c6b93a1c66fd33ffe29f51662b514e3beed0b6bf1"'
  