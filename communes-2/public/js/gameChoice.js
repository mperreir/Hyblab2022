'use strict'

page('/communes-2/gameChoice', async function () {
    await renderTemplate(templates('./templates/gameChoice.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
    const gauchebtn = document.getElementById("btn-gauche");
    gauchebtn.addEventListener('click', function () {
        page('/communes-2/affirmation-gauche');
    });

    const centrebtn = document.getElementById("btn-centre");
    centrebtn.addEventListener('click', function () {
        page('/communes-2/affirmation-centre');
    });

    const droitebtn = document.getElementById("btn-droite");
    droitebtn.addEventListener('click', function () {
        page('/communes-2/affirmation-droite');
    });
});