const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./dina-output-unique"),
  console: false,
});

var stats = {};

readInterface.on("line", function (line) {
  var codons = line.match(/.{1,3}/g);
  codons.forEach((codon) => {
    if (!stats[codon]) {
      stats[codon] = 1;
    } else {
      stats[codon] = stats[codon] + 1;
    }
  });
  var codons2 = line.substr(2).match(/.{1,3}/g);
  codons2.forEach((codon) => {
    if (!stats[codon]) {
      stats[codon] = 1;
    } else {
      stats[codon] = stats[codon] + 1;
    }
  });
});

readInterface.on("close", () => {
  console.log(stats);
  var maps = [];
  Object.keys(stats).forEach((codon) => {
    var map = {};
    map.codon = codon;
    map.freq = stats[codon];
    maps.push(map);
  });
  var sorted = maps.sort((a, b) => b.freq - a.freq);
  sorted.forEach((entry) => console.log(entry.codon + ": " + entry.freq));
  console.log(sorted.length);
});
