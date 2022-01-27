/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Adame Naji
 */

const axios = require("axios");

const Poll = require("../model/Poll");
const Source = require("../model/Source");
const Round = require("../model/Round");
const Hypothesis = require("../model/Hypothesis");

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

        /* Flow of all retrieved information */
        data.forEach(poll => {
            /* */
            let current_source = new Source(poll.nom_institut, poll.debut_enquete, poll.fin_enquete, poll.commanditaire, poll.lien);

            /* */
            let hypotheses_first_round = new Hypothesis()
            let first_round = new Round(poll.tours[0]);

            let second_round = new Round(poll.tours[1]);

            /* */
            let current_poll = new Poll(poll.echantillon, poll.population, current_source, null);

        })
    }
}