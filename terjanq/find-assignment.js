let queue = [{ obj: globalThis, key: "globalThis" }];
let success = [];
let lastLength = 0;
let visited = [];

function testObject(obj, key) {
    if (visited.includes(obj)) {
        return;
    }
    visited.push(obj);
    for(let prop in obj) {
        if (prop === "location") {
            continue;
        }
        let orig = obj[prop];
        obj[prop] = "abcd";
        if (obj[prop] !== "abcd") {
            console.log(`- ${key}.${prop}`);
        } else {
            //console.log(`+ ${key}.${prop}`);
        }
        obj[prop] = orig;
        let test = "abcd";
        test = obj[prop];
        if (test === "abcd") {
            console.log(`!!!!!! ${key}.${prop}`);
        }
        if (typeof(obj[prop]) === "object") {
            queue.push({ obj: obj[prop], key: key + "." + prop });
        }
    }
}

let interval = setInterval(() => {
    try {
        if (queue.length > 0) {
            let next = queue.shift();
            testObject(next.obj, next.key);
        }
        if (Math.abs(lastLength -queue.length) > 10 ) {
            //console.log('Queue length', queue.length);
            lastLength = queue.length;
        }
        /*if (lastLength > 0 && queue.length === 0) {
            console.log(success);
            //clearInterval(interval);
        }*/
    } catch (e) {
        console.log('Error', e);
    }
}, 10);
