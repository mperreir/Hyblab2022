"use strict";
const container = document.getElementById("container");

const bulle1 = {
    text1: "COLLEGUE :",
    text2: "Hey ! Tu devineras jamais les chiffres que je viens de trouver au sujet de l'abstention pendant la présidentielle 2017 au second tour !",
    text3: "Avant que t'ailles jeter un coup d'oeuil :",
    text4: "dis moi quelle ville tu veux voir et essaye de me donner le nombre d'abstentionnistes et de non-votants dans celle ci !",
    text5: "Repas de ce midi en jeu !"
};

const bulle2 = {
    text1: "COLLEGUE :",
    text2: "Alors, avec quelle ville veux tu jouer ?"
}

loadTemplate('templates/sms.ejs', []).then(value => { container.innerHTML = value ;
    date();
    loadTemplate('templates/sms1.ejs', []).then(value => {document.getElementById('screen').innerHTML = value;
        loadTemplate('templates/bulle_sms.ejs', bulle1).then(value => { document.getElementById('bulle1').innerHTML = value; })});
    loadTemplate('templates/sms2.ejs', bulle2).then(value => { document.getElementById('screen').innerHTML = value; 
        loadTemplate('templates/bulle_sms.ejs', bulle2).then(value => { document.getElementById('bulle2').innerHTML = value; })});
})

async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();

    return ejs.render(fileExplorerHtml, data);
}
