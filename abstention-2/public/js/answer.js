async function loadAnswer() {
    const container = document.getElementById('container');

    let answers = {
        data: {
            pari: percentageBet,
            city: citiesMap[selectedCity],
            pourcentage_total_absention: selectedCityData.pourcentage_total_absention,
            population: selectedCityData.population,
            pourcentage_abstention: selectedCityData.pourcentage_abstention,
            pourcentage_etranger: selectedCityData.pourcentage_etranger,
            pourcentage_mineurs: selectedCityData.pourcentage_mineurs,
            pourcentage_nouveaux_habitants: selectedCityData.pourcentage_nouveaux_habitants
        }
    }


    // const headerHtml = await loadTemplate('templates/header.ejs', {});
    // container.innerHTML = headerHtml;

    let answerScreen = await loadTemplate('templates/answer.ejs', answers);
    document.getElementById('container').innerHTML = answerScreen;

    let returnButton = document.getElementById('return-button');
    returnButton.addEventListener('click', () => {
        console.log('retour');
        loadEnd();
    });
}