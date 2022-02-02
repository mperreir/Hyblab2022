// gestion des vies
const vies = document.querySelector('.hp');
vies.innerHTML = '';

let vies_joueur = localStorage.getItem('vies_joueur');

let index = 0
for (index; index < vies_joueur; index++) {
	let vie_pleine = document.createElement('img');
	vie_pleine.setAttribute('src', 'img/jeu/vie.png');
	vie_pleine.setAttribute('alt', 'vie pleine');
	vies.appendChild(vie_pleine);
}
for (index; index < 3; index++) {
	let vie_vide = document.createElement('img');
	vie_vide.setAttribute('src', 'img/jeu/vie-perdue.png');
	vie_vide.setAttribute('alt', 'vie vide');
	vies.appendChild(vie_vide);
}

// gestion de la position
const position = document.querySelector('.position');
position.innerHTML = '';

let position_joueur = localStorage.getItem('position_joueur');

let drapeau_position = document.createElement('img');
drapeau_position.setAttribute('src', 'img/jeu/drapeau'+ position_joueur +'.png')

position.appendChild(drapeau_position);