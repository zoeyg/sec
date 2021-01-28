from itertools import cycle
from time import time
from hashlib import md5
import os

def xor(a,b):
    out=[]
    for i,j in zip(a,cycle(b)):
        out.append(chr(i^j))
    return ''.join(out)


def hashit(x) :
    return md5(x).hexdigest()

def generatekey(sz) :
    return os.urandom(sz)


def encrypt(m) :
    return xor("Message : " + m + ":e.o.m" ,generatekey(28))

if __name__ == "__main__" :
    f = open("xor-cipher.txt","rb")
    cipher = f.read()
    f.close()
    for i in range(0,10000000):
        candidate = xor(cipher, generatekey(28))
        try:
            decoded = candidate.decode('utf8')
            print(candidate)
            print('decode failed')
        except:
            print('decode failed')
        if "Message" in candidate:
            print("MESSAGE: " + candidate)
