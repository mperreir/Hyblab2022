'use strict'

// Show slider
var slideIndex;

page('/communes-2/affirmation', async function () {
    await renderTemplate(templates('./templates/affirmation.mustache'));

    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let indiceP = document.getElementById('indiceText');
    if (gameData['numeroEssai'] == 2) {
        indiceP.innerHTML="";
        let response3 = await fetch('api/indice/' + gameData['communeCourante']['libelleCommune']);
        let indice = await response3.json();
        indiceP.innerHTML = indice['string'];

        showmesg("Mauvaise réponse", "#ED6464");

        // Affichage box affirmation
        var aff_box = document.getElementById("affirmation");
        aff_box.style.bottom ="-190px";

        var indice_box = document.getElementById("indice-box");
        indice_box.style.bottom ="0";

    } else {
        indiceP.innerHTML = "Pas d'indice au premier essai !";
    }

    const nbMaxCommunes = 5;
    let response = await fetch('api/carte');
    const dataCarte = await response.json();

    // Recuperation des données du jeu et affichage du nombre actuel
    let nombreCommuneActuelle = document.getElementById('numeroCommuneActuelle');
    let nombreCommuneMax = document.getElementById('numeroCommuneMax');

    let nbCommuneActuelle = nbMaxCommunes - gameData['communes'].length;

    nombreCommuneMax.innerHTML = nbMaxCommunes;
    nombreCommuneActuelle.innerHTML = nbCommuneActuelle;

    let response2 = await fetch('api/affirmations/' + gameData['communeCourante']['libelleCommune']);
    let affirmations = await response2.json();

    //Recuperation des div dans lesquelles on va afficher les affirmations
    let divAffirmations = document.getElementsByClassName('affirmation-content')


    //parcourt des div et insertion des affirmations
    for (let i = 0; i < divAffirmations.length; i++) {
        divAffirmations.item(i).textContent = affirmations[i]['string'];
    }

    slideIndex = 1;
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

    let box_aff = document.getElementById("sliderline-aff");

    let box_af = document.getElementById("affirmation");
    box_af.addEventListener("click", (event)=>{
        if (box_af !== event.target && box_aff !== event.target ) return;
        var bo = document.getElementById("affirmation");
        bo.style.bottom ="-190px";

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
        //if (indicebox !== event.target) return;
        var indiceb = document.getElementById("indice-box");
        indiceb.style.bottom ="-190px";

        var slider = document.getElementById("slider");
        slider.style.bottom ="0";
    });

    // ------ Gestion de la map
    var map = L.map('map', {
        zoomSnap: 0.5
    }).setView([47.00,-1.70], 8.5);

    let responseIcons = await fetch('api/icons');
    let iconsJson = await responseIcons.json();

    var iconsGroup1 = new L.FeatureGroup();
    var iconsGroup2 = new L.FeatureGroup();
    var iconsGroup3 = new L.FeatureGroup();

    iconsJson['zoomMin']['icons'].forEach(iconData => {
        iconsGroup1.addLayer(L.marker([
                iconData['position']['x'], 
                iconData['position']['y']
            ],
            {
                icon: L.icon({
                    iconUrl: iconData['iconUrl'],
                    iconSize: [iconsJson['zoomMin']['properties']['sizeX'],iconsJson['zoomMin']['properties']['sizeY']],
                    iconAnchor: [iconsJson['zoomMin']['properties']['anchorX'],iconsJson['zoomMin']['properties']['anchorY']]
                }),
                interactive: false
            }
        ));

    });

    iconsJson['zoomInter']['icons'].forEach(iconData => {
        iconsGroup2.addLayer(L.marker([
                iconData['position']['x'], 
                iconData['position']['y']
            ],
            {
                icon: L.icon({
                    iconUrl: iconData['iconUrl'],
                    iconSize: [iconsJson['zoomInter']['properties']['sizeX'],iconsJson['zoomInter']['properties']['sizeY']],
                    iconAnchor: [iconsJson['zoomInter']['properties']['anchorX'],iconsJson['zoomInter']['properties']['anchorY']]
                }),
                interactive: false
            }
        ));

    });

    iconsJson['zoomMax']['icons'].forEach(iconData => {
        iconsGroup3.addLayer(L.marker([
                iconData['position']['x'], 
                iconData['position']['y']
            ],
            {
                icon: L.icon({
                    iconUrl: iconData['iconUrl'],
                    iconSize: [iconsJson['zoomMax']['properties']['sizeX'],iconsJson['zoomMax']['properties']['sizeY']],
                    iconAnchor: [iconsJson['zoomMax']['properties']['anchorX'],iconsJson['zoomMax']['properties']['anchorY']]
                }),
                interactive: false
            }
        ));

    });

    map.on('zoomend', function() {
        let zoom = map.getZoom();
        if(zoom <= 8.5 && zoom > 7.5) {
            map.removeLayer(iconsGroup2);
            map.removeLayer(iconsGroup3);
            map.addLayer(iconsGroup1);
        } else if (zoom > 8.5 && zoom <= 9.5) {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup3);
            map.addLayer(iconsGroup2);
        } else if (zoom > 9.5 && zoom <= 11) {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup2);
            map.addLayer(iconsGroup3);
        } else {
            map.removeLayer(iconsGroup1);
            map.removeLayer(iconsGroup2);
            map.removeLayer(iconsGroup3);
        }
    });

    map.addLayer(iconsGroup1);

    /* ------------------------------------------------------------ */
    // On affiche la map google maps derrière.
    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        /*attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',*/
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });//.addTo(map);

    map.zoomControl.remove();


    const exteriorStyleDroite = {
        "color": "#445072", //#5B6C9A
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    const exteriorStyleGauche = {
        "color": "#9F4B3F", //#EA6D5B
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    const exteriorStyleCentre = {
        "color": "#619275", //#83C49E
        "fillColor": "#F0E4D8",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 1
    };

    // On ajoute le fichier GEOJson comme une couche.
    L.geoJson(dataCarte, {
        // Plusieurs paramètres pour pouvoir modifier ce qu'on affiche, la manière dont on l'affiche, etc.
        // Voir ici les différentes possiblités pour les options : https://leafletjs.com/examples/geojson/

        // Changement de la couleur en fonction de la propriété "orientation"
        style : function(feature, layer) {
            switch (gameData['orientation']) {

                case "Centre":
                    switch (feature.properties.orientation) {
                        case "Centre": return {color: "#619275", fillColor: "#83C49E", weight: 1, fillOpacity: 1};
                        case "Droite": return exteriorStyleCentre; // gris
                        case "Gauche": return exteriorStyleCentre; // gris
                    };
                case "Droite":
                    switch (feature.properties.orientation) {
                        case "Centre": return exteriorStyleDroite; // gris
                        case "Droite": return {color: "#445072", fillColor: "#5B6C9A", weight: 1, fillOpacity: 1};
                        case "Gauche": return exteriorStyleDroite; // gris
                    };
                case "Gauche":
                    switch (feature.properties.orientation) {
                        case "Centre": return exteriorStyleGauche; // gris
                        case "Droite": return exteriorStyleGauche; // gris
                        case "Gauche": return {color: "#9F4B3F", fillColor: "#EA6D5B", weight: 1, fillOpacity: 1};
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
                    click: popup
                });
            }

        }
    }).addTo(map);

    let reject = document.getElementById("reject-btn");
    reject.addEventListener("click", (event)=>{
        let infobox = document.getElementById("panel-confirm");
        infobox.style.visibility = "hidden";
    });

    let accept = document.getElementById("confirm-btn");
    accept.addEventListener("click", ()=>{
        let infobox = document.getElementById("panel-confirm");
        let selectedValue = document.getElementById("counrty-name").innerHTML;
        infobox.style.visibility = "hidden";
        // On passe au truc suivant.
        roundEnding(selectedValue, gameData['communeCourante']['libelleCommune']);
    });

    // Affichage c'est partie
    if(gameData['numeroEssai'] == 1){
        showmesg("C\'est parti !", "#282246");
    }
});

function popup(e){
    let selectedValue = e.target.feature.properties.nom;
    let infobox = document.getElementById("panel-confirm");
    infobox.style.visibility = "visible";

    let p = document.getElementById("counrty-name");
    p.innerHTML = selectedValue;
}

function roundEnding(selectedValue, rightValue) {
    let scoreRound = 0;
    let nbEssaiSuivant = 1;
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    let nbCommunesJouees = gameData['nbreCommunesJouees'];
    let communePrecedente = gameData['communePrecedente'];

    if(gameData['numeroEssai'] == 1) {
        if(selectedValue == rightValue) {
            // Gagné premier.
            scoreRound = 5000;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu premier essai
            nbEssaiSuivant = 2;
        }
    } else {
        if (selectedValue == rightValue) {
            // Gagné deuxieme essai
            scoreRound = 2500;
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
        } else {
            // Perdu deuxieme essai
            nbCommunesJouees++;
            communePrecedente = gameData['communeCourante'];
            calculateScore(selectedValue, rightValue).then(score => {
                localStorage.setItem('gameData', JSON.stringify({
                    'orientation': gameData['orientation'],
                    'score' : gameData['score'] + score,
                    'scoreIntermediaire': score,
                    'nbreCommunesTrouvees': gameData['nbreCommunesTrouvees'] + (selectedValue == rightValue ? 1 : 0),
                    'nbreCommunesJouees': nbCommunesJouees,
                    'numeroEssai': nbEssaiSuivant,
                    'communePrecedente': communePrecedente,
                    'communeCourante' : nbEssaiSuivant == 2 ? gameData['communeCourante'] : gameData['communes'].pop(),
                    'communes': gameData['communes']
                }));
                page('/communes-2/resultatInterFalse');
            });
        }
    }

    if(selectedValue == rightValue || gameData['numeroEssai'] == 1) {
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
    }


    // REDIRECTION VERS LA BONNE PAGE.
    if(selectedValue == rightValue) page('/communes-2/resultatInterTrue')
    else {
        // Si on s'est trompés et que c'était le second essai, on arrive sur la page d'échec, sinon sur la page avec un indice en plus
        if(nbEssaiSuivant == 2) page('/communes-2/affirmation');
    }


}

/**
 * Calcule le score obtenu pour le second tour. On se base sur la distance entre la ville sélectionnée et la bonne ville.
 *
 * @param {String} selectedValue
 * @param {String} rightValue
 */
async function calculateScore(selectedValue, rightValue) {
    const scoreReussite = 2500;
    const maxScoreEchec = 2000;

    if(selectedValue == rightValue) return scoreReussite;

    /**
     * Pour les coordonnées, on utilisera la première valeur du tableau coordinates du geojson.json
     * En valeur de référence, on prendra la plus grande distance possible (à déterminer).
     * On fait le ratio entre la distance entre les selectedValue et rightValue sur la plus grande distance, que l'on multiplie par le scoreMax.
     **/

    const distanceMax = 179378; // Cela correspond à la distance en mètres la plus longue en Loire-Atlantique, entre les bords éloignés de Piriac-sur-Mer et Montrelais
    let scoreRetour = await fetch('api/distance/' + selectedValue + '/' + rightValue)
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        let score = (1 - (responseJson / distanceMax)) * maxScoreEchec;
        return Math.round(score);
    });
    return scoreRetour;
}

function sliderplus(n) {
    showAffirmation(slideIndex += n);
}

function slidercurrent(n) {
    showAffirmation(slideIndex = n);
}

function showAffirmation(n) {
    var i;
    var slides = document.getElementsByClassName("affirmation-content");
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

// Show firt message !
function showmesg(message, color){
    let msg = document.getElementById("message");
    msg.innerHTML=message;
    msg.style.color = color;
    msg.removeAttribute("class");
    msg.setAttribute("class", "reem-kufi" );
    msg.setAttribute("class", "fadeOutLeft" );
}

// sleep
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }