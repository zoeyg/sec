#!/usr/bin/env python
import sys
import os
from utils import md5,recvline
import socket

INPUTREQ = "CHECK /{} LFM\r\nUser={}\r\nPassword={}\r\n\r\n{}\n"

if len(sys.argv) != 3:
    print("Usage: " + sys.argv[0] + "<host:port> <remote_file>")
    exit(-1)

HOST = sys.argv[1]
var = HOST.split(":")

try:
    PORT = int(var[1])
except ValueError:
    print("Port number must be integer")
    exit(-1)

HOST = var[0]

#print "Connecting to " + HOST + ":" + str(PORT)


try:
    PASS = "!gby0l0r0ck$$!"
except KeyError:
    print("Couldn't find such password")
    exit(-1)

FILE = sys.argv[2]

# At this point PASS is well-defined
base = os.path.basename(FILE)

#print "File corrupted, need to download it"

REQ = "GET /{} LFM\r\n\r\n".format(base)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
s.sendall(REQ.encode())
recvline(s)
recvline(s)
recvline(s)
resp = s.recv(8192)

#if resp[-1] == '\n':
#    resp = resp[:-1]
#
#if resp[-1] == '\r':
#    resp = resp[:-1]

s.close()

print(resp)
