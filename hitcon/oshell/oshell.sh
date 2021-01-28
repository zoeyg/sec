#!/usr/bin/expect

eval spawn ssh oshell@54.150.148.61

set prompt ":|#|\\\$"
interact -o -nobuffer -re $prompt return
send "oshell\n"
interact -o -nobuffer -re $prompt return
send "db5fdc85-2415-4e90-acae-f6b2d7c8197d\n"
interact