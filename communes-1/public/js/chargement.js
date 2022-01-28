const jsonData = require('../data/ResultatJSON/Resultat2002Tour1.json');
const jsonData2 = require('../data/ResultatJSON/Resultat2002Tour2.json');
const jsonData3 = require('../data/ResultatJSON/Resultat2007Tour1.json');
const jsonData4 = require('../data/ResultatJSON/Resultat2007Tour2.json');
const jsonData5 = require('../data/ResultatJSON/Resultat2012Tour1.json');
const jsonData6 = require('../data/ResultatJSON/Resultat2012Tour2.json');
const jsonData7 = require('../data/ResultatJSON/Resultat2017Tour1.json');
const jsonData8 = require('../data/ResultatJSON/Resultat2017Tour2.json');

const map2002_1 = new Map();
const map2002_2 = new Map();
const map2007_1 = new Map();
const map2007_2 = new Map();
const map2012_1 = new Map();
const map2012_2 = new Map();
const map2017_1 = new Map();
const map2017_2 = new Map();

jsonData.forEach(row => map2002_1.set(row.code,row))
jsonData2.forEach(row => map2002_2.set(row.code,row))
jsonData3.forEach(row => map2007_1.set(row.code,row))
jsonData4.forEach(row => map2007_2.set(row.code,row))
jsonData5.forEach(row => map2012_1.set(row.code,row))
jsonData6.forEach(row => map2012_2.set(row.code,row))
jsonData7.forEach(row => map2017_1.set(row.code,row))
jsonData8.forEach(row => map2017_2.set(row.code,row))

export {map2007_1};
export {map2007_2};
export {map2002_1};
export {map2002_2};
export {map2017_1};
export {map2017_2};
export {map2012_1};
export {map2012_2};