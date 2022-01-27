class Round extends Observable {
    
    constructor(name, hypotheses){
        super();
        this.name = name;
        this.hypotheses = hypotheses;
    }
}

module.exports = Round;