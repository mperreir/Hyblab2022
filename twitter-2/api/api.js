'use strict';

const app = require( 'express' )();
const path = require('path');

const { tweetAnalysis } = require('../dataProcessing/tweetAnalysis');
const { followersAnalysis } = require('../dataProcessing/followersAnalysis');

// Export our API
module.exports = app;


/* ----- Traitements ----- */
// traitements des tweets
app.get('/traitements/tweet', function ( req, res ) {
    tweetAnalysis();
    res.send('Processing');
});

// traitements des followers
app.get('/traitements/followers', function ( req, res ) {
    followersAnalysis();
    res.send('Processing');
});


/* ----- Questions random ----- */
app.get('/randomQuestion/followers', function (req, res) {
    const dataFollowersCommon = require(path.join(__dirname, '../data/dataFollowersCommon.json'));
    const candidats = require(path.join(__dirname, '../data/infosCandidats.json'));

    const mainCandidat = candidats[random(0, candidats.length-1)];

    let solutionCandidat;
    let bestRatio = -1;

    dataFollowersCommon.forEach(data => {
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
        const randomCandidat = candidats[random(0, candidats.length-1)];
        if (randomCandidat.userName !== mainCandidat.userName && randomCandidat.userName !== solutionCandidat.userName) {
            if (!wrongCandidats.find(candidat => candidat.userName === randomCandidat.userName)) wrongCandidats.push(randomCandidat);
        }
    }

    res.send({
        questionPart1: "Avec quel candidat",
        questionPart2: "a-t-il le plus de followers en commun ?",
        mainCandidat,
        solutionCandidat,
        wrongCandidats,
        ratio: bestRatio
    });
});

app.get('/randomQuestion/:theme', function (req, res) {
    let dataRatioTweet = require(path.join(__dirname, '../data/dataRatioTweetTheme.json'));
    if (!dataRatioTweet || !dataRatioTweet[req.params.theme]) return res.send({ error: 'true' });

    dataRatioTweet = dataRatioTweet[req.params.theme];

    const candidats = require(path.join(__dirname, '../data/infosCandidats.json'));

    const mainCandidat = candidats[random(0, candidats.length-1)];
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
        const randomCandidat = candidats[random(0, candidats.length-1)];
        if (randomCandidat.userName !== mainCandidat.userName && randomCandidat.userName !== solutionCandidat.userName) {
            if (!wrongCandidats.find(candidat => candidat.userName === randomCandidat.userName)) wrongCandidats.push(randomCandidat);
        }
    }

    res.send({
        questionPart1: "Qui tweet autant que",
        questionPart2: `sur ${req.params.theme}`,
        mainCandidat,
        solutionCandidat,
        wrongCandidats,
        ratioMainCandidat,
        ratioSolutionCandidat: dataRatioTweet[solutionCandidat.userName].ratio
    });
});


/* ----- Exploration ----- */
// avoir les ratio de tweet par candidat par followers en commun
app.get('/ratioNearCandidate/followers/:userName', function (req, res) {
    const dataFollowersCommon = require(path.join(__dirname, '../data/dataFollowersCommon.json'));
    const candidats = require(path.join(__dirname, '../data/infosCandidats.json'));

    const mainCandidat = candidats.find(candidat => candidat.userName === req.params.userName);
    if (!mainCandidat) return res.send({ error: 'true' });

    let candidatsRatio = [];

    dataFollowersCommon.forEach(data => {
        if (data.name1 === mainCandidat.userName) {
            const candidat = candidats.find(candidat => candidat.userName === data.name2);
            candidatsRatio.push({
                shortname: candidat.displayShortName,
                img: `/img/${candidat.displayFullName.toLowerCase().replace(/ /g,'-')}`,
                ratio: data.ratio
            })
        } else if (data.name2 === mainCandidat.userName) {
            const candidat = candidats.find(candidat => candidat.userName === data.name1);
            candidatsRatio.push({
                shortname: candidat.displayShortName,
                img: `/img/${candidat.displayFullName.toLowerCase().replace(/ /g,'-')}`,
                ratio: data.ratio
            })
        }
    });


    let id = 1;
    candidatsRatio = candidatsRatio.sort((candidat1, candidat2) => candidat2.ratio - candidat1.ratio).splice(0,7);
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
    let dataRatioTweet = require(path.join(__dirname, '../data/dataRatioTweetTheme.json'));
    if (!dataRatioTweet || !dataRatioTweet[req.params.theme]) return res.send({ error: 'true' });

    dataRatioTweet = dataRatioTweet[req.params.theme];

    const candidats = require(path.join(__dirname, '../data/infosCandidats.json'));

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

    candidatsRatio = candidatsRatio.sort((object1, object2) => object1.ratioArroundMain - object2.ratioArroundMain).splice(0,7);

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
            img: `/img/${candidat.displayFullName.toLowerCase().replace(/ /g,'-')}`,
            ratio: candidat.ratio
        });
        id++;
    });

    return resultat;
}