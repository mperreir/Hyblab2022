page('/communes-2/a-propos', async function () {
    await renderTemplate(templates('./templates/apropos.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});
