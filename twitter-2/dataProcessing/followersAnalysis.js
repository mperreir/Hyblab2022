module.exports = { followersAnalysis };

const fs = require('fs');
const neatCsv = require('neat-csv');
const path = require('path');
const https = require('https');
const sqlite3 = require('sqlite3').verbose();


async function followersAnalysis() {
    // try { fs.unlinkSync(path.join(__dirname, '../data/dataFollowersCommon.json')); } catch (_e) {} // suppression ancien json
    if (!fs.existsSync(path.join(__dirname, '../data/followers'))) fs.mkdirSync(path.join(__dirname, '../data/followers'));  // creation du dossier pour les csv followers

    const candidatsInformations = require(path.join(__dirname, '../data/infosCandidats.json'));
    await downloadAllCsvFollowers(candidatsInformations);
    console.log('csv downloaded');

    const db = new sqlite3.Database(path.join(__dirname, '../data/dataBase.db'));

    const nbFollowersPerCandidate = {};
    const objectToStore = [];

    await createBdd(db, nbFollowersPerCandidate, candidatsInformations);
    console.log('db created');
    await calculateCommonFollowers(db, candidatsInformations, nbFollowersPerCandidate, objectToStore);
    fs.writeFileSync(path.join(__dirname, '../data/dataFollowersCommon.json'), JSON.stringify(objectToStore, null, 2), 'utf8');

    try { fs.unlinkSync(path.join(__dirname, '../data/dataBase.db')); } catch (_e) {} // suppression de la bdd car inutile après le traitement
    try { fs.rmSync(path.join(__dirname, '../data/followers'), { recursive: true, force: true }); } catch (_e) {} // suppression des csv des followers

    console.log('followers analysis done');
}

async function calculateCommonFollowers(db, candidatsInformations, nbFollowersPerCandidate, objectToStore) {
    let cpt = 0;

    for (let i = 0; i < candidatsInformations.length; i++) {
        const candidat1 = candidatsInformations[i];
        for (let y = 0; y < candidatsInformations.length; y++) {
            const candidat2 = candidatsInformations[y];
            if (candidat1.userName !== candidat2.userName && !objectToStore.find(object => {
                return ((object.name1 === candidat1.userName && object.name2 === candidat2.userName) || (object.name1 === candidat2.userName && object.name2 === candidat1.userName))
            })) {
                cpt++;
                console.log(`${cpt}/105`);
                await calculateCommonFollower(db, candidat1.userName, candidat2.userName, nbFollowersPerCandidate, objectToStore);
            }
        }
    }

}

function calculateCommonFollower(db, userName1, userName2, nbFollowersPerCandidate, objectToStore) {
    return new Promise((resolve, reject) => {
        // db.get(`SELECT count(*) as common FROM (SELECT user_id FROM followers_${userName1} INTERSECT SELECT user_id FROM followers_${userName2});`, function(err, row) {  // plus long (3x plus)
        db.get(`SELECT count(followers_${userName1}.user_id) as common FROM followers_${userName1} WHERE user_id IN (SELECT user_id FROM followers_${userName2});`, function(err, row) {
            objectToStore.push({
                name1: userName1,
                name2: userName2,
                common: row.common,
                nbFollowersName1: nbFollowersPerCandidate[userName1],
                nbFollowersName2: nbFollowersPerCandidate[userName2],
                ratio: (100 * row.common / (nbFollowersPerCandidate[userName1] + nbFollowersPerCandidate[userName2] - row.common)).toFixed(1)
            });
            resolve();
        });
    });
}

async function createBdd(db, nbFollowersPerCandidate, candidatsInformations) {

    /* version full parallélisé (prend mass ram) */
    // const arrayPromiseCandidats = [];
    // candidatsInformations.forEach(async candidat => {
    //     arrayPromiseCandidats.push(addCandidateToDb(db, candidat.userName));
    // });
    // await Promise.all(arrayPromiseCandidats);

    /* version syncroniser pour chaque candidat */
    for (let i = 0; i < candidatsInformations.length; i++) {
        await addCandidateToDb(db, nbFollowersPerCandidate, candidatsInformations[i].userName);
    }
}


async function addCandidateToDb(db, nbFollowersPerCandidate, userName) {
    await createTable(db, `followers_${userName}`);

    const followers = await neatCsv(fs.readFileSync(path.join(__dirname, `../data/followers/${userName}.csv`)));
    nbFollowersPerCandidate[userName] = followers.length;

    const arrayPromiseFollowers = [];
    for (let i = 0; i < Math.ceil(followers.length/30000); i++) {
        const followersToAdd = followers.slice(30000*i, 30000*(i+1));
        arrayPromiseFollowers.push(addFollowersToDb(db, userName, followersToAdd));
    }
    await Promise.all(arrayPromiseFollowers);
}

function addFollowersToDb(db, userName, followersToAdd) {
    return new Promise((resolve, reject) => {
        const requestSql = `INSERT INTO followers_${userName}(user_id) VALUES ` + followersToAdd.map(() => '(?)').join(',');
        db.run(requestSql, followersToAdd.map(follower => follower.user_id), function(err) {
            if (err) console.error(err.message);
            resolve();
        });
    });
}

function createTable(db, tableName) {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS ${tableName} ( user_id TEXT );`, function(err) {
            resolve();
        });
    });
}

async function downloadAllCsvFollowers(candidatsInformations) {
    const arrayPromise = [];
    candidatsInformations.forEach(candidat => {
        arrayPromise.push(downloadCsvFollower(candidat.userName));        
    });
    await Promise.all(arrayPromise);
}

function downloadCsvFollower(userName) {
    return new Promise((resolve, reject) => {
        https.get(`https://cdn-apps.letelegramme.fr/twitter/followers/${userName}.csv`, res => {
            const filePath = fs.createWriteStream(path.join(__dirname, `../data/followers/${userName}.csv`));
            res.pipe(filePath);
            filePath.on('finish',() => {
                filePath.close();
                resolve();
            });
        });
    });
}