# railfence-bruteforce
a simple python implementation of the Rail Fence cipher that bruteforces the rail count AND offset.

`python3 railfence.py "ENCRYPTED TEST"`

If you know any of the plaintext (e.g. "flag") I highly recommend doing `python3 railfence.py "ENCRYPTED TEST" | grep "[PLAINTEXT]"`. Otherwise, there are only so many combinations (the number of rails cannot be more than the # of characters in the message, the offset cannot be more than approximately 2 times the # of rails) so you should be able to just scroll through the output and find what you need

~~Python 2 only - I did not make the function that does the actual decryption~~ I edited the ~5 lines that prevented this from running in python 3! Please use python 3 now as python 2 is officially deprecated.

[Rail Fence cipher](https://en.wikipedia.org/wiki/Rail_fence_cipher)
is a super weak cipher.

https://repl.it/@burturt/railfence-bruteforce
