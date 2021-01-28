var jwt = require("jsonwebtoken");
var fs = require("fs");
var privateKey = fs.readFileSync("private.pem");

var token = jwt.sign({ username: "admin" }, privateKey, {
  algorithm: "RS256",
  header: {
    alg: "RS256",
    jku: "https://www.zoeyinthe.cloud/jwks.json",
    kid: "sqcE1a9gj9p08zNMR1MWbLLvuaPyUeJEsClBhy7Q4Jc",
  },
  noTimestamp: true,
});

console.log(token);

var jwksClient = require("jwks-rsa");
var client = jwksClient({
  jwksUri: "https://www.zoeyinthe.cloud/jwks.json",
});
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

jwt.verify(token, getKey, {}, function (err, decoded) {
  if (err) {
    console.error(err);
  }
  console.log(decoded);
});
