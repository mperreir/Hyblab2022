"use strict";

const templateTest = fetch('templates/folder-absention.ejs').then(value => {
    console.log(value.text().then(value => {
        const rendered = ejs.render(value, { votingHab: 100000 });
        document.getElementById('container').innerHTML = rendered;
    }));
});