#!/usr/bin/env python3
from z3 import *
entities = [1, 5, 18, 25, 48, 49, 55, 61, 96, 119, 120, 135, 138, 148, 150, 160, 163, 171, 179, 183, 189, 192, 194, 212, 247]
grid = [[None] * 5 for i in range(5)]
flat = []
known = {(0,0):212,
         (0,1):194,
         (0,2):189,
         (1,0):48,
         (2,0):192}
for y in range(5):
    for x in range(5):
        v = BitVec(f"n{y}_{x}", 32)
        if (x,y) in known:
            grid[y][x] = known[(x,y)]
            flat.append(known[(x,y)])
        else:
            grid[y][x] = v
            flat.append(v)
s = Solver()
for v in flat:
    for other in flat:
        if other is not v:
            s.add(v != other)
    acc = (v == entities[0])
    for ent in entities[1:]:
        acc = Or(acc, v == ent)
    s.add(acc)
def code(v1, v2, v3, v4, v5):
    return (((v1 * 42) + (v2 * 1337) + (v3) + (v3 ^ v4) + (v5 * 2)) & 0xff) == 0
tgrid = list(zip(*grid))
for row in grid + tgrid:
    s.add(code(*row))
print(s.check())
print(s.model())