#!/usr/bin/env python3
 
import itertools
from struct import unpack
from binascii import hexlify
 
from scapy.all import *
 
 
capture = rdpcap('./graygrowth.pcap')
packets = [p for p in capture if p[ICMP].type == 8]  # ICMP req only
 
 
chunked = lambda data, length: [data[i:i+length] for i in range(0, len(data), length)]
 
def adjacent_pairs(data):
    l, r = itertools.tee(data)
    next(r, None)
    return zip(l, r)
 
 
data_idx = [i for i, p in enumerate(packets) if hasattr(p, 'load')]
data_packets = [packets[i] for i in data_idx]
 
 
data = b"".join([packets[i].load for i in data_idx])
 
 
chk_data = bytes([packets[i].chksum >> 8 for i in data_idx])
 
 
dt = [float(nxt.time - cur.time) for cur, nxt in adjacent_pairs(packets) if hasattr(nxt, 'load')]
 
dt_bits = [1 if i >= .5 else 0 for i in dt]
dt_bits_c = chunked(dt_bits, 8)
 
dt_bytes_le = bytes([sum([b << i for i, b in enumerate(bits)]) for bits in dt_bits_c])
dt_bytes_be = bytes([sum([b << (7-i) for i, b in enumerate(bits)]) for bits in dt_bits_c])
 
 
print("payload data:", hexlify(data))
print("time data MSB:", hexlify(dt_bytes_be), hexlify(dt_bytes_be)[::-1])
print("time data LSB:", hexlify(dt_bytes_le), hexlify(dt_bytes_le)[::-1])