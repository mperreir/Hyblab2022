'use strict'

page('/communes-2/', async function () {
    window.scrollTo(0,1)
    anime({
        delay: 2500,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });

    await renderTemplate(templates('./templates/accueil.mustache'));

    document.getElementById("play-btn").addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });

    document.getElementById("gamerule-btn").addEventListener('click', function () {
        page('/communes-2/gamerule');
    });

    document.getElementById("classement-btn").addEventListener('click', function () {
        page('/communes-2/classement');
    });

    document.getElementById("credits-btn").addEventListener('click', function () {
        page('/communes-2/credits');
    });

    // let allbutton = document.querySelectorAll("input[type='button']");
    // allbutton.forEach(elt => {
    //    elt.addEventListener("click", clickmodern);
    //})
});



function click() {
    var audio = new Audio('sound/click.wav');
    audio.play();
}

function slide() {
    var audio = new Audio('sound/slide.wav');
    audio.play();
}

function win() {
    var audio = new Audio('sound/win.wav');
    audio.play();
}

function clickmodern() {
    var audio = new Audio('sound/clickmoden.wav');
    audio.play();
}

// On démarre le routing
page.start();
