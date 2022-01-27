
(() => Suivant())();

function Reponse(q, is_success){
    let jeu = document.querySelector('#jeu');
    let question = document.querySelector('#question');
    let reponse = document.querySelector('#reponses');

    jeu.removeChild(question);
    jeu.removeChild(reponse);


    let div = document.createElement('div');
    div.setAttribute("id",'reponse');

    let content;
    if (is_success) {
        content = document.createTextNode("La réponse à cette question est VRAI ! La réponse est bien "
            + q.true_response.name);

    } else {
        content = document.createTextNode("La réponse à cette question est FAUSSE ! La réponse est "
            + q.true_response.name);
    }

    let suiv = document.createElement('input');
    suiv.setAttribute("type", "button");
    suiv.setAttribute("value", "Suivant");
    suiv.setAttribute("id", "suivant");
    suiv.style.width= "30%";
    suiv.style.height= "40px";
    suiv.addEventListener('click', Suivant);

    div.appendChild(content);
    div.appendChild(suiv);

    jeu.appendChild(div);
}

async function Suivant() {

    let jeu = document.querySelector('#jeu');
    let reponse = document.querySelector('#reponse');

    try {
        jeu.removeChild(reponse);
    } catch {}

    const question = await fetchResponse();

    let div = document.createElement('div');
    div.setAttribute("id", 'question');

    let content = document.createTextNode(question.text);

    let div2 = document.createElement('div');
    div2.setAttribute("id", 'reponses');

    let a = document.createElement('input');
    a.setAttribute("type", "button");
    a.setAttribute("value", question.possible_response_1.name);
    a.setAttribute("id", "reponseA");
    a.style.width = "30%";
    a.style.height = "40px";
    a.addEventListener('click', () => Reponse(question, question.is_response_1_true));

    let b = document.createElement('input');
    b.setAttribute("type", "button");
    b.setAttribute("value", question.possible_response_2.name);
    b.setAttribute("id", "reponseB");
    b.style.width = "30%";
    b.style.height = "40px";
    b.addEventListener('click', () => Reponse(question, !question.is_response_1_true));

    div.appendChild(content);
    div2.appendChild(a);
    div2.appendChild(b);

    jeu.appendChild(div);
    jeu.appendChild(div2);
}

async function fetchResponse() {
    let result;
    try {
        // On fait ensuite un fetch sur l'api pour s'authentifier
        result = await fetch('./api/game/1/new_question', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            method: 'GET',
        });
    } catch (e) {
        console.error(e);
        return;
    }

    try {
        if (result.ok) {
            // Si tout s'est bien passé
            result = await result.json();
            return result;
        }
    } catch (e) {
        console.error(e);
        return;
    }
}
