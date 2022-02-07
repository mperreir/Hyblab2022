class CSSProperty {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    interpolateWith(other, progress){
        if (this.name !== other.name) throw new Error(`${other} n'est pas la même propriété que ${this}`);

        return new CSSProperty(this.name, LinearInterpolate.number(this.value, other.value, progress));
    }

    toCSS() {
        return `${this.name}: ${this.value};`
    }
}