class Mediator {
	
    constructor(controller){

        // we add controller, view and model to the mediator
		this.controller = controller;
		this.view = this.controller.view;
		this.model = this.controller.model;

        // we add mediator to the controller, view and model
        this.controller.setMediator(this);
		this.view.setMediator(this);
		this.model.setMediator(this);
    }

    notify(sender, event){}
}

module.exports = Mediator;