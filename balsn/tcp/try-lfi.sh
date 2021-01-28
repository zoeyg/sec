#!/bin/sh

while true;do
  echo -n "$ "; read file
  curl -G --output - 'http://35.194.175.80:8000/query' --data-urlencode "site=file://${file}"
  echo ""
done