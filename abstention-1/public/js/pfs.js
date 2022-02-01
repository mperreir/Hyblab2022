const buttons = document.querySelectorAll(".box button");
console.log(buttons);
// const resultat = document.querySelector(".resultat");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    const joueur = buttons[i].innerHTML;
    const robot = buttons[Math.floor(Math.random() * buttons.length)].innerHTML;
    let resultat = "";
    // resultat.innerHTML = joueur + "       " + robot;
    if (joueur===robot) {
      resultat = "Egalité";
    }
    else if ((joueur === "Pierre" && robot === "Ciseaux") || (joueur === "Ciseaux" && robot === "Feuilles") || (joueur === "Feuilles") && (robot === "Pierre")) {
      resultat = "Gagné";
    }
    else {
      resultat = "Perdu";
    }
  document.querySelector(".resultat").innerHTML = `
  Vous : ${joueur} </br>
  Arthur : ${robot} <br/>
  Résultat : ${resultat}
`  ;
    
  });
  
  
}