'use strict';

const swiper = new Swiper('#mySwiper', {
  direction: 'vertical',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
localStorage.setItem("inventaire",[])

const anjoute_start = document.querySelector('.anjoute_start');
anjoute_start.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite', 'infinite');

const first_slide = document.querySelector('#first-slide');
first_slide.addEventListener('click', () => {
	window.location.href = 'anjoute-règles.html';
});

// Storage
const inventaire = "";
localStorage.setItem('inventaire', inventaire);