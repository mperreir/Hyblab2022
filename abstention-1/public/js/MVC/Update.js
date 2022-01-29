class Update extends Observer{
    constructor(view){
      super();
      this.view=view;
    }
    update(observable,object){
      if(observable.getInitialisation()){
        this.view.perso1.style.backgroundImage = "url('"+observable.getPerso1()+"')";
        this.view.perso2.style.backgroundImage = "url('"+observable.getPerso2()+"')";
        this.view.nom.value=observable.getDescription();
      }
      this.view.texte.innerText = observable.getDialogue();
      if (observable.getNom()==="Charlie"){
        this.view.textZone.style.backgroundColor="blue";
      }
      else{
        this.view.textZone.style.backgroundColor="pink";
      }

    }
  }