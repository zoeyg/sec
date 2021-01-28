// Get chunked input
var input =
  "ACTGCTATAACGGGCTCTTTGATAGGTCCTAAGTTCGTGTCCTTCCCAATACGAACGATACGAATAACGTTCTCAATGTCTTTTATACCACGAGTTAAGATATTCGGAATATCCGGC";
var input2 =
  "TCTGGAGTGGGCTCGATAACGGGATCATCAAAATCGATATTCCGCCGATTCATAATGACGATATCTGGATTCATATCAATGTTTCGCTTCGAT";

var inputShift =
  "TGCTATAACGGGCTCTTTGATAGGTCCTAAGTTCGTGTCCTTCCCAATACGAACGATACGAATAACGTTCTCAATGTCTTTTATACCACGAGTTAAGATATTCGGAATATCCGGC";

var chunks = input.match(/.{1,3}/g);
var chunks2 = input2.match(/.{1,3}/g);

console.log(chunks2.join(" "));

var map = {
  ATA: "I",
  GGC: "G",
  ACG: "T",
  CGA: "R",
  TTC: "F",
  TCT: "S",
  TTG: "L",
  GCT: "A",
  CGC: "R",
  TCA: "S",
  ATG: " ",
  CCA: "P",
  AAG: "K",
  GTT: "V",
  ACT: "T",
  GGA: "G",
  TTT: "F",
  TCC: "S",
  GTG: "V",
  TGC: "C",
  CCG: "P",
  AAA: "K",
  GGT: "G",
  CTA: "L",
  AAC: "N",
  CCT: "P",
  CTG: "L",
  AGT: "S",
  CTT: "L",
  TCG: "S",
  GAT: "D",
};

console.log(chunks.map((chunk) => map[chunk]).join(""));

console.log(chunks2.map((chunk) => map[chunk]).join(""));
