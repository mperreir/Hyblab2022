'use strict';
let data_election = require('./chargement.js');
data_election = data_election.data_election
class Question{
    constructor(commune, annee) {
        this.commune = commune;
        this.annee = annee;
    }
    generate_question()
    {
    }
}


class More_vote_second_tour extends Question{
    constructor(commune, annee) {
        super(commune, annee);
    }
    generate_question()
    {
        let key = this.annee + "_" + "2";
        let nom = data_election.get(key).get(7).nom;
        let prenom = data_election.get(key).get(7).prenom;
        let vote =  data_election.get(key).get(7).voix;
        let answer1 = [prenom[0] + " " + nom[0], vote[0] > vote[1]];
        let answer2 = [prenom[1] + " " + nom[1], vote[1] > vote[0]];
        return ["À " + data_election.get(key).get(this.commune).nom_com + ", qui a obtenu le plus de voix au second tour en " + this.annee + " ?",answer1,answer2];
    }
}

console.log(new More_vote_second_tour(7,"2002").generate_question())