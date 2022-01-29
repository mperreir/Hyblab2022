'use strict'

page('/communes-2/gameChoice', async function () {
    await renderTemplate(templates('./templates/gameChoice.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });

    document.getElementById("btn-gauche").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });

    document.getElementById("btn-centre").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });

    document.getElementById("btn-droite").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });
});