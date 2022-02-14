
// doc : https://npm.io/package/sileco.db
const { Database } = require('sileco.db');
const fetch = require('node-fetch');

const path = require('path');
const db_sileco = new Database("twitter-1/back/db/database.json");
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));

const DB_KEY_TWEETS = "tweets";
const DB_KEY_CANDIDATS = "candidats";
const DB_KEY_THEMES = "themes";
const DB_KEY_FOLLOWERS = "candidat_followers";
const DB_KEY_CONFIG = "config";


/**
 * Adapter for db to limite db access on disque and speed up fetch data.
 */
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

// init db if no data
if (Object.keys(db.data).length === 0)
    initDb();

/**
 * Util fonction on date
 * https://weeknumber.com/how-to/javascript
 * Returns the ISO week of the date.
 * @returns {number}
 */
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

/**
 * Source: http://stackoverflow.com/questions/497790
 * Util set of fonctions on date.
 * @type {{compare: (function(*=, *=): number|number), convert: (function(*=): *|Date|number), inRange: (function(*=, *=, *=): boolean|number)}}
 */
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

/**
 * Return True if a date is in the same week from this.
 * @param date
 * @returns {boolean}
 */
Date.prototype.isSameWeek = function(date)
{
    return this.getFullYear() === date.getFullYear()
        && this.getWeek() === date.getWeek();
};

/**
 * Return True if a date is between now and in one floating week before from this.
 * @param date
 * @returns {number}
 */
Date.prototype.isBetweenWeekBefore = function(date)
{
    const semaine_flottante = new Date(this.getFullYear(), this.getMonth(), this.getDay() - 7);
    return Dates.inRange(date, semaine_flottante, this);
};

module.exports = db;
module.exports.tweets_name = DB_KEY_TWEETS;
module.exports.candidats_name = DB_KEY_CANDIDATS;
module.exports.themes_name = DB_KEY_THEMES;
module.exports.candidat_followers_name = DB_KEY_FOLLOWERS;
module.exports.config_name = DB_KEY_CONFIG;

/**
 * Fetch tweets and return only tweet from created between now and in one floating week before and from getTweets().
 * @returns {*}
 */
module.exports.getTweetsSemaine = () => {
    return module.exports.getTweets()
        .filter(tweet => (new Date()).isBetweenWeekBefore(new Date(parseInt(tweet.created_at) * 1000)));
}

/**
 * Fetch candidats from db and filter tweets to return only tweet witch come from getCandidats().
 * @returns tweets List of filtered tweets
 */
module.exports.getTweets = () => {
    let candidats_id = module.exports.getCandidats().map(c => parseInt(c.id));
    return db.fetch(DB_KEY_TWEETS).filter((tweet) => candidats_id.includes(parseInt(tweet.user_id)));
}

/**
 * Fetch candidats from db and filter to return only 12 candidats with the most followers
 * @returns candidats List of filtered candidats
 */
module.exports.getCandidats = () => {
    return db.fetch(DB_KEY_CANDIDATS)
        .sort((a, b) =>  b.followers - a.followers)
        .slice(0, 12);
}

/**
 * Update tweets from string with csv format
 * @param csv_string
 * @param onFinish callback function with no parameters when functions finished
 */
module.exports.tweets_update = (csv_string, onFinish) => {
    const labeler = new textProcessing.Labeler(db.fetch(DB_KEY_THEMES));
    textProcessing.Parser.getValuesFromCSVString(csv_string, ts  => {
        ts = labeler.labellingTweets(ts);
        db.set(DB_KEY_TWEETS, ts);
        onFinish();
    });
}

/**
 * Update candidats from string with csv format
 * @param csv_string
 * @param onFinish callback function with no parameters when functions finished
 */
module.exports.candidats_update = (csv_string, onFinish) => {
    csv_string = csv_string.replace('﻿', '');
    textProcessing.Parser.getValuesFromCSVString(csv_string, candidats  => {
        db.set(DB_KEY_CANDIDATS, candidats);
        onFinish();
    });
}

/**
 * Updates configurations
 *
 * Exemple config:
 *  {
 *      fetch_delay_sec: 3600,
 *      url_fetch_candidats: "https://cdn-apps.letelegramme.fr/twitter/candidats_information_filtre.csv",
 *      url_fetch_followers: "https://cdn-apps.letelegramme.fr/twitter/nb_followers_par_candidat_et_par_jour.csv",
 *      url_fetch_tweets: "https://cdn-apps.letelegramme.fr/twitter/tweets_candidats.csv",
 *  }
 *
 * @param config
 */
module.exports.config_update = (config) => {
    db.set(DB_KEY_CONFIG, config);
}


/**
 * Update followers numbers from string with csv format
 * @param csv_string
 * @param onFinish callback function with no parameters when functions finished
 */
module.exports.followers_update = (csv_string, onFinish) => {
    textProcessing.Parser.getValuesFromCSVString(csv_string, candidats_line  => {
        const candidats = {}
        db.fetch(DB_KEY_CANDIDATS)
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

        db.set(DB_KEY_FOLLOWERS, followers);

        onFinish();
    });
}

/**
 * Init the db with default data and fetch data
 * @returns {Promise<void>}
 */
async function initDb() {
    // INIT Themes
    db.set(DB_KEY_THEMES, [
        {
            id: 1,
            name: "Sécurité",
            keywords: "commissariat securite immigration police policiers paix violence manifestation voleurs balle lachrymo arme defence drogue trafiquant mort violence violente guerre",
        },
        {
            id: 2,
            name: "Sante",
            keywords: "passvacinal covid19 covid hopitaux vaccin lit cancer santé medecin malade sanitaire traitement médicament vaccination EHPAD",
        },
        {
            id: 3,
            name: "Economie",
            keywords: "retraite précarité syndiqué economie salaire emplois relocalisation localisation entreprise startup start-up finaces argent budget euro bercy compte métallurgie € essence cher taxe travail 40 45 35 pauvres chômeurs déficit subvention",
        },
        {
            id: 4,
            name: "Education",
            keywords: "enfant établissement élèves étudiants education ecole lycee universitee classe cours professeurs cantine cartable atsem pedagogie blanquer",
        },
        {
            id: 5,
            name: "Environnement",
            keywords: "énergétique énergie environnementaux environnement durable vert pollution recyclage trie arbre nucléaire petrole énergie electricité écologie",
        },
        {
            id: 6,
            name: "Culture",
            keywords: "music musique vaccances bal culture musique film cinema livre libraire concert festival dedicace album auteur acteur musicien symphonique LGBTQI+",
        }
    ]);

    await fetchData(false);
}

/**
 * Launch the auto fetch data
 * This need to be launch only maximum one time
 * @returns {Promise<void>}
 */
async function autoFetchData() {
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 60000));
        await fetchData(true);
    }
}

/**
 * Fetch new data from source with registered configuration in the db
 * @param wait_fetch_delay wait specific delay in seconds from config.fetch_delay_sec if True
 * @returns {Promise<void>}
 */
async function fetchData(wait_fetch_delay = true) {
    try {
        let config = db.fetch(DB_KEY_CONFIG);
        if (config === undefined) {
            config = {
                fetch_delay_sec: 3600,
                url_fetch_candidats: "https://cdn-apps.letelegramme.fr/twitter/candidats_information_filtre.csv",
                url_fetch_followers: "https://cdn-apps.letelegramme.fr/twitter/nb_followers_par_candidat_et_par_jour.csv",
                url_fetch_tweets: "https://cdn-apps.letelegramme.fr/twitter/tweets_candidats.csv",
            }
        }
        if (wait_fetch_delay)
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

autoFetchData();