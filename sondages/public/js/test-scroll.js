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


    for (let i = 1; i <= NBR_JOUR; i++) {
        var element = document.createElement("div");
        element.innerText = i
        element.setAttribute("style", "height: " + PIXEL_PAR_JOUR + "px")
        blocks.appendChild(element)
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