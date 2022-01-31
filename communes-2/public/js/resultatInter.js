'use strict'

page('/communes-2/resultatInterTrue', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    buttonAddEvent();
});

page('/communes-2/resultatInterFalse', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    buttonAddEvent();
});

function buttonAddEvent(){
    document.getElementById("true-btn").addEventListener('click', function () {
        page('/communes-2/information');
    });

    document.getElementById("false-btn").addEventListener('click', function () {
        page('/communes-2/affirmation');
    });
}