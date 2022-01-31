"use strict";
/* global Mustache, Swiper */

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  /*pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },*/

});

// Init of the (touch friendly) Swiper slider
// const swiper2 = new Swiper("#swiper2", {
//   direction: "vertical",
//   mousewheel: true,
//   freeMode: true,
// });

// const swiper2 = new Swiper("#swiper2", {
//   direction: "vertical",
// });

// Wait for the video to preload and display 1st slide
// const video = videojs(document.querySelector('#background-video'));
// video.one('loadeddata', (event) => {
//   // fade out the loader "slide"
//   // and send it to the back (z-index = -1)
//
// });

anime({
  delay: 1500,
  targets: '#loader',
  opacity: '0',
  'z-index' : -1,
  easing: 'easeOutQuad',
});





initSlide3();
