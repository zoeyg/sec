# breakpoints

Num     Type           Disp Enb Address    What
1       breakpoint     keep y   0x080488af <main+85>
        breakpoint already hit 1 time
2       breakpoint     keep y   0x080488f7 <main+157>
        breakpoint already hit 1 time
3       breakpoint     keep y   0x08048997 <main+317>
        breakpoint already hit 1 time

# run 

r

# bypass debug/ptrace check at breakpoint 1

set $eax = 0

c

# bypass name check, breakpointvalue check and jump straight to decrypt

set $eip = 0x0804895a

c

# at breakpoint 3 change top of stack to proper username address "~#L-:4;f"

 set {int}0xffffd000=0x0804a05c

 c

 # decrypts to

 HTB{L00k1ng_f0r_4_w31rd_n4m3}