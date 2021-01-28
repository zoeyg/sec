#!/bin/bash

URL="${1}"
PORT="${2}"
while true;do
 echo -n "$ "; read cmd
 python2 nostromo.py ${URL} ${PORT} "${cmd}"
done