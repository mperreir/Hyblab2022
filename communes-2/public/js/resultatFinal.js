page('/communes-2/resultatFinal', async function () {
    await renderTemplate(templates('./templates/resultatFinal.mustache'));

    const rePlaybtn = document.getElementById("rePlay-btn");
    rePlaybtn.addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });

    const savebtn = document.getElementById("save-btn");
    savebtn.addEventListener('click', function () {
        page('/communes-2/classement');
    });
});