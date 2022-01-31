'use strict'

page('/communes-2/resultatInterFalse', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    document.getElementById('titreScoreInter').textContent = "MAUVAISE RÉPONSE";
    document.getElementById('nomCommune').textContent = "La commune était "+JSON.parse(localStorage.getItem('gameData')).communeCourante.libelleCommune;
    initResultatInter();
});

page('/communes-2/resultatInterTrue', async function () {
    await renderTemplate(templates('./templates/resultatInter.mustache'));
    document.getElementById('titreScoreInter').textContent = "BONNE RÉPONSE";
    initResultatInter();
});


function initResultatInter(){
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    gameData.nbreCommunesTrouvees += 1;

    // Affichage du score
    document.getElementById('scoreInter').textContent = gameData.scoreIntermediaire;

    localStorage.setItem('gameData',JSON.stringify(gameData));

    // Ajout addEventListener aux boutons
    document.getElementById("true-btn").addEventListener('click', function () {
        page('/communes-2/information');
    });

    document.getElementById("false-btn").addEventListener('click', function () {
        if (JSON.parse(localStorage.getItem('gameData')).nbreCommunesTrouvees >= 5){
            page('/communes-2/resultatFinal');
        } else {
            page('/communes-2/affirmation');
        }
    });
}