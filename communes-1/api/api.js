'use strict';

const app = require('express')();
const path = require('path');
const chargemenet = require('./../dataInGame/chargement.js');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
});

app.get('/dataElection', (req, res) => {
	// générer une question et sa réponse
});

// Export our API
module.exports = app;

