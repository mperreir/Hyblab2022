const restart = document.querySelector('.restart');
const label_joute = document.querySelector('.label-joute');

restart.addEventListener('click', () => {
	window.location.href = 'index.html';
});


let nb_objets = localStorage.getItem('inventaire').split(',').length - 1;
let richesse = ' richesse';
if (nb_objets > 1) {
	richesse = ' richesses'
}
label_joute.innerHTML = 'Tu as amassé ' + nb_objets + richesse + ' sur un total de 10 !';

