"use strict";

const init_thanks = function(){
  const background = createAnimation("thanks-background","data/animations/MERCI_2.json",true);
  background.play();
  document.querySelector("#thanks-background #thanks-text").innerHTML = getText("thanks");

  setTimeout(() =>  {
    wrapper_nextSlide();
  }, 5000)
};