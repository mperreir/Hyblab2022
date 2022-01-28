'use strict';
let data_election = require('./chargement.js');
data_election = data_election.data_election


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
class More_vote_second_tour extends Question{
    constructor(code_commune, annee) {
        super(code_commune, annee);
    }
    generate_question()
    {
        let key = this.annee + "_" + "2";
        let nom = data_election.get(key).get(7).nom;
        let prenom = data_election.get(key).get(7).prenom;
        let vote =  data_election.get(key).get(7).voix;
        let answer1 = [prenom[0] + " " + nom[0], vote[0] > vote[1]];
        let answer2 = [prenom[1] + " " + nom[1], vote[1] > vote[0]];
        return ["À " + data_election.get(key).get(this.code_commune).nom_com + ", qui a obtenu le plus de voix au second tour en " + this.annee + " ?",answer1,answer2];
    }
}

// ---------------   Question 2   ----------------------
// ---------------   Question 3   ----------------------
// ---------------   Question 4   ----------------------
// ---------------   Question 5   ----------------------
// ---------------   Question 6   ----------------------
class Question6 extends Question {
    constructor(code_commune, annee) {
        super(code_commune, annee);
        this.valeur = 80;
    }
    generate_question() {
        let key = this.annee + "_2";
        let info_commune = data_election.get(key).get(this.code_commune);
        let nom_commune = info_commune.nom_com;
        let taux_participation = 100 - info_commune.pour_abs.ins;

        let question = "À " + nom_commune + ", le taux de participation est-il " +
            "supérieur à " + this.valeur + "% en " + this.annee + " au second tour ?";
        let reponse1 = ["Oui", taux_participation > this.valeur];
        let reponse2 = ["Non", taux_participation <= this.valeur];
        return [question, reponse1, reponse2];
    }
}

// ---------------   Question 7   ----------------------
// ---------------   Question 8   ----------------------
// ---------------   Question 9   ----------------------
// ---------------   Question 10  ----------------------



//tests
console.log(new More_vote_second_tour(7,"2002").generate_question());
console.log(new Question6(2,"2002").generate_question());