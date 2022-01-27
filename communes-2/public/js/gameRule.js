page('/communes-2/gameRule', async function () {
    await renderTemplate(templates('./templates/gameRule.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});
