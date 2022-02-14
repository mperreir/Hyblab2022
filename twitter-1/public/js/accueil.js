"use strict";

//Bouton jouer sur la page d'accueil - permet de commencer le jeu 
let play = document.querySelector('#play');
play.addEventListener('click', () => {
  (() => Suivant(90,0,0))();
});


//Pour chaque bouton du menu - permet de rediriger vers la page en question
for (let i = 1; i <= 3; i++){
  $("#menu-candidat" + i).click(function () { 
    swiper.slideTo(1);
  });

  $("#menu-jeu" + i).click(function () { 
    swiper.slideTo(0);
  });

  $("#menu-top" + i).click(function () { 
    swiper.slideTo(2);
  });
}

