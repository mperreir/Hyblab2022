'use-stric'

const fs = require('fs');
const csv = require('csv-parser');

const natural = require('natural');
const Trie = natural.Trie;
const classifier = new natural.BayesClassifier();
const TfIdf = natural.TfIdf;

const Readable = require('stream').Readable;

accentsTidy = function(s){
    let r = s.toLowerCase();
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    return r;
};

class Labeler {
    constructor(themes) {
        // réduit à la forme primitive les keyswords
        themes = themes.map(theme => {
            theme.keywords = natural.PorterStemmerFr.tokenizeAndStem(accentsTidy(theme.keywords));
            return theme;
        });

        this.themes = themes;
    }

    // labelling a tweet and return this tweet labeled
    labellingTweet(tweet) {
        tweet.data = natural.PorterStemmerFr.tokenizeAndStem(accentsTidy(tweet.text.replace('#', '')));
        const trie = new Trie();
        trie.addStrings(tweet.data);

        let themeScores = [];

        this.themes.forEach(theme => {
            let themeDistance = 0;
            theme.keywords.forEach(keyword => {
                themeDistance += trie.contains(keyword) ? 1 : 0;
            });
            themeScores.push(themeDistance);
        });

        // if((new Date()).isBetweenWeekBefore(new Date(parseInt(tweet.created_at)*1000)))
        //     console.log("ok");

        // pondération en fonction du nombre de keywords
        themeScores.map((value, index) => value / this.themes[index].keywords.length);

        let maxSCoreIndex = -1;
        themeScores.forEach((value, index) => {
            if (value > 0 && (maxSCoreIndex === -1 || maxSCoreIndex > themeScores[maxSCoreIndex])) {
                maxSCoreIndex = index;
            }
        });

        // if((new Date()).isBetweenWeekBefore(new Date(parseInt(tweet.created_at)*1000)))
        //     console.log("ok");




        if (maxSCoreIndex === -1) {
            tweet.theme_id = -1;
            tweet.themeScore = 0;
        } else {
            tweet.theme_id = this.themes[maxSCoreIndex].id;
            tweet.themeScore = themeScores[maxSCoreIndex];
        }

        // if (tweet.theme_id === 1)
        //     console.log("ok")
        // if (tweet.theme_id === 2)
        //     console.log("ok")
        // if (tweet.theme_id === 3)
        //     console.log("ok")
        // if (tweet.theme_id === 4)
        //     console.log("ok")
        // if (tweet.theme_id === 5)
        //     console.log("ok")
        // if (tweet.theme_id === 6)
        //     console.log("ok")

        delete tweet.data;
        return tweet;
    };

    // labbeling a list of tweets and return the labeled list of tweets
    labellingTweets(tweets) {
        // filtre les tweets trop petites
        tweets = tweets.filter(tweet => tweet.text.length > 70);

        tweets = tweets.map((tweet) => this.labellingTweet(tweet));
        tweets.sort((a, b) => b.themeScore - a.themeScore);
        return tweets;
    }
}

class Parser {
    // parse a file from path and call the callback with parsed tweets
    // exemple of path : "twitter-1/back/data/tweets/tweets_candidats.csv"
    static getTweetsJSONFromFile(path, callback) {
        let tweets = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on('data', function (data) {
                try {
                    tweets.push(data);
                } catch (err) {
                    //error handler
                    console.error(err);
                }
            })
            .on('end', function () {
                callback(tweets);
            });
    }

    static getValuesFromCSV(path, callback) {
        let values = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on('data', function (data) {
                try {
                    values.push(data);
                } catch (err) {
                    //error handler
                    console.error(err);
                }
            })
            .on('end', function () {
                callback(values);
            });
    }

    static getValuesFromCSVString(file, callback) {
        let values = [];

        Readable.from(file)
            .pipe(csv())
            .on('data', function (data) {
                try {
                    values.push(data);
                } catch (err) {
                    //error handler
                    console.error(err);
                }
            })
            .on('end', function () {
                callback(values);
            });
    }
}

module.exports.Labeler = Labeler;
module.exports.Parser = Parser;


/*
How to test the labeler :

const textProcessing = require('[PATH/TO]/textProcessing');

const labeler = new textProcessing.Labeler(textProcessing.themesTests);
let tweets;
textProcessing.Parser.getTweetsJSONFromFile("twitter-1/back/data/tweets/tweets_candidats.csv", (ts) => {
    tweets = ts;
    tweets = labeler.labellingTweets(tweets);
    console.log(tweets);
});

 */