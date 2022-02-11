class BackgroundImage extends CSSProperty {
    constructor(value){
        super("background-image", value);
    }

    interpolateWith(other, progress){
        // TODO: gérer ce cas dans AnimationFrame.js
        return this;
    }
}