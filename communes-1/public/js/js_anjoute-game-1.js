
import {FactoryQuestion} from "./question.js"
import {generate_enemy} from "./generate_enemy.js"
import {generateObject} from "./generateObject.js";
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

function bonneVersion(name){
	switch (name){
		case 'magnum':
			return "Un magnum de Cointreau"
		case 'boules_de_fort':
			return "Boules de fort gagnantes"
		case 'oie':
			return "L\'oie aux Œufs d'or"
		case 'medaille':
			return "Une médaille du roi René"
		case 'soupe':
			return "Une soupe angevine à volonté"
		case 'bottereau':
			return "Les meilleurs bottereaux"
		case 'manuscrit':
			return "Le manuscrit de Joachim du Belay"
		case 'chateau':
			return "Le chateau d \'Angers"
		case 'cheval':
			return "Un cheval du Cadre noir"
		case 'bateau':
			return "Le bateau de Loire Express"
	}

}

const commune_enemy = document.querySelector('.commune');
const commune_enemy_deux = document.querySelector('.commune_2');
const question = document.querySelector('.question');
const reponse_1 = document.querySelector('.reponse_1');
const reponse_2 = document.querySelector('.reponse_2');
const recompense = document.querySelector('.recompense');
let enemies = localStorage.getItem("enemies");
enemies = JSON.parse(enemies);
const enemy = enemies.shift();
const nb = parseInt(localStorage.getItem("question"));
const factory = new FactoryQuestion(localStorage.getItem("commune_code"));
const question_data = factory.generate_question(nb,true,enemy[0]);
question.textContent = question_data[0];
reponse_1.firstChild.textContent = toLowerMdr(question_data[1][0]);
reponse_2.firstChild.textContent = toLowerMdr(question_data[2][0]);
commune_enemy.textContent = enemy[1];
commune_enemy_deux.textContent = toLowerMdr(enemy[1]);
let objet = localStorage.getItem("currentItem");
recompense.textContent = toLowerMdr(bonneVersion(objet));
localStorage.setItem("objetGagner", bonneVersion(objet));
let reponse1 = document.querySelector(".reponse1");
let reponse2 = document.querySelector(".reponse2");
reponse1.addEventListener('click', () => {
	localStorage.setItem("enemies",JSON.stringify(enemies));
	if(question_data[1][1])
	{
		let inventaire = localStorage.getItem("inventaire");
		if (inventaire === "") {
			inventaire = [];
		} else {
			inventaire = inventaire.split(',');
		}
		inventaire.push(objet);
		localStorage.setItem("question",(nb+1).toString());
		localStorage.setItem("position_joueur",(parseInt(localStorage.getItem("position_joueur"))+1).toString());
		localStorage.setItem("inventaire",inventaire);
		let object = generateObject();
		localStorage.setItem("currentItem",object);
		if(parseInt(localStorage.getItem("question")) >= 11)
		{
			window.location.href = 'anjoute-victoire.html';
		}
		else {
			window.location.href = 'anjoute-joute-win.html';
		}
	}
	else {
		let object = generateObject();
		localStorage.setItem("currentItem",object);
		localStorage.setItem("vies_joueur",(parseInt(localStorage.getItem("vies_joueur"))-1).toString());
		window.location.href = 'anjoute-erreur-question.html';
	}
});
reponse2.addEventListener('click', () => {
	localStorage.setItem("enemies",JSON.stringify(enemies));
	if(question_data[2][1])
	{
		let inventaire = localStorage.getItem("inventaire");
		if (inventaire === "") {
			inventaire = [];
		} else {
			inventaire = inventaire.split(',');
		}
		inventaire.push(objet);
		localStorage.setItem("inventaire",inventaire);
		let object = generateObject();
		localStorage.setItem("currentItem",object);
		localStorage.setItem("question",(nb+1).toString());
		localStorage.setItem("position_joueur",(parseInt(localStorage.getItem("position_joueur"))+1).toString());
		if(parseInt(localStorage.getItem("question")) >= 11)
		{
			window.location.href = 'anjoute-victoire.html';
		}
		else {
			window.location.href = 'anjoute-joute-win.html';
		}
	}
	else {
		let object = generateObject();
		localStorage.setItem("currentItem",object);
		localStorage.setItem("vies_joueur",(parseInt(localStorage.getItem("vies_joueur"))-1).toString());
		window.location.href = 'anjoute-erreur-question.html';
	}
});