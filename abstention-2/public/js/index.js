'use strict';

const FOLDER_TITLES = {
    filesData: [
        {
            title: 'Votes blancs',
            progress: 66
        },
        {
            title: 'Nouveaux habitants',
            progress: 66
        },
        {
            title: 'Non-votants',
            progress: 100
        },
        {
            title: 'Mineurs',
            progress: 33
        },
        {
            title: 'Abstention',
            progress: 100
        },
        {
            title: 'Étrangers',
            progress: 33
        },
        {
            title: 'Les pourcentages finaux second tour 2017',
            progress: 16.5
        }
    ]
};

function date() {
    const date = document.getElementById('header-date');

    const text = new Date();
    setInterval(() => {
        text = new Date()
    }, 60000);
    let dateContent;
    if (text.getHours < 10) {
        dateContent = '0' + text.getHours() + ':';
    } else {
        dateContent = text.getHours() + ':';
    }
    if (text.getMinutes() < 10) {
        dateContent += '0' + text.getMinutes();
    } else {
        dateContent += text.getMinutes();
    }

    date.textContent = dateContent;
}

// const container = document.getElementById('container');


// loadStart();

// loadTemplate('templates/sms.ejs', test).then(value => { container.innerHTML = value ;
// date();
// })

//loadFolder();
//loadFileExplorer();
// loadSms();
// loadEnd();
// loadRebet();

async function loadPresVille() {
    const container = document.getElementById('container');
    const data = { ville: "Saint-herblain", pop: 46268, superficie: 30.02, metier:[ 0.04, 2.07, 9.05, 13.03, 14.11, 8.82, 21.27, 12.55]};
    const fileExplorerHtml = await loadTemplate('templates/pres_ville.ejs', data);
    container.innerHTML = fileExplorerHtml;
};


loadPresVille();


async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}
