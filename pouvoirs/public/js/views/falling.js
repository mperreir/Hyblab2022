"use strict";

const falling_slide = function(){
  const playButton = document.querySelector('#next-button');
  // Ligne à corriger avec l'unification de ce qu'on a fait
  playButton.addEventListener("click", event => {
    swiper.slideTo(2);
  });
};

