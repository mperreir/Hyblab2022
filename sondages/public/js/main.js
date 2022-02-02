function InitDesIntentions(intentionsCandidats, objCandidats) {
    const divRace = document.getElementById('race')

    const candidats = {}

    intentionsCandidats.forEach(candidat => {

        const divCandidat = document.createElement('div');
        divCandidat.className = 'candidat';

        const name = candidat.name.split(" ")
        const prenom = name.shift()
        const nom = name.join(" ")

        const divName = document.createElement('div');
        divName.className = 'name';
        divName.innerText = prenom;

        const divNom = document.createElement('div');
        divNom.className = 'nom';
        divNom.innerText = nom;

        divName.appendChild(divNom)

        const divBlock = document.createElement('div');
        const objCandidat = objCandidats.filter(c => candidat.name === c.prenom + ' ' + c.nom)[0];
        divBlock.style.background = objCandidat.couleur;
        divBlock.className = 'block';
        const img = document.createElement('img');
        img.src = document.getElementById(candidat.name).src;
        img.onerror = function(e) {
            e.target.src = 'img/candidats/profil_inconnu_cadre.svg'
        }
        const divPourcent = document.createElement('div');
        divPourcent.className = 'pourcent'
        divPourcent.innerText = "0%"
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

    const video = document.querySelector("video");

    const startVideo = _ => {
        document.body.querySelector("#Introduction .loader").remove()
        video.play()
    }

    if (video.readyState === 4) {
        startVideo()
    } else {
        video.addEventListener("canplaythrough", startVideo)
    }

    video.addEventListener("ended", _ => {
        window.scrollTo(0, 1);
        document.body.querySelector("#Introduction").className = "hide-introduction"
    })

    const animation = document.getElementById("animation")

    const TimeInfoProgress = document.body.querySelector("#TimeInfo .progress")
    const TimeInfoDate = document.body.querySelector("#TimeInfo .date")


    const startTheRace = document.getElementById("startTheRace")
    const restartTheRace = document.getElementById("restartTheRace")


    // Menu du haut pour les choix
    const CandidatSelection = document.getElementById("CandidatSelection")
    const ButtonShowCandidat = document.getElementById("ShowCandidat")
    ToggleButton(ButtonShowCandidat, ["img/bouton_plus.svg", "img/bouton_moins.svg"], showed => {
        CandidatSelection.className = showed ? "body" : "hidden"
    })

    const CourseSelection = document.getElementById("CourseSelection")
    const ButtonShowCourses = document.getElementById("ShowCourses")
    ToggleButton(ButtonShowCourses, ["img/bouton_plus.svg", "img/bouton_moins.svg"], showed => {
        CourseSelection.className = showed ? "body" : "hidden"
    })

    // Choix de courses
    const BtnCourse30 = document.getElementById("BtnCourse30")
    const BtnCourse15 = document.getElementById("BtnCourse15")
    const BtnCourse5 = document.getElementById("BtnCourse5")

    let POURCENT_BORNE_MIN = 15;
    let POURCENT_BORNE_MAX = 30;

    BtnCourse30.addEventListener("click", evt => {
        if (evt.target.className !== "selected") {
            BtnCourse15.className = ""
            BtnCourse5.className = ""
            evt.target.className = "selected"
            POURCENT_BORNE_MIN = 15
            POURCENT_BORNE_MAX = 30
        }
    })

    BtnCourse15.addEventListener("click", evt => {
        if (evt.target.className !== "selected") {
            BtnCourse30.className = ""
            BtnCourse5.className = ""
            evt.target.className = ""
            POURCENT_BORNE_MIN = 5
            POURCENT_BORNE_MAX = 15
        }
    })

    BtnCourse5.addEventListener("click", evt => {
        if (evt.target.className !== "selected") {
            BtnCourse30.className = ""
            BtnCourse15.className = ""
            evt.target.className = "selected"
            POURCENT_BORNE_MIN = 0
            POURCENT_BORNE_MAX = 5
        }
    })



    // Chargement des données
    getCandidats().then(candidats => {

        console.info("Candidats chargés !")
        AjoutDesCandidatsPourSelection(candidats)

        getSondages().then(sondages => {

            console.info("Données de sondage chargés !")
            const CANDIDATS = InitDesIntentions(sondages, candidats)
            const CANDIDATS_KEYS = Object.keys(CANDIDATS)

            // Calcul de l'hauteur de la page
            const NBR_JOUR = 360 // On affiche 360 jours de course
            const PIXEL_PAR_JOUR = 50 // 50 pixels de haut par jour
            const PADDING_POUR_DERNIER_JOUR = 20 // Jours sautés au début pour laisser de la place à la fin

            const divCandidat = CANDIDATS["Philippe Poutou"];
            const TAILLE_DIV_CANDIDAT = divCandidat.div.clientHeight;


            GenereLaListeDesBackgrounds(NBR_JOUR, PIXEL_PAR_JOUR)

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




                    // hauteur de la regle selon l'affichage client
                    const hauteur_regle = document.querySelector("#race .regle").clientHeight

                    let min_pourcent = 100;
                    let max_pourcent = 0;
                    console.log("BORNES : ", POURCENT_BORNE_MIN + " <->" + POURCENT_BORNE_MAX)
                    CANDIDATS_KEYS.map(nom_candidat => {
                        const index = CANDIDATS[nom_candidat].x.indexOf(currDate);

                        let pourcent = 0

                        if (index >= 0) {
                            pourcent = parseFloat(CANDIDATS[nom_candidat].y[index])
                        }
                        let pourcent_min = Math.floor(pourcent);
                        let pourcent_max = Math.ceil(pourcent);

                        // on prend en compte seulement les candidats dans les bornes
                        if (pourcent >= POURCENT_BORNE_MIN && pourcent <= POURCENT_BORNE_MAX) {
                            if (pourcent_max > max_pourcent) {
                                max_pourcent = pourcent_max;
                            }
                            if (pourcent_min < min_pourcent) {
                                min_pourcent = pourcent_min;
                            }
                        }

                    });

                    console.log(min_pourcent, '% ', max_pourcent, '%')
                        // Echelle dynamique :
                        // arrondissement a la dizaine inférieur
                        // -> borne min
                    const min_regle = Math.floor(min_pourcent / 5) * 5;
                    const divRegleBas = document.getElementById("RegleBas");
                    divRegleBas.innerText = min_regle + '%';

                    // -> borne max
                    // arrondissement a la dizaine supérieure
                    const max_regle = Math.ceil(max_pourcent / 5) * 5;
                    const divRegleHaut = document.getElementById("RegleHaut");
                    divRegleHaut.innerText = max_regle + '%';

                    console.log("Min : ", min_regle, " Max : ", max_regle)

                    // On change la position des candidats
                    CANDIDATS_KEYS.map(nom_candidat => {
                        const index = CANDIDATS[nom_candidat].x.indexOf(currDate);

                        let pourcent = 0

                        if (index >= 0) {
                            pourcent = parseFloat(CANDIDATS[nom_candidat].y[index]).toFixed(1)
                        }

                        const position = (pourcent - min_regle) / (max_regle - min_regle) * hauteur_regle

                        // si candidats dans la borne sélectionnée :
                        if (pourcent >= POURCENT_BORNE_MIN && pourcent <= POURCENT_BORNE_MAX) {
                            CANDIDATS[nom_candidat].div.style.top = "calc( 12.5vh + " + (position - TAILLE_DIV_CANDIDAT / 2) + "px" + " ) ";
                        } else // sinon candidats hors borne :
                        {
                            CANDIDATS[nom_candidat].div.style.top = "-500px";

                        }

                        CANDIDATS[nom_candidat].div.querySelector(".pourcent").innerText = pourcent + ' %';
                    })
                }
            }

            // On initialise tout a 0
            scrollPosition()

            // Ajout les évents listeners nécéssaires
            startTheRace.addEventListener("click", scrollToRace)
            document.addEventListener("scroll", scrollPosition)
            restartTheRace.addEventListener("click", _ => {
                window.scrollTo({
                    top: 1,
                    left: 0,
                    behavior: 'smooth'
                })
            })

        })

    })

}

window.addEventListener('load', _ => start())