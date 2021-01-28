const precedingBlocks = "7d9a92b3540bf5e173c6742a93f7ccdf576a8494d3ae479cafc6cec7d037848a0a3df0a02ab9e26df7a06d6962707c8cdbcf2680d9a11c7d993daf3a88a11234a3b2d74ad47ee312858990beff0c6d8a"

const trailingBlocks = "78e3ff4a1e165380674acb2057b877a268bf1df086d159154d8bb4df815f2924";

// 20 82 03 70 46 B2 57 EC AF 85 40 2B 24 66 6B CB <altered>
// 20 82 7F 70 46 B2 57 EC AF AB 40 2B 24 66 78 CB <original>

function getRandomHex() {
    let dec = getRandomInt(0,255);
    return dec.toString(16)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildPayload() {
    let first2 = getRandomHex() + getRandomHex();
    let middle6 = getRandomHex() + getRandomHex() + getRandomHex() + getRandomHex() + getRandomHex() + getRandomHex();
    let middle4 = getRandomHex() + getRandomHex() + getRandomHex() + getRandomHex();
    let last1 = getRandomHex();
    let alteredBlocks = `${first2}03${middle6}85${middle4}6b${last1}`;
    let wholePayload = precedingBlocks + alteredBlocks + trailingBlocks;
    let base64payload = Buffer.from(wholePayload, 'hex').toString('base64');
    console.log(base64payload);
}

buildPayload();