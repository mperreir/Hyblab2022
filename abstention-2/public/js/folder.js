
const visitedFolders = {
    abstention: false,
    nouveauxHabitants: false,
    blancsNuls: false,
    etrangers: false,
    mineurs: false,
    finaux: false,
}

const FOLDER_DATA = {
    abstention: {
        logoPath: 'img/folders_titles/abstention.svg',
        mainText: 'L\'absention constitue le plus souvent <span class="fd-font-bold">un choix et une mode d\'expression politique</span>. Le rapport au vote comme un devoir d\'étant érodé, il est désormais employé comme mode d\'expression contre les élus qui incarnent la démocratie.',
        percentMessage: 'd\'abstention.',
        secondaryText: 'Selon les résultats de la consultation publique menée sur le site de l\'Assemblée nationale, les raisons sont premièrement le mécontentement à l\'égard de la classe politique et également les accusations de corruption ou de manque d\'honnêteté.<br><br>L\'acte politique au travers de l\'abstention n\'est donc pas le refus des candidats, mais le rejet du système en lui-même.<br><br>Pour éviter cela, il est proposé de comptabiliser le vote blanc dans les résultats, mais en pratique cela est impossible, puisque si le vote blanc est majoritaire, aucun candidat n\'est élu.',
        firstLinkName: 'Site du gouvernement',
        firstLink: 'https://www.vie-publique.fr/fiches/23931-abstention-vote-blanc-et-vote-nul-quelles-differences',
        secondLinkName: 'Article L\'Express',
        secondLink: 'https://www.lexpress.fr/actualite/politique/l-abstention-c-est-un-acte-politique_1100505.html'
    },
    nouveauxHabitants: {
        logoPath: 'img/folders_titles/nouveaux_habitants.svg',
        mainText: 'La décision de ne pas se rendre aux urnes relève, pour une part des abstentionnistes, de contraintes physiques. Le fait de ne pas figurer sur les listes électorales constitue<span class="fd-font-bold">un obstacle évident</span>.<br><br>Par exemple, la <span class="fd-font-bold">« mal-inscription »</span> désigne la situation dans laquelle des citoyens qui déménagent sont inscrits sur les listes électorales de leur ancienne adresse sans que cela ne relève de leur choix.',
        percentMessage: 'de nouveaux habitants qui n\'ont pas pu voter.',
        secondaryText: 'Bien que l\'inscription sur les listes électorales soit obligatoire selon l\'article 9 du code électoral, cette inscription, ainsi que le changement de liste en cas de déménagent, reposent sur une démarche volontaire, qui doit être accomplie directement par le citoyen.',
        firstLinkName: 'Rapport d\'informations',
        firstLink: 'https://www.assemblee-nationale.fr/dyn/15/rapports/micpelec/l15b4790_rapport-information',
        secondLinkName: 'Démarches',
        secondLink: 'https://www.demarches.interieur.gouv.fr/particuliers/inscription-liste-electorale-cas-demenagement'
    },
    blancsNuls: {
        logoPath: 'img/folders_titles/blancs_nuls.svg',
        mainText: 'Le vote blanc consiste à déposer dans l\'urne une <span class="fd-font-bold">enveloppe vide ou contenant un bulletin dépourvu de tout nom de candidat.</span>',
        percentMessage: 'de vote blanc au second tour des élections présidentielles de 2017.',
        secondaryText: "L'électeur n'a pas forcément souhaité que son vote soit nul (il a cru, par exemple, qu'une mention manuscrite ajoutée n'aurait aucune incidence).<br><br>Il se peut aussi que suite à un défaut de procédure, tous les bulletins d'un bureau de vote soient cosidérés comme nuls (commune de Savenay par ex.).<br><br>Mais il arrive également que l'électeur ait volontairement déposé un bulletin nul pour manifester son opposition aux différents candidats et programmes présentés. Dans ce cas, le vote nul se rapproche du vote blanc.",
        firstLinkName: 'Site du gouvernement',
        firstLink: 'https://www.vie-publique.fr/fiches/23931-abstention-vote-blanc-et-vote-nul-quelles-differences',
        secondLinkName: 'Le parti vote blanc',
        secondLink: 'https://www.parti-du-vote-blanc.fr/'
    },
    etrangers: {
        logoPath: 'img/folders_titles/etrangers.svg',
        mainText: 'Historiquement, le vote a été construit comme corollaire d\'une<span class="fd-font-bold">citoyenneté elle-même référée à la nationalité.</span><br><br>Le vote est lié à <span class="fd-font-bold">la nationalité et non au pays de résidence.</span>Par conséquent, les étrangers résidant sur le territoire national ne votent pas, tandis que les français établis à l\'étranger puevent, sous certaines conditions, voter.',
        percentMessage: "d'étrangers qui n'ont pas pu émettre un vote.",
        secondaryText: "Historiquement, le droit de vote a été accordé aux étrangers de plus de 21 ans selon certaines conditions par la constitution 24 juin 1793. Cette constituions n'a cependant jamais été appliquée.",
        firstLinkName: 'Fiche thématique',
        firstLink: 'https://www.vie-publique.fr/fiches/23928-les-etrangers-ont-ils-le-droit-de-vote',
        secondLinkName: 'Précisions',
        secondLink: 'https://fr.wikipedia.org/wiki/Droit_de_vote_des_%C3%A9trangers_en_France',
    },
    mineurs: {
        logoPath: 'img/folders_titles/mineurs.svg',
        mainText: 'En France, les mineurs <span class="fd-font-bold">ne peuvent pas voter</span> quelle que soit l\'élection.<br><br>L\'âge de la majorité est fixé à 18 ans <span class="fd-font-bold">depuis 1974</span> (il était de 21 ans avant cette date).',
        percentMessage: 'de mineurs.',
        secondaryText: "Plusieurs propositions ont demandé à dissocier le droit de vote de la majorité et à le fixer à 16 ans.<br><br>Ce projet de loi a été proposé à l'Assemblé le 9 décembre 2021 et permettrait de renforcer le corps électoral français de près d'1,7 millions de nouveaux membres, mais la majorité LR y est hostile.<br><br>Ce projet fait aussi partie des programmes électoraux d'Anne Hidalgo, Yannick Jadot et Jean-Luc Mélenchon.",
        firstLinkName: 'Article Public Sénat',
        firstLink: 'https://www.publicsenat.fr/article/parlementaire/droit-de-vote-a-16-ans-les-socialistes-relancent-le-debat-au-senat-191514',
        secondLinkName: 'Proposition de loi',
        secondLink: 'https://www.assemblee-nationale.fr/dyn/15/textes/l15b3294_proposition-loi'
    }
}

async function loadFolder(folderName) {
    const container = document.getElementById('container');
    container.style.overflow = 'visible';

    let data;
    let graphData;
    switch (folderName) {
        case 'abstention':
            data = {
                cityName: citiesMap[selectedCity],
                cityValue: selectedCityData['abstention'],
                cityPercent: selectedCityData['pourcentage_abstention'],
                meanPercent: metropoleData['pourcentage_abstention']
            };
            graphData = await loadTemplate('templates/folders/graphAbsention.ejs', {
                cityName: citiesMap[selectedCity],
                cityPercent: selectedCityData['pourcentage_abstention'],
                meanPercent: metropoleData['pourcentage_abstention']
            });
            break;
        case 'etrangers':
            data = {
                cityName: citiesMap[selectedCity],
                cityValue: selectedCityData['etrangers'],
                cityPercent: selectedCityData['pourcentage_etranger'],
                meanPercent: metropoleData['pourcentage_etranger']
            };
            graphData = await loadTemplate('templates/folders/graphAbsention.ejs', {
                cityName: citiesMap[selectedCity],
                cityPercent: selectedCityData['pourcentage_etranger'],
                meanPercent: metropoleData['pourcentage_etranger']
            });
            break;
        case 'blancsNuls':
            data = {
                cityName: citiesMap[selectedCity],
                cityValue: selectedCityData['vote_blanc'] + selectedCityData['vote_nul'],
                cityPercent: selectedCityData['pourcentage_vote_blanc'] + selectedCityData['pourcentage_vote_nul'],
                meanPercent: metropoleData['pourcentage_vote_blanc'] + metropoleData['pourcentage_vote_nul']
            };
            graphData = await loadTemplate('templates/folders/graphEtrangers.ejs', {
                cityName: citiesMap[selectedCity],
                cityPercent: selectedCityData['pourcentage_vote_blanc'] + selectedCityData['pourcentage_vote_nul'],
                meanPercent: metropoleData['pourcentage_vote_blanc'] + metropoleData['pourcentage_vote_nul']
            });
            break;
        case 'nouveauxHabitants':
            data = {
                cityName: citiesMap[selectedCity],
                cityValue: selectedCityData['nouveaux_habitants'],
                cityPercent: selectedCityData['pourcentage_nouveaux_habitants'],
                meanPercent: metropoleData['pourcentage_nouveaux_habitants']
            };
            graphData = await loadTemplate('templates/folders/graphNouveauxHabitants.ejs', {
                cityName: citiesMap[selectedCity],
                cityPercent: selectedCityData['pourcentage_nouveaux_habitants'],
                meanPercent: metropoleData['pourcentage_nouveaux_habitants']
            });
            break;
        case 'mineurs':
            data = {
                cityName: citiesMap[selectedCity],
                cityValue: selectedCityData['mineurs'],
                cityPercent: selectedCityData['pourcentage_mineurs'],
                meanPercent: metropoleData['pourcentage_mineurs']
            };
            graphData = await loadTemplate('templates/folders/graphNouveauxHabitants.ejs', {
                cityName: citiesMap[selectedCity],
                cityPercent: selectedCityData['pourcentage_mineurs'],
                meanPercent: metropoleData['pourcentage_mineurs']
            });
            break;
        default:
            loadTopSecret();
            break;
    }

    const screen = document.getElementById('screen');
    const folderHtml = await loadTemplate('templates/folders/folder.ejs', Object.assign(data, FOLDER_DATA[folderName]));
    screen.innerHTML = folderHtml;

    document.getElementById('fd-graph-template').innerHTML = graphData;
    if (folderName === 'blancsNuls') {
        const percentArray = [
            selectedCityData['pourcentage_vote_blanc'] + selectedCityData['pourcentage_vote_nul'],
            metropoleData['pourcentage_vote_blanc'] + metropoleData['pourcentage_vote_nul']
        ];
        new Chart(document.getElementById('graph-chartjs'), {
            type: 'bubble',
            data: {
                datasets: [{
                    initalData: percentArray,
                    data: getEtrangersData(percentArray)[0],
                    backgroundColor: getEtrangersData(percentArray)[1]
                }]
            },
            options: {
                // responsive: true,
                // maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        suggestedMin: 0,
                        suggestedMax: 6,
                        grid: {
                            drawBorder: false,
                            lineWidth: 0
                        },
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        suggestedMin: 0,
                        suggestedMax: Math.floor(Math.max(...percentArray) / 3) + 1,
                        grid: {
                            drawBorder: false,
                            lineWidth: 0
                        },
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    document.getElementById('fd-back-button').addEventListener('click', () => {
        container.style.overflow = 'hidden';
        visitedFolders[folderName] = true;
        if (visitedFolders.finaux) {
            loadTopSecret();
        }
        else {
            if (visitedFolders.abstention) {
                FOLDER_TITLES.filesData.find(f => f.folderName === 'blancsNuls').progress = 100;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'nouveauxHabitants').progress = 100;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'mineurs').progress = 66;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'etrangers').progress = 66;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'finaux').progress = 44;
            }
            if (visitedFolders.blancsNuls && visitedFolders.nouveauxHabitants) {
                FOLDER_TITLES.filesData.find(f => f.folderName === 'mineurs').progress = 100;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'etrangers').progress = 100;
                FOLDER_TITLES.filesData.find(f => f.folderName === 'finaux').progress = 66;

            }
            if (visitedFolders.mineurs && visitedFolders.etrangers) {
                FOLDER_TITLES.filesData.find(f => f.folderName === 'finaux').progress = 100;
                all_progress = true;
            }
            loadFileExplorer();
        }

    });
}


function getEtrangersData(data) {
    renderData = [];
    renderColor = [];
    for (i = 0; i < data[0]; i++) {
        d = {
            x: i % 3,
            y: Math.floor(i / 3),
            r: 10
        };
        renderData.push(d);
        renderColor.push('rgb(0, 57, 255)');
    }
    renderData.push({
        x: data[0] % 3,
        y: Math.floor(data[0] / 3),
        r: Math.floor((data[0] - Math.floor(data[0])) * 10)
    })
    renderColor.push('rgb(0, 57, 255)');

    for (i = 0; i < data[1]; i++) {
        d = {
            x: i % 3 + 4,
            y: Math.floor(i / 3),
            r: 10
        };
        renderData.push(d);
        renderColor.push('rgb(255, 72, 0)');
    }
    renderData.push({
        x: Math.floor(data[1]) % 3 + 5,
        y: Math.floor(data[1] / 3),
        r: Math.floor((data[1] - Math.floor(data[1])) * 10)
    });
    renderColor.push('rgb(255, 72, 0)');
    return ([renderData, renderColor]);
}