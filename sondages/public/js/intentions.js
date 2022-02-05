/**
 * @name : intention.js
 * @description : Data and graphics recovery file
 * @author : Team Genesis
 */

'use strict';

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


/**
 * Calls the API function responsible for retrieving polls
 * @return {Promise<unknown>} A promise containing the NSPPoll polls
 */
function getPolls() {
    return new Promise((resolve, reject) => {
        fetch('./api/getData')
            .then(e => e.json())
            .then(candidates => {
                candidates.lastDate = new Date(candidates.lastDate);
                resolve(candidates);
            })
            .catch(err => reject(err));
    });
}


/**
 * Calls the API function responsible for retrieving election candidate
 * @return {Promise<unknown>} A promise containing the candidates
 */
function getCandidates() {
    return new Promise((resolve, reject) => {
        fetch('./api/getCandidate')
            .then(e => e.json())
            .then(candidates => resolve(candidates))
            .catch(err => reject(err));
    });
}


/**
 * Generates a random integer between 0 and max
 * @param max The upper bound of the random generation function
 * @return {number} The number generated
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Generates a random background list for the application
 * @param nbrOfDays The number of days to be displayed
 * @param pixelPerDay The size of each day in pixels
 * @return {number} The sum of the size of each pattern by the number of patterns
 */
function generateBackgroundList(nbrOfDays, pixelPerDay) {

    /* Recovery of the parent div */
    const divParent = document.getElementById('BACKGROUNDS');

    /* Retrieving the height of a pattern to calculate the height of the page */
    const clientPatternHeight = document.getElementById('PATTERN_EXAMPLE').clientHeight;
    const nbrPattern = Math.floor(nbrOfDays * pixelPerDay / clientPatternHeight);
    const background = [];

    background.push('fond2');
    let backgroundBefore = 2;

    for (let i = 0; i < nbrPattern - 2; i++) {
        if (i === nbrPattern - 3) {
            if (backgroundBefore === 3) {
                background.push('fond9');
            } else if (backgroundBefore === 4 || backgroundBefore === 5) {
                background.push('fond8');
            } else {
                background.push('fond6');
            }
        } else {
            const index = getRandomInt(COMPATIBLE_BACKGROUNDS[backgroundBefore].length);
            const currentBackground = COMPATIBLE_BACKGROUNDS[backgroundBefore][index];
            background.push('fond' + currentBackground);
            backgroundBefore = currentBackground;
        }
    }

    background.push('arrivee');

    for (let i = 0; i < background.length; i++) {
        const img = document.createElement('img');
        img.src = `./img/pattern/${background[i]}.svg`;
        divParent.appendChild(img);
    }
    return clientPatternHeight * nbrPattern;
}


/**
 * Allows you to modify the "race" div to define it as being before the start of the scroll
 */
function setBeforeScrolling() {
    document.getElementById('race').className = 'before-scrolling';
}


/**
 * Allows you to modify the "race" div to define it as being during scrolling
 */
function setWhileScrolling() {
    document.getElementById('race').className = 'while-scrolling';
}


/**
 * Allows you to modify the "race" div to define it as being after the scroll
 */
function setAfterScrolling() {
    document.getElementById('race').className = 'after-scrolling';
}


/**
 * Means that we are in the race
 */
function scrollToRace() {
    window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    });
}


/**
 * Allows to know the date of the scroll visible on the screen
 * @param index The index of the item on the screen
 * @param date_first First day of the race
 * @param nbr_jour Number of days of the race
 * @return {string} The date on the screen
 */
function getScrollDate(index, date_first, nbr_jour) {

    const dateIn = new Date(date_first);
    dateIn.setHours(12);
    let date = new Date(dateIn.setDate(dateIn.getDate() - (nbr_jour - index)));

    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}


/* CREDITS BUTTON EVENT LISTENER AND LOGIC */
const creditsButton = document.getElementById('creditsButton');
const fonctionnementButton = document.getElementById('fonctionnementButton');

const creditsPOPUP = document.getElementById('creditsPOPUP');
const fonctionnementPOPUP = document.getElementById('fonctionnementPOPUP');

creditsButton.addEventListener('click', _ => {
    if (creditsPOPUP.className === 'show') {
        creditsPOPUP.className = '';
    } else {
        fonctionnementPOPUP.className = '';
        creditsPOPUP.className = 'show';
    }
});

fonctionnementButton.addEventListener('click', _ => {
    if (fonctionnementPOPUP.className === 'show') {
        fonctionnementPOPUP.className = '';
    } else {
        fonctionnementPOPUP.className = 'show';
        creditsPOPUP.className = '';
    }
});