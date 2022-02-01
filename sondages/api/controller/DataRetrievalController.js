
/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */


const axios = require("axios");
const https = require("https");
const request = require('request');
const science = require("science");
const DateController = require('./DateController');

const URL_DATA = "https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json";

let cacheData;
const range = n => [...Array(n).keys()];


/**
 *
 * @param arr_x
 * @param arr_y
 * @return {*[][]}
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
 *
 * @return {Promise<unknown>}
 */
function getData() {
    return new Promise((resolve, reject) => {
        request(URL_DATA, (error, response, data) => {
            const result = {};
            data = JSON.parse(data);

            if (response.statusCode === 200) {
                for (const sondage of data) {
                    const tours = sondage.tours.filter(x => x.tour === "Premier tour");
                    if (tours.length !== 1) {
                        continue;
                    }

                    for (const candidat of tours[0].hypotheses.map(x => x.candidats).flat()) {
                        if (candidat.candidat) {
                            if (!result[candidat.candidat]) {
                                result[candidat.candidat] = {
                                    "x": [],
                                    "y": []
                                }
                            }
                            result[candidat.candidat]["y"].push(candidat.intentions);
                            result[candidat.candidat]["x"].push(sondage.fin_enquete);
                        }
                    }
                }
            }
            resolve(result)
        }).on("error", err => {
            reject(err);
        })
    })
}


/**
 *
 */
getData().then(data => {
    const points = Object.keys(data).map(candidat => {
        const [dx, dy] = moyenne(data[candidat]["x"], data[candidat]["y"]);

        /* */
        const days = DateController.getDaysBetween(new Date(dx[0] + 'T12:00:00'), new Date(dx[dx.length - 1] + 'T12:00:00'));

        /* */
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

        const result = [
            /* {
                 name: candidat,
                 mode: "markers",
                 type: "scatter",
                 color: "red",
                 ...data[candidat]
            } */
        ]

        let loess_generator = science.stats.loess();
        loess_generator.bandwidth(0.5);
        let loess_values = loess_generator(range(days.length), intentions);

        if (loess_values.length > 0) {
            result.push({
                name: "moyliss-" + candidat,
                type: "lines",
                x: days,
                y: loess_values
            })
        }

        return result;
    })
    cacheData = points;
    return points;
});

function sendDataToFront(req, res) {
    if (DateController.shouldWeUpdateData()) {
        getData()
            .then(res.status(201).json(cacheData))
            .catch(res.status(500).send());
    } else {
        res.status(201).json(cacheData);
    }
}

module.exports = sendDataToFront;
