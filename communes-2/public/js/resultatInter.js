'use strict'

page('/communes-2/resultatInter', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));

    document.getElementById("true-btn").addEventListener('click', function () {
        page('/communes-2/information');
    });

    document.getElementById("false-btn").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });
});