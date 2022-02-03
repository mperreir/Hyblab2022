
/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */

const request = require('request');
const science = require("science");
const DateController = require('./DateController');
const CandidatController = require('./CandidatController');

const URL_DATA = "https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json";

let cacheData;
let cacheCandidat;
let lastDateOfData = 0;


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

            data = JSON.parse(data);

            if (response.statusCode === 200) {

                const liste_des_candidats_raw = {}

                for (const sondage of data) {

                    // On garde que le premier tour
                    const tours = sondage.tours.filter(x => x.tour === "Premier tour")

                    if (tours.length !== 1) {
                        continue;
                    }

                    // Sinon on stocke les données du candidat
                    for (const candidat of tours[0].hypotheses.map(x => x.candidats).flat()) {
                        if (candidat.candidat) {
                            if (!liste_des_candidats_raw[candidat.candidat]) {
                                liste_des_candidats_raw[candidat.candidat] = {
                                    "x": [],
                                    "y": []
                                }
                            }
                            liste_des_candidats_raw[candidat.candidat]["y"].push(candidat.intentions);
                            liste_des_candidats_raw[candidat.candidat]["x"].push(sondage.fin_enquete);
                        }
                    }
                }

                cacheCandidat = CandidatController.listCandidat(Object.keys(liste_des_candidats_raw));

                const points = Object.keys(liste_des_candidats_raw).map(candidat => {

                    const [dx, dy] = moyenne(liste_des_candidats_raw[candidat]["x"], liste_des_candidats_raw[candidat]["y"]);

                    // Permet de récupérer la date du dernier sondage
                    const lastDateSondage = new Date(dx[dx.length - 1] + 'T12:00:00')
                    lastDateOfData = lastDateOfData < lastDateSondage ? lastDateSondage : lastDateOfData

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

                    let result_candidat = {}

                    if (loess_values.length > 0) {
                        result_candidat = {
                            ...result_candidat,
                            name: candidat,
                            x: days,
                            y: loess_values
                        };
                    }

                    return result_candidat;
                })

                cacheData = points;

                resolve(points)
            }

        }).on("error", err => {
            reject(err);
        })
    })
}


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

module.exports = { sendDataToFront, sendCandidatToFront };