'use strict'

// Show slider
var slideIndex = 1;

page('/communes-2/affirmation', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    let response = await fetch('api/carte');
    const dataCarte = await response.json();

    let response2 = await fetch('api/affirmations')
    let affirmations = await response2.json();

    //Recuperation des div dans lesquelles on va afficher les affirmations
    let divAffirmations = document.getElementsByClassName('affirmation-content')

    //Ajout de l'information a la fin de l'affirmation
    for (let i = 0; i < affirmations.length; i++) {
        let gameData = JSON.parse(localStorage.getItem('gameData'));
        let informations = affirmations[i]['columns'];
        if(informations.length > 1) {
            for(let j = 0; j < informations.length-1; j++) {
                affirmations[i]['string'] += gameData['communeCourante'][informations[j]] +", ";
            }
            affirmations[i]['string'] += gameData['communeCourante'][informations[informations.length-1]]+".";
        }

        else affirmations[i]['string'] += gameData['communeCourante'][informations]+".";
    }

    //parcourt des div et insertion des affirmations
    for (let i = 0; i < divAffirmations.length; i++) {
        divAffirmations.item(i).textContent = affirmations[i]['string'];
    }

    showAffirmation(slideIndex);

    // ------ Gestion de la map
    var map = L.map('map').setView([46.87,-1.64], 8);
    // On affiche la map google maps derrière.
    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        /*attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',*/
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    // On ajoute le fichier GEOJson comme une couche.
    L.geoJson(dataCarte, {
        // Plusieurs paramètres pour pouvoir modifier ce qu'on affiche, la manière dont on l'affiche, etc.
        // Voir ici les différentes possiblités pour les options : https://leafletjs.com/examples/geojson/

        // Changement de la couleur en fonction de la propriété "orientation"
        style : function(feature, layer) {
            switch (feature.properties.orientation) {
                case "Centre": return {color: "#00ff00"};
                case "Droite": return {color: "#0000ff"};
                case "Gauche": return {color: "#ff0000"};
            }
        },
        // Affichage des villes qui ont seulement la proprité orientation à "Gauche" ou à "Droite"
        filter: function(feature, layer) {
            return feature.properties.orientation == "Gauche" || feature.properties.orientation == "Droite";
        },
        // Pour chaque ville.
        onEachFeature: function(feature, layer) {
            // Voir ici les différentes possibilités pour chaque layer : https://leafletjs.com/reference.html#layer

            // Affichage d'un popup avec la propriété "nom" quand on click dessus.
            layer.bindPopup(feature.properties.nom);
            // Lors d'un click, on appelle la fonction "whenClicked"
            layer.on({
                click: whenClicked
            });
        }
    }).addTo(map);

    function whenClicked(e) {
        console.log(e.target.feature.properties.nom);
    }
});

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