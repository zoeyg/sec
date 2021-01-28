from scapy.all import *

pkts = rdpcap('extractm3.pcapng')
tcp_pkts = list(filter(lambda x: x.haslayer('TCP'), pkts))
rawtcp_pkts = list(filter(lambda x: x.haslayer('Raw'), tcp_pkts))

out = b''

for x in rawtcp_pkts:
  out += x['Raw'].load

f = open("scapy.jpg", "wb")
f.write(out)
f.close()