
import {FactoryQuestion} from "./question.js"
import {generate_enemy} from "./generate_enemy.js"
const loader = document.querySelector('.loader');

function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

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
			return "Un Magnum De Cointreau"
		case 'boule':
			return "Boules De Fort Gagnantes"
		case 'oie':
			return "L\'oie Aux Œufs D'or"
		case 'medaille':
			return "Une Médaille Du Roi René"
		case 'soupe':
			return "Une Soupe Angevine A Volonté"
		case 'bottereau':
			return "Les Meilleurs Bottereaux"
		case 'manuscrit':
			return "Le Manuscrit De Joachim Du Belay"
		case'chateau':
			return "Le ChAteau D \'Angers"
		case 'cheval':
			return "Un Cheval Du Cadre Noir"
		case 'bateau':
			return "Le Bateau De Loire Expres"
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
const factory = new FactoryQuestion();
console.log(nb);
let inventaire = localStorage.getItem("inventaire");
if(inventaire === "")
{
	inventaire = [];
}
else {
	inventaire = inventaire.split(',');
}
console.log(inventaire);
let objets = ['magnum','boules_de_fort', 'oie', 'medaille', 'soupe', 'bottereau', 'manuscrit', 'chateau', 'cheval', 'bateau',]
objets = objets.filter((objet) => !inventaire.includes(objet));
objets = shuffle(objets);
let objet = objets.shift();
const question_data = factory.generate_question(nb,true,enemy[0]);
question.textContent = question_data[0];
reponse_1.firstChild.textContent = toLowerMdr(question_data[1][0]);
reponse_2.firstChild.textContent = toLowerMdr(question_data[2][0]);
commune_enemy.textContent = toLowerMdr(enemy[1]);
commune_enemy_deux.textContent = toLowerMdr(enemy[1]);
recompense.textContent = bonneVersion(objet);
let reponse1 = document.querySelector(".reponse1");
let reponse2 = document.querySelector(".reponse2");
console.log(inventaire);
reponse1.addEventListener('click', () => {
	localStorage.setItem("question",(nb+1).toString());
	localStorage.setItem("enemies",JSON.stringify(enemies));
	if(question_data[1][1])
	{
		inventaire.push(objet);
		localStorage.setItem("inventaire",inventaire);
		window.location.href = 'anjoute-joute-win.html';
	}
	else {
		window.location.href = 'anjoute-erreur-question.html';
	}
});
reponse2.addEventListener('click', () => {
	localStorage.setItem("question",(nb+1).toString());
	localStorage.setItem("enemies",JSON.stringify(enemies));
	if(question_data[2][1])
	{

		inventaire.push(objet);
		localStorage.setItem("inventaire",inventaire);
		window.location.href = 'anjoute-joute-win.html';
	}
	else {
		window.location.href = 'anjoute-erreur-question.html';
	}
});