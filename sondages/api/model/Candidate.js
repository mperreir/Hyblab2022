const Observable = require("./Observable");

class Candidate extends Observable {

    constructor(name, first_name, image){
        super();
        this.name = name;
        this.first_name = first_name;
        this.image = image
    }

    setImage(image){
        this.image = image;
    }
}

module.exports = Candidate;