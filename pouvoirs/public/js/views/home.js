"use strict";

const headPhoneTimeout = 4000;
let init = false;

let illustration = {
  illu: '55%',
  button: '20%',
  buttonOpacity: "1.0"
}

const illuContainer = document.querySelector('#background');
const playContainer = document.querySelector('.button-container');
const playButton = document.querySelector('#play-button');

// async init function (because of the awaits on fetches)
const homepage_slide = function(){
  // Ensuring this function only runs once
  if (init) return;
  init = true;

  const playButton = document.querySelector('#play-button');

  const bg = createAnimation("background", "img/animations/ACCUEIL_ANIMATION_FOND.json", true);
  const ss = createAnimation("spaceship", "img/animations/ACCUEIL_ANIMATION_VAISSEAU.json", true);
  bg.play();
  ss.play();
  
  playButton.addEventListener("click", animateLoading);
};

function animateLoading() {
  anime({
    targets: "#spaceship svg",
    translateX: '1000px',
    loop: false,
    easing: 'easeInOutCubic',
    complete: (anim) => {
      anime({
        targets: "#background svg",
        bottom: ['10%', '30%'],
        loop: false,
        easing: 'easeInOutCubic'
      });
    }
  });
  
  anime({
    targets: "#play-button",
    opacity: ['1', '0'],
    loop: false,
    easing: 'easeInOutCubic',
    complete: function(anim) {
      anime({
        targets: illustration,
        illu: '30%',
        button: '45%',
        buttonOpacity: "0.0",
        loop: false,
        easing: 'easeInOutCubic',
        update: function(anim) {
          illuContainer.style.height = illustration.illu;
          playContainer.style.height = illustration.button;
        },
        complete: function(anim) {
          // Headphones appear
          playButton.style.display = 'none';
          const headphone = document.getElementById("headphone");
          headphone.style.display = "flex";
          anime({
            targets: headphone,
            opacity: [0, 1],
            loop: false,
            easing: 'easeInOutCubic',
            complete: function(anim) {
              // Headphones disappear after <headPhoneTimeout>
              setTimeout(() => {
                swiper.slideNext();
                falling_slide();
              }, headPhoneTimeout)
            }
          });
        }
      });
    }
  });

  console.log("done");
};
