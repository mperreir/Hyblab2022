a = document.querySelector('#reponseA');
a.addEventListener('click', Reponse);

b = document.querySelector('#reponseB');
b.addEventListener('click', Reponse);

function Reponse(){
    jeu = document.querySelector('#jeu');
    question = document.querySelector('#question');
    reponse = document.querySelector('#reponses');

    jeu.removeChild(question);
    jeu.removeChild(reponse);


    div = document.createElement('div');
    div.setAttribute("id",'reponse');

    content = document.createTextNode("La réponse à cette question est vrai/fausse !");

    suiv = document.createElement('input');
    suiv.setAttribute("type", "button");
    suiv.setAttribute("value", "Suivant");
    suiv.setAttribute("id", "suivant");
    suiv.style.width= "30%";
    suiv.style.height= "40px";
    suiv.addEventListener('click', Suivant);

    div.appendChild(content);
    div.appendChild(suiv);

    jeu.appendChild(div);
};

function Suivant(){

    jeu = document.querySelector('#jeu');
    reponse = document.querySelector('#reponse');

    jeu.removeChild(reponse);


    div = document.createElement('div');
    div.setAttribute("id",'question');

    content = document.createTextNode("La question est ?");

    div2 = document.createElement('div');
    div2.setAttribute("id",'reponses');

    a = document.createElement('input');
    a.setAttribute("type", "button");
    a.setAttribute("value", "Réponse A");
    a.setAttribute("id", "reponseA");
    a.style.width= "30%";
    a.style.height= "40px";
    a.addEventListener('click', Reponse);

    b = document.createElement('input');
    b.setAttribute("type", "button");
    b.setAttribute("value", "Réponse B");
    b.setAttribute("id", "reponseB");
    b.style.width= "30%";
    b.style.height= "40px";
    b.addEventListener('click', Reponse);

    div.appendChild(content);
    div2.appendChild(a);
    div2.appendChild(b);

    jeu.appendChild(div);
    jeu.appendChild(div2);
};


