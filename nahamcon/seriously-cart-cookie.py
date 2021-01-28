import requests
import base64
import sys
from bs4 import BeautifulSoup

cart = base64.b64encode(sys.argv[1].encode('ascii'))

url = 'http://two.jh2i.com:50007/cart'
cookies = dict(cart=cart.decode('ascii'))

try:
	r = requests.get(url, allow_redirects=False, cookies=cookies)
	soup = BeautifulSoup(r.text, 'html.parser')

	print(soup.prettify())

except Exception as e:
	print(str(e))