class DialogueModel extends Observable {
    constructor(scene, description){
        super();
        this.scene = scene.Texte;
        this.id = scene.Dialogue;
        this.description =description;
        this.nom=this.scene[0].Personne;
        this.dialogue=this.scene[0].Replique;
        this.counter=-1;
        this.initialisation=true;
        this.animationModel = undefined;

    }

    changement(controler){
        //console.log(this);
        this.initialisation=false;
        this.counter++;

        if(this.counter<this.scene.length){
            //dialogue suivant
            this.dialogue=this.scene[this.counter].Replique;
            this.nom=this.scene[this.counter].Personne;
            super.setChanged();
            super.notifyObservers();
        }
        else if (DIALOGUESTARTED) {
            this.animationModel.finishDialogue(this.id);
        }

        if (this.id === NBDIALOGUES && this.counter >= this.scene.length) {
            document.getElementById("conclusion").classList.remove("hide");
            document.getElementById("carnetFin").classList.remove('hide');
            setTimeout(
                function() {document.getElementById("Dialogue").classList.add("hide");},
                3000,
            )
            
        }

        //S'il n'y a pas de quiz ou de jeu à lancer derrière cette réplique
        if(this.scene[this.counter]?.Quiz != 1 && this.scene[this.counter].PFC != 1){

            //On cache les autres div sauf le dialogue
            document.querySelector("#textDialogue").style.visibility = "visible";
            document.querySelector(".box").style.visibility = "hidden";
            document.querySelector(".resultat").style.visibility = "hidden";
            document.querySelector("#QuizZone").style.visibility = "hidden";
            document.querySelector("#reponse").style.visibility = "hidden";

        } else {
            //S'il faut lancer le PFC
            if(this.scene[this.counter].PFC == 1){
                document.querySelector("#Suite").style.visibility = "hidden";
                setTimeout(function(){
                    document.querySelector("#textDialogue").style.visibility = "hidden";
                    document.querySelector(".box").style.visibility = "visible";
                    document.querySelector(".resultat").style.visibility = "visible";
                }, 4000);
            } else { //S'il faut lancer un quiz
                document.querySelector("#Suite").style.visibility = "hidden";
                lancerQuiz(this.id);
                setTimeout(function(){
                    document.querySelector("#textDialogue").style.visibility = "hidden";
                    document.querySelector("#QuizZone").style.visibility = "visible";
                    document.querySelector("#Suite").style.visibility = "visible";
                }, 4000);
            }
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