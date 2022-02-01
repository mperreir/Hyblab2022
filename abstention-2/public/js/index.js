'use strict';

const FOLDER_TITLES = {
    filesData: [
        {
            title: 'Votes blancs',
            tag: 'fe-votes-blancs',
            folderName: 'blancsNuls',
            progress: 66
        },
        {
            title: 'Nouveaux habitants',
            tag: 'fe-nouveaux-habitants',
            folderName: 'nouveauxHabitants',
            progress: 66
        },
        {
            title: 'Mineurs',
            tag: 'fe-mineurs',
            folderName: 'mineurs',
            progress: 33
        },
        {
            title: 'Abstention',
            tag: 'fe-abstention',
            folderName: 'abstention',
            progress: 100
        },
        {
            title: 'Étrangers',
            tag: 'fe-etrangers',
            folderName: 'etrangers',
            progress: 33
        },
        {
            title: 'Les pourcentages finaux second tour 2017',
            tag: 'fe-finaux',
            folderName: 'finaux',
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



// loadTemplate('templates/sms.ejs', test).then(value => { container.innerHTML = value ;
// date();
// })


// const cityData = await fetchCityData('nantes');


// loadStart();
// loadSms();
// loadFolder('nouveauxHabitants');
loadFileExplorer();
// loadEnd();
// loadRebet();

async function fetchCityData(city) {
    const cityRq = await fetch(`/api/city/${city}`);
    const rqJson = await cityRq.json();
    return rqJson;
}



loadPresVille();


async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}
