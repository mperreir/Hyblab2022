"use strict";

function date() {
    const date = document.getElementById('header-date');

    const text = new Date();
    setInterval(() => {
        text = new Date()
    }, 60000);
    let dateContent;
    if (text.getHours < 10) {
        dateContent = "0" + text.getHours() + ":";
    } else {
        dateContent = text.getHours() + ":";
    }
    if (text.getMinutes() < 10) {
        dateContent += "0" + text.getMinutes();
    } else {
        dateContent += text.getMinutes();
    }

    date.textContent = dateContent;
}

// const templateTest = fetch('templates/folder-absention.ejs').then(value => {
//     console.log(value.text().then(value => {
//         const rendered = ejs.render(value, { votingHab: 100000 });
//         document.getElementById('container').innerHTML = rendered;
//     }));
// });

// const container = document.getElementById("container");


// loadStart();

// loadTemplate('templates/sms.ejs', test).then(value => { container.innerHTML = value ;
// date();
// })


// loadFileExplorer();
smsScreen();


async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}


