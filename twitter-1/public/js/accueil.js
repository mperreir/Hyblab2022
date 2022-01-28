"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){

  // Animate hyblab logo and make shrink on click
  anime({
    targets: '#logo-hyblab',
    scale: '1.2',
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

  /*const logo = document.querySelector('#logo-hyblab');
  logo.addEventListener('click', () => {
    anime({
        targets: '#logo-hyblab',
        scale: 0
      });
    swiper.slideNext()
    initSlide2();
  });*/

};