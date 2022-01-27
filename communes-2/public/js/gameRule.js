<<<<<<< HEAD
page('/communes-2/gamerule', async function () {
=======
page('/communes-2/gameRule', async function () {
>>>>>>> a290ac0fd26e86fe17055241192824b968c63590
    await renderTemplate(templates('./templates/gameRule.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/');
    });
});
