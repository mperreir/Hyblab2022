
// doc : https://npm.io/package/sileco.db
const { Database } = require('sileco.db');

const path = require('path');
const path_to_db = path.join("db");
const db = new Database("twitter-1/back/db/database.json");
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));

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
module.exports.candidat_followers_name = "candidat_followers";

module.exports.getTweetsSemaine = () => {
    return module.exports.getTweets()
        .filter(tweet => (new Date(parseInt(tweet.created_at) * 1000)).isSameWeek(new Date(2022, 0, 20)));
}

module.exports.getTweets = () => {
    let candidats_id = db.fetch(module.exports.candidats_name).map(c => parseInt(c.id));
        return db.fetch(module.exports.tweets_name).filter((tweet) => candidats_id.includes(parseInt(tweet.user_id)));
}

module.exports.getCandidats = () => {
    return db.fetch(module.exports.candidats_name);
}

module.exports.getCandidatFromId = (id_candidat) => {

    return result.length > 0 ? result[0] : undefined;
}

// // INIT DB
//
// // INIT Candidats
// textProcessing.Parser.getValuesFromCSV(path.join(__dirname, 'data/account_information/candidats_information.csv'), candidats  => {
//     let date_string = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
//     let older_followers = db.fetch(module.exports.candidat_followers_name);
//     if (older_followers === null) older_followers = {};
//     candidats.forEach((candidat) => {
//         if (older_followers[candidat.id] === undefined) {
//             older_followers[candidat.id] = {};
//         }
//         older_followers[candidat.id][date_string] = candidat.followers;
//     });
//     db.set(module.exports.candidat_followers_name, older_followers);
//     db.set(module.exports.candidats_name, candidats);
// });
//
// // INIT Themes
// db.set(module.exports.themes_name, [
//     {
//         id: 1,
//         name: "Sécurité",
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
//     },
//     {
//         id: 4,
//         name: "Education",
//         keywords: "education ecole lycee universitee classe cours professeurs cantine cartable atsem pedagogie",
//     },
//     {
//         id: 5,
//         name: "Environnement",
//         keywords: "environnement durable vert pollution recyclage trie arbre nucléaire petrol ",
//     },
//     {
//         id: 6,
//         name: "Culture",
//         keywords: "culture musique film cinema livre libraire concert festival dedicace album ",
//     }
// ]);

// // INIT Tweets
// const labeler = new textProcessing.Labeler(db.fetch(module.exports.themes_name));
// textProcessing.Parser.getTweetsJSONFromFile(path.join(__dirname, '/data/tweets/tweets_candidats_2.csv'), ts  => {
//     // let older_tweets = db.fetch(module.exports.tweets_name);
//     // if (older_tweets === null) older_tweets = [];
//     ts = labeler.labellingTweets(ts);//.concat(older_tweets);
//     db.set(module.exports.tweets_name, ts);
// });

module.exports.tweets_update = (file, onFinish) => {
    const labeler = new textProcessing.Labeler(db.fetch(module.exports.themes_name));
    textProcessing.Parser.getValuesFromCSVString(file, ts  => {
        // let older_tweets = db.fetch(module.exports.tweets_name);
        // if (older_tweets === null) older_tweets = [];
        ts = labeler.labellingTweets(ts);//.concat(older_tweets);
        db.set(module.exports.tweets_name, ts);
        onFinish();
    });
}

module.exports.candidats_update = (file, onFinish) => {
    textProcessing.Parser.getValuesFromCSVString(file, candidats  => {
        // let older_tweets = db.fetch(module.exports.tweets_name);
        // if (older_tweets === null) older_tweets = [];

        let date_string = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
        let older_followers = db.fetch(module.exports.candidat_followers_name);
        if (older_followers === null) older_followers = {};
        candidats.forEach((candidat) => {
            if (older_followers[candidat.id] === undefined) {
                older_followers[candidat.id] = {};
            }
            older_followers[candidat.id][date_string] = candidat.followers;
        });
        db.set(module.exports.candidat_followers_name, older_followers);
        db.set(module.exports.candidats_name, candidats);

        onFinish();
    });
}