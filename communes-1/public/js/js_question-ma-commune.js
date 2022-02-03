
import {FactoryQuestion} from "./question.js";

const loader = document.querySelector('.loader');

let ma_commune = localStorage.getItem('commune_name');

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

const question = document.querySelector('.question');
const commune_enemy_deux = document.querySelector('.commune_2');
commune_enemy_deux.textContent = toLowerMdr(ma_commune);
const reponse_1 = document.querySelector('.reponse_1');
const reponse_2 = document.querySelector('.reponse_2');
let reponse1 = document.querySelector(".reponse1");
let reponse2 = document.querySelector(".reponse2");
const nb = parseInt(localStorage.getItem("question"));
const factory = new FactoryQuestion(localStorage.getItem("commune_code"));
const question_data = factory.generate_question(nb,true,localStorage.getItem("commune_code"));
console.log(question_data);
question.textContent = question_data[0];
reponse_1.firstChild.textContent = toLowerMdr(question_data[1][0]);
reponse_2.firstChild.textContent = toLowerMdr(question_data[2][0]);
reponse1.addEventListener('click', () => {
	localStorage.setItem("question",(nb+1).toString());
	localStorage.setItem("position_joueur",(parseInt(localStorage.getItem("position_joueur"))+1).toString());

	if(question_data[1][1])
	{
		localStorage.setItem("vies_joueur",(parseInt(localStorage.getItem("vies_joueur"))+1).toString());
	}

	console.log(parseInt(localStorage.getItem("vies_joueur")) === 0);
	if(parseInt(localStorage.getItem("vies_joueur")) === 0)
	{
		window.location.href = 'anjoute-fini-question.html';
	}
	else if(parseInt(localStorage.getItem("question")) >= 11)
	{
		window.location.href = 'anjoute-victoire.html';
	}
	else if(question_data[1][1])
	{
		window.location.href = 'anjoute-commune-win.html';
	}
	else {
		window.location.href = 'anjoute-oups.html';
	}
});

reponse2.addEventListener('click', () => {
	localStorage.setItem("question",(nb+1).toString());
	localStorage.setItem("position_joueur",(parseInt(localStorage.getItem("position_joueur"))+1).toString());
	if(question_data[2][1])
	{
		localStorage.setItem("vies_joueur",(parseInt(localStorage.getItem("vies_joueur"))+1).toString());
	}

	console.log(parseInt(localStorage.getItem("vies_joueur")) === 0);
	if(parseInt(localStorage.getItem("vies_joueur")) === 0)
	{
		window.location.href = 'anjoute-fini-question.html';
	}
	else if(parseInt(localStorage.getItem("question")) >= 11)
	{
		window.location.href = 'anjoute-victoire.html';
	}
	else if(question_data[2][1])
	{
		window.location.href = 'anjoute-commune-win.html';
	}
	else {
		window.location.href = 'anjoute-oups.html';
	}
});
