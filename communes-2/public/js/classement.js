page('/communes-2/classement', async function () {
    await renderTemplate(templates('./templates/classement.mustache'));

    const rePlaybtn = document.getElementById("save-btn");
    rePlaybtn.addEventListener('click', function () {
        pseudo = document.getElementById("pseudo").value
        console.log("Pseudo du joueur : "+pseudo)
        page('/communes-2/gameChoice');
    });
});