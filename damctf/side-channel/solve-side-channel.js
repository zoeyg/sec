const cp = require('child_process');

let p = cp.exec('nc chals.damctf.xyz 30318');
let guess = 0
let times = {};
let chars = "0123456789abcdef";
let password = '';

p.stdout.on('data', (data) => {
  console.log(`${guess}: ${data}`);
  if (data.includes('password')) {
    if (guess < 8) {
      if (guess != 0) {
        times[guess - 1].end = new Date().getTime()
        times[guess - 1].diff = times[guess - 1].end - times[guess - 1].start;
      }
      times[guess] = {
        start: new Date().getTime()
      }
      p.stdin.write('0\n');
      guess++;
    } else {
      if (guess === 8) {
        times[guess - 1].end = new Date().getTime()
        times[guess - 1].diff = times[guess - 1].end - times[guess - 1].start;
        password = Object.keys(times).map(guess => {
          const diff = times[guess].diff;
          const charIdx = Math.floor(diff/100);
          return chars[charIdx];
        }).join('');
        console.log(`Suspected password: ${password}`);
      }
      let charToSend = password[guess - 8];
      p.stdin.write(charToSend + '\n');
      guess++;
    }
  }
});