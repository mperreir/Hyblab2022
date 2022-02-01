"use strict";

 
let play = document.querySelector('#play');
play.addEventListener('click', () => {
  (() => Suivant(60,0,0))();
});



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

