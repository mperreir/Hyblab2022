"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){

  const vector = document.querySelector('#vector1');
  vector.addEventListener('click', () => {
    swiper.slideNext()
    initSlide2();
  });

  anime({
    targets: '#vector1',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });
};