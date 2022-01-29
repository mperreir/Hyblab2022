"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

sessionStorage.setItem('question', '1');

// Init first slide
initSlide1();

window.onload = () => {
  document.getElementById("button-slide-2").addEventListener("click", () => { 
    window.location.href = "./commencer_partie.html";
  });

  document.getElementById("button-explorer").addEventListener("click", () => { 
    window.location.href = "./exploration.html";
  });

}