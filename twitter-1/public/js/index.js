"use strict";
/* global Mustache, Swiper */

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
});

anime({
  delay: 1500,
  targets: '#loader',
  opacity: '0',
  'z-index' : -1,
  easing: 'easeOutQuad',
});


window.scrollTo(0, 1);


initSlide3();
