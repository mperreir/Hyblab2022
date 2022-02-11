const logo_joute = document.querySelector('#logo-joute');
logo_joute.classList.add('animate__animated', 'animate__fadeInDown');

logo_joute.addEventListener('animationend', () => {
	logo_joute.classList.add('animate__animated', 'animate__fadeOutDown');

	logo_joute.addEventListener('animationend', () => {
		window.location.href = 'anjoute-game-1.html';
	});
});