class DialogueModel extends Observable {
    constructor(scene, description){
        super();
        this.scene=scene;

        this.description =description;
        this.nom=this.scene[0].Personne;
        this.dialogue=this.scene[0].Replique;
        this.counter=-1;
        this.initialisation=true;
        this.animationModel = undefined;

    }

    changement(){
        console.log(this);
        this.initialisation=false;
        this.counter++;

        if(this.counter<this.scene.length){
            //dialogue suivant
            this.dialogue=this.scene[this.counter].Replique;
            this.nom=this.scene[this.counter].Personne;
            super.setChanged();
            super.notifyObservers();
        }
        else {
            this.animationModel.finishDialogue();
        }

    }

    linkAnimationModel(model){
        this.animationModel = model;
    }
    
    getPerso1(){
        return this.perso1;
    }
    getPerso2(){
        return this.perso2;
    }
    getDialogue(){
        return this.dialogue;
    }
    getNom(){
        return this.nom;
    }
    getInitialisation(){
        return this.initialisation;
    }
    getDescription(){
        return this.description;
    }


}