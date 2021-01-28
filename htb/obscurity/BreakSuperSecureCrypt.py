import sys
import argparse

def encrypt(text, key):
    keylen = len(key)
    keyPos = 0
    encrypted = ""
    for x in text:
        keyChr = key[keyPos]
        newChr = ord(x)
        newChr = chr((newChr + ord(keyChr)) % 255)
        encrypted += newChr
        keyPos += 1
        keyPos = keyPos % keylen
    return encrypted

def decrypt(text, key):
    keylen = len(key)
    keyPos = 0
    decrypted = ""
    for x in text:
        keyChr = key[keyPos]
        newChr = ord(x)
        newChr = chr((newChr - ord(keyChr)) % 255)
        decrypted += newChr
        keyPos += 1
        keyPos = keyPos % keylen
    return decrypted

attempts = 0
with open('out', 'r', encoding='UTF-8') as f:
    encryptedText = f.read()
with open('check', 'r', encoding='UTF-8') as f:
    decryptedText = f.read()

curKey = ''
def getKey(test):
    return curKey + chr(test)

curBase = ''
for x in decryptedText:
    curBase += x
    testChr = 0
    decrypted = decrypt(encryptedText, getKey(testChr))
    while (not decrypted.startswith(curBase)):
        testChr = testChr + 1
        decrypted = decrypt(encryptedText, getKey(testChr))
    curKey += chr(testChr)
    print("Current key is " + curKey)