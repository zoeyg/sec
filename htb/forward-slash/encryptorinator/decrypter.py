def encrypt(key, msg):
    key = list(key)
    msg = list(msg)
    for char_key in key:
        for i in range(len(msg)):
            if i == 0:
                tmp = ord(msg[i]) + ord(char_key) + ord(msg[-1])
            else:
                tmp = ord(msg[i]) + ord(char_key) + ord(msg[i-1])

            while tmp > 255:
                tmp -= 256
            msg[i] = chr(tmp)
    return ''.join(msg)

def decrypt(key, msg):
    key = list(key)
    msg = list(msg)
    for char_key in reversed(key):
        for i in reversed(range(len(msg))):
            if i == 0:
                tmp = ord(msg[i]) - (ord(char_key) + ord(msg[-1]))
            else:
                tmp = ord(msg[i]) - (ord(char_key) + ord(msg[i-1]))
            while tmp < 0:
                tmp += 256
            msg[i] = chr(tmp)
    return ''.join(msg)

def decrypt(key, msg):
    key = list(key)
    msg = list(msg)
    for char_key in reversed(key):
        for i in reversed(range(len(msg))):
            msgi = trygeti(msg[i])
            msgiminus1 = trygeti(msg[i - 1])
            msgiminus = trygeti(msg[-1])
            if i == 0:
                tmp = ord(msgi) - (ord(char_key) + ord(msgiminus))
            else:
                tmp = ord(msgi) - (ord(char_key) + ord(msgiminus1))
            while tmp < 0:
                tmp += 256
            msg[i] = tmp
    return msg

def trygeti(value):
    if type(value) is int:
        return chr(value)
    else:
        return value

def split(word): 
    return [char for char in word]

def testKey(key):
	decrypted = decrypt(key, encryptedMessage)
	alphanums = 0
	for char in decrypted:
		if chr(char).isalnum():
			alphanums = alphanums + 1
	return decrypted, alphanums

ciphertextFile = open("ciphertext", 'rb')
encryptedMessage = ciphertextFile.read()
ciphertextFile.close()

maxAlphaNum = 0
maxMessage = 0
with open("/usr/share/wordlists/rockyou.txt", "r") as a_file:
	for line in a_file:
		key = line.strip()
		decrypted, alphanums = testKey(key)
		if (alphanums > 110):
			print(str(alphanums) + ':' + key + ': ' + ''.join(map(chr, decrypted)))

    