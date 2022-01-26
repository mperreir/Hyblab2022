"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

anime({
  delay: 1000,
  targets: '#loader',
  opacity: '0',
  'z-index' : -1,
  easing: 'easeOutQuad',
});
// Init first slide
initSlide1();