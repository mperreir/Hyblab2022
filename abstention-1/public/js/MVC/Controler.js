class Controler {
    constructor(models){

        this.view = new View();
        this.models = models;
        this.currentModel = undefined;
        this.nextModelIndex = 0;
        this.changement = () => this.currentModel.changement(this);
        this.infoActiv=0;
        this.infoActiv=0;


        //this.loadNextModel();
        // update

        //  action
        this.view.info.addEventListener("click", ()=> {
        
            if (this.infoActiv===0){
                this.infoActiv=1;
                this.view.popupInfo.style.opacity=1;} 
                else{
                    this.infoActiv=0;
                    this.view.popupInfo.style.opacity=0;}}
        );

    }


    

    loadNextModel() {
        if (this.nextModelIndex >= this.models.lengt) return;

        

        // A ne pas executer lors de l'initialisation car currentModel est undefined
        if (this.nextModelIndex === 0) {
            this.view.suite.addEventListener("click", this.changement);
            

        }

        this.currentModel = this.models[this.nextModelIndex];
        this.currentModel.addObserver(new Update(this.view));

        this.view.perso1.src = this.currentModel.perso1;
        this.view.perso2.src = this.currentModel.perso2;
        this.view.description.innerText = this.currentModel.description;

        this.nextModelIndex++;
    }


}

