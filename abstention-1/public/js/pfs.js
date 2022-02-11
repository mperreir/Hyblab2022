const buttons = document.querySelectorAll(".box button");

const btnToWin = [2,0,1]

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        const joueur = buttons[i].textContent;
        const robot = buttons[btnToWin[i]].textContent;
        let resultat = "";

        if (joueur===robot) {
            resultat = "Egalité";
        }
        else if ((joueur === "Pierre" && robot === "Ciseaux") || (joueur === "Ciseaux" && robot === "Feuille") || (joueur === "Feuille") && (robot === "Pierre")) {
            resultat = "Gagné";
        }
        else {
            resultat = "Perdu";
        }

        document.querySelector(".box").style.visibility = "hidden";
        setTimeout(function(){
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
        }, 500);
    });
}