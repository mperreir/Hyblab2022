"use strict";

const falling_slide = function(){
  const playButton = document.querySelector('#next-button');
  const rules = createAnimation("background-falling","data/animations/rules.json",true);
  // Ligne à corriger avec l'unification de ce qu'on a fait
  playButton.addEventListener("click", event => {
    swiper.slideTo(2);
  });
  rules.play();
};

