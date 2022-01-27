const Observable = require("./Observable");

class PoliticalParty extends Observable {
    
    constructor(name){
        super();
        this.name = name;
    }
}

module.exports = PoliticalParty;