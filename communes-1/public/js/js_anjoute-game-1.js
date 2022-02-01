let dataElection;
fetch("api/dataElection").then(response => response.json())
	.then(data => dataElection = data)
console.log(dataElection)
import {FactoryQuestion} from "./question.js"
const loader = document.querySelector('.loader');

function toLowerMdr(nom)
{
	let temp = "";
	for (var i = 0; i < nom.length; i++) {
		if(nom[i] !=="L") {
			temp += nom.charAt(i).toLowerCase();
		}
		else {
			temp += nom.charAt(i).toUpperCase();
		}
	}
	return temp
}
const logo_joute = document.querySelector('#logo-joute');
logo_joute.classList.add('animate__animated', 'animate__fadeInDown');

logo_joute.addEventListener('animationend', () => {
	logo_joute.classList.add('animate__animated', 'animate__fadeOutDown');

	logo_joute.addEventListener('animationend', () => {
		loader.textContent = '';
	});

	const commune_enemy = document.querySelector('.commune')
	const question = document.querySelector('.question')
	const reponse_1 = document.querySelector('.reponse_1')
	const reponse_2 = document.querySelector('.reponse_2')
	const enemy = "8";
	const factory = new FactoryQuestion();
	const question_data = factory.generate_question(1,true,enemy);
	question.textContent = question_data[0];
	console.log(question_data[1][0])
	reponse_1.firstChild.textContent = toLowerMdr(question_data[1][0]);
	reponse_2.firstChild.textContent = toLowerMdr(question_data[2][0]);
	//commune_enemy.textContent = data_election.get('2017_1').get(enemy).nom_com;
	console.log("Test")
});