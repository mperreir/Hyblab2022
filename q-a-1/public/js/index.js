"use strict";

let bouton_ok = document.getElementById("go_to");
let intro = document.getElementById("intro_page")

bouton_ok.addEventListener("click", () => {
  intro.style["-webkit-animation"] = 'slit-out-vertical 0.5s ease-in 0.5s both';
  intro.style.animation = 'slit-out-vertical 0.5s ease-in 0.5s both';
  setTimeout(() => { 
    window.location.replace("sommaire.html");
    }, 1000);

})
