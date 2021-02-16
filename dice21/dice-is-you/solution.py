import itertools

# adapated from decompiled.c
def code(v1, v2, v3, v4, v5):
    return (((v1 * 42) + (v2 * 1337) + (v3) + (v3 ^ v4) + (v5 * 2)) & 0xff) == 0

# leftover after constraints from corner removed
values = [1, 5, 18, 25, 49, 55, 61, 119, 120, 135, 138, 163, 171, 179, 183, 247]

rows1 = {}
rows2 = {}
rows3 = {}
rows4 = {}

# Get all the possible combinations for the 4 rows
for i in itertools.permutations(values, r=4):
  if (code(48,i[0],i[1],i[2],i[3])):
     rows1[(48,) + i] = True
  if (code(192,i[0],i[1],i[2],i[3])):
     rows2[(192,) + i] = True
  if (code(96,i[0],i[1],i[2],i[3])):
     rows3[(96,) + i] = True
  if (code(148,i[0],i[1],i[2],i[3])):
     rows4[(148,) + i] = True

# Find possible row combinations, so DRY
for row1 in rows1.keys():
  for row2 in rows2.keys():
    valid = True
    for entry in row1[1:]: # prune all the row 2 options that have numbers that are already in the first row
      if entry in row2:
        valid = False
        continue
    if valid:
      for row3 in rows3.keys():
        valid = True
        for entry in row2[1:] + row1[1:]: # prune...
          if entry in row3[1:]:
            valid = False
            continue
        if valid:
          for row4 in rows4.keys():
            valid = True
            for entry in row3[1:] + row2[1:] + row1[1:]: # prune...
              if entry in row4:
                valid = False
                continue
            if valid: # We have a valid combination of 4 rows
              option = [row1, row2, row3, row4]
              # Now see if the columns are valid
              if code(194, option[0][1], option[1][1], option[2][1], option[3][1]):
                if code(189, option[0][2], option[1][2], option[2][2], option[3][2]):
                  if code(160, option[0][3], option[1][3], option[2][3], option[3][3]):
                    if code(150, option[0][4], option[1][4], option[2][4], option[3][4]):
                      print("WINNER!")
                      print([(212, 194, 189, 160, 150), row1, row2, row3, row4])
                      exit()



