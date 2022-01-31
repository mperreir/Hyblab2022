class DialogueObserver extends Observer {
    constructor(view){
        super();
        this.view=view;
      }
      
      update(observable,object){
        if(observable.initialisation){
          this.view.perso1.style.backgroundImage = "url('"+observable.perso1+"')";
          this.view.perso2.style.backgroundImage = "url('"+observable.perso2+"')";
          this.view.nom.value=observable.description;
        }
        this.view.texte.innerText = observable.dialogue;
        if (observable.nom==="Charlie"){
          this.view.texte.style.backgroundColor="#0600FF";
        }
        else{
          this.view.texte.style.backgroundColor="#E66E78";
        }
  
      }
}