
class DialogueView {

    constructor(){
    
        this.go=document.querySelector('#go');
        this.info=document.querySelector('#info');
        this.popupInfo=document.querySelector('#popupPointInfo');
        this.carnet=document.querySelector('#carnet');
        this.popupcarnet=document.querySelector('#popupCarnet');
        this.croix=document.querySelector('#croix');
     
        this.dialoguePart=document.querySelector('#Dialogue');
        this.transitionPartPart=document.querySelector('#Transition');

        this.perso1 = document.querySelector('#personnage1');
        this.perso2 = document.querySelector('#personnage2');
        this.description = document.querySelector("#description");

        this.textZone=document.querySelector('#textZone');
        this.quizZone=document.querySelector('#QuizZone');

        this.texte=document.querySelector('#textDialogue');
        this.suite=document.querySelector('#Suite');
        this.nom=document.querySelector('.nom');

        this.question=document.querySelector('#QuizZone p');
        this.reponseA=document.querySelector('#reponseA');
        this.reponseB=document.querySelector('#reponseB');
        this.reponseC=document.querySelector('#reponseC');

        this.animation= document.querySelector('#animation');

    }
  }
  