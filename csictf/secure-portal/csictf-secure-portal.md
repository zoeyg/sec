# Secure Portal

Navigating to the page we're presented with an input to enter a password.  Looking at the source of the web page there's some obfuscated javascript.  Running it
through a beautifier we get

```javascript
var _0x575c = ['\x32\x2d\x34', '\x73\x75\x62\x73\x74\x72\x69\x6e\x67', '\x34\x2d\x37', '\x67\x65\x74\x49\x74\x65\x6d', '\x64\x65\x6c\x65\x74\x65\x49\x74\x65\x6d', '\x31\x32\x2d\x31\x34', '\x30\x2d\x32', '\x73\x65\x74\x49\x74\x65\x6d', '\x39\x2d\x31\x32', '\x5e\x37\x4d', '\x75\x70\x64\x61\x74\x65\x49\x74\x65\x6d', '\x62\x62\x3d', '\x37\x2d\x39', '\x31\x34\x2d\x31\x36', '\x6c\x6f\x63\x61\x6c\x53\x74\x6f\x72\x61\x67\x65', ];

(function (_0x4f0aae, _0x575cf8) {
	var _0x51eea2 = function (_0x180eeb) {
		while (--_0x180eeb) {
			_0x4f0aae['push'](_0x4f0aae['shift']());
		}
	};
	_0x51eea2(++_0x575cf8);
}(_0x575c, 0x78));

var _0x51ee = function (_0x4f0aae, _0x575cf8) {
	_0x4f0aae = _0x4f0aae - 0x0;
	var _0x51eea2 = _0x575c[_0x4f0aae];
	return _0x51eea2;
};

function CheckPassword(_0x47df21) {
	var _0x4bbdc3 = [_0x51ee('0xe'), _0x51ee('0x3'), _0x51ee('0x7'), _0x51ee('0x4'), _0x51ee('0xa')];
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]]('9-12', 'BE*');
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]](_0x51ee('0x2'), _0x51ee('0xb'));
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]](_0x51ee('0x6'), '5W');
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]]('16', _0x51ee('0x9'));
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]](_0x51ee('0x5'), 'pg');
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]]('7-9', '+n');
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]](_0x51ee('0xd'), '4t');
	window[_0x4bbdc3[0x0]][_0x4bbdc3[0x2]](_0x51ee('0x0'), '$F');
	if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0x8')) === _0x47df21[_0x51ee('0x1')](0x9, 0xc)) {
		if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0x2')) === _0x47df21['substring'](0x4, 0x7)) {
			if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0x6')) === _0x47df21[_0x51ee('0x1')](0x0, 0x2)) {
				if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]]('16') === _0x47df21[_0x51ee('0x1')](0x10)) {
					if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0x5')) === _0x47df21[_0x51ee('0x1')](0xc, 0xe)) {
						if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0xc')) === _0x47df21[_0x51ee('0x1')](0x7, 0x9)) {
							if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0xd')) === _0x47df21[_0x51ee('0x1')](0xe, 0x10)) {
								if (window[_0x4bbdc3[0x0]][_0x4bbdc3[0x1]](_0x51ee('0x0')) === _0x47df21[_0x51ee('0x1')](0x2, 0x4)) return !![];
							}
						}
					}
				}
			}
		}
	}
	return ![];
}
```

Let's start deobfuscating it.  The initial array has a bunch of hex encoded characters.  Let's just drop the array into chrome devtools console or a node REPL to
see if the characters are readable

```javascript
> ['\x32\x2d\x34', '\x73\x75\x62\x73\x74\x72\x69\x6e\x67', '\x34\x2d\x37', '\x67\x65\x74\x49\x74\x65\x6d', '\x64\x65\x6c\x65\x74\x65\x49\x74\x65\x6d', '\x31\x32\x2d\x31\x34', '\x30\x2d\x32', '\x73\x65\x74\x49\x74\x65\x6d', '\x39\x2d\x31\x32', '\x5e\x37\x4d', '\x75\x70\x64\x61\x74\x65\x49\x74\x65\x6d', '\x62\x62\x3d', '\x37\x2d\x39', '\x31\x34\x2d\x31\x36', '\x6c\x6f\x63\x61\x6c\x53\x74\x6f\x72\x61\x67\x65', ]
[
  '2-4',          'substring',
  '4-7',          'getItem',
  'deleteItem',   '12-14',
  '0-2',          'setItem',
  '9-12',         '^7M',
  'updateItem',   'bb=',
  '7-9',          '14-16',
  'localStorage'
]
```

Looks like that's the case.  Lets rename this variable to `lookupTable`, and replace all the symbols in the code.  Visual Studio Code has a nice `Rename Symbol` 
feature that's a bit smarter than just a find/replace.  I'm not as quick to grok hexadecimal as I am decimal, so lets replace all of those in the source as well.
`!![]` and `![]` evaluate to `true` and `false`.  When we do the replacements we end up with

```javascript
var lookupTable = [ '2-4', 'substring', '4-7', 'getItem', 'deleteItem', '12-14', '0-2',
    'setItem', '9-12', '^7M', 'updateItem', 'bb=', '7-9', '14-16', 'localStorage' ];

(function (_0x4f0aae) {
	var _0x51eea2 = function () {
        var counter = 121;
		while (--_0x180eeb) {
			_0x4f0aae['push'](_0x4f0aae['shift']());
		}
	};
	_0x51eea2(++);
}(lookupTable));

var _0x51ee = function (_0x4f0aae, _0x575cf8) {
	_0x4f0aae = _0x4f0aae - 0;
	var _0x51eea2 = lookupTable[_0x4f0aae];
	return _0x51eea2;
};

function CheckPassword(_0x47df21) {
	var _0x4bbdc3 = [_0x51ee('0xe'), _0x51ee('0x3'), _0x51ee('0x7'), _0x51ee('0x4'), _0x51ee('0xa')];
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('9-12', 'BE*');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](_0x51ee('0x2'), _0x51ee('0xb'));
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](_0x51ee('0x6'), '5W');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('16', _0x51ee('0x9'));
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](_0x51ee('0x5'), 'pg');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('7-9', '+n');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](_0x51ee('0xd'), '4t');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](_0x51ee('0x0'), '$F');
	if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0x8')) === _0x47df21[_0x51ee('0x1')](9, 12)) {
		if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0x2')) === _0x47df21['substring'](4, 7)) {
			if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0x6')) === _0x47df21[_0x51ee('0x1')](0, 2)) {
				if (window[_0x4bbdc3[0]][_0x4bbdc3[1]]('16') === _0x47df21[_0x51ee('0x1')](16)) {
					if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0x5')) === _0x47df21[_0x51ee('0x1')](12, 14)) {
						if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0xc')) === _0x47df21[_0x51ee('0x1')](7, 9)) {
							if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0xd')) === _0x47df21[_0x51ee('0x1')](14, 16)) {
								if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](_0x51ee('0x0')) === _0x47df21[_0x51ee('0x1')](2, 4)) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
```

Now let's tackle the first IIFE.  Let's rename the first function argument the same as the outer, `lookupTable`.  The second argument is only ever incremented, and 
passed to a function, so we can just remove it from the outer functions and define it in the inner.  It's only ever decremented, so lets call it `counter`.
The code becomes

```javascript
(function (lookupTable) {
	var _0x51eea2 = function () {
        var counter = 121;
		while (--counter) {
			lookupTable['push'](lookupTable['shift']());
		}
	};
	_0x51eea2();
}(lookupTable));
```

Given that the two outer functions are just defining and calling themselves and there's nothing inside the closures, we can just remove the functions altogether.
Lets also replace the bracket notation with dot notation since I find it easier to read.

```javascript
var counter = 121;
while (--counter) {
    lookupTable.push(lookupTable.shift());
}
```

Push adds an element to the end of the array, and shift removes it from the beginning and returns it, so it looks like the elements in the array are being rotated 120
 times.  Lets run the code in the REPL and see what our `lookupTable` looks like afterwards.

```javascript
> var lookupTable = [ '2-4', 'substring', '4-7', 'getItem', 'deleteItem', '12-14', '0-2',
...     'setItem', '9-12', '^7M', 'updateItem', 'bb=', '7-9', '14-16', 'localStorage' ];
undefined
> var counter = 121;
undefined
> while (--counter) {
...     lookupTable.push(lookupTable.shift());
... }
15
> lookupTable
[
  '2-4',          'substring',
  '4-7',          'getItem',
  'deleteItem',   '12-14',
  '0-2',          'setItem',
  '9-12',         '^7M',
  'updateItem',   'bb=',
  '7-9',          '14-16',
  'localStorage'
]
```

So it would seem it leaves the `lookupTable` in the same order it started with, so we can just remove the IIFE altogether.  Lets look at the next function

```javascript
var _0x51ee = function (_0x4f0aae, _0x575cf8) {
	_0x4f0aae = _0x4f0aae - 0;
	var _0x51eea2 = lookupTable[_0x4f0aae];
	return _0x51eea2;
};
```

Looking at the code, this function is always called with a string as the first argument, and only that argument.  So we can remove the second function argument from
the signature. Next, the first argument has 0 subtracted from it.  In javascript, this causes type coercion and will convert the string to an integer.  That integer
is then used to access an item in our `lookupTable`, which is then returned.  Lets call the function `doLookup` and change the type coercion to an explicit 
`parseInt`, and we can then simplify the function to

```javascript
var doLookup = function (strIndex) {
	return lookupTable[parseInt(strIndex)];
};
```

Lets update and take a look at our code now

```javascript
var lookupTable = [ '2-4', 'substring', '4-7', 'getItem', 'deleteItem', '12-14', '0-2',
    'setItem', '9-12', '^7M', 'updateItem', 'bb=', '7-9', '14-16', 'localStorage' ];

var doLookup = function (strIndex) {
	return lookupTable[parseInt(strIndex)];
};

function CheckPassword(_0x47df21) {
	var _0x4bbdc3 = [doLookup('0xe'), doLookup('0x3'), doLookup('0x7'), doLookup('0x4'), doLookup('0xa')];
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('9-12', 'BE*');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](doLookup('0x2'), doLookup('0xb'));
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](doLookup('0x6'), '5W');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('16', doLookup('0x9'));
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](doLookup('0x5'), 'pg');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]]('7-9', '+n');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](doLookup('0xd'), '4t');
	window[_0x4bbdc3[0]][_0x4bbdc3[2]](doLookup('0x0'), '$F');
	if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0x8')) === _0x47df21[doLookup('0x1')](9, 12)) {
		if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0x2')) === _0x47df21['substring'](4, 7)) {
			if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0x6')) === _0x47df21[doLookup('0x1')](0, 2)) {
				if (window[_0x4bbdc3[0]][_0x4bbdc3[1]]('16') === _0x47df21[doLookup('0x1')](16)) {
					if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0x5')) === _0x47df21[doLookup('0x1')](12, 14)) {
						if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0xc')) === _0x47df21[doLookup('0x1')](7, 9)) {
							if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0xd')) === _0x47df21[doLookup('0x1')](14, 16)) {
								if (window[_0x4bbdc3[0]][_0x4bbdc3[1]](doLookup('0x0')) === _0x47df21[doLookup('0x1')](2, 4)) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
```

Let's move on to the actual `CheckPassword` function now.  The first line sets up an array that is accessed to call various properties/functions on `window`.  Let's 
figure out whats in this array.  We can just run our function in the REPL we've been using

```javascript
> var lookupTable = [ '2-4', 'substring', '4-7', 'getItem', 'deleteItem', '12-14', '0-2',
...     'setItem', '9-12', '^7M', 'updateItem', 'bb=', '7-9', '14-16', 'localStorage' ];
undefined
> var doLookup = function (strIndex) {
...     return lookupTable[parseInt(strIndex)];
... };
undefined
>  [doLookup('0xe'), doLookup('0x3'), doLookup('0x7'), doLookup('0x4'), doLookup('0xa')];
[ 'localStorage', 'getItem', 'setItem', 'deleteItem', 'updateItem' ]
```

Using this array, we can replace all the references to `_0x4bbdc3[x]` to the string in the array, and then change to dot notation.  Since we're using dot-notation we
can now change `window.localStorage` to just `localStorage`.  Let's also replace the name of the function argument passed to `CheckPassword` to just `password`. 
We now have

```javascript
function CheckPassword(password) {
	localStorage.setItem('9-12', 'BE*');
	localStorage.setItem(doLookup('0x2'), doLookup('0xb'));
	localStorage.setItem(doLookup('0x6'), '5W');
	localStorage.setItem('16', doLookup('0x9'));
	localStorage.setItem(doLookup('0x5'), 'pg');
	localStorage.setItem('7-9', '+n');
	localStorage.setItem(doLookup('0xd'), '4t');
	localStorage.setItem(doLookup('0x0'), '$F');
	if (localStorage.getItem(doLookup('0x8')) === password[doLookup('0x1')](9, 12)) {
		if (localStorage.getItem(doLookup('0x2')) === password['substring'](4, 7)) {
			if (localStorage.getItem(doLookup('0x6')) === password[doLookup('0x1')](0, 2)) {
				if (localStorage.getItem('16') === password[doLookup('0x1')](16)) {
					if (localStorage.getItem(doLookup('0x5')) === password[doLookup('0x1')](12, 14)) {
						if (localStorage.getItem(doLookup('0xc')) === password[doLookup('0x1')](7, 9)) {
							if (localStorage.getItem(doLookup('0xd')) === password[doLookup('0x1')](14, 16)) {
								if (localStorage.getItem(doLookup('0x0')) === password[doLookup('0x1')](2, 4)) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
```

It looks like values are being put into `localStorage`, and then retrieved again, and compared to our `password` somehow.  Let's clean up some more and replace all
the instances of `doLookup('x')` with the string in the lookup table, and then change to dot-notation.  We can just run the function in our REPL to get the equivalents.

```javascript
function CheckPassword(password) {
	localStorage.setItem('9-12', 'BE*');
	localStorage.setItem('4-7', 'bb=');
	localStorage.setItem('0-2', '5W');
	localStorage.setItem('16', '^7M');
	localStorage.setItem('12-14', 'pg');
	localStorage.setItem('7-9', '+n');
	localStorage.setItem('14-16', '4t');
	localStorage.setItem('2-4', '$F');
	if (localStorage.getItem('9-12') === password.substring(9, 12)) {
		if (localStorage.getItem('4-7') === password.substring(4, 7)) {
			if (localStorage.getItem('0-2') === password.substring(0, 2)) {
				if (localStorage.getItem('16') === password.substring(16)) {
					if (localStorage.getItem('12-14') === password.substring(12, 14)) {
						if (localStorage.getItem('7-9') === password.substring(7, 9)) {
							if (localStorage.getItem('14-16') === password.substring(14, 16)) {
								if (localStorage.getItem('2-4') === password.substring(2, 4)) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}
```

We can now see that strings are inserted into `localStorage`, retrieved, and then compared to different pieces of our `password`.  We now know enough we can just
look at the strings and place them in order according to the `substring` indexes since they all match.  We could do this manually, but lets have the browser do it
for us.  In devtools for the page, run

```javascript
> Object.entries(localStorage).sort((a, b) => a[0].split('-')[0] - b[0].split('-')[0]).reduce((a, c) => a + c[1], '');
"5W$Fbb=+nBE*pg4t^7M"
```

Now lets try our password

```
╭─zoey@virtual-parrot ~/sec/csictf
╰─$ curl 'http://chall.csivit.com:30281/' --data-raw 'password=5W%24Fbb%3D%2BnBE*pg4t%5E7M'
csictf{l3t_m3_c0nfus3_y0u}    
```

Success!