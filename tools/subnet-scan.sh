#!/bin/bash

for i in $(seq 1 255); do
    # nc -w 1 ${1}.${i} 22 2> /dev/null && echo "Port 22 on $i is open"
    # nc -w 1 ${1}.${i} 80 2> /dev/null && echo "Port 80 on $i is open"
    nc -w 1 ${1}.${i} 8022 2> /dev/null && echo "Port 8022 on $i is open"
done