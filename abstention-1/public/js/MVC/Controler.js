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