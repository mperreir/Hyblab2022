class ModelDialogue extends Observable {
    constructor(scene,perso1,perso2,description){
        super();
        this.scene=scene;
        this.perso1=perso1;
        this.perso2=perso2;
        this.description =description;
        this.nom=this.scene[0].nom;
        this.dialogue=this.scene[0].texte;
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
            this.dialogue=this.scene[this.counter].texte;
            this.nom=this.scene[this.counter].nom;
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