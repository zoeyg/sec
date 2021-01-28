const crypto = require('crypto');
const INTEGRITY = '12370cc0f387730fb3f273e4d46a94e5';

async function generateToken(username) {
    const algorithm = 'aes-192-cbc'; 
    const key = Buffer.from('F'.repeat(48), 'hex'); 
    // Predictable IV doesn't matter here
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const token = `{"integrity":"${INTEGRITY}","member":0,"username":"${username}"}`
    console.log(token);

    let encrypted = '';
    encrypted += cipher.update(token, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

async function decodeToken(encrypted) {
    const algorithm = 'aes-192-cbc'; 
    const key = Buffer.from('F'.repeat(48), 'hex'); 
    // Predictable IV doesn't matter here
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = '';

    try {
        decrypted += decipher.update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
    } catch (error) {
        return false;
    }

    console.log(decrypted);

    let res;
    try {
        res = JSON.parse(decrypted);
    } catch (error) {
        //console.log(error);
        return false;
    }

    if (res.integrity !== INTEGRITY) {
        return false;
    }

    return res;
}

function bin2hex(b) {
    let splitBin = b.match(/.{4}/g)
    //console.log(splitBin.join(' '));
    let hex = splitBin.map((bin) => {
        return parseInt(bin, 2).toString(16);
    });
    //console.log(hex.join(''))
    return hex.join('');
}

function hex2bin(hex){
    hex = hex.match(/.{2}/g);
    return hex.map(h => (parseInt(h, 16).toString(2)).padStart(8, '0')).join('');
}

async function doStuff() {

    generateToken('", "member": 1, "username": "test');

    return;
    const inputHex = "f4196d7725f215352d8b288d108bca90298f3bd9a481072ee20e02817f1fb78b009eb12cea22ca155835eeb3b8757cc19573158b61b0526631c9e3864c5a135048ea4a0d114a5a095ebe3653b518963c"
    //const inputHex = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    //const inputHex = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    let binInput = hex2bin(inputHex)
    for(let i = 0; i < binInput.length; i++) {
        let prefix = binInput.substring(0,i);
        let flippedBit = binInput[i] === '0' ? '1' : '0';
        let suffix = binInput.substring(i+1);
        let candidateToken = Buffer.from(bin2hex(prefix + flippedBit + suffix), 'hex').toString('base64');
        let decrypted = await decodeToken(candidateToken);
        console.log(decrypted);
    }
}

doStuff();