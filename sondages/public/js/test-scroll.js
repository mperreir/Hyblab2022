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

function AjoutDesCandidats(candidats) {
    
    const CandidatSelection = document.body.querySelector("#CandidatSelection")

    for (const candidat of candidats) {

        const block = document.createElement("div")
        const avatar = document.createElement("img")

        block.className = "candidat"
        avatar.src = "img/candidats/" + candidat.img

        // Ajout des blocks
        block.appendChild(avatar)
        block.appendChild(document.createTextNode(candidat.nom))
        CandidatSelection.appendChild(block)

        // Event listener
        block.addEventListener("click", evt => {
            const bool = JSON.parse(evt.currentTarget.dataset.selected || "false")
            evt.currentTarget.setAttribute("data-selected", !bool)
        })

    }
}

function ToggleButton(button, img = [1, 2], callback = _ => { }) {
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
            }
            else if (backgroundBefore === 4 || backgroundBefore === 5) {
                background.push('fond8');
            }
            else {
                background.push('fond6');
            }
        }
        else {
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

    const NBR_JOUR = 100 // A changer dynamiquement
    const PIXEL_PAR_JOUR = 500
    const HAUTEUR_DE_LA_PAGE = NBR_JOUR * PIXEL_PAR_JOUR

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

    AjoutDesCandidats([])

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

        if (indexJour > 0 && POLL[indexJour]) {
            for (let i = 0; i < POLL[indexJour].length; i++) {

                const candidat = POLL[indexJour][i]
                // candidats[i].setAttribute("style", "margin-top:" + candidat + "px")

            }
        }

    }

    scrollPosition(0)

    startTheRace.addEventListener("click", _ => scrollToRace())
    document.addEventListener("scroll", _ => scrollPosition(window.scrollY))
}

window.addEventListener('load', _ => start())