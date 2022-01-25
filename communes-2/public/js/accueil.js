'use strict'

page('/communes-2/', async function () {
    anime({
        delay: 1000,
        targets: '#loader',
        opacity: '0',
        'z-index' : -1,
        easing: 'easeOutQuad',
    });
    
    await renderTemplate(templates('./templates/accueil.mustache'));

    const play_btn = document.getElementById('play-btn');
    play_btn.addEventListener('click', function () {
        page('/communes-2/game');
    });
});

// On démarre le routing
page.start();