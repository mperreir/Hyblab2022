'use strict';

const app = require( 'express' )();
const path = require('path');
const helper = require('./helper');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );


app.get('/carte', function(req, res) {

    let dataCarte = require('../public/data/geojson.json')
    res.json(dataCarte);
});

//Endpoint retournant 5 communes tirées aléatoirement selon leur orientation
app.get('/communes/:orientation', function(req, res) {

    let listesCommunes = []; //Liste des communes déterminées pour le jeu

    //remplissage des communes de Loire-Atlantique
    helper.fetchDataAsDict('libelleCommune','communes-2/public/data/Communes.csv').then(data => {
        try {

            //Nouveau tableau contenant seulement les communes de l'orientation passé en paramètre
            const communesOrientation = []

            //Tri des communes selon l'orientation
            data.forEach(commune => {
                if(commune['orientation'] == req.params.orientation) {
                communesOrientation.push(commune)
                }
            })


            //Selection aléatoire des 5 communes
            let nombre_communes = 0;
            while(nombre_communes < 5) {
                let indice = Math.floor(Math.random()*(communesOrientation.length-1));
                //On évite les doublons
                if(!listesCommunes.includes(communesOrientation[indice])) {
                    listesCommunes.push(communesOrientation[indice]);
                    nombre_communes++;
                }

            }

            res.json(listesCommunes);


        } catch (error) {
            console.log(error)
        }


    })

});

app.get('/affirmations', function(req, res) {

    let affirmationsJson = require('../public/data/affirmations.json');

    let affirmations = affirmationsJson.affirmations;

    let listeAffirmations = [];

    console.log("hehe")
    //Selection aléatoire des 5 affirmations
    let nombre_affirmations = 0;
    console.log(affirmations)


    while(nombre_affirmations < 5) {
        let indice = Math.floor(Math.random()*(affirmations.length));

        //On évite les doublons
        if(!listeAffirmations.includes(affirmations[indice])) {
            listeAffirmations.push(affirmations[indice]);
            nombre_affirmations++;
        }


    }


    res.json(listeAffirmations);

});

// Export our API
module.exports = app;

