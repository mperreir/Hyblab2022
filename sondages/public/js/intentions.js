function getSondages() {
    return new Promise((resolve, reject) => {
        fetch('./api/getData')
            .then(e => e.json())
            .then(candidats => resolve(candidats))
            .catch(err => reject(err))
    })
}

function getCandidats() {
    return new Promise((resolve, reject) => {
        fetch('./api/getCandidate')
            .then(e => e.json())
            .then(candidats => resolve(candidats))
            .catch(err => reject(err))
    })
}