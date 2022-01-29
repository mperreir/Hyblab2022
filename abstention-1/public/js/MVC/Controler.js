class Controler {

    constructor(model){
      
        this.view = new View();
        this.model = model;
  
        // update
  
        this.model.addObserver(new Update(this.view));
          
        //  action
  
        this.view.suite.addEventListener("click", ()=>this.model.changement());
       // this.view.suite.addEventListener("click", ()=>console.log("click"));

  
    }
  }
  /*
    constructor(models){
        this.models = models;
        this.models.forEach(model => this.addScrollListener(model));
    }

    add(model){
        this.models.push(model);
        this.addScrollListener(model);
    }

    addScrollListener(model) {
        window.addEventListener("scroll", () => model.updateScroll());
    }
    
}*/
