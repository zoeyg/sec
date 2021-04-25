#!/bin/bash

for i in {0..10}
do
  curl "$1/site/validate" \
    -H 'Content-Type: application/json' \
    -H "Cookie: user_token=$2" \
    --data-raw "{\"domain\":\"$3\"}" &
done