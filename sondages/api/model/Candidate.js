class Candidate {
    constructor(name, first_name, image){
        this.name = name;
        this.first_name = first_name;
        this.image = image
    }

    setImage(image){
        this.image = image;
    }
}

module.exports = Candidate;