"use strict";

 
let play = document.querySelector('#play');
play.addEventListener('click', () => {
  (() => Suivant(10,0,0))();
});



for (let i = 1; i <= 3; i++){
  $("#menu-candidat" + i).click(function () { 
    swiper.slideTo(2);
  });

  $("#menu-jeu" + i).click(function () { 
    swiper.slideTo(1);
  });

  $("#menu-top" + i).click(function () { 
    swiper.slideTo(3);
  });
}

