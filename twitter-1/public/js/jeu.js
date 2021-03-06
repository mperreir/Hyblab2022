
// La fonction Suivant est appelée pour chaque nouvelle question du jeu
async function Suivant(temps,score,total) {

    //On affiche les bulles de dialogue et change la couleur de fond de la page
    let jeu = document.querySelector('#jeu');
    let bulle = document.querySelector('#bulle');
    bulle.style.display= "inline";

    let bulle2 = document.querySelector('#bulle2');
    bulle2.style.display= "inline";

    let menu = document.querySelector('#menu1');
    menu.style.display= "none";

    let slide = document.querySelector('#second-slide');
    slide.style.background ="#a08aff";
    
    //Si il s'agit de la première question, on enlève toutes les informations qui étaient contenue sur le menu
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

    //Dans l'autre cas, on enlève les questions et reponses précédentes
    try {
        jeu.removeChild(question);
        jeu.removeChild(reponse);
    } catch {}

    //On remet à jour le Timer à chaque question jusqu'à ce que celui-ci atteigne 0 puis on affiche les résultats
    let timerElement = document.getElementById("timer")

    let interval = setInterval(() => {
        let minute = Math.floor(Math.floor(temps/2) / 60);
        let secondes = Math.floor(Math.floor(temps/2) % 60);

        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `${minute}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        if (temps === 0) {
            clearInterval(interval);
            finJeu(score, total);
        }
    }, 500);

    //On recherche dans notre base de données une question et sa réponse
    const question = await fetchResponse();

    //On crée les différents éléments : le div contenant la question, les boutons de réponses...
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
    div.appendChild(content);
    jeu.appendChild(div);

    let div2 = document.createElement('div');
    div2.setAttribute("id", 'reponses');
    div2.style.position = "absolute";
    div2.style.top = "73%";
    div2.style.width = "100%";

    let image = document.createElement('img');
    image.src="img/emotes/twitter-1.png";
    image.setAttribute("id","image1");
    image.setAttribute("class","rotateimg20");
    image.style.width="23%";
    image.style.position = "absolute";
    image.style.top = "23%";
    image.style.left = "68%";
    image.style.zIndex = "5";
    jeu.appendChild(image);

    //Pour que le joueur ne puisse pas répondre aux questions sans les lire, on délait l'apparition des boutons de réponses d'une demi seconde
    setTimeout(()=>{
        //Les deux boutons contiennent 2 réponses possibles, l'une vraie, l'autre fausse
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
        a.style.fontSize = "80%";
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
        b.style.fontSize = "80%";
        b.addEventListener('click', () => { 
            Reponse(b, !question.is_response_1_true, temps, interval, score, total);
        });

        div2.appendChild(a);
        div2.appendChild(b);

        jeu.appendChild(div2);
     },500);  
    
    
}

//Lorsqu'un bouton est cliqué, la fonction Reponse est appelée
function Reponse(button, is_success, temps, interval, score, total){
    
    //On calcule le score du joueur et on augmente le nombre de question passée
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
 
//Lorsque le timer est arrivé à 0 , on affiche l'écran de réponse
function finJeu(score,total){
    // clearInterval(interval);

    //On change la couleur de fond et on enlève les éléments des questions - les bulles
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

    //On rajoute les éléments présents sur l'écran de fin : le score et un commentaire dépendant de celui-ci

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

    //Les messages affichés dépendent du score du joueur
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
    image.style.width="40%";
    image.style.position = "relative";
    image.style.top = "50%";
    image.style.left = "25%";

    jeu.appendChild(image);

    //On ajoute également à la page les 3 boutons : Rejouer, Voir Top tweets et partager son résultat
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

    //Lorsqu'on partage son résultat sur Twitter, un message personalisé est affiché
    let partager = document.createElement('input');
    partager.setAttribute("type", "button");
    partager.setAttribute("value", "Partager");
    partager.setAttribute("id", "partager");
    partager.setAttribute("class", "btn-end-game");
    partager.addEventListener('click', () => { 
        url = "https://twitter.com/intent/tweet?text=J%27ai%20eu%20"+score+"%20sur%20"+total+"%20en%20jouant%20%C3%A0%20%23PlayLys%C3%A9e%20!!%0AToi%20aussi%20apprends%20en%20plus%20sur%20les%20actualit%C3%A9s%20Twitter%20des%20candidats%20%C3%A0%20la%20pr%C3%A9sidentielle%20!%0A%40LeTelegramme"
        window.open(url);
    });


    btn_action_jeu.appendChild(rejoue);
    btn_action_jeu.appendChild(goTopTweets);
    btn_action_jeu.appendChild(partager);
    jeu.appendChild(btn_action_jeu) ;
}

//Lorsqu'on clique sur Rejouer, la fonction clear est appelée afin d'enlever toutes les infos se trouvant sur la page et préparer le début d'une nouvele partie
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

    //On relance le jeu
    (() => Suivant(90,0,0))();

}

//La fonction permet de rechercher les questions et réponses dans l'API
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
