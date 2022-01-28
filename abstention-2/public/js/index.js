"use strict";
const container = document.getElementById("container");

const messages = [{
    sender: "+33* ** ** ** **",
    message: "Salut ! C’est Thomas. Je suis ton nouveau collègue."
}, {
    sender: "THOMAS",
    message: "J’ai vu qu’on allait travailler ensemble sur le nouvel article de \“pour cent magazine\” !"
}, {
    sender: "THOMAS",
    message: "C’est sur l’abstention, trop intéressant ! Tu as vu les chires de 2017 ? :D"
}, {
    sender: "MOI",
    message: "Hey Thomas ! Content de bosser avec toi !Non, je n’ai pas vu les chires, pourquoi ? :)"
}, {
    sender: "THOMAS",
    message: "OK c’est parti pour « Nom de la ville » ! Alors tu paries combien ? Ne t’inquiète pas... On arrondit à 5%."
}
]


loadTemplate('templates/sms.ejs', []).then(value => {
    container.innerHTML = value;
    date();
    loadTemplate('templates/sms1.ejs', messages).then(value => {
        document.getElementById('screen').innerHTML = value;
    });
})

async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();

    return ejs.render(fileExplorerHtml, data);
}
