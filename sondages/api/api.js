'use strict';

const app = require( 'express' )();
const path = require('path');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

/*
A chaque appel dans la route /getData
Tu fais un appel a une fonction chargé de récupérer le fichier
Si il n'y a pas de fichier en cache, tu passes les données a la fonction parseData
Sinon, tu vérifies que la date a laquelle les données ont été récupéré est supérieur a 1 jours :
Si oui, Tu récupères les données en ligne -> parseData -> stocker dans le cache
Si non, tu renvois le cache*/

app.get('/getData', function ( req, res ) {
    
});

// Export our API
module.exports = app;



