/**
 * @name : main.js
 * @description : Sets up the main elements of the application and starts the race
 * @author : Team Genesis
 */

'use strict';

let SELECTED_NAMES_CANDIDATES = [];

/**
 * Create HTML elements linked to a candidate with the voting intentions of that candidate
 * @param intentionsCandidates The list of candidates in the polls
 * @param objectCandidates The list of candidates with an associated colour
 * @return {{}} A candidate object linking each candidate to their sales intentions
 */
function InitOfIntentions(intentionsCandidates, objectCandidates) {
    const divRace = document.getElementById('race');
    const candidates = {};

    intentionsCandidates.forEach(candidate => {

        /* Creation of the candidate's name and surname tags and attributes */
        const divCandidate = document.createElement('div');
        divCandidate.className = 'candidat';

        const name = candidate.name.split(' ');
        const prenom = name.shift();
        const nom = name.join(' ');

        const divName = document.createElement('div');
        divName.className = 'name';
        divName.innerText = prenom;

        const divNom = document.createElement('div');
        divNom.className = 'nom';
        divNom.innerText = nom;

        divName.appendChild(divNom);

        /* Setting the colour and images of the candidates */
        const divBlock = document.createElement('div');
        const objCandidate = objectCandidates.filter(c => candidate.name === c.prenom + ' ' + c.nom)[0];
        divBlock.style.background = objCandidate.couleur;
        divBlock.className = 'block';
        const img = document.createElement('img');
        img.src = document.getElementById(candidate.name).src;
        img.onerror = function (e) {
            e.target.src = 'img/candidats/profil_inconnu_cadre.svg';
        }

        /* Setting the candidate's display percentage */
        const divPourcent = document.createElement('div');
        divPourcent.className = 'pourcent';
        divPourcent.innerText = "0%";

        /* Adding elements to the DOM */
        divBlock.appendChild(img);
        divBlock.appendChild(divPourcent);

        divCandidate.appendChild(divName);
        divCandidate.appendChild(divBlock);

        divRace.appendChild(divCandidate);

        candidates[candidate.name] = candidate;
        candidates[candidate.name].div = divCandidate;
    })
    return candidates;
}


/**
 * Resets the selection of race types to start the race again or change the settings
 */
function resetCoursesSelection() {
    document.getElementById('BtnCourse30').className = '';
    document.getElementById('BtnCourse15').className = '';
    document.getElementById('BtnCourse5').className = '';
}


/**
 * Resets the selection of race candidates to start the race again or change the settings
 */
function resetCandidatSelection() {
    document.querySelectorAll('#CandidatSelection .candidat').forEach(elem => {
        elem.setAttribute('data-selected', 'false');
    });
}


/**
 * Adding candidates and their selection function
 * @param candidates The list of candidates in the polls
 */
function addingCandidatesForSelection(candidates) {
    const candidateSelection = document.getElementById('CandidatSelection');

    for (const candidate of candidates) {
        const block = document.createElement('div');
        const avatar = document.createElement('img');

        block.className = 'candidat';
        avatar.id = candidate.prenom + ' ' + candidate.nom;
        avatar.src = 'img/candidats/' + candidate.img + '.png';
        avatar.onerror = function (e) {
            e.target.src = 'img/candidats/profil_inconnu_cadre.svg';
        }

        /* Adding blocks to the DOM */
        block.appendChild(avatar);
        block.appendChild(document.createTextNode(candidate.prenom));
        block.appendChild(document.createElement('br'));
        block.appendChild(document.createTextNode(candidate.nom));
        candidateSelection.appendChild(block);

        /* Event listener for candidate selection */
        block.addEventListener('click', evt => {
            const bool = JSON.parse(evt.currentTarget.dataset.selected || 'false');
            evt.currentTarget.setAttribute('data-selected', !bool);

            resetCoursesSelection();

            if (!bool) {
                SELECTED_NAMES_CANDIDATES.push(evt.currentTarget.querySelector('img').id);
            } else {
                SELECTED_NAMES_CANDIDATES = SELECTED_NAMES_CANDIDATES.filter(c => c !== evt.currentTarget.querySelector('img').id);
            }
        });
    }
}


/**
 * Function managing the + and - buttons of the selection menus
 * @param button The button we are working on
 * @param img A table containing the two possible images for the button
 * @param defaultState The default state of the button
 * @param callback The function executed after the update of the button
 */
function toggleButton(button, img = [1, 2], defaultState = false, callback = _ => {
}) {
    let state = defaultState;
    button.addEventListener('click', _ => {
        state = !state;
        button.innerHTML = `<img src="${img[state ? 1 : 0]}"  alt=""/>`;
        callback(state);
    })
}


/**
 * Function calling for the launch of the application
 */
function start() {
    /* Retrieving and launching the introductory video */
    const video = document.querySelector("video");
    const startVideo = _ => {
        document.body.querySelector("#Introduction .loader").remove();
        video.play().then();
    }

    if (video.readyState === 4) {
        startVideo();
    } else {
        video.addEventListener('canplaythrough', startVideo);
    }

    video.addEventListener('ended', _ => {
        window.scrollTo(0, 1);
        document.body.querySelector("#Introduction").className = 'hide-introduction';
    })

    const animation = document.getElementById('animation');

    const timeInfoProgress = document.body.querySelector("#TimeInfo .progress");
    const timeInfoDate = document.body.querySelector("#TimeInfo .date");
    
    const startTheRace = document.getElementById('startTheRace');
    const restartTheRace = document.getElementById('restartTheRace');


    /* Top menu for candidate or race type choices */
    const candidatSelection = document.getElementById('CandidatSelection');
    const buttonShowCandidat = document.getElementById('ShowCandidat');
    toggleButton(buttonShowCandidat, ['img/bouton_plus.svg', 'img/bouton_moins.svg'], false, showed => {
        candidatSelection.className = showed ? 'body' : 'hidden';
    });

    const courseSelection = document.getElementById('CourseSelection');
    const buttonShowCourses = document.getElementById('ShowCourses');
    toggleButton(buttonShowCourses, ['img/bouton_plus.svg', 'img/bouton_moins.svg'], true, showed => {
        courseSelection.className = showed ? 'body' : 'hidden';
    });


    /* Choice of race types */
    const btnCourse30 = document.getElementById('BtnCourse30');
    const btnCourse15 = document.getElementById('BtnCourse15');
    const btnCourse5 = document.getElementById('BtnCourse5');

    let POURCENT_BORNE_MIN = 15;
    let POURCENT_BORNE_MAX = 30;

    btnCourse30.addEventListener('click', evt => {
        resetCandidatSelection();
        if (evt.target.className !== 'selected') {
            btnCourse15.className = '';
            btnCourse5.className = '';
            evt.target.className = 'selected';
            POURCENT_BORNE_MIN = 15;
            POURCENT_BORNE_MAX = 30;
        } else {
            evt.target.className = '';
        }
    });

    btnCourse15.addEventListener('click', evt => {
        resetCandidatSelection();
        if (evt.target.className !== 'selected') {
            btnCourse30.className = '';
            btnCourse5.className = '';
            evt.target.className = 'selected';
            POURCENT_BORNE_MIN = 5;
            POURCENT_BORNE_MAX = 15;
        } else {
            evt.target.className = '';
        }
    });

    btnCourse5.addEventListener('click', evt => {
        resetCandidatSelection();
        if (evt.target.className !== 'selected') {
            btnCourse30.className = '';
            btnCourse15.className = '';
            evt.target.className = 'selected';
            POURCENT_BORNE_MIN = 0;
            POURCENT_BORNE_MAX = 5;
        } else {
            evt.target.className = '';
        }
    });

    let RACE_SELECTION = () => btnCourse5.className === 'selected' || btnCourse15.className === 'selected' || btnCourse30.className === 'selected';


    /* Loading data */
    getCandidates().then(candidates => {

        console.info('Candidats chargés !');
        addingCandidatesForSelection(candidates);

        getPolls().then(({sondages, lastDate}) => {
            /* Update the date of the last poll to avoid having a finish line with no voting intentions because there was no poll */
            const divLastPoll = document.getElementById('LastPoll');
            const pLastPoll = divLastPoll.querySelectorAll('p')[1];
            const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            pLastPoll.innerText += ' ' + lastDate.toLocaleDateString('fr-FR', options);

            console.info('Données de sondage chargés !');
            const CANDIDATES = InitOfIntentions(sondages, candidates);
            const CANDIDATES_KEYS = Object.keys(CANDIDATES);

            /* Calculation of the page height */
            const NBR_DAYS = 360; /* We show 360 days of racing */
            const PIXEL_PER_DAY = 50; /* 50 pixels high per day */
            const PADDING_FOR_LAST_DAY = 20; /* Days skipped at the beginning to make room for the end */

            const divCandidate = CANDIDATES['Philippe Poutou'];
            const SIZE_DIV_CANDIDATE = divCandidate.div.clientHeight;


            generateBackgroundList(NBR_DAYS, PIXEL_PER_DAY);

            let INDEX_PREV = -1;


            function scrollPosition() {
                /* The position of the #animation block in relation to the screen is retrieved */
                const animation_rect = animation.getBoundingClientRect();

                /* To stick the #race div on the screen */
                const not_seeing_bottom = (animation_rect.bottom - window.innerHeight) >= 0;

                /* Recovery of the index of the day according to the scroll + the size of the window */
                const height = -animation_rect.top + (window.innerHeight);
                let indexDay = Math.ceil(height / PIXEL_PER_DAY) + PADDING_FOR_LAST_DAY;

                /* We make sure that the index of the day is between the bound 0 and the maximum number of days */
                indexDay = indexDay <= 0 ? 0 : (indexDay > NBR_DAYS ? NBR_DAYS : indexDay);

                /* Allows to stick the #race div on the screen */
                if (animation_rect.top <= 0 && not_seeing_bottom) {
                    setWhileScrolling();
                } else if (animation_rect.top > 0 && not_seeing_bottom) {
                    setBeforeScrolling();
                } else {
                    setAfterScrolling();
                }

                /* We update the display if we change day #PerformanceOpti */
                if (indexDay > 0 && INDEX_PREV !== indexDay) {
                    INDEX_PREV = indexDay;

                    /* Recovery of the day according to the scroll */
                    const currentDate = getScrollDate(indexDay, lastDate, NBR_DAYS);

                    /* We update the progress bar */
                    timeInfoProgress.style.width = (indexDay / NBR_DAYS * 100) + '%';

                    /* We change the current date */
                    timeInfoDate.innerHTML = new Date(currentDate).toLocaleDateString('fr');


                    /* Height of the rule according to the customer display */
                    const heightRule = document.querySelector("#race .regle").clientHeight;

                    let min_pourcent = 100;
                    let max_pourcent = 0;

                    let keys_selected_candidats;
                    if (RACE_SELECTION()) {
                        keys_selected_candidats = CANDIDATES_KEYS;
                    } else {
                        /* display only selected candidates */
                        keys_selected_candidats = SELECTED_NAMES_CANDIDATES;
                    }

                    keys_selected_candidats.map(nom_candidat => {
                        const index = CANDIDATES[nom_candidat].x.indexOf(currentDate);
                        let pourcent = 0;

                        if (index >= 0) {
                            pourcent = parseFloat(CANDIDATES[nom_candidat].y[index]);
                        }

                        let pourcent_min = Math.floor(pourcent);
                        let pourcent_max = Math.ceil(pourcent);

                        /* Only candidates within the bounds are taken into account */
                        if ((!RACE_SELECTION()) || (RACE_SELECTION() && Math.floor(pourcent) > POURCENT_BORNE_MIN && pourcent <= POURCENT_BORNE_MAX)) {
                            if (pourcent_max > max_pourcent) {
                                max_pourcent = pourcent_max;
                            }
                            if (pourcent_min < min_pourcent) {
                                min_pourcent = pourcent_min;
                            }
                        }
                    })

                    min_pourcent = min_pourcent === 100 ? 0 : min_pourcent;
                    max_pourcent = max_pourcent === 0 ? 100 : max_pourcent;

                    /* Processing data on a dynamic scale */

                    /*
                    Rounding up to the nearest 10
                    -> minimum marker
                     */
                    const min_rule = Math.floor(min_pourcent / 5) * 5;
                    const divBottomRule = document.getElementById('RegleBas');
                    divBottomRule.innerText = min_rule + '%';

                    /*
                    Rounding down to the nearest ten
                    -> maximum marker
                    */
                    const max_rule = Math.ceil(max_pourcent / 5) * 5;
                    const divTopRule = document.getElementById('RegleHaut');
                    divTopRule.innerText = max_rule + '%';

                    //* Change of candidate's position */
                    CANDIDATES_KEYS.map(nom_candidat => {
                        const index = CANDIDATES[nom_candidat].x.indexOf(currentDate);

                        let pourcent = 0;

                        if (index >= 0) {
                            pourcent = parseFloat(CANDIDATES[nom_candidat].y[index]).toFixed(1);
                        }

                        const position = (pourcent - min_rule) / (max_rule - min_rule) * heightRule;

                        /* Candidates are treated differently if they are in the selected range */
                        if ((!RACE_SELECTION() && keys_selected_candidats.includes(nom_candidat)) || (RACE_SELECTION() && Math.floor(pourcent) > POURCENT_BORNE_MIN && pourcent <= POURCENT_BORNE_MAX)) {
                            CANDIDATES[nom_candidat].div.style.top = 'calc( 12.5vh + ' + (position - SIZE_DIV_CANDIDATE / 2) + "px" + " ) ";
                        } else {
                            if (RACE_SELECTION() && pourcent >= POURCENT_BORNE_MAX) {
                                CANDIDATES[nom_candidat].div.style.top = '100vh';
                            } else {
                                CANDIDATES[nom_candidat].div.style.top = '-100vh';
                            }
                        }

                        CANDIDATES[nom_candidat].div.querySelector(".pourcent").innerText = pourcent + ' %';
                    })
                }
            }

            /* Initialize everything to 0 */
            scrollPosition();

            /* Add the necessary listener vents */
            startTheRace.addEventListener('click', scrollToRace);
            document.addEventListener('scroll', scrollPosition);
            restartTheRace.addEventListener('click', _ => {
                window.scrollTo({
                    top: 1,
                    left: 0,
                    behavior: 'smooth'
                });
            });
        });
    });
}

window.addEventListener('load', _ => start());
