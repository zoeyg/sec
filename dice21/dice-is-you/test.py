import itertools

def code(v1, v2, v3, v4, v5):
    return (((v1 * 42) + (v2 * 1337) + (v3) + (v3 ^ v4) + (v5 * 2)) & 0xff) == 0

values = [1, 5, 18, 25, 49, 55, 61, 119, 120, 135, 138, 163, 171, 179, 183, 247]
origValues = [1, 5, 18, 25, 48, 49, 55, 61, 96, 119, 120, 135, 138, 148, 150, 160, 163, 171, 179, 183, 189, 192, 194, 212, 247]

for i in itertools.permutations(values, r=16):
  pos = 0
  if (code(48,i[0],i[1],i[2],i[3])):
    #print(48,i[0],i[1],i[2],i[3])
    pos = pos + 1
  if (code(192,i[4],i[5],i[6],i[7])):
    #print(192,i[4],i[5],i[6],i[7])
    pos = pos + 1
  if (code(96,i[8],i[9],i[10],i[11])):
    #print(96,i[8],i[9],i[10],i[11])
    pos = pos + 1
  if (code(148,i[12],i[13],i[14],i[15])):
    #print(148,i[12],i[13],i[14],i[15])
    pos = pos + 1

  if (code(150,i[3],i[7],i[11],i[15])):
    #print(150,i[3],i[7],i[11],i[15])
    pos = pos + 1
  if (code(160,i[2],i[6],i[10],i[14])):
    #print(160,i[2],i[6],i[10],i[14])
    pos = pos + 1
  if (code(189,i[1],i[5],i[9],i[13])):
    #print(189,i[1],i[5],i[9],i[13])
    pos = pos + 1
  if (code(194,i[0],i[4],i[8],i[12])):
    #print(194,i[0],i[4],i[8],i[12])
    pos = pos + 1

  if pos == 8:
      print('game over')
      print(i)
      exit()

  # if (code(48,i[0],i[1],i[2],i[3])):
  #   print(i)
  # if (code(192,i[0],i[1],i[2],i[3])):
    
  # if (code(96,i[0],i[1],i[2],i[3])):
  #   pos + 1
  # if (code(148,i[0],i[1],i[2],i[3])):
  #   pos + 1

  # if (code(150,i[0],i[1],i[2],i[3])):
  #   pos + 1
  # if (code(160,i[0],i[1],i[2],i[3])):
  #   pos + 1
  # if (code(189,i[0],i[1],i[2],i[3])):
  #   pos + 1
  # if (code(194,i[0],i[1],i[2],i[3])):
  #   pos + 1

  # if pos  1:
  #   print(i)