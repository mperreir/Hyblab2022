function start() {

    console.log(candidat)

    const NBR_JOUR = 100 // A changer dynamiquement
    const PIXEL_PAR_JOUR = 500
    const HAUTEUR_DE_LA_PAGE = NBR_JOUR * PIXEL_PAR_JOUR

    const blocks = document.body.querySelector("#blocks")
    const animation = document.body.querySelector("#animation")
    const race = document.body.querySelector("#race")

    const startTheRace = document.body.querySelector("button#startTheRace")

    const candidats = document.body.querySelectorAll("#race .candidat")

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

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getBackground(nb_jours){
        let background = []
        background.push('fond2');
        let backgroundBefore = 2;
        for(let i = 0; i < nb_jours-2; i++){
            if (i == nb_jours-3){
                if (backgroundBefore === 3){
                    background.push('fond9');
                }
                else if (backgroundBefore === 4 || backgroundBefore === 5){
                    background.push('fond8');
                }
                else{
                    background.push('fond6');
                }
            }
            else{
                let index = getRandomInt(compatibleBackgrounds[backgroundBefore].length);
                let currBackground = compatibleBackgrounds[backgroundBefore][index];
                background.push('fond' + currBackground);
                backgroundBefore = currBackground;
            }
        }
        background.push('arrivee');
        return background;
    }

    const compatibleBackgrounds = {
        2: [5,6,7],
        3: [4,9],
        4: [3,8],
        5: [3,8],
        6: [2,5,7],
        7: [2,5,6],
        8: [2,6,7],
        9: [2,6,7],
    } 

    /*
    for (let i = 1; i <= NBR_JOUR; i++) {
        var element = document.createElement("div");
        element.innerText = i
        element.setAttribute("style", "height: " + PIXEL_PAR_JOUR + "px")
        blocks.appendChild(element)
    }
    */

    clientPatternHeight = document.getElementById('pattern').clientHeight;
    const background = getBackground(Math.floor(HAUTEUR_DE_LA_PAGE / clientPatternHeight));

    let currHauteur = 0;
    let i = 0;
    while (i < background.length-1){
        let element = document.createElement("div");
        element.setAttribute("style", "height: " + clientPatternHeight + "px");
        element.style.backgroundImage = `url('./data/_AGR src/pattern/${background[i]}.svg')`;
        element.style.backgroundRepeat = 'no-repeat';
        blocks.appendChild(element);
        currHauteur += clientPatternHeight;
        i++;
    }

    // partie restante & manquante à combler
    let remainingBackground = HAUTEUR_DE_LA_PAGE - currHauteur - clientPatternHeight;

    let element = document.createElement("div");
    element.setAttribute("style", "height: " + remainingBackground + "px");
    element.style.backgroundImage = `url('./data/_AGR src/pattern/un_px.svg')`;
    element.style.backgroundRepeat = 'repeat';
    blocks.appendChild(element);
    // arrivee

    let arrivee = document.createElement("div");
    arrivee.setAttribute("style", "height: " + clientPatternHeight + "px");
    arrivee.style.backgroundImage = `url('./data/_AGR src/pattern/${background[background.length-1]}.svg')`;
    arrivee.style.backgroundRepeat = 'no-repeat';
    blocks.appendChild(arrivee);

    



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

        console.log(window.scrollY)

        window.scrollTo({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
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