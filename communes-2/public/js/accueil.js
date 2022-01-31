'use strict'

page('/communes-2/', async function () {
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
        page('/communes-2/information');//credits
    });
});
 
// On démarre le routing
page.start();
