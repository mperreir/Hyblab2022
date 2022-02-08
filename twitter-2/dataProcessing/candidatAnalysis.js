module.exports = { candidatAnalysis };

const fs = require('fs');
const neatCsv = require('neat-csv');
const path = require('path');
const https = require('https');


async function candidatAnalysis() {
    await downloadCsvCandiat();
    console.log('csv candidat downloaded');

    const csvCandidats = await neatCsv(fs.readFileSync(path.join(__dirname, '../data/candidats_noms_couleurs.csv')));
    let candidatsInformations = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json')));



    let updated = false;

    candidatsInformations.forEach(candidat => {
        if (!csvCandidats.find(csvCandidat => csvCandidat.username === candidat.userName)) { // candidat parti des campagnes
            candidatsInformations = candidatsInformations.filter(candidat2 => candidat2.userName !== candidat.userName);
            updated = true;
        }
    });

    if (updated) fs.writeFileSync(path.join(__dirname, '../data/infosCandidats.json'), JSON.stringify(candidatsInformations, null, 2), 'utf8');
    try { fs.unlinkSync(path.join(__dirname, '../data/candidats_noms_couleurs.csv')); } catch (_e) {} // suppression du csv car inutile après le traitement
    console.log('candidat analysis done');
}

function downloadCsvCandiat() {
    return new Promise((resolve, reject) => {
        https.get('https://cdn-apps.letelegramme.fr/twitter/candidats_noms_couleurs.csv', res => {
            const filePath = fs.createWriteStream(path.join(__dirname, '../data/candidats_noms_couleurs.csv'));
            res.pipe(filePath);
            filePath.on('finish',() => {
                filePath.close();
                resolve();
            });
        });
    });
}
