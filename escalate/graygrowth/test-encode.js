const crypto = require('crypto');

function encode(textToEncode, keyString, ivString) {
    var key = Buffer.from(keyString, 'hex');
    var iv = Buffer.from(ivString, 'hex');
    var cipher = crypto.createCipheriv('RC4', key, iv);
    var c = cipher.update(textToEncode, 'utf8', 'hex');
    c += cipher.final('hex');
    return c;
}
console.log('2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb');
console.log('2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1');
console.log('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1');
console.log(encode('flag_{8bb0971c5c814394b2bfdf1cd148250e}', '2317fdf4488866db', '9694010911501622'))

// Candidates
// blowfish
// 3DES
// DES
// RC2
// 