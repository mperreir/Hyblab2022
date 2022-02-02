'use strict';

const swiper = new Swiper('#mySwiper', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const anjoute_start = document.querySelector('.anjoute_start');
anjoute_start.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite', 'infinite');

const first_slide = document.querySelector('#first-slide');
first_slide.addEventListener('click', () => {
	window.location.href = 'anjoute-règles.html';
});

// Storage
var inventaire = "";
localStorage.setItem('inventaire', inventaire);
var vies_joueur = 3;
localStorage.setItem('vies_joueur', vies_joueur);
var position_joueur = 1;
localStorage.setItem('position_joueur', position_joueur);