'use strict'

// Show slider
var slideIndex = 1;

page('/communes-2/affirmation', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    let selectedValue = null;

    let response = await fetch('api/carte');
    const dataCarte = await response.json();

    let response2 = await fetch('api/affirmations')
    let affirmations = await response2.json();

    //Recuperation des div dans lesquelles on va afficher les affirmations
    let divAffirmations = document.getElementsByClassName('affirmation-content')
    let gameData = JSON.parse(localStorage.getItem('gameData'));

    //Ajout de l'information a la fin de l'affirmation
    for (let i = 0; i < affirmations.length; i++) {
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

    function test(nom) {
        console.log(nom);
    }

    // ------ Gestion de la map

    var map = L.map('map').setView([47.23,-1.70], 8);
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
            switch (gameData['orientation']) {

                case "Centre": 
                    switch (feature.properties.orientation) {
                        case "Centre": return {color: "#83C49E", opacity: 1};
                        case "Droite": return {color: "#A0A0A0", opacity: 0.1}; // gris
                        case "Gauche": return {color: "#A0A0A0", opacity: 0.1}; // gris
                    };
                case "Droite":
                    switch (feature.properties.orientation) {
                        case "Centre": return {color: "#A0A0A0", opacity: 0.1}; // gris
                        case "Droite": return {color: "#5B6C9A", opacity: 1};
                        case "Gauche": return {color: "#A0A0A0", opacity: 0.1}; // gris
                    };
                case "Gauche":
                    switch (feature.properties.orientation) {
                        case "Centre": return {color: "#A0A0A0", opacity: 0.1}; // gris
                        case "Droite": return {color: "#A0A0A0", opacity: 0.1}; // gris
                        case "Gauche": return {color: "#EA6D5B", opacity: 1};
                    };
            }
        },
        // Affichage des villes qui ont seulement la proprité orientation à "Gauche" ou à "Droite"
        filter: function(feature, layer) {
            return true;
        },
        // Pour chaque ville.
        onEachFeature: function(feature, layer) {
            // Voir ici les différentes possibilités pour chaque layer : https://leafletjs.com/reference.html#layer

            // Affichage d'un popup avec la propriété "nom" quand on click dessus.
            if(feature.properties.orientation == gameData['orientation']) {
                // Lors d'un click, on appelle la fonction "whenClicked"

                layer.on({
                    click: popupClicked
                }); 
            }

        }
    }).addTo(map);

    function popupClicked(e) {
        let layer = e.target
        let selectedValue = e.target.feature.properties.nom;

        if(layer.hasOwnProperty('_popup')) {
            layer.unbindPopup();
        }
        
        // TODO : styliser le popup
        layer.bindPopup(
            '<p>' + selectedValue + '</p>' +
            '<input type="button" value = "Oui" id="validateBtn" class="popupBtn" />' + 
            '<input type="button" value = "Non" id="closeBtn" class="popupBtn" />'
        ).openPopup();

                        
        let validateBtn = L.DomUtil.get('validateBtn');
        let closeBtn = L.DomUtil.get('closeBtn');
           
        L.DomEvent.addListener(validateBtn, 'click', function(e) {
            // On passe au truc suivant.
            console.log(selectedValue);
        });

        L.DomEvent.addListener(closeBtn, 'click', function(e) {
            // On ferme juste la Popup.
            layer.closePopup();
        });
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