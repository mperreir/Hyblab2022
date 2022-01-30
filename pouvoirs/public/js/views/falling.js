"use strict";

const falling_slide = function(){
  const playButton = document.querySelector('#next-button');
  const fallingEffect = createAudio("data/sounds/fallingEffect.mp3");
  const rules = createAnimation("background-falling","data/animations/rules.json",true);
  rules.play();
  // Ligne à corriger avec l'unification de ce qu'on a fait
  playButton.addEventListener("click", event => {
    //fallingEffect.play();
    swiper.slideTo(2);
  });
  
};

