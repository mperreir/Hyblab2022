'use strict'

// Show slider
var slideIndex = 1;


page('/communes-2/affirmation', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    let selectedValue = null;
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    console.log(gameData);

    // EWEN POUR TESTER SI ON EST AU DEUXIEME ESSAI (donc qu'il faut afficher indice en plus) 

    if (gameData['numeroEssai'] == 2) {

    }

    // FIN

    const nbMaxCommunes = 5;

    let response = await fetch('api/carte');
    const dataCarte = await response.json();

    let response2 = await fetch('api/affirmations')
    let affirmations = await response2.json();

    let response3 = await fetch('api/indice');
    let indice = await response3.json();

    console.log(indice);

    //Recuperation des div dans lesquelles on va afficher les affirmations
    let divAffirmations = document.getElementsByClassName('affirmation-content')

    // Recuperation des données du jeu et affichage du nombre actuel
    let nombreCommuneActuelle = document.getElementById('numeroCommuneActuelle');
    let nombreCommuneMax = document.getElementById('numeroCommuneMax');

    let nbCommuneActuelle = nbMaxCommunes - gameData['communes'].length;

    nombreCommuneMax.innerHTML = nbMaxCommunes;
    nombreCommuneActuelle.innerHTML = nbCommuneActuelle;

    //Ajout de l'information a la fin de l'affirmation
    for (let i = 0; i < affirmations.length; i++) {
        let informations = affirmations[i]['columns'];

        let compteur = 0;
        //On va de A à Z
        for(let asciiCode = 65; asciiCode < 91; asciiCode++) {
            let letter = String.fromCharCode(asciiCode);
            let pattern = letter+letter+letter; //Le pattern est de type AAA, BBB, ZZZ dans le json
            if(affirmations[i]['string'].includes(pattern)) {

                //Remplacement du pattern par l'information correspondante
                affirmations[i]['string'] = affirmations[i]['string'].replace(pattern, gameData['communeCourante'][informations[compteur]]);
                compteur++;
            }

            else break; //Si plus de pattern correspondant, on stoppe la boucle
        }
    }

    //parcourt des div et insertion des affirmations
    for (let i = 0; i < divAffirmations.length; i++) {
        divAffirmations.item(i).textContent = affirmations[i]['string'];
    }

    showAffirmation(slideIndex);

    

    // Add event click on affirmation box
    let slide = document.getElementById("show");
    slide.addEventListener("click", (event)=>{
        if (slide !== event.target) return;
        var slider = document.getElementById("slider");
        slider.style.bottom ="-190px";

        var box = document.getElementById("affirmation");
        box.style.bottom = "0";
    });

    let box_aff = document.getElementById("affirmation");
    box_aff.addEventListener("click", (event)=>{
        if (box_aff !== event.target) return;
        var box = document.getElementById("affirmation");
        box.style.bottom ="-190px";

        var slider = document.getElementById("slider");
        slider.style.bottom = "0";
    });

    let indicebutton = document.getElementById("indice");
    indicebutton.addEventListener("click", (event)=>{
        if (indicebutton !== event.target) return;
        var indicebox = document.getElementById("indice-box");
        indicebox.style.bottom ="0";

        var slider = document.getElementById("slider");
        slider.style.bottom ="-190px";
    });

    let indicebox = document.getElementById("indice-box");
    indicebox.addEventListener("click", (event)=>{
        if (indicebox !== event.target) return;
        var indiceb = document.getElementById("indice-box");
        indiceb.style.bottom ="-190px";

        var slider = document.getElementById("slider");
        slider.style.bottom ="0";
    });

    // ------ Gestion de la map

    var map = L.map('map').setView([47.23,-1.70], 8);
    var bounds = [[47.856,-2.63],[46.845,-0.895]];
    //var img = L.imageOverlay('img/ZOOM3_DROITE.svg', bounds).addTo(map);
    //map.fitBounds(bounds);

    // On affiche la map google maps derrière.

    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        /*attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',*/
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    map.zoomControl.remove();

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
            roundEnding(selectedValue, gameData['communeCourante']['libelleCommune']);

        });

        L.DomEvent.addListener(closeBtn, 'click', function(e) {
            // On ferme juste la Popup.
            layer.closePopup();
        });
    }

});

function roundEnding(selectedValue, rightValue) {

    let scoreRound = 0;
    let nbEssaiSuivant = 1;
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let nbCommunesJouees = gameData['nbreCommunesJouees'];
    let communePrecedente = gameData['communePrecedente'];

    if(gameData['numeroEssai'] == 1) {
        if(selectedValue == rightValue) {
            // Gagné premier.
            console.log('Gagne premier');
            scoreRound = 5000;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu premier essai
            console.log('Perdu premier');
            nbEssaiSuivant = 2;
        }
    } else {
        if (selectedValue == rightValue) {
            // Gagné deuxieme essai
            console.log('Gagne second');
            scoreRound = 2500;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu deuxieme essai*
            console.log('Perdu second');
            // TODO : Calcul du score
            scoreRound = 1250;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        }
    }

    // changer game data et localstorage.
    // passer page inter.
    localStorage.setItem('gameData', JSON.stringify({
        'orientation': gameData['orientation'],
        'score' : gameData['score'] + scoreRound,
        'scoreIntermediaire': scoreRound,
        'nbreCommunesTrouvees': gameData['nbreCommunesTrouvees'] + (selectedValue == rightValue ? 1 : 0),
        'nbreCommunesJouees': nbCommunesJouees,
        'numeroEssai': nbEssaiSuivant,
        'communePrecedente': communePrecedente,
        'communeCourante' : nbEssaiSuivant == 2 ? gameData['communeCourante'] : gameData['communes'].pop(),
        'communes': gameData['communes']
    }));

    // REDIRECTION VERS LA BONNE PAGE. 
    if(selectedValue == rightValue) page('/communes-2/resultatInterTrue')
    else {
        // Si on s'est trompés et que c'était le second essai, on arrive sur la page d'échec, sinon sur la page avec un indice en plus
        nbEssaiSuivant == 1 ? page('/communes-2/resultatInterFalse') : page('/communes-2/affirmation');
    }
}

function sliderplus(n) {
    showAffirmation(slideIndex += n);
  }

  function slidercurrent(n) {
    showAffirmation(slideIndex = n);
  }

  function showAffirmation(n) {
    slide();
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