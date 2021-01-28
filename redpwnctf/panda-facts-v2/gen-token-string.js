const crypto = require('crypto');
const axios = require('axios');
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

    const stringifiedToken = JSON.stringify(token);;
    let encrypted = '';
    encrypted += cipher.update(stringifiedToken, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return {
        encrypted,
        stringifiedToken
    };
}

function xor(a, b) {
    if (!Buffer.isBuffer(a)) a = new Buffer(a)
    if (!Buffer.isBuffer(b)) b = new Buffer(b)
    var res = []
    if (a.length > b.length) {
        for (var i = 0; i < b.length; i++) {
        res.push(a[i] ^ b[i])
        }
    } else {
        for (var i = 0; i < a.length; i++) {
        res.push(a[i] ^ b[i])
        }
    }
    return new Buffer(res);
}

function chunks (buffer, chunkSize) {
	var result = [];
	var len = buffer.length;
	var i = 0;

	while (i < len) {
		result.push(buffer.slice(i, i += chunkSize));
	}

	return result;
}

async function doStuffRemote(username) {

    const response = await axios({
        url: 'https://panda-facts-v2.2020.redpwnc.tf/api/login',
        method: 'POST',
        headers: {
            'authority': 'panda-facts-v2.2020.redpwnc.tf',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
            'content-type':'application/json'
        },
        data: {
            username: username
        }
    });

    //console.log(response.data.token);

    const { stringifiedToken } = await generateToken(username);

    console.log(stringifiedToken);

    const originalOutputText = stringifiedToken.match(/.{1,16}/g)[6];
    const desiredOutputText = '", "member":  1}';
    //console.log("ORIGINAL OUTPUT TEXT AND LENGTH",originalOutputText, originalOutputText.length);
    //console.log(" DESIRED OUTPUT TEXT AND LENGTH", desiredOutputText, desiredOutputText.length);

    const originalOutputTextBinary = Buffer.from(originalOutputText, 'utf-8');
    const desiredOutputTextBinary = Buffer.from(desiredOutputText, 'utf-8');
    //console.log("ORIGINAL TEXT IN BINARY", originalOutputTextBinary);
    //console.log(" DESIRED TEXT IN BINARY", desiredOutputTextBinary);

    const encryptedTokenBinary = Buffer.from(response.data.token, 'base64');
    const chunkedTokenBinary = chunks(encryptedTokenBinary, 16);

    //console.log("CHUNKS OF ENCRYPTED TOKEN\n", chunkedTokenBinary);

    const previousRoundCipherTextBinary = chunkedTokenBinary[5];

    //console.log("PREVIOUS ROUND CIPHER TEXT IN BINARY\n",previousRoundCipherTextBinary);

    const valueBeforeXORbinary = xor(originalOutputTextBinary, previousRoundCipherTextBinary);

    //console.log("VALUE BEFORE XOR", valueBeforeXORbinary);

    const alteredCipherTextBinary = xor(desiredOutputTextBinary, valueBeforeXORbinary);

    //console.log("ALTERED CIPHER TEXT", alteredCipherTextBinary);

    const payloadBinary = Buffer.concat([chunkedTokenBinary[0], chunkedTokenBinary[1],
        chunkedTokenBinary[2], chunkedTokenBinary[3],
        chunkedTokenBinary[4], alteredCipherTextBinary,
        chunkedTokenBinary[6], chunkedTokenBinary[7]]);

    //console.log("CHUNKED PAYLOAD BINARY", chunks(payloadBinary, 16));

    const payloadBase64 = payloadBinary.toString('base64');

    //console.log("PAYLOAD BASE64", payloadBase64);

    const flagResponse = await axios({
        url: 'https://panda-facts-v2.2020.redpwnc.tf/api/flag',
        method: 'GET',
        headers: {
            'authority': 'panda-facts-v2.2020.redpwnc.tf',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36',
            'cookie': 'token=' + payloadBase64
        }
    });

    return flagResponse.data;
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function randomizeIt() {
    while(true) {
        let payload = '';
        for(let i = 0; i < 24; i++) {
            payload+= String.fromCharCode(getRandomInt(32, 126));
        }
        payload += "\",\"membe\":  "
        let responseData = await doStuffRemote(payload);
        console.log(responseData);
        if (responseData.success) {
            console.log(payload);
        }
    }

}

async function doKnownWorking() {
    let responseData = await doStuffRemote("2szvd1H5,_bl|%{RA1uB!lRt\",\"membe\":  ");
    console.log(responseData);
}

//doKnownWorking();
// "/){S`p&$I[WjU8:hCGna.Ft}\",\"membe\":  ""  

randomizeIt();