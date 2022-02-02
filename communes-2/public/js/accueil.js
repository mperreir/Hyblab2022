'use strict'

page('/communes-2/', async function () {
    /*// Wait for the video to preload and display 1st slide
    var vid = document.getElementById("background-video");
    vid.onloadeddata = function() {
        document.querySelector('#background-video').style.display = "block";
    };*/

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

// On démarre le routing
page.start();
