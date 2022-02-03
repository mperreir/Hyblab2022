class AnimationModel extends Observable {
    /**
     * 
     * @param {string} container 
     * @param {Object[]} actions 
     * @param {Number[]} actions.visibility % du temps d'apparation de container à l'écran
     * @param {Object} actions.keyframes Voir animation.js pour plus de détails
     * @param {string} actions.player nom / id / class de l'HTMLElement sur lequel appliquer l'animation
     */
     constructor(container, actions, dialogueControler = undefined) {
        super();
        // Partie transition
        this.container = document.querySelector(container);
        // TODO: Faire une vue qui se charge de récupérer les éléments, ça fait pas trop MVC comme ça
        this.actions = actions.map(action => {
            action.player = document.querySelector(action.player);
            return action;
        });

        this.scroll = undefined;
        this.currentActions = undefined;
        this.startScrollValueRelative = 0.5;
        this.dialogueDone = false;
        this.dialogueStarted = false;
        this.startScrollValueAbsolute = undefined;

        this.dialogueControler = dialogueControler;
        this.modelChanged = false;

        this.infosCarnet = [...document.getElementById("infos-carnet").getElementsByTagName("li")];
    }

    
    updateScroll(){
        this.scroll = this.getContainerVisibility();
        // On s'assure que le dialogue commence a apparaitre avant de pouvoir intéragir avec
        if(this.dialogueControler && !this.modelChanged && this.scroll > 0.1) {
            this.dialogueControler.loadNextModel();
            this.modelChanged = true;
        }

        if (this.canStartDialogue()) {
            this.startDialogue();
        }

        this.currentActions = this.actions.filter(
            ({ visibility }) => this.scroll >= visibility[0] && this.scroll <= visibility[1],
        )

        if (this.currentActions.length !== 0) {
            this.setChanged();
        }

        this.notifyObservers();
    }

    getContainerVisibility() {
        // Get the bounding box for the lottie player or container
        // top : distance entre le haut de l'écran et le haut de l'élément
        // positif quand l'élément est en dessous de l'écran, négatif au dessus
        // height : hauteur (en pixel) de l'élément
        const { top, height } = this.container.getBoundingClientRect();
    
        // Calculate current view percentage
        // current : Distance entre le haut de l'élément et le bas de l'écran
        // positif quand l'élément est au dessus de l'écran, négatif en dessous
        const current = window.innerHeight - top;
        // max : valeur à partir de laquelle on ne voit plus l'élément à l'écran
        const max = window.innerHeight + height;
    
        // L'élément est visible quand : 0 < current < max
        // En prenant le ratio r de current / max on peut distinguer 3 cas :
        // r < 0 : L'élément n'est pas encore apparu
        // 0 <= r <= 1 : L'élément est visible à l'écran
        // r > 1 : L'élément est apparu et n'est plus visible
        return current / max;
    }

    canStartDialogue(){
        return this.dialogueControler && !this.dialogueStarted && !this.dialogueDone && this.scroll > this.startScrollValueRelative;
    }

    startDialogue(){
        this.dialogueStarted = true;
        this.startScrollValueAbsolute = window.scrollY;
        console.log(this);
        disableScroll();
        DIALOGUESTARTED = true;

    }

    finishDialogue(dialogueId){
        DIALOGUESTARTED = false;
        this.infosCarnet.filter((_, i) => i <= dialogueId).map(el => el.style.display = "list-item");
        document.getElementById("scrollIndicator").style.opacity = 1;
        enableScroll();
        this.dialogueDone = true;
        window.scrollTo(0, this.startScrollValueAbsolute);
    }

}