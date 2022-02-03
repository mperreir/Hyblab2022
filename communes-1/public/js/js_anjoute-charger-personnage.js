const bvideo = document.querySelector('.bloc-video');
bvideo.innerHTML = '';

let personnages = [
	'img/animations/manteau_rouge.mp4',
	'img/animations/manteau_bleu.mp4',
	'img/animations/manteau_vert.mp4',
	'img/animations/bonnie.mp4',
	'img/animations/chapeau.mp4',
	'img/animations/femme.mp4',
	'img/animations/homme.mp4',
	'img/animations/mamie.mp4',
	'img/animations/rousse.mp4',
	'img/animations/dame-reflet.mp4',
]

let video = document.createElement('video');
video.loop = true;
video.autoplay = true;
video.muted = true;
video.playsInline = true;
video.setAttribute('class', 'animation_perso');


let source = document.createElement('source');
source.setAttribute('src', personnages[localStorage.getItem('position_joueur')-1]);
source.setAttribute('type', 'video/mp4');


video.appendChild(source);

bvideo.appendChild(video);