write@plt (
   $rdi = 0x0000000000000001,
   $rsi = 0x0000000000400db0 →  imul rsp, QWORD PTR [r11+r14*2+0x20], 0x7473756d,
   $rdx = 0x000000000000007e
)

write@plt (
   $rdi = 0x0000000000000000,
   $rsi = 0x00007ffe15263020 → "aaaabaaacaaadaaaeaaafaaagaaahaaaiaaajaaakaaalaaama[...]",
   $rdx = 0x000000000000014c
)


__libc_argv