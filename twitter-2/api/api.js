'use strict';

const app = require('express')();
const path = require('path');
const fs = require('fs');

const { candidatAnalysis } = require('../dataProcessing/candidatAnalysis');
const { tweetAnalysis } = require('../dataProcessing/tweetAnalysis');
const { followersAnalysis } = require('../dataProcessing/followersAnalysis');

// Export our API
module.exports = app;

updateCsv();
async function updateCsv() { // mise à jour liste candidats + tweets
    setInterval(async () => {
        try {
            const date = new Date();
            if (date.getHours() === 20) { // à 20h
                await candidatAnalysis();
                await tweetAnalysis();
                if (date.getDay() === 2) await followersAnalysis(); // tous les lundis
            }
        } catch (err) {
            console.log(err);
        }
    }, 1000*60); // toutes les heures
}


/* ----- Traitements ----- */
// traitements des tweets
app.get('/traitements/candidats', function (req, res) {
    try {
        candidatAnalysis();
    } catch (err) {
        console.log(err);
    }
    res.send('Ok');
});

// traitements des tweets
app.get('/traitements/tweets', function (req, res) {
    try {
        tweetAnalysis();
    } catch (err) {
        console.log(err);
    }
    res.send('Ok');
});

// traitements des followers
app.get('/traitements/followers', function (req, res) {
    try {
        followersAnalysis();
    } catch (err) {
        console.log(err);
    }
    res.send('Processing');
});


/* ----- Questions random ----- */
app.get('/randomQuestion/followers', function (req, res) {
    const dataFollowersCommon = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dataFollowersCommon.json')));
    const candidats = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json')));

    const mainCandidat = candidats[random(0, candidats.length - 1)];

    let solutionCandidat;
    let bestRatio = -1;

    dataFollowersCommon.forEach(data => {
        data.ratio = parseFloat(data.ratio);
        if (data.ratio > bestRatio) {
            if (data.name1 === mainCandidat.userName) {
                solutionCandidat = candidats.find(candidat => candidat.userName === data.name2);
                bestRatio = data.ratio;
            } else if (data.name2 === mainCandidat.userName) {
                solutionCandidat = candidats.find(candidat => candidat.userName === data.name1);
                bestRatio = data.ratio;
            }
        }
    });

    let wrongCandidats = [];
    while (wrongCandidats.length < 2) { // mettre 2
        const randomCandidat = candidats[random(0, candidats.length - 1)];
        if (randomCandidat.userName !== mainCandidat.userName && randomCandidat.userName !== solutionCandidat.userName) {
            if (!wrongCandidats.find(candidat => candidat.userName === randomCandidat.userName)) wrongCandidats.push(randomCandidat);
        }
    }

    res.send({
        questionPart1: "Avec quel·le candidat·e",
        questionPart3: "a-t-il/elle le plus de followers en commun ?",
        mainCandidat,
        solutionCandidat,
        wrongCandidats,
        ratio: bestRatio
    });
});

app.get('/randomQuestion/:theme', function (req, res) {
    let dataRatioTweet = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dataRatioTweetTheme.json')));
    if (!dataRatioTweet || !dataRatioTweet[req.params.theme]) return res.send({ error: 'true' });

    dataRatioTweet = dataRatioTweet[req.params.theme];

    const candidats = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json')));

    const mainCandidat = candidats[random(0, candidats.length - 1)];
    const ratioMainCandidat = dataRatioTweet[mainCandidat.userName].ratio;

    let solutionCandidat, bestRatio;

    Object.keys(dataRatioTweet).forEach(userName => {
        if (userName !== mainCandidat.userName && (!bestRatio || Math.abs(dataRatioTweet[userName].ratio - ratioMainCandidat) < bestRatio) && candidats.find(candidat => candidat.userName === userName)) {

            bestRatio = Math.abs(dataRatioTweet[userName].ratio - ratioMainCandidat);
            solutionCandidat = candidats.find(candidat => candidat.userName === userName);

        }
    });

    let wrongCandidats = [];
    while (wrongCandidats.length < 2) { // mettre 2
        const randomCandidat = candidats[random(0, candidats.length - 1)];
        if (randomCandidat.userName !== mainCandidat.userName && randomCandidat.userName !== solutionCandidat.userName) {
            if (!wrongCandidats.find(candidat => candidat.userName === randomCandidat.userName)) wrongCandidats.push(randomCandidat);
        }
    }

    res.send({
        questionPart1: 'Sur le sujet de ',
        questionPart2: '<br>qui tweete autant que ',
        questionPart3: ' ?',
        wordsTheme: wordsTheme(req.params.theme),
        mainCandidat,
        solutionCandidat,
        wrongCandidats,
        ratioMainCandidat,
        ratioSolutionCandidat: dataRatioTweet[solutionCandidat.userName].ratio
    });
});

function wordsTheme(theme) {
    if (theme === 'education') return `l'éducation`;
    else if (theme === 'sante') return 'la santé';
    else if (theme === 'environnement') return `l'environnement`;
    else if (theme === 'economie') return `l'économie`;
}


/* ----- Exploration ----- */
// avoir la liste des candidats à afficher
app.get('/candidats', function (req, res) {
    res.send(JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json'))));
});

// avoir les ratio de tweet par candidat par followers en commun
app.get('/ratioNearCandidate/followers/:userName', function (req, res) {
    const dataFollowersCommon = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dataFollowersCommon.json')));
    const candidats = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json')));

    const mainCandidat = candidats.find(candidat => candidat.userName === req.params.userName);
    if (!mainCandidat) return res.send({ error: 'true' });

    let candidatsRatio = [
        {
            shortname: mainCandidat.displayShortName,
            img: `img/candidats/${mainCandidat.imageLinkCercle}.png`,
            ratio: '50.0'
        }
    ];

    dataFollowersCommon.forEach(data => {
        if (data.name1 === mainCandidat.userName) {
            const candidat = candidats.find(candidat => candidat.userName === data.name2);
            candidatsRatio.push({
                shortname: candidat.displayShortName,
                img: `img/candidats/${candidat.imageLink}.png`,
                ratio: data.ratio
            });
        } else if (data.name2 === mainCandidat.userName) {
            const candidat = candidats.find(candidat => candidat.userName === data.name1);
            candidatsRatio.push({
                shortname: candidat.displayShortName,
                img: `img/candidats/${candidat.imageLink}.png`,
                ratio: data.ratio
            });
        }
    });


    let id = 1;
    candidatsRatio = candidatsRatio.sort((candidat1, candidat2) => candidat2.ratio - candidat1.ratio).splice(0, 7);
    candidatsRatio.forEach(candidat => { candidat.id = id++; });

    res.send({
        nodes: candidatsRatio,
        links: [
            { source: 1, target: 2 },
            { source: 1, target: 3 },
            { source: 1, target: 4 },
            { source: 1, target: 5 },
            { source: 1, target: 6 },
            { source: 1, target: 7 }
        ]
    });
});

// avoir les ratio de tweet par candidat en fonction du theme
app.get('/ratioNearCandidate/:theme/:userName', function (req, res) {
    let dataRatioTweet = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/dataRatioTweetTheme.json')));
    if (!dataRatioTweet || !dataRatioTweet[req.params.theme]) return res.send({ error: 'true' });

    dataRatioTweet = dataRatioTweet[req.params.theme];

    const candidats = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/infosCandidats.json')));

    const mainCandidat = candidats.find(candidat => candidat.userName === req.params.userName);
    if (!mainCandidat) return res.send({ error: 'true' });

    const mainRatio = dataRatioTweet[mainCandidat.userName].ratio;

    let candidatsRatio = [];
    Object.keys(dataRatioTweet).forEach(candidat => {
        candidatsRatio.push({
            userName: candidat,
            ratio: dataRatioTweet[candidat].ratio,
            ratioArroundMain: Math.abs(dataRatioTweet[candidat].ratio - mainRatio)
        });
    });

    candidatsRatio = candidatsRatio.sort((object1, object2) => object1.ratioArroundMain - object2.ratioArroundMain).splice(0, 7);

    candidatsRatio = candidatsRatio.map(object => {
        const infos = candidats.find(candidat => candidat.userName === object.userName);
        infos.ratio = object.ratio;
        return infos;
    });

    res.send(createStructureDataVisualisation(candidatsRatio));
});



function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function createStructureDataVisualisation(candidats) {
    const resultat = {
        nodes: [],
        links: [
            { source: 1, target: 2 },
            { source: 1, target: 3 },
            { source: 1, target: 4 },
            { source: 1, target: 5 },
            { source: 1, target: 6 },
            { source: 1, target: 7 }
        ]
    };

    let id = 1;
    candidats.forEach(candidat => {
        resultat.nodes.push({
            id,
            shortname: candidat.displayShortName,
            img: `img/candidats/${id === 1 ? candidat.imageLinkCercle : candidat.imageLink}.png`,
            ratio: candidat.ratio
        });
        id++;
    });

    return resultat;
}