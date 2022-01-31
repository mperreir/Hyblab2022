class FullAnimationControler {
    constructor(models){
        this.models = models;
        this.models.forEach(model => {
            model.addObserver(new TransitionObserver());
            this.addScrollListener(model)
        });
    }

    add(model) {
        this.models.push(model);
        this.addScrollListener(model);
        return this;
    }

    addScrollListener(model) {
        window.addEventListener("scroll", () => model.updateScroll());
    }
}