
import {FactoryQuestion} from "./question.js"
import {generate_enemy} from "./generate_enemy.js"
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


function toLowerMdr(nom)
{
	let temp = "";
	for (var i = 0; i < nom.length; i++) {
		if(nom[i].toLowerCase() !=="l") {
			temp += nom.charAt(i).toLowerCase();
		}
		else {
			temp += nom.charAt(i).toUpperCase();
		}
	}
	return temp
}

const commune_enemy = document.querySelector('.commune')
const commune_enemy_deux = document.querySelector('.commune_2')
const question = document.querySelector('.question')
const reponse_1 = document.querySelector('.reponse_1')
const reponse_2 = document.querySelector('.reponse_2')
const enemy = generate_enemy("55");
const factory = new FactoryQuestion();
console.log(enemy)
const question_data = factory.generate_question(1,true,enemy[0][0]);
question.textContent = question_data[0];
reponse_1.firstChild.textContent = toLowerMdr(question_data[1][0]);
reponse_2.firstChild.textContent = toLowerMdr(question_data[2][0]);
commune_enemy.textContent = enemy[0][1];
commune_enemy_deux.textContent = enemy[0][1]
