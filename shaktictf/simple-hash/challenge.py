import hashlib
import string

from itertools import permutations

flag ='sup3r'

chars = list(string.ascii_lowercase + string.digits)
m = hashlib.md5()
assert len(flag) == 5
assert all(c in chars for c in flag)
m.update(("shaktictf{" + flag + "}").encode('utf8'))
print(m.hexdigest())

# hash from params.txt
theHash="cb7a53dd721f4ca90b8fd3dbdabeda5a"

# get all permutations of length 5 of lowercase ascii chars and digits
p = permutations(list(string.ascii_lowercase + string.digits), 5)

# crack it
for i in list(p):
    m = hashlib.md5()
    m.update(("shaktictf{" + ''.join(i) + "}").encode('utf8'))
    candidateHash = m.hexdigest()
    if candidateHash == theHash:
        print(i)