
(() => Suivant())();

function Reponse(q, is_success){
    let jeu = document.querySelector('#jeu');
    let question = document.querySelector('#question');
    let reponse = document.querySelector('#reponses');

    jeu.removeChild(consigne);
    jeu.removeChild(question);
    jeu.removeChild(reponse);


    let div = document.createElement('div');
    div.setAttribute("id",'reponse');
    div.style.width = "80%";
    div.style.minHeight = "50px";
    div.style.marginLeft = "7%";
    div.style.overflow = "hidden";
    div.style.background="white";
    div.style.marginTop = "5%";
    div.style.borderRadius = "15px 15px 15px 15px";
    div.style.border = "2px solid black";
    div.style.padding = "5px";

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
    suiv.style.marginLeft = "17%";
    suiv.style.marginRight = "5%";
    suiv.style.marginTop = "5%";
    suiv.style.borderRadius = "10px 10px 10px 10px";
    suiv.addEventListener('click', Suivant);

    div.appendChild(content);
    
    jeu.appendChild(div);
    jeu.appendChild(suiv);
}

async function Suivant() {

    let jeu = document.querySelector('#jeu');
    let reponse = document.querySelector('#reponse');

    try {
        jeu.removeChild(reponse);
        jeu.removeChild(suivant);
    } catch {}

    const question = await fetchResponse();

    let div = document.createElement('div');
    div.setAttribute("id", 'question');
    div.style.width = "80%";
    div.style.minHeight = "100px";
    div.style.marginLeft = "7%";
    div.style.overflow = "hidden";
    div.style.background="white";
    div.style.marginTop = "5%";
    div.style.borderRadius = "15px 15px 15px 15px";
    div.style.border = "2px solid black";
    div.style.padding = "5px";

    let consigne = document.createElement('div');
    consigne.setAttribute("id", 'consigne');
    consigne.style.font="Lucida Grande";

    let consignecontent = document.createTextNode("Mais a qui est ce Tweet ?");

    let content = document.createTextNode(question.text);


    let div2 = document.createElement('div');
    div2.setAttribute("id", 'reponses');

    let a = document.createElement('input');
    a.setAttribute("type", "button");
    a.setAttribute("value", question.possible_response_1.name);
    a.setAttribute("id", "reponseA");
    a.style.width = "30%";
    a.style.height = "40px";
    a.style.marginLeft = "17%";
    a.style.marginRight = "5%";
    a.style.marginTop = "5%";
    a.style.borderRadius = "10px 10px 10px 10px";
    a.addEventListener('click', () => Reponse(question, question.is_response_1_true));

    let b = document.createElement('input');
    b.setAttribute("type", "button");
    b.setAttribute("value", question.possible_response_2.name);
    b.setAttribute("id", "reponseB");
    b.style.width = "30%";
    b.style.height = "40px";
    b.style.borderRadius = "10px 10px 10px 10px";
    b.addEventListener('click', () => Reponse(question, !question.is_response_1_true));

    consigne.appendChild(consignecontent);
    div.appendChild(content);
    div2.appendChild(a);
    div2.appendChild(b);

    jeu.appendChild(consigne);
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
