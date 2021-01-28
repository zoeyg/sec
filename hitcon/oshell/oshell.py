#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='i386')
exe = '/usr/bin/expect'

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR


def start(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    return process([exe, "/home/zoey/sec/hitcon/oshell/oshell.sh"], *a, **kw)

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

io = start()

print(io.recvline_containsS(b'shell'))

print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())

io.send('htop\n')

print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())
print(io.recv())

print(io.recvline_containsS(b'Quit'))

# io.send('oshell\n')

# io.recvline_contains('token:')

# io.send('20a62aed-e622-4ab7-8c69-7f4f93aa7444\n')

io.interactive()

