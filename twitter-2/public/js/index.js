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

  const imgSelecCandid = document.getElementsByClassName('img-selec-candidat');
  for (let i = 0; i < imgSelecCandid.length; i++) {
    imgSelecCandid[i].addEventListener('click', () => {
      document.getElementById('selection-candidat').style.visibility = 'hidden';
      document.getElementById('categorie').style.visibility = 'visible';
    });
  }
}