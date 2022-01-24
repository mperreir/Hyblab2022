module.exports = { calculateRatioByMotCle };

const fs       = require('fs');
const neatCsv  = require('neat-csv');
const path = require('path');


const motsCle = {
    'education': [
        'education', 'crous', 'etudiant', 'ecole', 'jeune', 'enseignant', 'etude', 'professeur', 'parcoursup'
    ],
    'santé': [
        'sante', 'passe sanitaire', 'passe vaccinal', 'covid19', 'omicron', 'protocole sanitaire', 'hopital', 'vaccin'
    ],
    'environnement': [
        'nucleaire', 'energie', 'renouvelables', 'cop26', 'g20'
    ],
    'économie': [
        'nucleaire', 'essence', 'economique', 'smic', 'salaire', 'retraite'
    ]
};


// calculateRatioByMotCle();
async function calculateRatioByMotCle() {

    const tweets = await neatCsv(fs.readFileSync(path.join(__dirname, '../data/tweets_candidats.csv')));
    // const tweets = await neatCsv(fs.readFileSync(`../data/tweets_candidats.csv`));

    const candidats = {};
    tweets.forEach(tweet => {
        if (tweet.retweet === 'False') {
            if (!candidats[tweet.username]) {
                candidats[tweet.username] = {
                    nbByTopic: {},
                    nbTotalTweet: 0
                };
                Object.keys(motsCle).forEach(topic => {
                    candidats[tweet.username].nbByTopic[topic] = 0;
                });
            }
            candidats[tweet.username].nbTotalTweet++;

            tweet.tweet = traitementTextTweet(tweet.tweet);

            Object.keys(motsCle).forEach(topic => {
                if (tweetIncludeTopic(tweet.tweet, motsCle[topic])) {
                    candidats[tweet.username].nbByTopic[topic]++;
                }
            });
        }
    });

    storeTopicCandidat(candidats);
}

function storeTopicCandidat(candidats) {
    const data = {};

    Object.keys(motsCle).forEach(topic => {
        data[topic] = {};
    });

    Object.keys(candidats).forEach(candidat => {
        Object.keys(motsCle).forEach(topic => {
            data[topic][candidat] = {
                tweetOnTopic: candidats[candidat].nbByTopic[topic],
                totalTweet: candidats[candidat].nbTotalTweet,
                ratio: parseFloat((100* (candidats[candidat].nbByTopic[topic] / candidats[candidat].nbTotalTweet)).toFixed(2))
            };
        });
    });

    console.log(data);
    fs.writeFileSync(path.join(__dirname, '../data/dataPostProcessing.json'), JSON.stringify(data, null, 2), 'utf8');
}

function tweetIncludeTopic(tweet, words) {
    let ret = false;
    try {
        words.forEach(word => {
            if (!ret && tweet.includes(word)) ret = true;
        });
    } catch (err) {
        // console.log(hashtags);
    }
    return ret;
}

function traitementTextTweet(tweet) {
    return removeAccent(tweet.toLowerCase());
}

function removeAccent(text) {
    const accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
    ];
    const noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
  
    for (let i = 0; i < accent.length; i++) {
        text = text.replace(accent[i], noaccent[i]);
    }
  
    return text;
}