'use strict'

page('/communes-2/game', async function () {
    await renderTemplate(templates('./templates/game.mustache'));
});


page('/communes-2/a-propos', async function () {
    await renderTemplate(templates('./templates/apropos.mustache'));
});