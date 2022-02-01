function start() {

    const NBR_JOUR = 100 // A changer dynamiquement
    const PIXEL_PAR_JOUR = 500
    const HAUTEUR_DE_LA_PAGE = NBR_JOUR * PIXEL_PAR_JOUR

    const info = document.querySelector("#info")
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

        info.innerHTML = "Jour: " + indexJour
    }

    scrollPosition(0)

    startTheRace.addEventListener("click", _ => scrollToRace())

    document.addEventListener("scroll", _ => scrollPosition(window.scrollY))
}

window.addEventListener('load', _ => start())