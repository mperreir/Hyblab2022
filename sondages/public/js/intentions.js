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

const COMPATIBLE_BACKGROUNDS = {
    2: [5, 6, 7],
    3: [4, 9],
    4: [3, 8],
    5: [3, 8],
    6: [2, 5, 7],
    7: [2, 5, 6],
    8: [2, 6, 7],
    9: [2, 6, 7],
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function GenereLaListeDesBackgrounds(nb_jours) {
    let background = []
    background.push('fond2');
    let backgroundBefore = 2;
    for (let i = 0; i < nb_jours - 2; i++) {
        if (i == nb_jours - 3) {
            if (backgroundBefore === 3) {
                background.push('fond9');
            } else if (backgroundBefore === 4 || backgroundBefore === 5) {
                background.push('fond8');
            } else {
                background.push('fond6');
            }
        } else {
            let index = getRandomInt(COMPATIBLE_BACKGROUNDS[backgroundBefore].length);
            let currBackground = COMPATIBLE_BACKGROUNDS[backgroundBefore][index];
            background.push('fond' + currBackground);
            backgroundBefore = currBackground;
        }
    }
    background.push('arrivee');
    return background;
}