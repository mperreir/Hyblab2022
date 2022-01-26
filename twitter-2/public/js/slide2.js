"use strict";

// Just animate the logo
const initSlide2 = function(){
  const vector = document.querySelector('#vector2');
  vector.addEventListener('click', () => {
    swiper.slideNext()
    initSlide3();
  });

  anime({
    targets: '#vector2',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};