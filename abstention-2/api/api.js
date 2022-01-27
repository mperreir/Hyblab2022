'use strict';

const app = require('express')();
const path = require('path');
const fs = require('fs');

// Sample endpoint that sends the partner's name
app.get('/city/:city', function (req, res) {
    const file = fs.readFileSync(path.join(__dirname, 'cities.json'));
    const cityData = JSON.parse(file)[req.params.city];
    res.status(cityData ? 200 : 400).json(cityData || { 'error': true, 'message': 'Unknown city.' });
});

// Export our API
module.exports = app;