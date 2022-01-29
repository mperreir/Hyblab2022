'use strict'

page('/communes-2/gameChoice', async function () {
    await renderTemplate(templates('./templates/gameChoice.mustache'));

    document.getElementById("boutonRetour").addEventListener('click', function () {
        page('/communes-2/');
    });

    document.getElementById("gauche-btn").addEventListener('click', function () {
        initializeGameData('Gauche').then( () => {
            page('/communes-2/resultatFinal');
        })
    });

    document.getElementById("centre-btn").addEventListener('click', function () {
        initializeGameData('Centre').then( () => {
            page('/communes-2/affirmation');
        })

    });

    document.getElementById("droite-btn").addEventListener('click', function () {
        initializeGameData('Droite').then( () => {
            page('/communes-2/affirmation');
        })
    });
});

const initializeGameData = async orientation => {
    let response = await fetch('api/communes/'+orientation);
    const data = await response.json();

    let communeDeDepart = data[0]

    localStorage.setItem('gameData', JSON.stringify({
        'score' : 0,
        'communeCourante' :communeDeDepart,
        'communes': data
    }));
}