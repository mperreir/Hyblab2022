const buttons = document.querySelectorAll(".box button");
// const resultat = document.querySelector(".resultat");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        const joueur = buttons[i].textContent;
        const robot = buttons[Math.floor(Math.random() * buttons.length)].textContent;
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
        document.querySelector(".box").style.visibility = "hidden";
        let result = document.querySelector(".resultat");

        let choixJoueur = document.createElement('p');
        choixJoueur.id = joueur;
        choixJoueur.innerHTML = `<img src="img/${joueur}.svg">`;

        let choixRobot = document.createElement('p');
        choixRobot.id = robot;
        choixRobot.innerHTML = `<img src="img/${robot}.svg">`;

        let finPartie = document.createElement('p');
        finPartie.id = resultat;
        finPartie.innerHTML = `${resultat}`;

        result.appendChild(choixJoueur);
        result.appendChild(choixRobot);
        result.appendChild(finPartie);

        document.querySelector("#Suite").style.visibility = "visible";
    });
}