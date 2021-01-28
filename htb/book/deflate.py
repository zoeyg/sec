import zlib
import sys

args = sys.argv

if len(args) != 3:
	print("Usage python.exe "+args[0]+" ")
	exit(0)

input = args[1]
output = args[2]

file_read = open(input,'rb')
buffer = file_read.read()
decomp = zlib.decompress(buffer)
file_write = open(output,'w')
file_write.write(decomp)