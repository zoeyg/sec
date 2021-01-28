#!/usr/bin/env python
import sys
import os
from utils import md5,recvline
import socket

INPUTREQ = "CHECK /{} LFM\r\nUser={}\r\nPassword={}\r\n\r\n{}\n"

if len(sys.argv) != 5:
    print "Usage: " + sys.argv[0] + " <host>:<port> <user> <pass> <file>"
    exit(-1)

HOST = sys.argv[1]
var = HOST.split(":")

if len(var) != 2:
    print "Usage: " + sys.argv[0] + " <host>:<port> <user> <pass> <file>"
    exit(-1)

try:
    PORT = int(var[1])
except ValueError:
    print "Port number must be integer"
    exit(-1)

HOST = var[0]

#print "Connecting to " + HOST + ":" + str(PORT)

USER = sys.argv[2]

try:
    PASS = os.environ[sys.argv[3]]
except KeyError:
    print "Couldn't find such password"
    exit(-1)

FILE = sys.argv[4]

# At this point PASS is well-defined
base = os.path.basename(FILE)

try:
    md5sum = md5(FILE)
except IOError:
    print "File not found locally"
    exit(-1)

REALREQ = INPUTREQ.format(base, USER, PASS, md5sum)

print(REALREQ)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((HOST, PORT))
s.sendall(REALREQ)
resp = s.recv(4096)
s.close()

#print resp

if "LFM 200 OK" in resp:
    #print "File OK, no need to download"
    exit(0)

if "404" in resp:
    print "File not found on server"
    exit(-1)

#print "File corrupted, need to download it"

REQ = "GET /{} LFM\r\n\r\n".format(base)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))
s.sendall(REQ)
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

with open("{}.new".format(base), "wb") as f:
    f.write(resp)

print "{}.new".format(base)
