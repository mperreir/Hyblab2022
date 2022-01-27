const anjoute_start = document.querySelector('.anjoute_start');
anjoute_start.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite', 'infinite');

const container = document.querySelector('#container');
container.addEventListener('click', () => {
	window.location.href = 'anjoute-game-1.html';
});
