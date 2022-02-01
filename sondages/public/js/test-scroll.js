function start() {

    const NBR_JOUR = 100 // A changer dynamiquement
    const PIXEL_PAR_JOUR = 500
    const HAUTEUR_DE_LA_PAGE = NBR_JOUR * PIXEL_PAR_JOUR
    
    const info = document.querySelector("#info")
    const barre = document.querySelector("#barre")
    const blocks = document.body.querySelector("#blocks")
    const animation = document.body.querySelector("#animation")
    const race = document.body.querySelector("#race")

    animation.setAttribute("style", "height: " + HAUTEUR_DE_LA_PAGE + "px")
    barre.setAttribute("style", "top: " + (window.innerHeight / 2) + "px")


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

    function scrollPosition(scroll) {

        const rect = animation.getBoundingClientRect()
        const y_to_top = rect.top + window.scrollY

        const hauteur = (scroll - y_to_top) + (window.innerHeight / 2)
        console.log(y_to_top, hauteur)

        let indexJour = parseInt(hauteur / PIXEL_PAR_JOUR) + 1

        indexJour = indexJour <= 0 ? 0 : indexJour

        if(indexJour === 0) {
            setBeforeScrolling()
        } else if (indexJour > NBR_JOUR) {
            setAfterScrolling()
        } else {
            setWhileScrolling()
        }

        info.innerHTML = "Jour: " + indexJour
    }

   

    scrollPosition(0)

    document.addEventListener("scroll", _ => scrollPosition(window.scrollY))
}

window.addEventListener('load', _ => start())