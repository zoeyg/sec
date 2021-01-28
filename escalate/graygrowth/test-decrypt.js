const crypto = require('crypto');
const lineReader = require('line-reader');

const iv = Buffer.from('9694010911501622', 'hex');
const encrypted = Buffer.from('2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb', 'hex');
//const encrypted = Buffer.from('2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1', 'hex');

let curKey = 0;
const generateKeys = (bits, callback) => {
    while(++curKey < Number.MAX_SAFE_INTEGER) {
        let hexKey = curKey.toString(16);
        while(hexKey.length < 16) {
            hexKey = '0' + hexKey;
        }
        callback(Buffer.from(hexKey, 'hex'));
    }
}

const decrypt = (cipher, key) => {
    const decipher = crypto.createDecipheriv(cipher, key, iv);
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(encrypted, null, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

/*generateKeys(64, (key) => {
   const testDecrypt = decrypt('DES', key);
   if (testDecrypt.includes('flag')) {
       console.log(testDecrypt);
       process.exit(0);
   }
   if (curKey % 100000 == 0) {
       
       console.log('CurKey' + curKey + ', Percentage ' + (curKey / Number.MAX_SAFE_INTEGER));
   }
});*/

lineReader.eachLine(process.argv[2], function(line) {
    curKey++;
    let key = Buffer.from(line);
    if (line.length >= 8) {
        try {
            const testDecrypt = decrypt('blowfish', key.slice(0, 8));
            if (testDecrypt.includes('flag')) {
                console.log(testDecrypt);
                process.exit(0);
            }
        } catch (e) {
            console.error('Error', e)
        }
    }
    if (curKey % 100000 == 0)
        console.log('CurKey' + curKey);
});



/*
2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a12317fdf4488866dbf2e74eeb
2317fdf4488866dbf2e74eeb2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1
2685dc7133c49fdb16513f3a520d2dd4604cb88e0156f82308b860167c09994483b6b94328ad23a1

3c8ad65d8ca04869987bde37700122a80a7cb949ce0cf6c2256c858a84ec1dd2834e5850921a662e5dad6c48d7173dd9 - AES-128
4814aac5cebc8973fd8e5a92ef3b79680dc96cb4e0f1e0f3a9841478107d8a15595bb13dbf1cdd3f - blowfish
9593c314d212d20dcfa37264b03bceaee94634fbc7d915dfcc48fa0711724b8b8bfc3887d00b2928 - DES
9593c314d212d20dcfa37264b03bceaee94634fbc7d915dfcc48fa0711724b8b8bfc3887d00b2928 - 3DES

*/

// Candidates
// blowfish
// 3DES
// DES
// RC2
// 