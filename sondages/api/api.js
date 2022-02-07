/**
 * @name : app.js
 * @description : create the two routes necessary for the application
 * @author : Team Genesis
 */

'use strict';

const app = require( 'express' )();
const DataRetrievalController = require('./controller/DataRetrievalController');

/* Definition of routes */
app.get('/getData', DataRetrievalController.sendDataToFront);

app.get('/getCandidate', DataRetrievalController.sendCandidatToFront);

/* Export our API */
module.exports = app;



