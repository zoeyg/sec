from base64 import b64encode, b64decode
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad
import hashlib

#pip3 install pycryptodome
def pow(sec_level, prefix):
    while(1):
        suffix = get_random_bytes(16)
        digest = hashlib.sha256(prefix + suffix).digest()
        if(digest[0:sec_level] == b'\x00' * sec_level):
            print("SUFFIX: " + b64encode(suffix).decode("utf-8"))
            return

pow(3, b64decode(input("ENTER PREFIX HERE: ")))
