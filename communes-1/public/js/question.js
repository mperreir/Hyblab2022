let dataElection;
fetch("api/dataElection").then(response => response.json())
	.then(data => dataElection = data);
const data_election = new Map(Object.entries(dataElection));

for (let map in data_election) {
	map = new Map(Object.entries(map));
}


class FactoryQuestion {
	constructor(code_commune_joueur) {
		this.code_commune_joueur = code_commune_joueur;

	}

	generate_annee(annees) {
		if (annees === undefined || annees === []) {
			annees = [2002, 2007, 2012, 2017];
		}
		return annees[Math.floor(Math.random()*annees.length)];
	}

	generate_question(numero_question, attaque, code_commune_adverse){

		let code_commune_question = attaque ? code_commune_adverse : this.code_commune_joueur;
		let annee = this.generate_annee();

		switch (numero_question) {
			case 1:
				return (new Question1(code_commune_question, annee)).generate_question();

			case 2:
				return (new Question2(code_commune_question, annee)).generate_question();

			case 3:
				annee = this.generate_annee([2002, 2007, 2012]);
				return (new Question3(code_commune_question, annee)).generate_question();

			case 4:
				return (new Question4(code_commune_question, annee)).generate_question();

			case 5:
				return (new Question5(code_commune_question, annee)).generate_question();

			case 6:
				return (new Question6(code_commune_question, annee)).generate_question();

			case 7:
				return (new Question7(code_commune_question, annee)).generate_question();

			case 8:
				return (new Question8(code_commune_question, annee)).generate_question();

			case 9:
				return (new Question9(code_commune_question, annee)).generate_question();

			case 10:
				if (!attaque) return (new Question5(code_commune_adverse, annee)).generate_question();
				return (new Question10(this.code_commune_joueur, code_commune_adverse, annee)).generate_question();

			default:
				console.log("question non existante");

		}
	}
}



// ---------------- QUESTIONS ---------------------


class Question{
	constructor(code_commune, annee) {
		this.code_commune = code_commune;
		this.annee = annee;
	}
	generate_question()
	{
	}
}

// ---------------   Question 1   ----------------------
class Question1 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let key = this.annee + "_2";
		let info_commune = data_election.get(key).get(this.code_commune);
		let nom = info_commune.nom;
		let prenom = info_commune.prenom;
		let vote = info_commune.voix;

		let question = "À " + info_commune.nom_com + ", qui a obtenu le plus " +
			"de voix au second tour en " + this.annee + " ?";
		let answer1 = [prenom[0] + " " + nom[0], vote[0] > vote[1]];
		let answer2 = [prenom[1] + " " + nom[1], vote[1] > vote[0]];
		return [question,answer1,answer2];
	}
}

// ---------------   Question 2   ----------------------
class Question2 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		const randomNumber =  (Math.floor(Math.random() * (10 + 5) - 5) + 10);
		let key = this.annee + "_1";
		let info_commune = data_election.get(key).get(this.code_commune);
		let abs = info_commune.pour_abs.ins;

		let question = "À " +  info_commune.nom_com + ", le taux d’abstention " +
			"est-il plus élevé que " + randomNumber  + "% en " + this.annee + " au premier tour ?";
		let answer1 = ["Oui", abs > randomNumber];
		let answer2 = ["Non", abs <= randomNumber];

		return [question,answer1,answer2];
	}
}

// ---------------   Question 3   ----------------------
class Question3 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let info_commune2017 = data_election.get("2017_2").get(this.code_commune);
		let abs2017 = info_commune2017.pour_abs.ins;

		let key = this.annee + "_2";
		let info_commune = data_election.get(key).get(this.code_commune);
		let abs = info_commune.pour_abs.ins;


		let question = "À " +  info_commune.nom_com + ", le taux d’abstention du second tour en 2017 " +
			"est-il plus élevé qu'en " + this.annee + " ?";
		let answer1 = ["Oui", abs2017 > abs];
		let answer2 = ["Non", abs2017 <= abs];

		return [question,answer1,answer2];
	}
}
// ---------------   Question 4   ----------------------
class Question4 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let key = this.annee + "_1";
		let info_commune = data_election.get(key).get(this.code_commune);

		let nb_candidats = info_commune.nom.length;
		let id_candidat = Math.floor(Math.random() * nb_candidats);

		let nom = info_commune.nom[id_candidat];
		let prenom = info_commune.prenom[id_candidat];
		let vote = info_commune.voix[id_candidat];
		let sexe = info_commune.sexe[id_candidat];
		let texte = sexe === "M" ? " est-il arrivé en tête" : " est-elle arrivée en tête";

		let question = "À " + info_commune.nom_com + ", " + prenom + " " + nom +
			texte + " du premier tour en " + this.annee + " ?";
		let answer1 = ["Oui", vote === Math.max(...(info_commune.voix))];
		let answer2 = ["Non", vote !== Math.max(...(info_commune.voix))];

		return [question,answer1,answer2];
	}
}
// ---------------   Question 5   ----------------------
class Question5 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let key = this.annee + "_1";
		let info_commune = data_election.get(key).get(this.code_commune);

		let nom = info_commune.nom;
		let prenom = info_commune.prenom;

		let votes = info_commune.voix;

		let max1 = Math.max(...votes);
		let max2 = 0;
		votes.forEach(vote => {
			if (votes.indexOf(max1) !== votes.indexOf(vote)) {
				if (vote > max2) {
					max2 = vote;
				}
			}
		});

		let max1idx = info_commune.voix.indexOf(max1);
		let max2idx = info_commune.voix.indexOf(max2);

		let question = "À " + info_commune.nom_com + ", qui est arrivé en tête du premier tour en " + this.annee + " ?";
		let answer1 = [prenom[max1idx] + " " + nom[max1idx], true];
		let answer2 = [prenom[max2idx] + " " + nom[max2idx], false];

		return [question,answer1,answer2];

	}
}
// ---------------   Question 6   ----------------------
class Question6 extends Question {
	constructor(code_commune, annee) {
		super(code_commune, annee);
		this.valeur = 80;
	}
	generate_question() {
		let key = this.annee + "_2";
		let info_commune = data_election.get(key).get(this.code_commune);
		let taux_participation = 100 - info_commune.pour_abs.ins;

		let question = "À " + info_commune.nom_com + ", le taux de participation est-il " +
			"supérieur à " + this.valeur + "% en " + this.annee + " au second tour ?";
		let reponse1 = ["Oui", taux_participation > this.valeur];
		let reponse2 = ["Non", taux_participation <= this.valeur];
		return [question, reponse1, reponse2];
	}
}

// ---------------   Question 7   ----------------------
class Question7 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let key = this.annee + "_1";
		let info_commune = data_election.get(key).get(this.code_commune);

		let voteb_n1 = info_commune.pour_bl_nuls.vot;
		let voteb_n2 = voteb_n1 + 1;

		let question = "À " + info_commune.nom_com + ", quel est le pourcentage de votes blancs et " +
			"nuls en " + this.annee + " au premier tour ?";
		let answer1 = [voteb_n2 + " %", false];
		let answer2 = [voteb_n1 + " %", true];

		return [question,answer1,answer2];
	}
}
// ---------------   Question 8   ----------------------
class Question8 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
		this.valeur = 5;
	}
	generate_question()
	{
		let key = this.annee + "_2";
		let info_commune = data_election.get(key).get(this.code_commune);

		let pour_bl_n = info_commune.pour_bl_nuls.vot;

		let question = "À " + info_commune.nom_com + ", le pourcentage de votes blancs et " +
			"nuls est-il supérieur à " + this.valeur + " % en " + this.annee + " au second tour ?";
		let answer1 = ["Oui", pour_bl_n > this.valeur];
		let answer2 = ["Non", pour_bl_n <= this.valeur];

		return [question,answer1,answer2];
	}
}
// ---------------   Question 9   ----------------------
class Question9 extends Question{
	constructor(code_commune, annee) {
		super(code_commune, annee);
	}
	generate_question()
	{
		let key = this.annee + "_1";
		let info_commune = data_election.get(key).get(this.code_commune);

		let nom = info_commune.nom;
		let prenom = info_commune.prenom;
		let votes = info_commune.voix;

		let min1 = Math.min(...votes);
		let min2 = Infinity;

		votes.forEach(vote => {
			if (votes.indexOf(min1) !== votes.indexOf(vote)) {
				if (vote < min2) {
					min2 = vote;
				}
			}
		});

		let min1idx = info_commune.voix.indexOf(min1);
		let min2idx = info_commune.voix.indexOf(min2);


		let question = "À " + info_commune.nom_com + ", qui a eu le moins de voix en " + this.annee +
			" durant le premier tour ?";
		let answer1 = [prenom[min2idx] + " " + nom[min2idx], false];
		let answer2 = [prenom[min1idx] + " " + nom[min1idx], true];

		return [question,answer1,answer2];
	}
}
// ---------------   Question 10  ----------------------
class Question10 extends Question{
	constructor(code_commune_du_joueur, code_commune, annee) {
		super(code_commune, annee);
		this.code_commune_du_joueur = code_commune_du_joueur;
		this.valeur = 10;
	}
	generate_question()
	{
		let key = this.annee + "_2";
		let info_commune = data_election.get(key).get(this.code_commune);
		let info_commune_joueur = data_election.get(key).get(this.code_commune_du_joueur);

		let pour_voix = info_commune.pour_voix.exp[0];
		let pour_voix_commune_joueur = info_commune_joueur.pour_voix.exp[0];

		let question = "Au second tour de " + this.annee + ", votre commune a-t-elle voté comme " + info_commune.nom_com +
			" à " + this.valeur + " % près ?";
		let answer1 = ["Oui", Math.abs(pour_voix_commune_joueur - pour_voix) <= this.valeur];
		let answer2 = ["Non", Math.abs(pour_voix_commune_joueur - pour_voix) > this.valeur];

		return [question,answer1,answer2];
	}
}



//tests
//console.log(new Question1(7,"2002").generate_question());
//console.log(new Question2(7,"2002").generate_question());
//console.log(new Question3(7,"2002").generate_question());  !!! SERA PATCH APRES SCRIPT CELIAN !!!
//console.log(new Question4(2,"2002").generate_question());
console.log(new Question5(7,"2002").generate_question());
//console.log(new Question6(7,"2002").generate_question());
//console.log(new Question7(7,"2002").generate_question());
//console.log(new Question8(7,"2002").generate_question());
//console.log(new Question9(7,"2002").generate_question());
//console.log(new Question10(8,7,"2002").generate_question());



module.exports.classFactoryQuestion = FactoryQuestion;