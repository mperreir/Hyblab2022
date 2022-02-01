const jsonData = require('../public/data/ResultatJSON/Resultat2002Tour1.json');
const jsonData2 = require('../public/data/ResultatJSON/Resultat2002Tour2.json');
const jsonData3 = require('../public/data/ResultatJSON/Resultat2007Tour1.json');
const jsonData4 = require('../public/data/ResultatJSON/Resultat2007Tour2.json');
const jsonData5 = require('../public/data/ResultatJSON/Resultat2012Tour1.json');
const jsonData6 = require('../public/data/ResultatJSON/Resultat2012Tour2.json');
const jsonData7 = require('../public/data/ResultatJSON/Resultat2017Tour1.json');
const jsonData8 = require('../public/data/ResultatJSON/Resultat2017Tour2.json');

const map2002_1 = new Map();
const map2002_2 = new Map();
const map2007_1 = new Map();
const map2007_2 = new Map();
const map2012_1 = new Map();
const map2012_2 = new Map();
const map2017_1 = new Map();
const map2017_2 = new Map();

let data_election = new Map();

jsonData.forEach(row => map2002_1.set(row.code,row));
jsonData2.forEach(row => map2002_2.set(row.code,row));
jsonData3.forEach(row => map2007_1.set(row.code,row));
jsonData4.forEach(row => map2007_2.set(row.code,row));
jsonData5.forEach(row => map2012_1.set(row.code,row));
jsonData6.forEach(row => map2012_2.set(row.code,row));
jsonData7.forEach(row => map2017_1.set(row.code,row));
jsonData8.forEach(row => map2017_2.set(row.code,row));

data_election.set("2002_1",Object.fromEntries(map2002_1));
data_election.set("2002_2",Object.fromEntries(map2002_2));
data_election.set("2007_1",Object.fromEntries(map2007_1));
data_election.set("2007_2",Object.fromEntries(map2007_2));
data_election.set("2012_1",Object.fromEntries(map2012_1));
data_election.set("2012_2",Object.fromEntries(map2012_2));
data_election.set("2017_1",Object.fromEntries(map2017_1));
data_election.set("2017_2",Object.fromEntries(map2017_2));
console.log(data_election)
data_election = Object.fromEntries(data_election);
console.log(data_election)
module.exports.data_election = data_election;

/*const jsonDatavoisin = require('../data/voisin.json');
const mapVoisins = new Map();
for (let jsonDatavoisinKey in jsonDatavoisin) {
	mapVoisins.set(parseInt(jsonDatavoisinKey), jsonDatavoisin[jsonDatavoisinKey]);
}*/