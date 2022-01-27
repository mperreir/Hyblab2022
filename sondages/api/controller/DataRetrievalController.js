export function getData() {
    return undefined;
}

/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Adame Naji
 */

const axios = require("axios");

const URL_DATA = "https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json";


class DataRetrievalController {
    /**
     * Calls the nsppolls git repository to retrieve survey information
     * @return {Promise<unknown>} A JSON object containing all the polls
     */
    getData() {
        return new Promise((resolve, reject) => {
            axios.get(URL_DATA)
                .then(({status, data}) => {
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

    /**
     * Data parsing function retrieved by the GetData function
     * @return {Promise<void>}
     */
    async dataParse() {
        /* Creation of lists containing the different types of data */
        let poll_list = [];
        let source_list = [];
        let round_list = [];

        /* Data retrieval */
        const data = await getData();
    }
}

module.exports = DataRetrievalController;