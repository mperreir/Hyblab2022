'use strict';


/** Converts numeric degrees to radians */
if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
  }
  
  // start and end are objects with latitude and longitude
  //decimals (default 2) is number of decimals in the output
  //return is distance in kilometers. 
function getDistance(start, end, decimals) {
    decimals = decimals || 2;
    var earthRadius = 6371; // km
    var lat1 = parseFloat(start.latitude);
    var lat2 = parseFloat(end.latitude);
    var lon1 = parseFloat(start.longitude);
    var lon2 = parseFloat(end.longitude);
  
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
  
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};


let groupBy = function(xs, key1, key2) {
return xs.reduce(function(rv, x) {
    (rv[x[key1][key2]] = rv[x[key1][key2]] || []).push(x);
    return rv;
}, {});
};



const app = require( 'express' )();
const path = require('path');
const bureaux_vote = require('./data/bureauxVote.json');

const number_decimals = 10;

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );


//Route qui renvoie les bureaux de vote les plus proches à partir d'une latitude et une longitude
app.get('/bureaux_vote/:latitude/:longitude/', function(req, res){
    const latitude = decodeURIComponent(req.params.latitude);
    const longitude = decodeURIComponent(req.params.longitude);

    //Il y a environ 6100 bureaux de vote dont les coordonnées ne sont pas précisées dans le JSON (mais ne sont pas de vrais bureaux)
    let bureaux_vote_filtered = bureaux_vote.filter(bureau => bureau.fields.coordonnees != undefined);

    let length_list_bureaux = bureaux_vote_filtered.length;
    //On ajoute la distance à l'utilisateur pour chaque bureau
    for(var i = 0; i<length_list_bureaux; i++){
        bureaux_vote_filtered[i].fields['dist'] = getDistance({'latitude': latitude, 'longitude': longitude}, {'latitude': bureaux_vote_filtered[i].fields.coordonnees[0], 'longitude': bureaux_vote_filtered[i].fields.coordonnees[1]}, number_decimals);
    }

    //On trie les bureaux par ordre croissant de distance
    bureaux_vote_filtered.sort((bureau1, bureau2) => bureau1.fields.dist - bureau2.fields.dist);

    //On groupe les bureaux de vote par adresse commune
    bureaux_vote_filtered = groupBy(bureaux_vote_filtered, 'fields', 'adresse');

    let list_bureaux_grouped = Object.values(bureaux_vote_filtered);

    let top10_list_bureaux_grouped = [];
    for (i=0; i<10; i++) {
        top10_list_bureaux_grouped.push(list_bureaux_grouped[i]);
    }
    res.json(top10_list_bureaux_grouped);
});

// Export our API
module.exports = app;

