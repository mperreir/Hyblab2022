const Observable = require("./Observable");

class Hypothesis extends Observable {
    
    constructor(date, sub_sample, listHeads){
        super();
        this.date = date;
        this.sub_sample = sub_sample;
        this.listHeads = listHeads;
    }
}

module.exports = Hypothesis;