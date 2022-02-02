class DialogueObserver extends Observer{
    constructor(view){
      super();
      this.view=view;
    }
    
    update(observable,object){
      if(observable.getInitialisation()){
        // this.view.perso1.src = observable.getPerso1();
        // this.view.perso2.src = observable.getPerso2();
        this.view.nom.value=observable.getDescription();
      }
      this.view.texte.innerText = observable.getDialogue();
      if (observable.getNom()==="Charlie"){
        this.view.texte.style.backgroundColor="#0600FF";
      }
      else{
        this.view.texte.style.backgroundColor="#E66E78";
      }

    }
  }