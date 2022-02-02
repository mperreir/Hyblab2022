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

function GenereLaListeDesBackgrounds(nbr_jour, pixel_par_jour) {

    // Récupation de la div parente
    const divParent = document.getElementById('BACKGROUNDS')

    // Récupération de la hauteur d'un pattern pour calculer l'hauteur de la page
    const clientPatternHeight = document.getElementById('PATTERN_EXAMPLE').clientHeight;

    const nbr_pattern = Math.floor(nbr_jour * pixel_par_jour / clientPatternHeight)

    const background = []

    background.push('fond2');

    let backgroundBefore = 2;

    for (let i = 0; i < nbr_pattern - 2; i++) {
        if (i == nbr_pattern - 3) {
            if (backgroundBefore === 3) {
                background.push('fond9');
            } else if (backgroundBefore === 4 || backgroundBefore === 5) {
                background.push('fond8');
            } else {
                background.push('fond6');
            }
        } else {
            const index = getRandomInt(COMPATIBLE_BACKGROUNDS[backgroundBefore].length);
            const currBackground = COMPATIBLE_BACKGROUNDS[backgroundBefore][index];
            background.push('fond' + currBackground);
            backgroundBefore = currBackground;
        }
    }

    background.push('arrivee');

    for (let i = 0; i < background.length; i++) {
        const img = document.createElement("img")
        img.src = `./img/pattern/${background[i]}.svg`
        divParent.appendChild(img)
    }

    return clientPatternHeight * nbr_pattern

}


function setBeforeScrolling() {
    document.getElementById('race').className = "before-scrolling"
}

function setWhileScrolling() {
    document.getElementById('race').className = "while-scrolling"
}

function setAfterScrolling() {
    document.getElementById('race').className = "after-scrolling"
}

function scrollToRace() {
    window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    })
}

function GetScrollDate(index, nbr_jour) {
    let dateIn = new Date();
    dateIn.setHours(12);
    let date = new Date(dateIn.setDate(dateIn.getDate() - (nbr_jour - index)));

    let strDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return strDate;
}