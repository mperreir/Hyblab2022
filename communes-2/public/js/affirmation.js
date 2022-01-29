'use strict'

var color_droite = "#5B6C9A";
var color_centre = "#83C49E";
var color_gauche = "#ED6464";


let data={nom:"Bonjfzjekfzkjefkzhfkjzehfjkzefnkjzefkzjnfkjzour"}
// Pour la gauche
page('/communes-2/affirmation-gauche', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'), data);

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });


    var map = document.getElementsByClassName("map");

    var paths = document.querySelectorAll("path");


    // Pour chaque ville, j'ajoute un event listener
    paths.forEach((element) => {
        // Configuration des couleurs
        element.style.fill = color_gauche;

        element.addEventListener("click", (event)=>{
            console.log(event.target.id);
            showInfos(event.target, color_gauche);
        })
    });


    //Slide
    loader();
    showAffirmation(1);
});

// Pour le centre
page('/communes-2/affirmation-centre', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });


    var map = document.getElementsByClassName("map");

    var paths = document.querySelectorAll("path");

    // Pour chaque ville, j'ajoute un event listener
    paths.forEach((element) => {
        // Configuration des couleurs
        element.style.fill = color_centre;

        element.addEventListener("click", (event)=>{
            console.log(event.target.id);
            showInfos(event.target, color_centre);
        })
    });

    //Slide
    loader();
    showAffirmation(1);
});

// Pour la droite
page('/communes-2/affirmation-droite', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    const Retourbtn = document.getElementById("boutonRetour");
    Retourbtn.addEventListener('click', function () {
        page('/communes-2/gameChoice');
    });

    var map = document.getElementsByClassName("map");

    var paths = document.querySelectorAll("path");

    // Pour chaque ville, j'ajoute un event listener
    paths.forEach((element) => {
        // Configuration des couleurs
        element.style.fill = color_droite;
        
        element.addEventListener("click", (event)=>{
            console.log(event.target.id);
            showInfos(event.target, color_droite);
        })
    });    

    //Slide
    loader();
    showAffirmation(1);
});

function loader(){
    // Cacher les panels de superposition :
    let panel = document.getElementById("panel-confirm");
    panel.style.visibility = 'hidden';
    panel.style.opacity = '0';
    panel.style.transition = 'opacity 2s';
}

function clearChoice(color){
    var paths = document.querySelectorAll("path");

    // Pour chaque ville, j'ajoute un event listener
    paths.forEach((element) => {
        // Configuration des couleurs
         element.style.fill = color;
        })
}


function showInfos(elt,color){
    // initialise
    clearChoice(color);
    //Transition affichage
    let panel = document.getElementById("panel-confirm");
    panel.style.visibility = 'visible';
    panel.style.opacity = '100%';
    panel.style.transition = 'opacity 1s';

    let info = document.getElementById("cityname");

    
    let value = elt.id.split("__");
    console.log(value);
    let area = document.getElementById(elt.id);
    area.style.fill = "#282246";
    info.innerHTML = value[1];

}


// Show slider
var slideIndex = 1;


function sliderplus(n) {
    showAffirmation(slideIndex += n);
  }
  
  function slidercurrent(n) {
    showAffirmation(slideIndex = n);
  }
  
  function showAffirmation(n) {
    var i;
    var slides = document.getElementsByClassName("affirmation-content");
    console.log(slides)
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
      }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

let transformMatrix = [1, 0, 0, 1, 0, 0];

function pan(dx, dy) {
    transformMatrix[4] += dx;
    transformMatrix[5] += dy;
    setMatrix();
}

function zoom(scale) {
    for (var i = 0; i < 6; i++) {
        transformMatrix[i] *= scale;
    }

    transformMatrix[4] += (1 - scale) * 800/2;
    transformMatrix[5] += (1 - scale) * 484/2;
    setMatrix();
}

function setMatrix() {
    var newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
    document.getElementById("geojson").setAttributeNS(null, "transform", newMatrix);
}