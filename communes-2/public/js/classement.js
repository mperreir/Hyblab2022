page('/communes-2/classement', async function () {
    await renderTemplate(templates('./templates/classement.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });
});