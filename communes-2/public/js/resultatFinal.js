page('/communes-2/resultatFinal', async function () {
    await renderTemplate(templates('./templates/resultatFinal.mustache'));

    document.getElementById("rePlay-btn").addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });

    document.getElementById("save-btn").addEventListener('click', function () {
        page('/communes-2/classementChange');
    });
});