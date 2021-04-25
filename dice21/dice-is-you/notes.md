# Dice Is You

## Enumeration


debug into `_code` in browser

Why do these first two show up first?
First example success: [171, 160, 194, 212, 189]
First example failure: [61, 179, 96, 183, 55]

We know mappings for those, so lets push some of the pieces we know over to the first column on the grid.  Now we should be able to figure out
the 5 symbols that start in the corner.  Use itertools and the code() function for fitness to find the whole first row and column.

[212, 194, 189, 160, 150,
  48,   0,   0,   0,   0,
 192,   0,   0,   0,   0,
  96,   0,   0,   0,   0,
 148,   0,   0,   0,   0]

Write script to figure out the rest

```
╭─zoey@parrot-virtual ~/sec/dice21/dice-is-you ‹master*› 
╰─$ python3 solution.py 
WINNER!
[(212, 194, 189, 160, 150), (48, 247, 135, 1, 138), (192, 179, 119, 183, 55), (96, 171, 25, 61, 120), (128, 49, 5, 163, 18)]
```

Now we need to map all the things

```
[212, 194, 189, 171, 160]
[48,   25,  49,  96, 120]
[192, 135, 138,   1, 148]
[179,   5, 183,  55, 150]
[247, 163,  18,  61, 119]
```

Y  X +o -o  +
E  D  F  G  I
Δ  J  K  L  N
❏  Я  T  ⊥  ᐱ
Z  /  0  ▲  ◪

And the final answer should be

[212, 194, 189, 160, 150
  48, 247, 135,   1, 138
 192, 179, 119, 183,  55
  96, 171,  25,  61, 120
 148,  49,   5, 163,  18]

Y  X +o  +  ᐱ
E  Z  J  L  K
Δ  ❏ ◪  T  ⊥
G -o  D  ▲  I
N  F  Я  /  0 

Once you line everything up you get an alert with the following text:

dice{d1ce_1s_y0u_is_th0nk_73da6}
  