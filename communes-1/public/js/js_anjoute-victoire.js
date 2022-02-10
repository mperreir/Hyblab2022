const restart = document.querySelector('.restart');
const label_joute = document.querySelector('.label-joute');
const inventaire = document.querySelector('.bouton_inv');

inventaire.addEventListener('click', () => {
	window.location.href = 'anjoute-inventaire.html';
});

restart.addEventListener('click', () => {
	window.location.href = 'index.html';
});


let nb_objets = localStorage.getItem('inventaire').split(',').length;

if (localStorage.getItem('inventaire').split(',')[0] == '') {
	nb_objets = 0;
}

let richesse = ' richesse';
if (nb_objets > 1) {
	richesse = ' richesses'
}
label_joute.innerHTML = 'Tu as amassé ' + nb_objets + richesse + ' sur un total de 10 !';

