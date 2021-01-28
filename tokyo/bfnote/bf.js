let program, pc, buf, p;
let statusCode = 0; // 0: not running, 1: running, 2: exit successfully, 3: exit with an error
let output = '';
let steps = 0;
const maxSteps = 1000000;

function checkStep() {
  steps++;
  if (steps > maxSteps) {
    throw new Error('maximum steps exceeded')
  }
}

function pinc() {
  p++;
}

function pdec() {
  p--;
}

function inc() {
  buf[p]++;
}

function dec() {
  buf[p]--;
}

function putc() {
  output += String.fromCharCode(buf[p]);
}

function getc() {
  console.err('not implemented');
}

function lbegin() {
  if (buf[p] === 0) {
    let i = pc+1;
    let depth = 1;
    while (i < program.length) {
      if (program[i] === '[') {
        depth++;
      }
      if (program[i] === ']') {
        depth--;
        if (depth === 0) {
          break;
        }
      }

      i++;
      checkStep();
    }

    if (depth === 0) {
      pc = i;
    }
    else {
      throw new Error('parenthesis mismatch')
    }
  }
}

function lend() {
  if (buf[p] !== 0) {
    let i = pc-1;
    let depth = 1;
    while (0 <= i) {
      if (program[i] === ']') {
        depth++;
      }
      if (program[i] === '[') {
        depth--;
        if (depth === 0) {
          break;
        }
      }

      i--;
      checkStep();
    }

    if (depth === 0) {
      pc = i;
    }
    else {
      throw new Error('parenthesis mismatch')
    }
  }
}

function writeOutput() {
  if (statusCode !== 3) {
    if (CONFIG.unsafeRender) {
      document.getElementById('output').innerHTML = output;
    } else {
      document.getElementById('output').innerText = output;
    }
  }
}

function initProgram() {
  // load program
  program = document.getElementById('program').innerText;
  document.getElementById('program').innerHTML = DOMPurify.sanitize(program).toString();

  // initialize
  pc = 0;
  buf = new Uint8Array(30000);
  p = 0;

  statusCode = 0;
}

function runProgram() {
  statusCode = 1;
  try {
    while (pc < program.length) {
      switch (program[pc]) {
        case '>':
          pinc();
          break;
        case '<':
          pdec();
          break;
        case '+':
          inc();
          break;
        case '-':
          dec();
          break;
        case '.':
          putc();
          break;
        case ',':
          getc(); // not implemented
          break;
        case '[':
          lbegin();
          break;
        case ']':
          lend();
          break;
        case '=':
          console.log('=)');
          break;
        case '/':
          console.log(':/');
          break;
        case ' ':
          break;
        default:
          throw new Error(`invalid op: ${program[pc]}`)
      }
  
      pc++;
      checkStep();
    }

    CONFIG = window.CONFIG || {
      unsafeRender: false
    };

    statusCode = 2;
  }
  catch {
    statusCode = 3;
    return;
  }
  // no xss please
  output = output.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  writeOutput();
}

window.addEventListener('DOMContentLoaded', function() {
  initProgram();
  runProgram();
});