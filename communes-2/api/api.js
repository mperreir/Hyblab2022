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

app.get('/distance/:ville1/:ville2', function(req, res) {

    try {
        let ville1 = req.params.ville1;
        let ville2 = req.params.ville2;
    
        // peut etre appel à l'API ?
        let dataCarte = require('../public/data/geojson.json')
    
        let coord1 = dataCarte['features'].filter(function(feature) {
            return feature['properties']['nom'] == ville1;
        })[0]['geometry']['coordinates'][0][0];
    
        let coord2 = dataCarte['features'].filter(function(feature) {
            return feature['properties']['nom'] == ville2;
        })[0]['geometry']['coordinates'][0][0];
    
        res.json(helper.calculateDistance(coord1, coord2));
    } catch(error) {
        console.log(error);
    }

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
            listesCommunes =  helper.remplirTableau(listesCommunes, communesOrientation, 5);

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
    listeAffirmations = helper.remplirTableau(listeAffirmations, affirmations['politique'], 3);
    listeAffirmations = helper.remplirTableau(listeAffirmations, affirmations['non-politique'], 2);

    console.log(listeAffirmations);
    res.json(listeAffirmations);
});

app.get('/indice', function(req, res) {
    let affirmationsJson = require('../public/data/affirmations.json');
    let indices = affirmationsJson.indice;

    let index = Math.floor(Math.random()*(indices.length));
    console.log(index);
    let indice = indices[index];
    console.log(indice);

    res.json(indice);
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

