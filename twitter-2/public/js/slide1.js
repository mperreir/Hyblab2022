"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){

  const vector = document.querySelector('#vector1');
  vector.addEventListener('click', () => {
    swiper.slideNext()
    initSlide2();
  });

  anime({
    targets: '#vector1',
    scale: 1.1,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  });

  // Retrieve the partner's topic from our API
  let response = await fetch('api/topic');
  const data1 = await response.json();

  // Get some dummy data
  response = await fetch('data/dummy.json');
  const data2 = await response.json();

  // Update the DOM to insert topic and data
  const footer = document.querySelector('footer');
  const p = document.createElement('p');
  p.textContent = `Our topic is "${data1.topic}" and here is "${data2.message}" retrieved on the server.`;
  footer.appendChild(p);
};