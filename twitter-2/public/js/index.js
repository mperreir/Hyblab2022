"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Init first slide
initSlide1();

window.onload = () => {
  document.getElementById("button-slide-2").addEventListener("click", () => { 
    window.location.href = "./commencer_partie.html";
  });
  document.getElementById("bouton-decouvrir").addEventListener("click", () => { 
    window.location.href = "./exploration.html";
  });
}