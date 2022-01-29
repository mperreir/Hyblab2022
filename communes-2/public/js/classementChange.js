page('/communes-2/classementChange', async function () {
    await renderTemplate(templates('./templates/classementChange.mustache'));

    document.getElementById("save-btn").addEventListener('click', function () {
        pseudo = document.getElementById("pseudo").value
        console.log("Pseudo du joueur : "+pseudo)
        page('/communes-2/gameChoice');
    });
});