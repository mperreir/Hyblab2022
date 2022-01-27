class Controller {

    constructor(model){
        this.model = model;
    }

    setMediator(mediator){
        this.mediator = mediator;
    }
}

module.exports = Controller;