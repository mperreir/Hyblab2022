'use-stric'

const fs = require('fs');
const csv = require('csv-parser');

const natural = require('natural');
const Trie = natural.Trie;
const classifier = new natural.BayesClassifier();
const TfIdf = natural.TfIdf;

// themes de testes
let themes = [
    {
        name: "Defence",
        keywords: "immigration police violence manifestation voleures balle lachrymo arme defence",
    },
    {
        name: "Sante",
        keywords: "covid hopitaux vaccin lit cancer santé medecin",
    },
    {
        name: "Economie",
        keywords: "economie salaire emplois relocalisation localisation entreprise startup start-up",
    }
];

class Labeler {
    constructor(themes) {
        // réduit à la forme primitive les keyswords
        themes = themes.map(theme => {
            theme.keywords = natural.PorterStemmerFr.tokenizeAndStem(theme.keywords);
            return theme;
        });

        this.themes = themes;
    }

    // labelling a tweet and return this tweet labeled
    labellingTweet(tweet) {
        tweet.data = natural.PorterStemmerFr.tokenizeAndStem(tweet.tweet);
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

        let maxSCoreIndex = 0;
        themeScores.forEach((value, index) => {
            if (value > themeScores[maxSCoreIndex]) {
                maxSCoreIndex = index;
            }
        });

        tweet.theme = this.themes[maxSCoreIndex];
        tweet.themeScore = themeScores[maxSCoreIndex];

        return tweet;
    };

    // labbeling a list of tweets and return the labeled list of tweets
    labellingTweets(tweets) {
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
}

module.exports.Labeler = Labeler;
module.exports.Parser = Parser;
module.exports.themesTests = themes;


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