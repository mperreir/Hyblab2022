'use strict';

const app = require( 'express' )();
const path = require('path');

const textProcessing = require('../back/textProcessing');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// test of the labeler
const labeler = new textProcessing.Labeler(textProcessing.themesTests);
let tweets;
textProcessing.Parser.getTweetsJSONFromFile("twitter-1/back/data/tweets/tweets_candidats.csv", (ts) => {
    tweets = ts;
    tweets = labeler.labellingTweets(tweets);
    console.log(tweets);
});


// Export our API
module.exports = app;

