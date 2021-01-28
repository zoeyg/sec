var lookupTable = [ '2-4', 'substring', '4-7', 'getItem', 'deleteItem', '12-14', '0-2',
    'setItem', '9-12', '^7M', 'updateItem', 'bb=', '7-9', '14-16', 'localStorage' ];

var doLookup = function (strIndex) {
	return lookupTable[parseInt(strIndex)];
};

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
								if (localStorage.getItem(doLookup('0x0')) === password.substring(2, 4)) return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}



var inOrder =[
    '0-2', '5W',
'2-4', '$F',
'4-7', 'bb=',
'7-9', '+n',
'9-12', 'BE*',
'12-14', 'pg',
'14-16', '4t',
'16', '^7M'
];
