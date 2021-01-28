import hashlib

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def recvline(s):
    ret = ''

    while True:
        c = s.recv(1).decode('utf8')

        if c == '\n' or c == '':
            break
        else:
            ret += c

    return ret
