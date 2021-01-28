import socket
import re
import subprocess

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.connect(('172.30.64.49', 1392))

msg = clientsocket.recvmsg(4096)
msg = clientsocket.recvmsg(4096)

print(msg[0])

m = re.search('go: ([a-f0-9]{3,4})', msg[0].decode('utf-8'))

if m:
	print(m.group(1))

i = str(int(m.group(1), 16)) + "\n"

print(i)
clientsocket.send(i.encode('utf-8'))

msg = clientsocket.recvmsg(4096)
print(msg[0])
msg = clientsocket.recvmsg(4096)
print(msg[0])

m = re.search('decimal. ([0-9]{4,5})', msg[0].decode('utf-8'))

if m:
	print(m.group(1))

i = bin(int(m.group(1))).replace('0b','') + "\n"

print(i)

clientsocket.send(i.encode('utf-8'))

msg = clientsocket.recvmsg(4096)
print(msg[0])
msg = clientsocket.recvmsg(4096)
print(msg[0])

m = re.search('decimal: ([a-f0-9]{7,8}) ([a-f0-9]{7,8})', msg[0].decode('utf-8'))

if m:
	print(m.group(1))
	print(m.group(2))

i1 = int(m.group(1), 16)
i2 = int(m.group(2), 16)

print(i1)
print(i2)
product = i1 * i2

print(product& 0xFFFFFFFF)

hexOut = hex(product& 0xFFFFFFFF).replace('0x','') + "\n"

print(hexOut)

clientsocket.send(hexOut.encode('utf-8'))

msg = clientsocket.recvmsg(4096)
print(msg[0])
msg = clientsocket.recvmsg(4096)
print(msg[0])