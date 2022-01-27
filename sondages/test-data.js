const axios = require('axios');

const URL_DATA = "https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json"


function getData() {
    return new Promise((resolve, reject) => {
        axios.get(URL_DATA)
            .then(({ status, data }) => {
                if (status == 200) {
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

function count(arr) {
    const count = {};

    for (const element of arr) {
        if (count[element]) {
            count[element] += 1;
        } else {
            count[element] = 1;
        }
    }

    return count
}

async function main() {

    const data = await getData()

    console.log(Object.keys(data[0]));

    console.log(new Set(data.map(x => Object.keys(x)).flat()))

    console.log(count(data.map(x => x.population).flat()));
    console.log(count(data.map(x => x.rolling).flat()));
    console.log(count(data.map(x => x.nom_institut).flat()));
    console.log(count(data.map(x => (x.commanditaire||"").split(", ")).flat()));
    console.log(count(data.map(x => x.tours.map(x => x.tour)).flat()));

    console.log(count(data.map(x => x.tours[0].hypotheses.map(hypo => hypo.hypothese)).flat()))


    console.log(data[0])
    console.log(data[0].tours[0].hypotheses[0].candidats)

}

main()