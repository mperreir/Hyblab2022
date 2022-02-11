let images = document.getElementsByClassName("anim-graphic");
let percentages = document.getElementsByClassName("anim-percentage");

for (let i = 0; i < images.length; i++) {
  let p = parseInt(percentages[i]);
    let ch = "";
    for(let j = 0; j < 2; j++){
      ch += percentages[i].textContent[j];
    }
    images[i].style.width = parseFloat(ch)*1.1+"%";
}

let presentation = document.getElementById("head_simulation")
let first_simulation = document.getElementById("f-section");
let second_simulation = document.getElementById("s-section");
let third_simulation = document.getElementById("t-section");
let fourth_simulation = document.getElementById("q-section");

let vainqueur = document.getElementById("vainqueur");
let perdant = document.getElementById("perdant");
let gagnant = document.getElementById("gagnant");

let second_tour = document.getElementById("second_tour");

let croix = document.getElementById("close");



vainqueur.addEventListener("click", () => {
  if(getComputedStyle(first_simulation).display != "block"){
    presentation.style.display = "none"
    first_simulation.style.display = "block";
    second_simulation.style.display = "none";
    third_simulation.style.display = "none";
    fourth_simulation.style.display = "none";
    croix.style.display = "block";

    /*vainqueur.style.opacity = "50%";
    perdant.style.opacity = "100%";
    gagnant.style.opacity = "100%";*/
  }
})

perdant.addEventListener("click", () => {
    if(getComputedStyle(second_simulation).display != "block"){
      presentation.style.display = "none"
      first_simulation.style.display = "none";
      second_simulation.style.display = "block";
      third_simulation.style.display = "none";
      fourth_simulation.style.display = "none";
      croix.style.display = "block";

      /*vainqueur.style.opacity = "100%";
      perdant.style.opacity = "50%";
      gagnant.style.opacity = "100%";*/
    }
})

gagnant.addEventListener("click", () => {
    if(getComputedStyle(third_simulation).display != "block"){
      presentation.style.display = "none"
      first_simulation.style.display = "none";
      second_simulation.style.display = "none";
      third_simulation.style.display = "block";
      fourth_simulation.style.display = "none";
      croix.style.display = "block";

      /*vainqueur.style.opacity = "100%";
      perdant.style.opacity = "100%";
      gagnant.style.opacity = "50%";*/
    }
})

second_tour.addEventListener("click", () => {
  if(getComputedStyle(second_simulation).display != "block"){
    presentation.style.display = "none"
    first_simulation.style.display = "none";
    second_simulation.style.display = "none";
    third_simulation.style.display = "none";
    fourth_simulation.style.display = "block";
    croix.style.display = "block";
  }
})

croix.addEventListener("click", () => {
    if(getComputedStyle(presentation).display != "block"){
      presentation.style.display = "block"
      first_simulation.style.display = "none";
      second_simulation.style.display = "none";
      third_simulation.style.display = "none";
      fourth_simulation.style.display = "none";
      croix.style.display = "none";
    }
})
