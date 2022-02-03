class DialogueControler {
    constructor(models){

        this.view = new DialogueView();
        this.models = models;
        this.currentModel = undefined;
        this.nextModelIndex = 0;
        this.changement = () => this.currentModel.changement(this);
        this.infoActiv=0;
        this.infoActiv=0;


        //this.loadNextModel();
        // update

        //  action
        this.view.telechargement?.addEventListener("click", ()=> {window.location.href = 'Abstention.pdf';});
        this.view.VersCredit?.addEventListener("click", ()=> {window.location.href = 'credit.html';});
        this.view.btnrecommencer?.addEventListener("click", ()=> {window.location.href = 'index.html';});
        this.view.btnretour?.addEventListener("click", ()=> {window.location.href = 'voyage.html';});


        this.view.go?.addEventListener("click", ()=> {window.location.href = 'voyage.html';});

        this.view.info?.addEventListener("click", ()=> {
        
            if (this.infoActiv===0){
                this.infoActiv=1;
                this.view.popupInfo.style.opacity=1;
            } 
            else {
                this.infoActiv=0;
                this.view.popupInfo.style.opacity=0;
            }
        }
        );

        this.view.carnet?.addEventListener("click", ()=> {
            this.view.popupcarnet.style.display='block';
            disableScroll();
        });
        
        this.view.croix?.addEventListener("click", ()=> {
            this.view.popupcarnet.style.display='none';
            const dialogueId = parseInt(this.view.cercle.innerText) - 1;

            // Todo réussir à recall finishDialogue sur le dialogue qui vient de se terminer
            // de maniere plus propre
            if(this.models[dialogueId].animationModel.dialogueDone) {
                this.models[dialogueId].animationModel.finishDialogue(dialogueId + 1);
            }
            else {
                enableScroll();
            }
        });

    }

    loadNextModel() {
        if (this.nextModelIndex >= this.models.length) {
            return;
        }

        // A ne pas executer lors de l'initialisation car currentModel est undefined
        if (this.nextModelIndex === 0) {
            this.view.suite.addEventListener("click", this.changement);
        }

        this.currentModel = this.models[this.nextModelIndex];
        this.currentModel.addObserver(new DialogueObserver(this.view));

        this.view.description.innerText = this.currentModel.description;
        this.view.cercle.innerText = this.nextModelIndex + 1;
        this.changement();

        this.nextModelIndex++;
    }


}

