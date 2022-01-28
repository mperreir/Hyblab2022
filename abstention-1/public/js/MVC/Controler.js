class Controler {
    constructor(models){
        this.models = models;
        this.models.forEach(model => this.addScrollListener(model));
    }

    add(model){
        this.models.push(model);
        this.addScrollListener(model);
    }

    addScrollListener(model) {
        window.addEventListener("scroll", () => model.updateScroll());
    }
}