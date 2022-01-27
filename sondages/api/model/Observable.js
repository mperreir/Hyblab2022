class Observable {
    
    constructor(){
        this.listeObserver = [];
        this.state = false;
    }

    addObservers(observer){
        this.listeObserver.push(observer);
      }
    
    notifyObservers(object = null){
        if (this.state === true) {
        this.listeObserver.forEach(element => element.update(this, object));
        this.setChanged();
        }
    }

    clearObservers(){
        this.listeObserver = [];
    }

    removeObserver(observer){
        this.listeObserver.pop();
    }
    
    setMediator(mediator){
        this.mediator = mediator;
    }

    setChanged(newState) {
        this.state = newState;
    }
}

module.exports = Observable;