#!/usr/bin/python
# -*- coding: utf8 -*-

data = '''
 1,  1,  -2
 1,  2,  -2
 1,  3,  -2
 1,  4,  -2
 1,  5,  -2
 1,  6,  -2
 1,  7,  -2
 1,  8,  -2
 1, 14,  -2
 1, 16,  -2
 1, 18,  -2
 2,  1,  -2
 2,  2, 342
 2,  3, 270
 2,  4, 270
 2,  5, 270
 2,  6, 270
 2,  7, 270
 2,  8,  -2
 2, 10,  36
 2, 14, 270
 2, 16, 270
 2, 18,  45
 3,  1,  -2
 3,  2, 282
 3,  3, 330
 3,  4, 264
 3,  5, 138
 3, 14, 210
 3, 16, 300
 3, 18,   0
 4,  1,  -2
 4,  2, 282
 4,  3, 324
 4, 14, 174
 4, 16, 186
 4, 18,  30
 5,  1,  -2
 5,  2, 282
 5,  3, 198
 5, 14, 324
 5, 16, 348
 5, 18,  -2
 6,  1,  -2
 6,  2, 282
 6, 14, 330
 6, 16, 234
 7,  1,  -2
 7,  2, 282
 7, 14, 198
 7, 16, 276
 8,  1,  -2
 8,  2,  -2
 8, 14,  -2
 8, 16,  -2
 9, 15,  15
10,  3, 294
10,  5, 306
10,  7, 162
10,  9, 222
10, 14,  27
10, 15,   0
10, 16,   6
11, 15,  18
12,  3, 276
12,  5, 318
12,  7, 174
12,  9, 234
12, 14,  -2
12, 15,  -2
12, 16,  -2
14,  3, 288
14,  5, 348
14,  7, 186
14,  9, 246
16,  3, 240
16,  5, 300
16,  7, 336
16,  9, 258
18,  3, 252
18,  5, 312
18,  7, 150
18,  9, 210
'''

table = [192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 119, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 247, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 160, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 179, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 189, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 171, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 183, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 150, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 120, 0, 0, 0, 0, 0, 61, 0, 0, 0, 0, 0, 138, 0, 0, 0, 0, 0, 135, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 194, 0, 0, 0, 0, 0, 212, 0, 0, 0, 0, 0, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96]
def get_code_value(n):
    n -= 138
    if 0 <= n <= 210:
        return table[n]
    return -1

def code(v1, v2, v3, v4, v5):
    return (((v1 * 42) + (v2 * 1337) + (v3) + (v3 ^ v4) + (v5 * 2)) & 0xff) == 0

board = [[0] * 20 for i in range(20)]
for line in data.strip().split('\n'):
    x, y, e = [int(c.strip()) for c in line.split(', ')]
    board[y][x] = get_code_value(e)

entities = sorted([col for row in board[:12] for col in row if col > 0])
print(entities)

# from collections import defaultdict
# import itertools
# import json
# import os
# ​
# axis = [171, 160, 194, 212, 189]
# saxis = set(axis)
# short_entities = sorted(set(entities) - saxis)
# ​
# if not os.path.exists('rows.json'):
#     rows = [row for row in itertools.permutations(entities, r=5) if code(*row)]
#     with open('rows.json', 'w') as f:
#         json.dump(rows, f)
# with open('rows.json', 'r') as f:
#     rows = json.load(f)
# ​
# axisrows = []
# noaxisrows = []
# for row in rows:
#     if saxis.intersection(row):
#         axisrows.append(row)
#     else:
#         noaxisrows.append(row)
# ​
# print(len(axisrows), len(noaxisrows))
# ​
# axispos = defaultdict(lambda: [[] for i in range(5)])
# for row in axisrows:
#     for i, col in enumerate(row):
#         if col in axis and not (set(row) - {col}).intersection(saxis):
#             pos = axis.index(col)
#             axispos[i][pos].append(row)
# ​
# def permute(ai, group, bag):
#     if len(group) == 1:
#         for row in group[0]:
#             srow = set(row[:ai] + row[ai+1:])
#             if not srow - bag:
#                 yield [row]
#     else:
#         for row in group[0]:
#             srow = set(row[:ai] + row[ai+1:])
#             if not srow - bag:
#                 for chain in permute(ai, group[1:], bag - srow):
#                     yield [row] + chain
# ​
# def valid_square(rows):
#     trows = list(zip(*rows))
#     return all(code(*row) for row in rows + trows)
# ​
# for ai, group in sorted(axispos.items()):
#     for chain in permute(ai, group, set(short_entities)):
#         if valid_square(chain):
#             print(ai, chain)