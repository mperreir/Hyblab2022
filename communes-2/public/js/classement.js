page('/communes-2/classement', async function () {
    await renderTemplate(templates('./templates/classement.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});