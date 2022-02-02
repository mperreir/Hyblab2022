
//(() => Suivant(30,0,0))();

async function Suivant(temps,score,total) {

    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "inline";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "inline";

    let menu = document.querySelector('#menu1');
    menu.style.display= "none";

    let slide = document.querySelector('#second-slide');
    slide.style.background ="#a08aff";
    
    try {
        let text = document.querySelector('#text');
        let choix = document.querySelector('#choix');
        let svg = document.querySelector('#logo-svg');
        let images = document.querySelector('#images');
        jeu.removeChild(text);
        jeu.removeChild(choix);
        jeu.removeChild(svg);
        jeu.removeChild(images);
    } catch {}

    try {
        jeu.removeChild(question);
        jeu.removeChild(reponse);
    } catch {}

    let timerElement = document.getElementById("timer")
    let interval = setInterval(() => {
        let minute = Math.floor(temps / 60);
        let secondes = Math.floor(temps % 60);

        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `${minute}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        if (temps === 0) {
            clearInterval(interval);
            finJeu(score, total);
        }
    }, 1000);

    const question = await fetchResponse();

    let div = document.createElement('div');
    div.setAttribute("id", 'question');
    div.style.position = "absolute";
    div.style.top = "34%";
    div.style.left = "5%";
    div.style.width = "75%";
    div.style.minHeight = "100px";
    div.style.maxHeight = "35%";
    div.style.marginLeft = "7%";
    div.style.overflow = "hidden";
    div.style.background="none";
    div.style.marginTop = "5%";
    div.style.padding = "5px";
    div.style.fontSize = "90%";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";

    let content = document.createElement('div');
    content.innerHTML = question.text;

    let div2 = document.createElement('div');
    div2.setAttribute("id", 'reponses');
    div2.style.position = "absolute";
    div2.style.top = "73%";
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

    let image = document.createElement('img');
    image.src="img/emotes/twitter-1.png";
    image.setAttribute("id","image1");
    image.setAttribute("class","rotateimg20");
    image.style.width="23%";
    image.style.position = "absolute";
    image.style.top = "23%";
    image.style.left = "68%";
    image.style.zIndex = "5";

    div.appendChild(content);
    div2.appendChild(a);
    div2.appendChild(b);

    jeu.appendChild(div);
    jeu.appendChild(div2);
    jeu.appendChild(image);   
    
    
}


function Reponse(button, is_success, temps, interval, score, total){
    
    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "none";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "none";

    let imagetweet = document.querySelector('#image1');
    jeu.removeChild(imagetweet);

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
    temps = temps-0.5;
    Suivant(temps, score,total);

}
 
function finJeu(score,total){
    // clearInterval(interval);

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
    let timerElement = document.querySelector('#timer');
    let imagetweet = document.querySelector('#image1');
    
    jeu.removeChild(question);
    jeu.removeChild(reponse);
    jeu.removeChild(timerElement);
    jeu.removeChild(imagetweet);

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
    commentaire.setAttribute("id", 'commentaire');
    commentaire.style.color= "white";
    commentaire.style.fontSize = "20px";
    commentaire.style.marginTop = "5%";
    commentaire.style.textAlign = "center";

    let appreciation= document.createElement('div');
    appreciation.setAttribute("id", 'appr');
    appreciation.style.fontFamily = "'Outfit', sans-serif";
    appreciation.style.color= "white";
    appreciation.style.fontSize = "30px";
    appreciation.style.fontWeight = "500";
    appreciation.style.marginTop = "5%";
    appreciation.style.textAlign = "center";

    let contentcom;
    let contentappr;

    console.log(score/total);
    if((score/total)<=0.5 || total === 0){
        console.log("here");
        contentcom = document.createTextNode( "Vous avez raté quelques actus Twitter cette semaine. Pas de problèmes, remettez-vous à niveau en consultant les tweets qui ont le plus fait réagir." );
        contentappr = document.createTextNode( "OH OH..." );
    }else{
        if((score/total)<=0.75){
            contentcom = document.createTextNode( "Vous êtes au top de l'actu Twitter de la semaine ! Découvrez plus de détails sur les thématiques qui font parler." );
            contentappr = document.createTextNode( "BRAVO !");
        }else{
            contentcom = document.createTextNode( "Vous êtes au top de l'actu Twitter de la semaine ! Restez à la page en consultant les tweets qui ont le plus fait réagir." );
            contentappr = document.createTextNode( "QUEL EXPERT !!" );
        }
    }

    commentaire.appendChild(contentcom);
    appreciation.appendChild(contentappr);
    jeu.appendChild(appreciation);
    
    let content = document.createTextNode("Vous avez eu " + score + " bonnes réponses sur " + total + " questions !!");
    div.appendChild(content);
    div.appendChild(commentaire);
    div.style.fontFamily = "'Outfit', sans-serif";
    div.style.color= "white";
    div.style.fontSize = "20px";
    div.style.marginTop = "5%";
    div.style.textAlign = "center";
    div.style.padding = "1%";
    jeu.appendChild(div);
    

    let image = document.createElement('img');
    image.src="img/etoiles-1.png";
    image.setAttribute("id","etoile");
    image.style.width="60%";
    image.style.position = "absolute";
    image.style.top = "48%";
    image.style.left = "25%";

    jeu.appendChild(image);

    let btn_action_jeu = document.createElement('div');
    btn_action_jeu.setAttribute("class", "container-btn-end-game");

    let rejoue = document.createElement('input');
    rejoue.setAttribute("type", "button");
    rejoue.setAttribute("value", "Rejouer");
    rejoue.setAttribute("id", "rejouer");
    rejoue.setAttribute("class", "btn-end-game");
    rejoue.addEventListener('click', () => { 
        clear();
    });

    let goTopTweets = document.createElement('input');
    goTopTweets.setAttribute("type", "button");
    goTopTweets.setAttribute("value", "Voir les tops tweets");
    goTopTweets.setAttribute("class", "btn-end-game");
    goTopTweets.addEventListener('click', () => {
        swiper.slideTo(2);
    });

    let partager = document.createElement('input');
    partager.setAttribute("type", "button");
    partager.setAttribute("value", "Partager");
    partager.setAttribute("id", "partager");
    partager.setAttribute("class", "btn-end-game");
    partager.addEventListener('click', () => { 
        window.open("https://twitter.com/");
    });

    btn_action_jeu.appendChild(rejoue);
    btn_action_jeu.appendChild(goTopTweets);
    btn_action_jeu.appendChild(partager);
    jeu.appendChild(btn_action_jeu) ;
}

function clear(){

    let boutons = document.querySelector('.container-btn-end-game');
    let fin = document.querySelector('#finjeu');
    let score = document.querySelector('#score');
    let comment = document.querySelector('#appr');
    let image = document.querySelector('#etoile');
    jeu.removeChild(boutons);
    jeu.removeChild(fin);
    jeu.removeChild(score);
    jeu.removeChild(comment);
    jeu.removeChild(image);
    let slide = document.querySelector('#second-slide');
    slide.style.background ="#a08aff";
    
    let timer = document.createElement('div');
    timer.setAttribute("id", 'timer');
    jeu.appendChild(timer);

    (() => Suivant(45,0,0))();

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
