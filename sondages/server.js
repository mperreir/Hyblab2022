/**
 * @name : server.js
 * @description : Initializing the server for polls project
 * @author : Team Genesis
 */

'use strict';

/* Load useful expressjs and nodejs objects / modules */
const express = require('express');
const path = require('path');

/* Creation of the app */
const app = express();

/* Load and register of the REST API */
const api = require('./api/api');
app.use('/api', api);

/* Minimum routing: serve static content from the html directory */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

module.exports = app;
