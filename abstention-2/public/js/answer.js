async function loadAnswer() {
    const container = document.getElementById('container');

    let answers = {
        data: {
            pari : 45,
            city : "Nantes",
            pourcentage_total_absention : 42,
            population : 123465,
            pourcentage_abstention : 15,
            pourcentage_non_votants : 15,
            pourcentage_etranger : 15,
            pourcentage_mineurs : 15,
            pourcentage_nouveaux_habitants : 15,
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
    })
}