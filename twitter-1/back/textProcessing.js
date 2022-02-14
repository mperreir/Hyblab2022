'use-stric'

const fs = require('fs');
const csv = require('csv-parser');

const natural = require('natural');
const Trie = natural.Trie;
const classifier = new natural.BayesClassifier();
const TfIdf = natural.TfIdf;

const Readable = require('stream').Readable;

/**
 * Simple accent remover
 * @param s
 * @returns {string} string without commun accents
 */
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
    /**
     * Init labeler with themes.
     * @param themes list of keywords string
     */
    constructor(themes) {
        // réduit à la forme primitive les keyswords
        themes = themes.map(theme => {
            theme.keywords = natural.PorterStemmerFr.tokenizeAndStem(accentsTidy(theme.keywords));
            return theme;
        });

        this.themes = themes;
    }

    /**
     * Labelling a tweet and return this tweet labeled.
     * Add:
     * - theme_id:
     *     if >= 0: the id of labeled theme.
     *     if == -1: no theme found for this tweet.
     * - themeScore:
     *     if > 0: the number of matching keywords.
     *     if = 0: no theme found for this tweet.
     *
     * @param tweet tweet to label
     * @returns {*}
     */
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

        // pondération en fonction du nombre de keywords
        themeScores.map((value, index) => value / this.themes[index].keywords.length);

        let maxSCoreIndex = -1;
        themeScores.forEach((value, index) => {
            if (value > 0 && (maxSCoreIndex === -1 || maxSCoreIndex > themeScores[maxSCoreIndex])) {
                maxSCoreIndex = index;
            }
        });

        if (maxSCoreIndex === -1) {
            tweet.theme_id = -1;
            tweet.themeScore = 0;
        } else {
            tweet.theme_id = this.themes[maxSCoreIndex].id;
            tweet.themeScore = themeScores[maxSCoreIndex];
        }

        delete tweet.data;
        return tweet;
    };

    /**
     * Labelling a list of tweets and return the labeled list of tweets.
     * Add on each tweets:
     * - theme_id:
     *     if >= 0: the id of labeled theme.
     *     if == -1: no theme found for this tweet.
     * - themeScore:
     *     if > 0: the number of matching keywords.
     *     if = 0: no theme found for this tweet.
     * @param tweets tweets to label
     * @returns labeled_tweets
     */
    labellingTweets(tweets) {
        // filtre les tweets trop petites
        tweets = tweets.filter(tweet => tweet.text.length > 70);

        tweets = tweets.map((tweet) => this.labellingTweet(tweet));
        tweets.sort((a, b) => b.themeScore - a.themeScore);
        return tweets;
    }
}

class Parser {
    /**
     * Parse a csv file from path and call the callback with parsed data
     * @param path
     * @param callback
     */
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

    /**
     * Parse a csv string from path and call the callback with parsed data
     * @param csv_string
     * @param callback
     */
    static getValuesFromCSVString(csv_string, callback) {
        let values = [];

        Readable.from(csv_string)
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
