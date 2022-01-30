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



const app = require( 'express' )();
const path = require('path');
const bureaux_vote = require('./data/bureauxVote.json');

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

//
app.get('/bureaux_vote/:latitude/:longitude/', function(req, res){
    const latitude = decodeURIComponent(req.params.latitude);
    const longitude = decodeURIComponent(req.params.longitude);
    //let dist = getDistance({'latitude': latitude, 'longitude': longitude}, {'latitude': 48, 'longitude': 2});
    console.log(latitude);
    console.log(longitude);
    //Il y a environ 6100 bureaux de vote dont les coordonnées ne sont pas précisées dans le JSON (mais ne sont pas de vrais bureaux)
    console.log(bureaux_vote.length);
    let bureaux_vote_filtered = bureaux_vote.filter(bureau => bureau.fields.coordonnees != undefined);
    console.log(bureaux_vote_filtered.length);
    //bureaux_vote_filtered = bureaux_vote_filtered.filter(bureau => bureau != undefined);
    //console.log(bureaux_vote_filtered.length);

    for(var i = 0; i<bureaux_vote_filtered.length; i++){
        bureaux_vote_filtered[i].fields['dist'] = getDistance({'latitude': latitude, 'longitude': longitude}, {'latitude': bureaux_vote_filtered[i].fields.coordonnees[0], 'longitude': bureaux_vote_filtered[i].fields.coordonnees[1]});
    }
    bureaux_vote_filtered.sort((bureau1, bureau2) => bureau1.fields.dist - bureau2.fields.dist);
    res.json(bureaux_vote_filtered);
});

// Export our API
module.exports = app;

