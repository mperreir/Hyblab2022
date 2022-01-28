page('/communes-2/classement', async function () {
    await renderTemplate(templates('./templates/classement.mustache'));
});