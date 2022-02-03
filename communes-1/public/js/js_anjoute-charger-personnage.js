const video = document.querySelector('.animation_perso');
video.innerHTML = '';

let personnages = [
	'img/animations/manteau_rouge.mp4',
	'img/animations/cmb.mp4',
	'img/animations/manteau_vert.mp4',
	'img/animations/bonnie.mp4',
	'img/animations/chapeau.mp4',
	'img/animations/femme.mp4',
	'img/animations/homme.mp4',
	'img/animations/mamie.mp4',
	'img/animations/rousse.mp4',
	'img/animations/dame-reflet.mp4',
]

let source = document.createElement('source');
source.setAttribute('src', personnages[localStorage.getItem('position_joueur')-1]);
source.setAttribute('type', 'video/mp4');

video.appendChild(source);