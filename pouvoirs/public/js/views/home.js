"use strict";

/*
Goal: 
- Animate flex-growth size of elements on click of Play button : DONE
- Hide Play button, switch logo image

Once loading bar is done:
Reset flex-growth, and unhide Play butto (Renamed to "continue" for instance?)

*/
const headPhoneTimeout = 4000;


let illustration = {
  illu: '55%',
  button: '20%',
  buttonOpacity: "1.0"
}

const illuContainer = document.querySelector('#illustration');
const playContainer = document.querySelector('.button-container');
const playButton = document.querySelector('#play-button');

// async init function (because of the awaits on fetches)
const homepage_slide = function(){
  const playButton = document.querySelector('#play-button');
  
  playButton.addEventListener("click", animateLoading);
};

function animateLoading() {
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
      playButton.style.opacity = illustration.buttonOpacity;
    },
    complete: function(anim) {
      // Headphones appear
      playButton.remove();
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
      })
      console.log(headphone);
    }
  })

  console.log("done");
};

function createLoadingBar() {

}

homepage_slide();