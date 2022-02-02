class Display extends CSSProperty {
    constructor(value){
        super("display", value);
    }

    
    interpolateWith(other, progress){
        // TODO: gérer ce cas dans AnimationFrame.js
        return this;
    }
}