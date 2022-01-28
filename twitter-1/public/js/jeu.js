
//(() => Suivant(30,0,0))();

async function Suivant(temps,score,total) {

    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "inline";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "inline";

    let menu = document.querySelector('#menu1');
    menu.style.display= "none";
    
    try {
        let text = document.querySelector('#text');
        let choix = document.querySelector('#choix');
        let svg = document.querySelector('#logo-svg');
        let images = document.querySelector('#images');
        jeu.removeChild(text);
        jeu.removeChild(choix);
        jeu.removeChild(svg);
        jeu.removeChild(images);
        let slide = document.querySelector('#second-slide');
        slide.style.background ="#a08aff";
    } catch {}

    try {
        jeu.removeChild(question);
        jeu.removeChild(reponse);
    } catch {}

    try {
        let bouton = document.querySelector('#rejoue');
        let fin = document.querySelector('#finjeu');
        let score = document.querySelector('#score');
        let images = document.querySelector('#images');
        jeu.removeChild(bouton);
        jeu.removeChild(fin);
        jeu.removeChild(score);
        let slide = document.querySelector('#second-slide');
        slide.style.background ="#a08aff";
    } catch {}

    const question = await fetchResponse();

    let div = document.createElement('div');
    div.setAttribute("id", 'question');
    div.style.position = "absolute";
    div.style.top = "35%";
    div.style.left = "5%";
    div.style.width = "75%";
    div.style.minHeight = "100px";
    div.style.marginLeft = "7%";
    div.style.overflow = "hidden";
    div.style.background="none";
    div.style.marginTop = "5%";
    div.style.padding = "5px";

    let content = document.createTextNode(question.text);


    let div2 = document.createElement('div');
    div2.setAttribute("id", 'reponses');
    div2.style.position = "absolute";
    div2.style.top = "80%";
    div2.style.width = "100%";

    let a = document.createElement('input');
    a.setAttribute("type", "button");
    a.setAttribute("value", question.possible_response_1.name);
    a.setAttribute("id", "reponseA");
    a.style.width = "35%";
    a.style.height = "40px";
    a.style.marginLeft = "10%";
    a.style.borderRadius = "80px";
    a.style.boxShadow = "7px 7px 25px 0 rgba(0,0,0,0.25)";
    a.style.border = "none";
    a.style.fontFamily = "'Outfit', sans-serif";
    a.style.fontSize = "90%";
    a.addEventListener('click', () => Reponse(a, question.is_response_1_true, temps, interval, score, total));

    let b = document.createElement('input');
    b.setAttribute("type", "button");
    b.setAttribute("value", question.possible_response_2.name);
    b.setAttribute("id", "reponseB");
    b.style.width = "35%";
    b.style.height = "40px";
    b.style.marginLeft = "12%";
    b.style.borderRadius = "80px";
    b.style.boxShadow = "7px 7px 25px 0 rgba(0,0,0,0.25)";
    b.style.border = "none";
    b.style.fontFamily = "'Outfit', sans-serif";
    b.style.fontSize = "90%";
    b.addEventListener('click', () => { 
        Reponse(b, !question.is_response_1_true, temps, interval, score, total);
    });

    div.appendChild(content);
    div2.appendChild(a);
    div2.appendChild(b);

    jeu.appendChild(div);
    jeu.appendChild(div2);

    let timerElement = document.getElementById("timer")
    interval = setInterval(() => {
        let minute = Math.floor(temps/60);
        let secondes = temps%60;
    
        secondes = secondes < 10 ? "0" + secondes : secondes
      
        timerElement.innerText = `${minute}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        if(temps==0){
            finJeu(score,total);
        }
      }, 1000)
    
    
    
}


function Reponse(button, is_success, temps, interval, score, total){
    
    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "none";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "none";

    if (is_success) {
        button.style.background="green";
        score +=1;

    }else{
        button.style.background="red";
    }
    total +=1;

    let question = document.querySelector('#question');
    let reponse = document.querySelector('#reponses');

    jeu.removeChild(question);
    jeu.removeChild(reponse);
    
    clearInterval(interval);
    Suivant(temps, score,total);

}
 
function finJeu(score,total){

    let slide = document.querySelector('#second-slide');
    slide.style.background ="#5467d3";

    let menu = document.querySelector('#menu1');
    menu.style.display= "inline";

    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "none";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "none";

    let question = document.querySelector('#question');
    let reponse = document.querySelector('#reponses');
    let timer = document.querySelector('#timer');
    
    jeu.removeChild(question);
    jeu.removeChild(reponse);
    jeu.removeChild(timer);

    let div = document.createElement('div');
    div.setAttribute("id", 'finjeu');

    let lescore = document.createElement('div');
    lescore.setAttribute("id", 'score');
    lescore.style.fontFamily = "'Outfit', sans-serif";
    lescore.style.color= "white";
    lescore.style.fontSize = "60px";
    lescore.style.fontWeight = "900";
    lescore.style.marginTop = "5%";
    lescore.style.textAlign = "center";

    let contentscore = document.createTextNode( score + " / " + total );
    lescore.appendChild(contentscore);
    jeu.appendChild(lescore);

    let commentaire= document.createElement('div');
    commentaire.setAttribute("id", 'comment');

    let appreciation= document.createElement('div');
    appreciation.setAttribute("id", 'appr');

    let contentcom;
    let contentappr;

    console.log(score/total);
    if((score/total)<=0.5 || total ==0){
        console.log("here");
        contentcom = document.createTextNode( "Améliorez vos connaissances en découvrant les Top Tweets de la semaine !" );
        contentappr = document.createTextNode( "Oh oh..." );
    }else{
        if((score/total)<=0.75){
            contentcom = document.createTextNode( "Vous êtes presque un expert ! Améliorez vos connaissances en découvrant les Top Tweets de la semaine !" );
            contentappr = document.createTextNode( "Bravo !");
        }else{
            contentcom = document.createTextNode( "Restez à la page en découvrant les Top Tweets !" );
            contentappr = document.createTextNode( "Mais quel expert !!" );
        }
    }

    commentaire.appendChild(contentcom);
    appreciation.appendChild(contentappr);
    div.appendChild(appreciation);
    
    let content = document.createTextNode("Vous avez eu " + score + " bonnes réponses sur " + total + " questions !!");
    div.appendChild(content);
    jeu.appendChild(div);
    jeu.appendChild(commentaire);

    let rejoue = document.createElement('input');
    rejoue.setAttribute("type", "button");
    rejoue.setAttribute("value", Rejouer);
    rejouer.setAttribute("id", "rejouer");
    rejouer.style.width = "35%";
    rejouer.style.height = "40px";
    rejouer.style.marginLeft = "12%";
    rejouer.style.borderRadius = "80px";
    rejouer.style.boxShadow = "7px 7px 25px 0 rgba(0,0,0,0.25)";
    rejouer.style.border = "none";
    rejouer.style.fontFamily = "'Outfit', sans-serif";
    rejouer.style.fontSize = "90%";
    rejouer.addEventListener('click', () => { 
        (() => Suivant(10,0,0))();
    });

    jeu.appendChild(rejoue);

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
