"use strict";

let bleu = document.getElementById("enveloppebleue");
let rouge = document.getElementById("envelopperouge");
let blanche = document.getElementById("enveloppeblanche");
let carte = document.getElementById("carte");

function reverse(){
  bleu.style["-webkit-animation"] = 'enveloppebleue_reverse 1.5s';
  bleu.style.animation = 'enveloppebleue_reverse 1.5s';
  rouge.style["-webkit-animation"] = 'envelopperouge_reverse 1.5s';
  rouge.style.animation = 'envelopperouge_reverse 1.5s';
  blanche.style["-webkit-animation"] = 'enveloppeblanche_reverse 1.5s';
  blanche.style.animation = 'enveloppeblanche_reverse 1.5s';
  carte.style["-webkit-animation"] = 'carte_reverse 1.5s';
  carte.style.animation = 'carte_reverse 1.5s';
}

bleu.addEventListener("click", () => {
  reverse();
  setTimeout(() => { 
    window.location.replace("informer.html");
    }, 1000);
})

rouge.addEventListener("click", () => {
  reverse();
  setTimeout(() => { 
    window.location.replace("procuration_traditional.html");
    }, 1000);
})

blanche.addEventListener("click", () => {
  reverse();
  setTimeout(() => { 
    window.location.replace("vote_traditional.html");
    }, 1000);
})

carte.addEventListener("click", () => {
  reverse();
  setTimeout(() => { 
    window.location.replace("check.html");
    }, 1000);
})
