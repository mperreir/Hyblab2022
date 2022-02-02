const magnum = document.querySelector('.one img');
const boules_de_fort = document.querySelector('.two img');
const oie = document.querySelector('.three img');
const medaille = document.querySelector('.four img');
const soupe = document.querySelector('.five img');
const bottereau = document.querySelector('.six img');
const manuscrit = document.querySelector('.seven img');
const chateau = document.querySelector('.eight img');
const cheval = document.querySelector('.nine img');
const bateau = document.querySelector('.ten img');


var inventaire_joueur = localStorage.getItem('inventaire').split(',');


if (!inventaire_joueur.includes('magnum')) {
	magnum.style.display = 'none';
}
if (!inventaire_joueur.includes('boules_de_fort')) {
	boules_de_fort.style.display = 'none';
}
if (!inventaire_joueur.includes('oie')) {
	oie.style.display = 'none';
}
if (!inventaire_joueur.includes('medaille')) {
	medaille.style.display = 'none';
}
if (!inventaire_joueur.includes('soupe')) {
	soupe.style.display = 'none';
}
if (!inventaire_joueur.includes('bottereau')) {
	bottereau.style.display = 'none';
}
if (!inventaire_joueur.includes('manuscrit')) {
	manuscrit.style.display = 'none';
}
if (!inventaire_joueur.includes('chateau')) {
	chateau.style.display = 'none';
}
if (!inventaire_joueur.includes('cheval')) {
	cheval.style.display = 'none';
}
if (!inventaire_joueur.includes('bateau')) {
	bateau.style.display = 'none';
}

// gestion du bouton retour
const bouton_retour = document.querySelector('.retour');

bouton_retour.addEventListener('click', () => {
	window.location.href = document.referrer;
});