"use strict";
const fallingEffect = createAudio("data/sounds/fallingEffect.mp3", false, 0.9, 1.0);
const oups = createAudio("data/sounds/oups.mp3", false);
const swoosh = createAudio("data/sounds/swoosh.mp3", false);
const background1 = createAnimation("background-container", "data/animations/rules_background.json", true);
const mouaFalling = createAnimation("moua-falling", "data/animations/rules_moua.json", true);

const fallingTextIntro = document.querySelector("#falling .bulle p");//getText("rules");

const falling_slide = function () {

  fallingTextIntro.textContent = getText("rules");

  background1.play();
  mouaFalling.play();
  document.querySelector('#next-button').addEventListener("click", event => {
    makeFall();
  });
};


function makeFall() {
  anime({
    targets: "#next-button, .bulle",
    opacity: ['1', '0'],
    loop: false,
    easing: 'easeInOutCubic',
    complete: function () {
      swoosh.play();
      anime({
        targets: "#moua-falling svg",
        translateY: '1000px',
        loop: false,
        easing: 'easeInOutCubic',
        complete: (anim) => {
          anime({
            targets: "#background-container",
            opacity: ['1', '0'],
            loop: false,
            easing: 'easeInOutCubic',
            complete: function () {
              setTimeout(() => fallingEffect.play(), 600);
              const background2 = createAnimation("background-container", "data/animations/mouaFallingOnPresident.json", false);
              background1.destroy();
              background2.play();
              background2.addEventListener('complete', () => {
                oups.play();
                setTimeout(() => {
                  anime({
                    targets: "#background-container",
                    opacity: ['1', '0'],
                    loop: false,
                    easing: 'easeInOutCubic',
                    complete: () => {
                      background2.destroy();
                      [fallingEffect, oups, swoosh].forEach((e) => e.unload());
                      swiper.slideTo(2)
                    }
                  })
                }, 1000);
              });
              anime({
                targets: "#background-container",
                opacity: ['0', '1'],
                loop: false,
                easing: 'easeInOutCubic'
              });
            }
          })
        }
      })
    }
  })
}



