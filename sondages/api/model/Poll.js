class Poll extends Observable {
    
    constructor(sample, population, source, rounds){
        super();
        this.sample = sample;
        this.population = population;
        this.source = source;
        this.rounds = rounds
    }
}

module.exports = Poll;