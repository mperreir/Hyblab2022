'use strict';

const app = require( 'express' )();
const helper = require('./helper');
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

app.get('/carte', function(req, res) {
    let dataCarte = require('../public/data/geojson.json')
    res.json(dataCarte);
});

//Endpoint retournant 5 communes tirées aléatoirement selon leur orientation
app.get('/communes/:orientation', function(req, res) {
    let listesCommunes = []; //Liste des communes déterminées pour le jeu

    //remplissage des communes de Loire-Atlantique
    helper.fetchDataAsDict('libelleCommune','communes-2/public/data/communes.csv').then(data => {
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

app.get('/classement', function(req, res) {
    let linesClassement = [];

    helper.fetchDataAsDict('place','communes-2/public/data/classement.csv').then(data => {
        data.forEach(line => linesClassement.push(line));
        res.json(linesClassement);
    });
});

app.get('/lastClassement', function(req, res) {
    helper.fetchDataAsDict('place','communes-2/public/data/classement.csv').then(data => {
        res.json(data.get("10ème"));
    });
});

app.post('/newClassement', function(req, res) {
    helper.saveCSV(new Map(Object.entries(req.body)),'communes-2/public/data/classement.csv');
});

// Export our API
module.exports = app;

