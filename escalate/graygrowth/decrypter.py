import funcy
import sys

def shift(key, msg):
    output = list()
    index = 0
    keylen = len(key)
    for char in msg:
        output.append((char + key[index % keylen]) % 256)
        index = index + 1
    return output

def shift1(msg):
    return shift(bytes.fromhex('01'), msg)

def shift1Down(msg):
    return shiftDown(bytes.fromhex('01'), msg)

def shiftDown(key, msg):
    output = list()
    index = 0
    keylen = len(key)
    for char in msg:
        newChar = char - key[index % keylen]
        if (newChar < 0):
            newChar = newChar + 256
        output.append(newChar)
        index = index + 1
    return output

def XOR(key, msg):
    output = list()
    index = 0
    keylen = len(key)
    for char in msg:
        output.append(char ^ key[index % keylen])
        index = index + 1
    return output

def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

def runStats(msg):
    return max(msg) - min(msg)

def testPrefixAndShiftByTimingHex():
    keyShift = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('2317fdf4488866dbf2e74eeb'))
    #keyXOR = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('2317fdf4488866db'))
    #keyXOR = bytes.fromhex('b583fcfd59d870f964734fe2')

    flagShifted = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    flagShifted2 = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('f2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    output = ''.join(map(chr, flagShifted))
    output2 = ''.join(map(chr, flagShifted2))
    print(output)
    print(output2)
    flagShifted = shift(keyShift, flagShifted)
    flagShifted2 = shift(keyShift, flagShifted2)
    output = ''.join(map(chr, flagShifted))
    output2 = ''.join(map(chr, flagShifted2))
    print(output)
    print(output2)

    for x in range(0, 255):
        flagShifted = shift1(flagShifted)
        flagShifted2 = shift1(flagShifted2)
        output = ''.join(map(chr, flagShifted))
        output2 = ''.join(map(chr, flagShifted2))
        print(output)
        print(output2)

def shiftByPassword():
    flagShiftedByTimingHex = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('f2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    #flagShiftedByTimingHex = shift(bytes.fromhex('9694010911501622'), bytes.fromhex('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    flagXORedByTimingHex = bytes.fromhex('b011dd78229489f980c53e33435d3bf6f6d8b9871006ee019e2c611f6d598f661522b84a39fd3583')

    x = 0
    with open("/usr/share/wordlists/rockyou.txt", "r") as a_file:
        for line in a_file:
            key = line.strip()[:8].encode('utf8')
            if (len(key) > 0):
                outputShift = shift(key, flagShiftedByTimingHex)
                outputXOR = shift(key, flagXORedByTimingHex)
                output = ''.join(map(chr, outputShift))
                output2 = ''.join(map(chr, outputXOR))
                if 'flag' in output:
                    print('1:' + output)
                if 'flag' in output2:
                    print('2:' + output2)
                if x % 100000 == 0:
                    print('Processed ' + str(x))
                x = x + 1

def testPrefixAndShiftDownByTimingHex():
    keyShift = shiftDown(bytes.fromhex('9694010911501622'), bytes.fromhex('2317fdf4488866db'))
    #keyXOR = shiftDown(bytes.fromhex('9694010911501622'), bytes.fromhex('2317fdf4488866db'))
    #keyXOR = bytes.fromhex('b583fcfd59d870f964734fe2')

    flagShifted = shiftDown(bytes.fromhex('9694010911501622'), bytes.fromhex('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    flagShifted2 = shiftDown(bytes.fromhex('9694010911501622'), bytes.fromhex('f2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'))
    output = ''.join(map(chr, flagShifted))
    output2 = ''.join(map(chr, flagShifted2))
    print(output)
    print(output2)
    flagShifted = shiftDown(keyShift, flagShifted)
    flagShifted2 = shiftDown(keyShift, flagShifted2)
    output = ''.join(map(chr, flagShifted))
    output2 = ''.join(map(chr, flagShifted2))
    print(output)
    print(output2)

    for x in range(0, 255):
        flagShifted = shift1(flagShifted)
        flagShifted2 = shift1(flagShifted2)
        output = ''.join(map(chr, flagShifted))
        output2 = ''.join(map(chr, flagShifted2))
        print(output)
        print(output2)

timingHexReverse = '696bfef6eeafe9dd'
timingHex = '9694010911501622' # 8 bytes - 64 bit
hexString = '2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb'
woRepeatedEnd = '2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'
middlePiece = '2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1'
endPiece = '2317fdf4488866dbf2e74eeb' # 12 bytes - 96 bit
chkSumHex = 'd4e0fa03af6f911c0510a90cd1721b86c433581ce1a6b8bda5eaca2397ab3f69f6a1ffd4ef3f97e17bee5eb374413eb4cf4ad456d4e0fa03af6f911c0510a90c'

# middleBytes = bytes.fromhex('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1')
# fullBytes = bytes.fromhex('2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb')
# timingBytes = bytes.fromhex('9694010911501622') # [150,148,1,9,17,80,22,34]
# endPieceBytes = bytes.fromhex('2317fdf4488866dbf2e74eeb')
# firstEight = bytes.fromhex('2317fdf4488866db') # [35,23,253,244,72,136,102,219]
# #                                                 [141,131,252,235,55,56,80,185] key? 8d83fceb373850b9
# #                                                 [115,125,4,21,201,200,176,71] Key? 737d0415c9c8b047
# #                                                   Double XOR on known text flag_{  Key? d67dbc1f7defb9c9

# # middleShiftedByTiming = shift(bytes.fromhex('9694010911501622'), middleBytes)
# # middleDownShiftedByTiming = shiftDown(bytes.fromhex('9694010911501622'), middleBytes)
# # print(''.join(format(x, '02x') for x in middleShiftedByTiming))
# # print(''.join(format(x, '02x') for x in middleDownShiftedByTiming))

# # middleXORedbyTiming = XOR(bytes.fromhex('9694010911501622'), middleBytes)
# # print(middleXORedbyTiming)
# # print(''.join(format(x, '02x') for x in middleXORedbyTiming))

# pre = shift(bytes.fromhex('737d0415c9c8b047'), middleBytes)
# print(pre)
# print('Before XOR ' + ''.join(format(x, '02x') for x in pre))

# xor = XOR(timingBytes, pre)
# print(''.join(format(x, '02x') for x in xor))
# print(''.join(map(chr, xor)))

# nextBlock = shiftDown(bytes.fromhex('8d83fceb373850b9'), bytes.fromhex('f2e74eeb2685dc71'))

# xor = XOR(firstEight, nextBlock)
# print(''.join(format(x, '02x') for x in xor))

hexdata = 0x2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb
mask = (1 << hexdata.bit_length()) - 1
print(hex(hexdata ^ mask))