const POLL = [
    [12, 45, 32],
    [45, 10, 20],
    [30, 20, 45],
    [20, 20, 20],
    [200, 210, 400],
    [700, 50, 70],
    [100, 200, 800],
    [500, 200, 100],
]

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
let CANDIDATS = []

function InitDesIntentions(intentionsCandidats) {
    const divRace = document.getElementById('race');
    CANDIDATS = intentionsCandidats;
    intentionsCandidats.map(candidat => {
        const divCandidat = document.createElement('div');
        divCandidat.setAttribute('style', 'margin-left:-75px;');
        divCandidat.className = 'candidat';
        divCandidat.setAttribute('data-name', candidat.name);

        const divName = document.createElement('div');
        divName.className = 'name';
        divName.innerText = candidat.name;

        const divBlock = document.createElement('div');
        divBlock.className = 'block';
        const img = document.createElement('img');
        img.src = document.getElementById(candidat.name).src;
        img.onerror = function(e) {
            e.target.src = 'img/candidats/profil_inconnu_cadre.svg'
        }
        const divPourcent = document.createElement('div');
        divPourcent.className = 'pourcent'
        divPourcent.innerText = "0 %"
        divBlock.appendChild(img);
        divBlock.appendChild(divPourcent);

        divCandidat.appendChild(divName);
        divCandidat.appendChild(divBlock);

        divRace.appendChild(divCandidat);

    });
}

function AjoutDesCandidats(candidats) {

    const CandidatSelection = document.body.querySelector("#CandidatSelection")

    for (const candidat of candidats) {

        const block = document.createElement("div")
        const avatar = document.createElement("img")

        block.className = "candidat"
        avatar.id = candidat.prenom + ' ' + candidat.nom
        avatar.src = "img/candidats/" + candidat.img + '.png'
        avatar.onerror = function(e) {
            e.target.src = 'img/candidats/profil_inconnu_cadre.svg'
        }

        // Ajout des blocks
        block.appendChild(avatar)
        block.appendChild(document.createTextNode(candidat.prenom))
        block.appendChild(document.createElement("br"))
        block.appendChild(document.createTextNode(candidat.nom))
        CandidatSelection.appendChild(block)

        // Event listener
        block.addEventListener("click", evt => {
            const bool = JSON.parse(evt.currentTarget.dataset.selected || "false")
            evt.currentTarget.setAttribute("data-selected", !bool)
        })

    }
}

function ToggleButton(button, img = [1, 2], callback = _ => {}) {
    let state = false
    button.addEventListener("click", _ => {
        state = !state
        button.innerHTML = `<img src="${img[state ? 1 : 0]}" />`
        callback(state)
    })
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

function start() {

    window.scrollTo(0, 1);

    const player = document.querySelector("lottie-player");
    player.load("anim/debut.json");
    player.addEventListener("ready", _ => {
        document.body.querySelector("#Introduction .loader").remove()
    })
    player.addEventListener("complete", _ => {
        window.scrollTo(0, 1);
        document.body.querySelector("#Introduction").className = "hide-introduction"
    })

    const NBR_JOUR = 100 // A changer dynamiquement
    const PIXEL_PAR_JOUR = 500
    const HAUTEUR_DE_LA_PAGE = 25000

    const blocks = document.body.querySelector("#blocks")
    const animation = document.body.querySelector("#animation")
    const race = document.body.querySelector("#race")

    const startTheRace = document.body.querySelector("button#startTheRace")

    const CandidatSelection = document.body.querySelector("#CandidatSelection")
    const ButtonShowCandidat = document.body.querySelector("#ShowCandidat")
    ToggleButton(ButtonShowCandidat, ["img/bouton_plus.svg", "img/bouton_moins.svg"], showed => {
        CandidatSelection.className = showed ? "body" : "hidden"
    })

    const CourseSelection = document.body.querySelector("#CourseSelection")
    const ButtonShowCourses = document.body.querySelector("#ShowCourses")
    ToggleButton(ButtonShowCourses, ["img/bouton_plus.svg", "img/bouton_moins.svg"], showed => {
        CourseSelection.className = showed ? "body" : "hidden"
    })


    const BtnCourse30 = document.getElementById("BtnCourse30")
    const BtnCourse15 = document.getElementById("BtnCourse15")
    const BtnCourse5 = document.getElementById("BtnCourse5")

    function changeSelection(evt) {

        BtnCourse30.className = ""
        BtnCourse15.className = ""
        BtnCourse5.className = ""

        evt.target.className = "selected"
    }

    BtnCourse30.addEventListener("click", changeSelection)
    BtnCourse15.addEventListener("click", changeSelection)
    BtnCourse5.addEventListener("click", changeSelection)

    const clientPatternHeight = document.getElementById('pattern').clientHeight;
    const background = GenereLaListeDesBackgrounds(Math.floor(HAUTEUR_DE_LA_PAGE / clientPatternHeight));

    for (let i = 0; i < background.length; i++) {
        const img = document.createElement("img")
        img.src = `./data/_AGR src/pattern/${background[i]}.svg`
        blocks.appendChild(img)
    }

    function setBeforeScrolling() {
        race.setAttribute("style", "position:absolute;top:0px")
    }

    function setWhileScrolling() {
        race.setAttribute("style", "position:fixed;top:0px")
    }

    function setAfterScrolling() {
        race.setAttribute("style", "position:absolute;bottom:0px")
    }

    function scrollToRace() {
        window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        })
    }


    const GetScrollDate = (index) => {
        let dateIn = new Date();
        dateIn.setHours(12);
        let date = new Date(dateIn.setDate(dateIn.getDate() - (NBR_JOUR - index)));

        let strDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return strDate;
    }

    INDEX_PREV = -1;

    function scrollPosition(scroll) {

        const rect = animation.getBoundingClientRect()
        const not_seeing_bottom = (rect.bottom - window.innerHeight) >= 0
        const y_to_top = rect.top + window.scrollY
        const hauteur = (scroll - y_to_top) + (window.innerHeight / 2)

        let indexJour = parseInt(hauteur / PIXEL_PAR_JOUR) + 1

        indexJour = indexJour <= 0 ? 0 : indexJour

        if (rect.top <= 0 && not_seeing_bottom) {
            setWhileScrolling()
        } else if (rect.top > 0 && not_seeing_bottom) {
            setBeforeScrolling()
        } else {
            setAfterScrolling()
        }
        if (INDEX_PREV != indexJour) {
            INDEX_PREV = indexJour
            const currDate = GetScrollDate(indexJour);

            if (indexJour > 0) {
                CANDIDATS.map(candidat => {
                    let index = candidat.x.indexOf(currDate);
                    if (index >= 0) {
                        const divPourcent = document.querySelector(`div[data-name='${candidat.name}'] div[class='pourcent']`);
                        divPourcent.innerText = parseFloat(candidat.y[index]).toFixed(1) + ' %';
                    }
                });
            }
        }
    }

    scrollPosition(0)

    startTheRace.addEventListener("click", _ => scrollToRace())
    document.addEventListener("scroll", _ => scrollPosition(window.scrollY))
}

window.addEventListener('load', _ => start())