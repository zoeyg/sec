

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCode(v1, v2, v3, v4, v5) {
  return (v1 * 42) + (v2 * 1337) + (v3) + (v3 ^ v4) + (v5 * 2);
}

//var0: 171
//var1: 160
//var2: 194
//var3: 212
//var4: 189

let testCode = getCode(171,160,194,212,189);
console.log(testCode);
while(testCode != 0) {
  let v1 = getRandomInt(0, 255);
  let v2 = getRandomInt(0, 255);
  let v3 = getRandomInt(0, 255);
  let v4 = getRandomInt(0, 255);
  let v5 = getRandomInt(0, 255);
  testCode = getCode(v1,v2,v3,v4,v5);
}
console.log(v1,v2,v3,v4,v5);

