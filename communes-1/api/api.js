'use strict';

const app = require('express')();
const path = require('path');
let data_chargement = require('./../dataInGame/chargement.js');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});

});

app.get('/dataElection', (req, res) => {
    let data_election = data_chargement.data_election;
    res.json({"data_election":data_election});
});

app.get('/dataVoisins', (req, res) => {
    let data_voisins = data_chargement.data_voisins;
    res.json({"data_voisins":data_voisins});
});

// Export our API
module.exports = app;

