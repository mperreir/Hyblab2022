/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Adame Naji
 */

const axios = require("axios");
const parser = require("./Parser");
const URL_DATA = "https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json";


function getData() {
    return new Promise((resolve, reject) => {
        axios.get(URL_DATA)
            .then(({ status, data }) => {
                if (status === 200) {
                    resolve(data)
                } else {
                    reject(new Error("HTTP Status not 200"))
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function dataController() {
    const data = await getData();
    return parser.parse(data);
}

dataController().then(res =>{
    console.log(res);
});


/*let current_date = new Date();
console.log(current_date);
let lastDataRetrieval = new Date('January 01, 1970 01:00:00');
console.log(lastDataRetrieval);*/
