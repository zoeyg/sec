flag="**REDACTED**"
proficuous =flag
saxicolous = [ord(excogitate) for excogitate in proficuous]
ebullient  = (saxicolous[-5:]);  import random
second = (saxicolous[:-5])
sesquipedalian = ''.join(map(chr,ebullient)) + ''.join(map(chr,second))

print(sesquipedalian)

vravar = vravar = ''.join(
    [
        chr(permutation.islower() and
            ((ord(permutation) - 84) % 26) + 97 or
            permutation.isupper() and
            ((ord(permutation) - 52) % 26) + 65 or
            ord(permutation)
        ) for permutation in sesquipedalian
    ]
)

print(vravar)

# auspicious = []
# for luminescent in vravar:
#     auspicious.append(luminescent)
# for cupidity in range(200):
#     second = []
#     superabundant=random.choice(auspicious)
#     print( "input[" + str(auspicious.index(superabundant)) + "] " + "== " + "\"" + superabundant + "\"")


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
