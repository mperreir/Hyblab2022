"use strict";

const initSlide3 = function(){
    const vector = document.querySelector('#vector3');
    vector.addEventListener('click', () => {
      swiper.slideNext()
      initSlide4();
    });
  
    anime({
      targets: '#vector3',
      scale: 1.1,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    });
};