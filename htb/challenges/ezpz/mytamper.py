import base64
import urllib
import json

def tamper(payload, **kwargs):

    data = "{\"ID\":" + json.dumps(payload) + "}"
    data = base64.b64encode(data.encode())

    return data.decode('utf-8')