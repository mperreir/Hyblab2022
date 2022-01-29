// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');

// Create our application
const app = express();

// Load and register our REST API
const api = require('./api/api');

// on met en place une authentification valide pour toute le site
const auth = require('./auth.js');
const passport = auth(app);

// l'api d'accès aux données sera disponible sous la route "/api"
app.use('/api', api(passport));

// https://stackoverflow.com/questions/34345297/checking-if-a-user-is-logged-in-with-passportjs-expressjs
app.post('/islogged', function(req, res) {
    console.log(req.isAuthenticated && req.isAuthenticated());
    if(req.isAuthenticated && req.isAuthenticated())
        res.status(200).json({success: true, user: req.user});
    else
        res.status(401).json({success: false});
});

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',
    require('connect-ensure-login').ensureLoggedIn("../login.html"),
    express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
