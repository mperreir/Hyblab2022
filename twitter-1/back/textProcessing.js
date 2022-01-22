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

// réduit à la forme primitive les keys words
themes = themes.map(theme => {
    theme.keywords = natural.PorterStemmerFr.tokenizeAndStem(theme.keywords);
    return theme;
});

// récupère les tweets du fichier csv et ajoute un theme en fonction des keys words
const labellingTweets = function (callback) {
    let tweets = [];

    fs.createReadStream("twitter-1/back/data/tweets/tweets_candidats.csv")
        .pipe(csv())
        .on('data', function (data) {
            try {
                if (data.retweet !== "True" && tweets.length < 30000) {
                    tweets.push(data);
                }
            } catch (err) {
                //error handler
            }
        })
        .on('end', function () {
            tweets = tweets.map((tweet, tweet_index) => {
                // if (tweet_index % 10 === 0)
                //     console.log("tweet numéro : " + tweet_index);

                tweet.data = natural.PorterStemmerFr.tokenizeAndStem(tweet.tweet);
                let trie = new Trie();
                trie.addStrings(tweet.data);


                let themeScores = [];

                themes.forEach(theme => {
                    let themeDistance = 0;
                    theme.keywords.forEach(keyword => {
                        themeDistance += trie.contains(keyword) ? 1 : 0;
                    });
                    themeScores.push(themeDistance);
                });

                // pondération en fonction du nombre de keywords
                themeScores.map((value, index) => value/themes[index].keywords.length);

                let maxSCoreIndex = 0;
                themeScores.forEach((value, index) => {
                    if (value > themeScores[maxSCoreIndex]) {
                        maxSCoreIndex = index;
                    }
                });

                tweet.theme = themes[maxSCoreIndex];
                tweet.themeScore = themeScores[maxSCoreIndex];

                return tweet;
            });

            tweets.sort((a, b) => b.themeScore - a.themeScore);
            // tweets.forEach(tweet => console.log(tweet));
            callback(tweets);
        });
}

module.exports.labellingTweets = labellingTweets;