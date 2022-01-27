class Message extends Observable {
    
    constructor(date, text, candidate){
        super();
        this.date = date;
        this.text = text;
        this.candidate = candidate
    }
}

module.exports = Message;