```
curl 'http://iot.hub/cgi-bin/restart?sensor=tes' -H 'Cookie: -goahead-session-=::webs.session::30f70c7c56e7d89c827dfb3691ad3a4f'

curl 'http://iot.hub/data/data.txt' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Cookie: -goahead-session-=::webs.session::30f70c7c56e7d89c827dfb3691ad3a4f' \
  --compressed \
  --insecure
```