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

class Question6 extends Question {
    constructor(code_commune, annee, valeur) {
        super(code_commune, annee);
        this.valeur = valeur;
    }
    generate_question() {
        let key = this.annee + "_2";
        let info_commune = data_election.get(key).get(this.code_commune);
        let nom_commune = info_commune.nom_com;

        let question = "À " + nom_commune + ", le taux de participation est-il " +
            "supérieur à " + this.valeur + "% en " + this.annee + " ?";

        let reponse1 = new Array(2);
        reponse1.push("Oui");
        reponse1.push(true);

        let reponse2 = new Array(2);
        reponse2.push("Non");
        reponse2.push(false);

        let res = new Array(3)
        res.push(question);
        res.push(reponse1);
        res.push(reponse2);

        return res;
    }


}


console.log(new More_vote_second_tour(7,"2002").generate_question());
console.log(new Question6(7,"2002",30).generate_question());