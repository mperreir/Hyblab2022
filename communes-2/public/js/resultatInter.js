'use strict'

page('/communes-2/resultatInter', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
});