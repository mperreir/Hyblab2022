
// doc : https://npm.io/package/sileco.db
const { Database } = require('sileco.db');

const path = require('path');
const path_to_db = path.join("db");
const db = new Database("twitter-1/back/db/database.json");

// https://weeknumber.com/how-to/javascript
// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
        - 3 + (week1.getDay() + 6) % 7) / 7);
}

Date.prototype.isSameWeek = function(date)
{
    return this.getFullYear() === date.getFullYear()
        && this.getWeek() === date.getWeek();
};

module.exports = db;
module.exports.tweets_name = "tweets";
module.exports.candidats_name = "candidats";
module.exports.themes_name = "themes";

module.exports.getTweetsSemaine = () => {
    return db.fetch(module.exports.tweets_name)
        .filter(tweet => (new Date(tweet.date)).isSameWeek(new Date(2021, 12, 5)));
}

// INIT DB
// const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));
//
// // INIT Candidats
// textProcessing.Parser.getValuesFromCSV(path.join(__dirname, 'data/account_information/candidats_information.csv'), candidats  => {
//     candidats.forEach(candidat => db.push(module.exports.candidats_name, candidat));
// });
//
// // INIT Themes
// db.set(module.exports.themes_name, [
//     {
//         id: 1,
//         name: "Defence",
//         keywords: "immigration police violence manifestation voleures balle lachrymo arme defence",
//     },
//     {
//         id: 2,
//         name: "Sante",
//         keywords: "covid hopitaux vaccin lit cancer santé medecin",
//     },
//     {
//         id: 3,
//         name: "Economie",
//         keywords: "economie salaire emplois relocalisation localisation entreprise startup start-up",
//     }
// ]);
//
// // INIT Tweets
// const labeler = new textProcessing.Labeler(db.fetch(module.exports.themes_name));
// textProcessing.Parser.getTweetsJSONFromFile(path.join(__dirname, '/data/tweets/tweets_candidats.csv'), ts  => {
//     let older_tweets = db.fetch(module.exports.tweets_name);
//     if (older_tweets === null) older_tweets = [];
//     ts = labeler.labellingTweets(ts).concat(older_tweets);
//     db.set(module.exports.tweets_name, ts);
// });
