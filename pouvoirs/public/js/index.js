"use strict";
// To be deleted once all pages are ok
const init_default = function(){
  console.log("To be developped...")
}

const transitionEffect = createAudio("data/sounds/pageTransition.mp3");
// Functions used to render each page
const init_func = [homepage_slide, falling_slide, init_p1, init_p2, init_p3, init_default, init_p5, init_p6, init_thanks, init_credits];
const alreadyVisited =  new Array(init_func.length).fill(false);

const slideHandler = function(e){
  transitionEffect.play();
  // console.log(e.activeIndex);
  // Ensuring each initialization function only runs once
  if (!alreadyVisited[e.activeIndex]) {
    init_func[e.activeIndex].call(e);
    alreadyVisited[e.activeIndex] = true;
  }
}
const swiper = new Swiper("#mySwiper", {
  direction: "horizontal",
  // allowTouchMove: false,
   pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on : { 'slideChange' : slideHandler}
});

const wrapper_nextSlide = function(){
  swiper.slideNext();
};

homepage_slide();