"use strict";
const transitionEffect = createAudio("data/sounds/pageTransition.mp3");
const goodAns = createAudio("data/sounds/good_choice.mp3", false,0.7, 1);

const slideHandler = function(e){
  transitionEffect.play();
  const init_func = [homepage_slide, falling_slide, init_p1, init_p2, init_p3, init_default, init_p5, init_p6, init_default, init_default];
  console.log(e.activeIndex);
  init_func[e.activeIndex].call(e);
}

const init_default = function(){
  console.log("To be developped...")
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