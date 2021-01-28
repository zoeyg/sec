# >>> ''.join(map(lambda x: chr(((ord(x) - 84) % 26) + 97), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
# 'hijklmnopqrstuvwxyzabcdefg'
# >>> ''.join(map(lambda x: chr(((ord(x) - 52) % 26) + 65), 'abcdefghijklmnopqrstuvwxyz'))
# 'TUVWXYZABCDEFGHIJKLMNOPQRS'
def transformLower(input):
    iu='nopqrstuvwxyzabcdefghijklm'
    ol='abcdefghijklmnopqrstuvwxyz'
    return ol[iu.find(input)]

def transformUpper(input):
    il='NOPQRSTUVWXYZABCDEFGHIJKLM'
    ou='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return ou[il.find(input)]

flag="**REDACTED**"
proficuous =flag
saxicolous = [ord(excogitate) for excogitate in proficuous]
ebullient  = (saxicolous[-5:]);  import random
second = (saxicolous[:-5])
sesquipedalian = ''.join(map(chr,ebullient)) + ''.join(map(chr,second))

print(sesquipedalian)

vravar = []
for permutation in sesquipedalian:
    char = 0
    if (permutation.islower()):
        char = ((ord(permutation) - 84) % 26) + 97
    elif (permutation.isupper()):
        char = ((ord(permutation) - 52) % 26) + 65
    else:
        char = ord(permutation)
    vravar.append(chr(char))

print(''.join(vravar))

output = ''
for c in vravar:
    if (c.islower()):
        output += transformLower(c)
    elif (c.isupper()):
        output += transformUpper(c)
    else:
        output += c

print(output)

# auspicious = []
# for luminescent in vravar:
#     auspicious.append(luminescent)

# for cupidity in range(200):
#     second = []
#     superabundant=random.choice(auspicious)
#     print( "mac>>>[" + str(auspicious.index(superabundant)) + "] " + "== " + "\"" + superabundant + "\"" + " and")

input = ['>'] * 18
input[0] = "l"
input[10] = "y"
input[11] = "3"
input[12] = "t"
input[13] = "R"
input[14] = "a"
input[15] = "Q"
input[16] = "-"
input[17] = "C"
input[1] = "g"
input[2] = "U"
input[3] = "B"
input[4] = "A"
input[5] = "J"
input[6] = "u"
input[7] = "0"
input[8] = "n"
input[9] = "_"
print(''.join(input))

output = ''
for c in input:
    if (c.islower()):
        output += transformLower(c)
    elif (c.isupper()):
        output += transformUpper(c)
    else:
        output += c
print(output)

first = output[5:]
second = output[:5]

print(first+second)

"""
mac>>>[15] == "Q" and
mac>>>[3] == "B" and
mac>>>[8] == "n" and
mac>>>[9] == "_" and
mac>>>[8] == "n" and
mac>>>[17] == "C" and
mac>>>[9] == "_" and
mac>>>[14] == "a" and
mac>>>[14] == "a" and
mac>>>[4] == "A" and
mac>>>[6] == "u" and
mac>>>[0] == "l" and
mac>>>[10] == "y" and
mac>>>[8] == "n" and
mac>>>[15] == "Q" and
mac>>>[13] == "R" and
mac>>>[5] == "J" and
mac>>>[2] == "U" and
mac>>>[17] == "C" and
mac>>>[8] == "n" and
mac>>>[3] == "B" and
mac>>>[2] == "U" and
mac>>>[7] == "0" and
mac>>>[16] == "-" and
mac>>>[11] == "3" and
mac>>>[8] == "n" and
mac>>>[14] == "a" and
mac>>>[5] == "J" and
mac>>>[15] == "Q" and
mac>>>[5] == "J" and
mac>>>[9] == "_" and
mac>>>[11] == "3" and
mac>>>[7] == "0" and
mac>>>[17] == "C" and
mac>>>[16] == "-" and
mac>>>[17] == "C" and
mac>>>[17] == "C" and
mac>>>[4] == "A" and
mac>>>[6] == "u" and
mac>>>[1] == "g" and
mac>>>[13] == "R" and
mac>>>[1] == "g" and
mac>>>[11] == "3" and
mac>>>[5] == "J" and
mac>>>[2] == "U" and
mac>>>[14] == "a" and
mac>>>[17] == "C" and
mac>>>[8] == "n" and
mac>>>[11] == "3" and
mac>>>[1] == "g" and
mac>>>[15] == "Q" and
mac>>>[4] == "A" and
mac>>>[12] == "t" and
mac>>>[1] == "g" and
mac>>>[15] == "Q" and
mac>>>[12] == "t" and
mac>>>[3] == "B" and
mac>>>[5] == "J" and
mac>>>[16] == "-" and
mac>>>[4] == "A" and
mac>>>[1] == "g" and
mac>>>[17] == "C" and
mac>>>[11] == "3" and
mac>>>[4] == "A" and
mac>>>[4] == "A" and
mac>>>[9] == "_" and
mac>>>[7] == "0" and
mac>>>[14] == "a" and
mac>>>[9] == "_" and
mac>>>[10] == "y" and
mac>>>[9] == "_" and
mac>>>[2] == "U" and
mac>>>[1] == "g" and
mac>>>[14] == "a" and
mac>>>[12] == "t" and
mac>>>[8] == "n" and
mac>>>[12] == "t" and
mac>>>[7] == "0" and
mac>>>[9] == "_" and
mac>>>[0] == "l" and
mac>>>[0] == "l" and
mac>>>[4] == "A" and
mac>>>[1] == "g" and
mac>>>[15] == "Q" and
mac>>>[17] == "C" and
mac>>>[15] == "Q" and
mac>>>[15] == "Q" and
mac>>>[11] == "3" and
mac>>>[9] == "_" and
mac>>>[3] == "B" and
mac>>>[6] == "u" and
mac>>>[3] == "B" and
mac>>>[13] == "R" and
mac>>>[6] == "u" and
mac>>>[15] == "Q" and
mac>>>[14] == "a" and
mac>>>[16] == "-" and
mac>>>[10] == "y" and
mac>>>[3] == "B" and
mac>>>[13] == "R" and
mac>>>[9] == "_" and
mac>>>[10] == "y" and
mac>>>[12] == "t" and
mac>>>[6] == "u" and
mac>>>[7] == "0" and
mac>>>[13] == "R" and
mac>>>[16] == "-" and
mac>>>[17] == "C" and
mac>>>[2] == "U" and
mac>>>[7] == "0" and
mac>>>[2] == "U" and
mac>>>[4] == "A" and
mac>>>[8] == "n" and
mac>>>[5] == "J" and
mac>>>[5] == "J" and
mac>>>[16] == "-" and
mac>>>[0] == "l" and
mac>>>[6] == "u" and
mac>>>[8] == "n" and
mac>>>[8] == "n" and
mac>>>[1] == "g" and
mac>>>[9] == "_" and
mac>>>[11] == "3" and
mac>>>[15] == "Q" and
mac>>>[12] == "t" and
mac>>>[9] == "_" and
mac>>>[2] == "U" and
mac>>>[14] == "a" and
mac>>>[5] == "J" and
mac>>>[9] == "_" and
mac>>>[16] == "-" and
mac>>>[12] == "t" and
mac>>>[3] == "B" and
mac>>>[4] == "A" and
mac>>>[2] == "U" and
mac>>>[5] == "J" and
mac>>>[0] == "l" and
mac>>>[2] == "U" and
mac>>>[10] == "y" and
mac>>>[0] == "l" and
mac>>>[7] == "0" and
mac>>>[11] == "3" and
mac>>>[15] == "Q" and
mac>>>[4] == "A" and
mac>>>[10] == "y" and
mac>>>[15] == "Q" and
mac>>>[1] == "g" and
mac>>>[10] == "y" and
mac>>>[0] == "l" and
mac>>>[8] == "n" and
mac>>>[6] == "u" and
mac>>>[15] == "Q" and
mac>>>[7] == "0" and
mac>>>[8] == "n" and
mac>>>[17] == "C" and
mac>>>[11] == "3" and
mac>>>[1] == "g" and
mac>>>[1] == "g" and
mac>>>[15] == "Q" and
mac>>>[14] == "a" and
mac>>>[4] == "A" and
mac>>>[2] == "U" and
mac>>>[3] == "B" and
mac>>>[17] == "C" and
mac>>>[14] == "a" and
mac>>>[7] == "0" and
mac>>>[1] == "g" and
mac>>>[12] == "t" and
mac>>>[6] == "u" and
mac>>>[7] == "0" and
mac>>>[17] == "C" and
mac>>>[3] == "B" and
mac>>>[17] == "C" and
mac>>>[12] == "t" and
mac>>>[13] == "R" and
mac>>>[15] == "Q" and
mac>>>[3] == "B" and
mac>>>[0] == "l" and
mac>>>[2] == "U" and
mac>>>[9] == "_" and
mac>>>[3] == "B" and
mac>>>[6] == "u" and
mac>>>[16] == "-" and
mac>>>[0] == "l" and
mac>>>[16] == "-" and
mac>>>[2] == "U" and
mac>>>[8] == "n" and
mac>>>[15] == "Q" and
mac>>>[16] == "-" and
mac>>>[1] == "g" and
mac>>>[0] == "l" and
mac>>>[17] == "C" and
mac>>>[7] == "0" and
mac>>>[3] == "B" and
mac>>>[7] == "0" and
mac>>>[6] == "u" and
mac>>>[1] == "g" and
mac>>>[10] == "y" and
mac>>>[12] == "t" and
mac>>>[11] == "3" and
"""
