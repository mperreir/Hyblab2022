"use strict";

 
let play = document.querySelector('#play');
play.addEventListener('click', () => {
  (() => Suivant(10,0,0))();
});

let candidat = document.querySelector('#candidat');
candidat.addEventListener('click', () => {
  swiper.slideNext();
});

