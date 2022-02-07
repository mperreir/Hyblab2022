'use strict';

const app = require('express')();
const path = require('path');
const fs = require('fs');

// Sample endpoint that sends the partner's name
app.get('/city/:city', function (req, res) {
    const file = fs.readFileSync(path.join(__dirname, 'data.json'));
    const cityData = JSON.parse(file)[req.params.city];
    res.status(cityData ? 200 : 400).json(cityData || { 'error': true, 'message': 'Unknown city.' });
});

app.get('/cities', function (req, res) {
    const file = fs.readFileSync(path.join(__dirname, 'cities_map.json'));
    const cityData = JSON.parse(file);
    res.status(cityData ? 200 : 400).json(cityData || { 'error': true, 'message': 'Error when reading file.' });
});

app.get('/metropole', function (req, res) {
    const file = fs.readFileSync(path.join(__dirname, 'metropole.json'));
    const franceData = JSON.parse(file);
    res.status(franceData ? 200 : 400).json(franceData || { 'error': true, 'message': 'Error when reading file.' });
});

// Export our API
module.exports = app;