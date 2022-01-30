let first_simulation = document.getElementById("f-section");
let second_simulation = document.getElementById("s-section");
let third_simulation = document.getElementById("t-section");

let vainqueur = document.getElementById("vainqueur");
let perdant = document.getElementById("perdant");
let gagnant = document.getElementById("gagnant");

vainqueur.addEventListener("click", () => {
  if(getComputedStyle(first_simulation).display != "block"){
    first_simulation.style.display = "block";
    second_simulation.style.display = "none";
    third_simulation.style.display = "none";

    vainqueur.style.opacity = "50%";
    perdant.style.opacity = "100%";
    gagnant.style.opacity = "100%";
  }
})

perdant.addEventListener("click", () => {
    if(getComputedStyle(second_simulation).display != "block"){
      first_simulation.style.display = "none";
      second_simulation.style.display = "block";
      third_simulation.style.display = "none";

      vainqueur.style.opacity = "100%";
      perdant.style.opacity = "50%";
      gagnant.style.opacity = "100%";
    }
})

gagnant.addEventListener("click", () => {
    if(getComputedStyle(third_simulation).display != "block"){
      first_simulation.style.display = "none";
      second_simulation.style.display = "none";
      third_simulation.style.display = "block";

      vainqueur.style.opacity = "100%";
      perdant.style.opacity = "100%";
      gagnant.style.opacity = "50%";
    }
})

