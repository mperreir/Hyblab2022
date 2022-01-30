
// doc : https://npm.io/package/sileco.db
const { Database } = require('sileco.db');
const fetch = require('node-fetch');

const path = require('path');
const db_sileco = new Database("twitter-1/back/db/database.json");
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));

// adapteur pour optimiser les accès disques
class DbAdapter {
    constructor(db) {
        this.db = db;
        this.data = db.fetchAllData();
    }

    fetch(data_name) {
        return this.data[data_name];
    }

    set(data_name, data) {
        this.db.set(data_name, data);
        this.data = this.db.fetchAllData();
    }
}

const db = new DbAdapter(db_sileco);

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
module.exports.config_name = "config";

module.exports.getTweetsSemaine = () => {
    return module.exports.getTweets()
        .filter(tweet => (new Date(parseInt(tweet.created_at) * 1000)).isSameWeek(new Date()));
}

module.exports.getTweets = () => {
    let candidats_id = module.exports.getCandidats().map(c => parseInt(c.id));
    return db.fetch(module.exports.tweets_name).filter((tweet) => candidats_id.includes(parseInt(tweet.user_id)));
}

module.exports.getCandidats = () => {
    return db.fetch(module.exports.candidats_name)
        .sort((a, b) => parseInt(b.followers) - parseInt(a.followers))
        .slice(0, 12);
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
//         keywords: "securite immigration police violence manifestation voleurs balle lachrymo arme defence drogue trafiquant",
//     },
//     {
//         id: 2,
//         name: "Sante",
//         keywords: "covid hopitaux vaccin lit cancer santé medecin malade sanitaire traitement médicament",
//     },
//     {
//         id: 3,
//         name: "Economie",
//         keywords: "economie salaire emplois relocalisation localisation entreprise startup start-up finaces argent budget euro bercy compte",
//     },
//     {
//         id: 4,
//         name: "Education",
//         keywords: "education ecole lycee universitee classe cours professeurs cantine cartable atsem pedagogie blanquer",
//     },
//     {
//         id: 5,
//         name: "Environnement",
//         keywords: "environnement durable vert pollution recyclage trie arbre nucléaire petrole énergie electricité ",
//     },
//     {
//         id: 6,
//         name: "Culture",
//         keywords: "culture musique film cinema livre libraire concert festival dedicace album auteur acteur musicien symphonique",
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
        db.set(module.exports.candidats_name, candidats);

        onFinish();
    });
}

module.exports.config_update = (config) => {
    db.set(module.exports.config_name, config);
}

module.exports.followers_update = (file, onFinish) => {
    textProcessing.Parser.getValuesFromCSVString(file, candidats_line  => {
        // let older_tweets = db.fetch(module.exports.tweets_name);
        // if (older_tweets === null) older_tweets = [];
        const candidats = {}
        db.fetch(module.exports.candidats_name)
            .forEach(candidat => candidats[candidat.username] = candidat.id);
        let followers = {}

        candidats_line.forEach((candidat_line => {
            const candidat_id = candidats[candidat_line.username];
            if(followers[candidat_id] === undefined)
                followers[candidat_id] = {};
            const date_line = new Date(candidat_line.date);
            followers[candidat_id][date_line.getFullYear() + "-" + (date_line.getMonth() + 1) + "-" + date_line.getDate()]
                = candidat_line.followers;
        }))


        // let date_string = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate();
        // let older_followers = db.fetch(module.exports.candidat_followers_name);
        // if (older_followers === null) older_followers = {};
        // candidats.forEach((candidat) => {
        //     if (older_followers[candidat.id] === undefined) {
        //         older_followers[candidat.id] = {};
        //     }
        //     older_followers[candidat.id][date_string] = candidat.followers;
        // });
        db.set(module.exports.candidat_followers_name, followers);
        // db.set(module.exports.candidats_name, candidats);

        onFinish();
    });
}

autoFetchData();

async function autoFetchData() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 60000));
        try {
            let config = db.fetch(module.exports.config_name);
            if (config === undefined) {
                config = {
                    fetch_delay_sec: 60*60*6,
                    url_fetch_candidats: "https://cdn-apps.letelegramme.fr/twitter/candidats_information.csv",
                    url_fetch_followers: "https://cdn-apps.letelegramme.fr/twitter/nb_followers_par_candidat_et_par_jour.csv",
                    url_fetch_tweets: "https://cdn-apps.letelegramme.fr/twitter/tweets_candidats.csv",
                }
            }

            const candidats_csv = await (await fetch(config.url_fetch_candidats)).text();
            module.exports.candidats_update(candidats_csv, async () => {
                const followers_csv = await (await fetch(config.url_fetch_followers)).text();
                module.exports.followers_update(followers_csv, async () => {
                    const tweets_csv = await (await fetch(config.url_fetch_tweets)).text();
                    module.exports.tweets_update(tweets_csv, () => {
                        console.log("Auto update db done !")
                    });
                });
            });

            await new Promise(resolve => setTimeout(resolve, parseInt(config.fetch_delay_sec)*1000));
        } catch (e) {
            console.error(e);
        }
    }
}