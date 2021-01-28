#!/bin/sh

curl --silent -G 'http://10.10.185.241/retro/' \
  --data-urlencode "1=${1}" | sed -n '/<!DOCTYPE html>/q;p'