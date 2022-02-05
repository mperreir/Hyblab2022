/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */

'use strict'


const request = require('request');
const science = require('science');
const DateController = require('./DateController');
const CandidatController = require('./CandidatController');

const URL_DATA = 'https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json';

let cacheData; /* Processed polling data for each candidate */
let cacheCandidat; /* The candidates present in the first round, some of them with a colour corresponding to that of their party */
let lastDateOfData = 0; /* The date of the last survey (set to 0 to start the server correctly) */


const range = n => [...Array(n).keys()];


/**
 * Function calculating the average between the results of two polls for a candidate
 * @param arr_x Poll n°1
 * @param arr_y Poll n°2
 * @return {*[][]} An array containing the average and the list of items used for this average
 */
function moyenne(arr_x, arr_y) {
    const count = {};
    const data_y = [];
    const data_x = [];

    for (const index in arr_y) {
        if (!count[arr_x[index]]) {
            count[arr_x[index]] = [];
        }
        count[arr_x[index]].push(arr_y[index]);
    }

    for (const element of [...new Set(arr_x)].sort()) {
        const sum = count[element].reduce((x, r) => x + r, 0);
        data_y.push(sum / count[element].length);
        data_x.push(element);
    }
    return [data_x, data_y];
}


/**
 * Data collection and processing function
 * @return {Promise<unknown>} A promise with points to show the race for each candidate
 */
function getData() {
    return new Promise((resolve, reject) => {
        request(URL_DATA, (error, response, data) => {
            data = JSON.parse(data);

            if (response.statusCode === 200) {
                const listOfCandidatesRow = {};

                for (const poll of data) {
                    /* We keep only the first round */
                    const tours = poll.tours.filter(x => x.tour === 'Premier tour');

                    if (tours.length !== 1) {
                        continue;
                    }

                    /* All candidate data is stored */
                    for (const candidate of tours[0].hypotheses.map(x => x.candidats).flat()) {
                        if (candidate.candidat) {
                            if (!listOfCandidatesRow[candidate.candidat]) {
                                listOfCandidatesRow[candidate.candidat] = {
                                    'x': [],
                                    'y': []
                                };
                            }
                            listOfCandidatesRow[candidate.candidat]['y'].push(candidate.intentions);
                            listOfCandidatesRow[candidate.candidat]['x'].push(poll.fin_enquete);
                        }
                    }
                }

                cacheCandidat = CandidatController.listCandidat(Object.keys(listOfCandidatesRow));
                const points = Object.keys(listOfCandidatesRow).map(candidat => {
                    const [dx, dy] = moyenne(listOfCandidatesRow[candidat]['x'], listOfCandidatesRow[candidat]['y']);

                    /* Retrieves the date of the last poll */
                    const lastDateSondage = new Date(dx[dx.length - 1] + 'T12:00:00');
                    lastDateOfData = lastDateOfData < lastDateSondage ? lastDateSondage : lastDateOfData;

                    const days = DateController.getDaysBetween(new Date(dx[0] + 'T12:00:00'), lastDateSondage);

                    let intentions = [];
                    let currDateIndex = -1;
                    let changes = [];

                    for (let i = 0; i < days.length; i++) {
                        if (i === 0 || (currDateIndex < dx.length - 1 && days[i] === dx[currDateIndex + 1])) {
                            currDateIndex++;
                            changes.push(i);
                        }
                        intentions.push(dy[currDateIndex]);
                    }

                    let currChange = 0;

                    for (let j = 0; j < days.length - 1; j++) {
                        if (j === changes[currChange + 1]) {
                            currChange++;
                        }
                        if (j !== changes[currChange]) {
                            intentions[j] = (intentions[changes[currChange + 1]] - intentions[changes[currChange]]) / (changes[currChange + 1] - changes[currChange]) * (j - changes[currChange]) + intentions[changes[currChange + 1]];
                        }
                    }

                    let loess_generator = science.stats.loess();
                    loess_generator.bandwidth(0.5);
                    let loess_values = loess_generator(range(days.length), intentions);

                    let result_candidate = {};

                    if (loess_values.length > 0) {
                        result_candidate = {
                            ...result_candidate,
                            name: candidat,
                            x: days,
                            y: loess_values
                        };
                    }
                    return result_candidate;
                });
                cacheData = points;
                resolve(points);
            }
        }).on('error', err => {
            reject(err);
        })
    })
}


/**
 * Sends the processed data to the client-side application
 * @param req The request sent to the server by the client
 * @param res The response request
 * @return {Promise<void>}
 */
async function sendDataToFront(req, res) {
    if (DateController.shouldWeUpdateData()) {
        try {
            await getData()
        } catch (err) {
            console.error(err)
        }
    }
    res.status(201).json({ sondages: cacheData, lastDate: lastDateOfData });
}


/**
 * Sends the candidates and their colours to the client-side application
 * @param req The request sent to the server by the client
 * @param res The response request
 * @return {Promise<void>}
 */
async function sendCandidatToFront(req, res) {
    if (CandidatController.shouldWeUpdateData()) {
        try {
            await getData()
        } catch (err) {
            console.error(err)
        }
    }
    res.status(201).json(cacheCandidat);
}

/* We export the necessary functions to the API */
module.exports = { sendDataToFront, sendCandidatToFront };
