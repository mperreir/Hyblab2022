class Observable {

    constructor(){
        this.observers = [];
        this.state = false;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(object = null){
        if (this.state) {
            this.state = false;
            this.observers.forEach(o => {
                o.update(this, object);
            });
            // this.state = false;
        }
    }

    clearObservers(){
        this.observers = [];
    }

    setChanged(){
        this.state = true;
    }

    removeObserver(observer){
        this.observers.splice(observer, 1)
    }
}

class Observer {
    constructor() {

    }

    update(observable, object = null) {

    }
}

module.exports.Observer = Observer;
module.exports.Observable = Observable;