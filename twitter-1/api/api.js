'use strict';

const app = require( 'express' )();
const path = require('path');

const db = require(path.join(__dirname, "../back/db"));
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

app.get('/game/1/new_question', (req, res) => {
    // TODO : get new question
    let question = {
        texte: "Vous pensez que pour elle-aussi #Véran va exiger une 3ème dose ? Cette jeune femme de 17 ans qui ne risquait rien du Covid n'aurait jamais dû être vaccinée dans un monde normal.  Elle paye de sa santé l'obsession vaccinale de ce Gouvernement. C'est une victime d'Emmanuel Macron.",
        possible_response: {
            id: 1,
            name: "N. Dupont-Aignan",
            url_image: "TODO",
        },
        is_response_true: true,
        true_response: {
            id: 1,
            name: "N. Dupont-Aignan",
            url_image: "TODO",
        },
        original_tweet: null,
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

