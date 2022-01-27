const img_beat = document.querySelector('img');
img_beat.classList.add('animate__animated', 'animate__heartBeat');

img_beat.addEventListener("animationend", () => {
	window.location.replace('anjoute-game-1.html');
});

