const bvideo = document.querySelector('.bloc-video');
bvideo.innerHTML = '';

let personnages = [
	'img/animations/rousse.webm',
	'img/animations/chapeau.webm',
	'img/animations/manteau_vert.webm',
	'img/animations/bonnie.webm',
	'img/animations/manteau_bleu.webm',
	'img/animations/femme.webm',
	'img/animations/homme.webm',
	'img/animations/mamie.webm',
	'img/animations/manteau_rouge.webm',
	'img/animations/dame-reflet.webm'
]

let video = document.createElement('video');
video.loop = true;
video.autoplay = true;
video.muted = true;
video.playsInline = true;
video.setAttribute('class', 'animation_perso');


let source = document.createElement('source');
source.setAttribute('src', personnages[localStorage.getItem('position_joueur')-1]);
source.setAttribute('type', 'video/webm');


video.appendChild(source);

bvideo.appendChild(video);