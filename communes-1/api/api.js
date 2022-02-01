'use strict';

const app = require('express')();
const path = require('path');
let data_election = require('./../dataInGame/chargement.js');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});

});

app.get('/dataElection', (req, res) => {
    data_election = data_election.data_election
    console.log(data_election)
    res.json({"data_election":data_election});
});

// Export our API
module.exports = app;

