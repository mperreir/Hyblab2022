class BackgroundImage extends CSSProperty {
    constructor(value){
        super("background-image", value);
    }

    interpolateWith(other, progress){
        console.warn("Pas d'interpolation pour les images. L'image de la première frame sera utilisée"); // TODO: gérer ce cas dans AnimationFrame.js

        return this;
    }
}