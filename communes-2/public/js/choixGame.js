'use strict'

page('/communes-2/choixGame', async function () {
    await renderTemplate(templates('./templates/choixGame.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});



