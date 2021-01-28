#!/bin/sh

for i in $(seq 1 100)
do

curl "https://ctf.hacktivitycon.com/api/v1/challenges/${i}" \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json' \
  -H 'CSRF-Token: 4428f830c3ae967d4495de208d7f00c8bb9fe58ecef96d573ed7d1730150d7f1' \
  -H 'DNT: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36' \
  -H 'Content-Type: application/json' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://ctf.hacktivitycon.com/challenges' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: session=dd1872d8-860a-49ef-9990-fa95acfad25c.OdHyAoKs-lhrx_Ew4nqCsrbYTHQ' | tee "challenge-${i}.json"

done