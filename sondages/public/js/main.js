function InitDesIntentions(intentionsCandidats) {
    const divRace = document.getElementById('race')

    const candidats = {}

    intentionsCandidats.forEach(candidat => {

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

        candidats[candidat.name] = candidat
        candidats[candidat.name].div = divCandidat

    })

    return candidats
}

function AjoutDesCandidatsPourSelection(candidats) {

    const CandidatSelection = document.getElementById('CandidatSelection')

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

function start() {

    const player = document.querySelector("lottie-player");
    player.load("anim/debut.json");
    player.addEventListener("ready", _ => {
        document.body.querySelector("#Introduction .loader").remove()
    })
    player.addEventListener("complete", _ => {
        window.scrollTo(0, 1);
        document.body.querySelector("#Introduction").className = "hide-introduction"
    })


    const blocks = document.body.querySelector("#blocks")
    const animation = document.body.querySelector("#animation")


    const TimeInfoProgress = document.body.querySelector("#TimeInfo .progress")
    const TimeInfoDate = document.body.querySelector("#TimeInfo .date")


    const startTheRace = document.body.querySelector("button#startTheRace")


    // Menu du haut pour les choix
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

    // Choix de courses
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



    // Chargement des données
    getCandidats().then(candidats => {

        console.info("Candidats chargés !")
        AjoutDesCandidatsPourSelection(candidats)

        getSondages().then(sondages => {

            console.info("Données de sondage chargés !")
            const CANDIDATS = InitDesIntentions(sondages)
            const CANDIDATS_KEYS = Object.keys(CANDIDATS)

            // Calcul de l'hauteur de la page
            const NBR_JOUR = 360 // On affiche 360 jours de course
            const PIXEL_PAR_JOUR = 50 // 50 pixels de haut par jour
            const PADDING_POUR_DERNIER_JOUR = 20 // Jours sautés au début pour laisser de la place à la fin

            GenereLaListeDesBackgrounds(blocks, NBR_JOUR, PIXEL_PAR_JOUR)

            var INDEX_PREV = -1;

            function scrollPosition() {

                // On récupère la position du block #animation par rapport à l'écran
                const animation_rect = animation.getBoundingClientRect()

                // Pour stick la div #race a l'écran
                const not_seeing_bottom = (animation_rect.bottom - window.innerHeight) >= 0

                // Récupération de l'index du jour en fonction du scroll + la taille de la fenetre
                const hauteur = -animation_rect.top + (window.innerHeight)
                let indexJour = Math.ceil(hauteur / PIXEL_PAR_JOUR) + PADDING_POUR_DERNIER_JOUR

                // On s'assure que l'index du jour est compris entre la borne 0 et le nombre max de jour
                indexJour = indexJour <= 0 ? 0 : (indexJour > NBR_JOUR ? NBR_JOUR : indexJour)


                // Permet de stick la div #race à l'écran
                if (animation_rect.top <= 0 && not_seeing_bottom) {
                    setWhileScrolling()
                } else if (animation_rect.top > 0 && not_seeing_bottom) {
                    setBeforeScrolling()
                } else {
                    setAfterScrolling()
                }


                // On met a jour l'affichage si on change de jour #PerformanceOpti
                if (indexJour > 0 && INDEX_PREV != indexJour) {

                    INDEX_PREV = indexJour

                    // Récupération du jour en fonction du scroll
                    const currDate = GetScrollDate(indexJour, NBR_JOUR);

                    // On met a jour la progress bar
                    TimeInfoProgress.style.width = (indexJour / NBR_JOUR * 100) + "%";

                    // On change la date
                    TimeInfoDate.innerHTML = new Date(currDate).toLocaleDateString("fr")

                    // On change la position des candidats
                    CANDIDATS_KEYS.map(nom_candidat => {
                        const index = CANDIDATS[nom_candidat].x.indexOf(currDate);
                        if (index >= 0) {
                            const divPourcent = document.querySelector(`div[data-name='${nom_candidat}'] div[class='pourcent']`);
                            divPourcent.innerText = parseFloat(CANDIDATS[nom_candidat].y[index]).toFixed(1) + ' %';
                        }
                    })
                }
            }

            // On initialise tout a 0
            scrollPosition()

            // Ajout les évents listeners nécéssaires
            startTheRace.addEventListener("click", scrollToRace)
            document.addEventListener("scroll", scrollPosition)

        })

    })

}

window.addEventListener('load', _ => start())