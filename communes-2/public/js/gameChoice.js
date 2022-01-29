'use strict'

page('/communes-2/gameChoice', async function () {
    await renderTemplate(templates('./templates/gameChoice.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });

    document.getElementById("gauche-btn").addEventListener('click', function () {
        page('/communes-2/resultatInter');
    });

    document.getElementById("centre-btn").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });

    document.getElementById("droite-btn").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });
});