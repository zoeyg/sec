from scapy.all import *
from Crypto.Cipher import AES
import re
import json

udp_stuff = b''

def has_UDP(pkt):
  if pkt.haslayer('UDP'):
    print(pkt.getLayer('UDP').load)

pkts = rdpcap('ac1750.pcapng')
sent_pkts = list(filter(lambda x: x['IP'].src == '192.168.0.105', pkts))
udp_pkts = list(filter(lambda x: x.haslayer('UDP'), sent_pkts))

raw_bytes = b''

aes = AES.new(b"TPONEMESH_Kf!xn?", AES.MODE_CBC, b"1234567890abcdef")

out = ''

for x in udp_pkts:
  raw = x['Raw'].load
  if (len(raw) % 16 == 0):
    d = b'{"x":"' + aes.decrypt(raw)[32:]
    j = json.loads(d.decode('utf8'))
    out += j['data']['slave_mac'].replace("';printf '",'').replace("'>>f;'",'')

print(out)