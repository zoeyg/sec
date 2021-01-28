import requests
import base64
import sys

url = 'http://two.jh2i.com:50007/add2cart?item=' + sys.argv[1]

try:
	r = requests.get(url, allow_redirects=False)

	if (len(r.cookies.keys()) != 0):
		print(base64.b64decode(r.cookies['cart']).decode('ascii'))
	else:
		print(r.headers)
		print(r.text)

except Exception as e:
	print(str(e))