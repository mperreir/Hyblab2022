"use strict";

// async init function (because of the awaits on fetches)
const falling_slide = function(){
  const playButton = document.querySelector('#next-button');
  // Ligne à corriger avec l'unification de ce qu'on a fait
  playButton.addEventListener("click", event => swiper.next);
};

homepage_slide();