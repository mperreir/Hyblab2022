class AnimationFrame extends CSSProperty {
    constructor(properties = []) {
        super("animationFrame", properties);
    }

    addProperty(cssProperty) {
        this.value.push(cssProperty);
        return this;
    }

    interpolateWith(other, progress){
        if (this.name !== other.name) throw new Error(`${other} n'est pas la même propriété que ${this}`);

        let properties = [];
        this.value.forEach((property, index) => properties.push(property.interpolateWith(other.value[index], progress)));

        return new AnimationFrame(properties);
    }

    toCSS() {
        let css = "";
        this.value.forEach(property => css += property.toCSS());
        return css;
    }
}