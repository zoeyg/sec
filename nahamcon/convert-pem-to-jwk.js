var fs = require("fs");
var rsaPemToJwk = require("rsa-pem-to-jwk");

var pem = fs.readFileSync("private.pem");

var jwk = rsaPemToJwk(pem, { use: "sig" }, "public");

console.log(JSON.stringify({ keys: [jwk] }, null, 2));
