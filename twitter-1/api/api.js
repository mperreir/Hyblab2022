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

textProcessing.labellingTweets((callback) => console.log(callback));

// Export our API
module.exports = app;

