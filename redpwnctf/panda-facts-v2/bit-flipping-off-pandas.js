const crypto = require('crypto');
const INTEGRITY = 'd2068b64517a277e481166b9b488f593';

async function generateToken(username) {
    const algorithm = 'aes-192-cbc'; 
    const key = Buffer.from('F'.repeat(48), 'hex'); 
    // Predictable IV doesn't matter here
    const iv = Buffer.alloc(16, 0);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const token = {
        integrity: INTEGRITY,
        member: 0,
        username: username
    };

    const stringifiedToken = JSON.stringify(token);
    console.log(stringifiedToken, stringifiedToken.length, stringifiedToken.match(/.{1,16}/g));
    let encrypted = '';
    encrypted += cipher.update(stringifiedToken, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

async function decodeToken(encrypted, bit) {
    const algorithm = 'aes-192-cbc'; 
    const key = Buffer.from('F'.repeat(48), 'hex'); 
    // Predictable IV doesn't matter here
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = '';

    try {
        decrypted += decipher.update(encrypted, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
    } catch (error) {
        return false;
    }

    console.log('BIT',bit,'DECRYPTED STRING', decrypted);

    let res;
    try {
        res = JSON.parse(decrypted);
    } catch (error) {
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

async function flipAllTheBits() {

    const base64token = await generateToken(process.argv[2]);
    console.log(base64token);

    const inputHex = Buffer.from(base64token, 'base64').toString('hex');
    console.log(inputHex);

    let decrypted = await decodeToken(base64token, null);
    console.log('Decrypted unmodified ',decrypted);

    let binInput = hex2bin(inputHex)
    for(let i = 640; i < binInput.length; i++) {
        let prefix = binInput.substring(0,i);
        let flippedBit = binInput[i] === '0' ? '1' : '0';
        let suffix = binInput.substring(i+1);
        let candidateToken = Buffer.from(bin2hex(prefix + flippedBit + suffix), 'hex').toString('base64');
        let decrypted = await decodeToken(candidateToken, i);
        if (decrypted != false) {
            console.log(decrypted)
            console.log('Bit Flipped ' + i);
        };
    }
}

async function flipOnlyTheseBits(bitIndices) {

    bitIndices = bitIndices.split(',').map(num => parseInt(num));

    const base64token = await generateToken(process.argv[2]);
    console.log(base64token);
    return;

    const inputHex = Buffer.from(base64token, 'base64').toString('hex');
    console.log(inputHex);

    let decrypted = await decodeToken(base64token, null);
    console.log('Decrypted unmodified ',decrypted);

    let binInput = hex2bin(inputHex);
    for(let x = bitIndices[0]; x < bitIndices[0] + 8; x++) {
        for(let y = bitIndices[1]; y < bitIndices[1] + 8; y++) {
            for(let z = bitIndices[2]; z < bitIndices[2] + 8; z++) {
                let flippedInput = flipBit(binInput, x);
                flippedInput = flipBit(flippedInput, y);
                flippedInput = flipBit(flippedInput, z);
                let candidateToken = Buffer.from(bin2hex(flippedInput), 'hex').toString('base64');
                let decrypted = await decodeToken(candidateToken, x + " " + y + " " + z);
                if (decrypted != false) {
                    console.log(decrypted)
                    console.log('Bit Flipped ' + i);
                };
            }
        }
    }
}

function flipBit(binInput, i) {
    let prefix = binInput.substring(0,i);
    let flippedBit = binInput[i] === '0' ? '1' : '0';
    let suffix = binInput.substring(i+1);
    return prefix + flippedBit + suffix;
}

/*if (!process.argv[3]) {
    flipAllTheBits();
} else {
    flipOnlyTheseBits(process.argv[3]);
}*/

const testInput = "/C4lKkrVK67Byx9fZRR1aV1V/FXwDd9N2+nhR3DX2cNmcuvlQiBm6z9ZFASGmqiV61uO7QHKBm+CwUTrCtx+yHDu39jnlLuAqKNoWejaorMTwDbyh3Gc8Z9EO9Omsqtp8A/1i7DaTAMhYNeEP+wv1obj+cSBhcQ+qEAANmA4618=";

async function decryptTestInput() {
    let decrypted = await decodeToken(testInput);
    console.log(decrypted);
}

decryptTestInput();