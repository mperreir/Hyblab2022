
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


// Source: http://stackoverflow.com/questions/497790
const Dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year,d.month,d.date) :
                                NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
                (a>b)-(a<b) :
                NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
}


Date.prototype.isSameWeek = function(date)
{
    return this.getFullYear() === date.getFullYear()
        && this.getWeek() === date.getWeek();
};

Date.prototype.isBetweenWeekBefore = function(date)
{
    // return this.getFullYear() === date.getFullYear()
    //     && this.getWeek() === date.getWeek();
    const semaine_flottante = new Date(this.getFullYear(), this.getMonth(), this.getDay() - 7);
    return Dates.inRange(date, semaine_flottante, this);
};

module.exports = db;
module.exports.tweets_name = "tweets";
module.exports.candidats_name = "candidats";
module.exports.themes_name = "themes";
module.exports.candidat_followers_name = "candidat_followers";
module.exports.config_name = "config";

module.exports.getTweetsSemaine = () => {
    return module.exports.getTweets()
        .filter(tweet => (new Date()).isBetweenWeekBefore(new Date(parseInt(tweet.created_at) * 1000)));
}

module.exports.getTweets = () => {
    let candidats_id = module.exports.getCandidats().map(c => parseInt(c.id));
    return db.fetch(module.exports.tweets_name).filter((tweet) => candidats_id.includes(parseInt(tweet.user_id)));
}

module.exports.getCandidats = () => {
    const followers = db.fetch(module.exports.candidat_followers_name);
    // const followers_date = followers.map(candidat =>
    //     Object.entries(candidat)
    //     .map(([key, value]) => {new Date(key)})
    //     .sort((date1, date2) => date1 - date2));

    return db.fetch(module.exports.candidats_name)
        .sort((a, b) => {
            // const b_followers_date = followers_date[b.id];
            // const a_followers_date = followers_date[a.id]

            return b.followers - a.followers;

            // return parseInt(b_followers ? b_followers[b_followers.length - 1] : b.followers)
            // - parseInt(a_followers ? a_followers[a_followers.length - 1] : a.followers);
        })
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
    file = file.replace('﻿', '');
    textProcessing.Parser.getValuesFromCSVString(file, candidats  => {

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
                    url_fetch_candidats: "https://cdn-apps.letelegramme.fr/twitter/candidats_information_filtre.csv",
                    url_fetch_followers: "https://cdn-apps.letelegramme.fr/twitter/nb_followers_par_candidat_et_par_jour.csv",
                    url_fetch_tweets: "https://cdn-apps.letelegramme.fr/twitter/tweets_candidats.csv",
                }
            }
            await new Promise(resolve => setTimeout(resolve, parseInt(config.fetch_delay_sec)*1000));

            try {
                const candidats_csv = await (await fetch(config.url_fetch_candidats)).text();
                module.exports.candidats_update(candidats_csv, async () => {
                    console.log("Auto update db candidat done !");
                });
            }catch (e) {}

            try {
                const followers_csv = await (await fetch(config.url_fetch_followers)).text();
                module.exports.followers_update(followers_csv, async () => {
                    console.log("Auto update db followers done !");
                });
            }catch (e) {}

            try {
                const tweets_csv = await (await fetch(config.url_fetch_tweets)).text();
                module.exports.tweets_update(tweets_csv, () => {
                    console.log("Auto update db tweets done !");
                });
            }catch (e) {}





        } catch (e) {
            console.error(e);
        }

    }
}