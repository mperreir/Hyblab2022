'use strict';

const app = require( 'express' )();
const path = require('path');

const db = require(path.join(__dirname, "../back/db"));
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));
const {tweets_name} = require("../back/db");

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

app.get('/game/1/new_question', (req, res) => {
    let candidats = db.fetch(db.candidats_name);
    let candidat1;
    let candidat2;
    let tweet;
    let is_first_response_true = true;

    do {
        candidat1 = candidats.sort(() => 0.5 - Math.random())[0];
        candidat2 = candidats
            .filter(c => candidat1.id !== c.id)
            .sort(() => 0.5 - Math.random())[0];
        tweet = db.getTweetsSemaine()
            .filter(t => t.user_id === candidat1.id)
            .filter(t => t.retweet === "False")
            .sort((a, b) => b.likes_count - a.likes_count)
            .slice(0, 3)
            .sort(() => 0.5 - Math.random())[0];
    } while(tweet === undefined);

    if (Math.random() > 0.5) {
        const tmp = candidat1;
        candidat1 = candidat2;
        candidat2 = tmp;
        is_first_response_true = false;
    }

    let question = {
        text: tweet.tweet,
        possible_response_1: candidat1,
        possible_response_2: candidat2,
        is_response_1_true: is_first_response_true,
        true_response: candidat1,
        original_tweet: tweet,
    };

    res.json(question);
});

app.get('/theme/all', (req, res) => {
    let themes = db.fetch(db.themes_name);
    res.json(themes);
});

app.get('/tweets/tops/:theme_id', (req, res) => {
    let tweets = db.getTweetsSemaine()
        .filter(tweet => tweet.themeScore > 1
            && tweet.theme_id === parseInt(req.params.theme_id));
    tweets.sort((a, b) => b.likes_count - a.likes_count);
    res.json(tweets.slice(0, 10));
});




// const labeler = new textProcessing.Labeler(textProcessing.themesTests);
// let tweets;
// textProcessing.Parser.getTweetsJSONFromFile("twitter-1/back/data/tweets/tweets_candidats.csv", (ts) => {
//     tweets = ts;
//     tweets = labeler.labellingTweets(tweets);
//     console.log(tweets);
// });

// Export our API
module.exports = app;

