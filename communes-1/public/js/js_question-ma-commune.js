
//loader
const loader = document.querySelector('.loader');

let chemins = document.referrer.split('/');

if (chemins[chemins.length-1] != 'anjoute-inventaire.html') {
	const logo_joute = document.querySelector('#logo-joute');
	logo_joute.classList.add('animate__animated', 'animate__fadeInDown');

	logo_joute.addEventListener('animationend', () => {
		logo_joute.classList.add('animate__animated', 'animate__fadeOutDown');

		logo_joute.addEventListener('animationend', () => {
			loader.textContent = '';
		});
	});
} else {
	loader.textContent = '';
}
