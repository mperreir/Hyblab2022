const { LinearInterpolate } = require("../../utils");

class Transform {
    constructor(values = {}){
        this.values = values;
    }

    #toObject(strings, ...values) {
        return {strings, values};
    }

    translate(x, y) {
        this.values.translate = this.#toObject`translate(${x}vw, ${y}vh)`;
        return this;
    }

    scale(sx, sy) {
        this.values.scale = this.#toObject`scale(${sx}, ${sy || sx})`;
        return this;
    }

    rotate(angle) {
        this.values.rotate = this.#toObject`rotate(${angle}deg)`;
        return this;
    }

    matrix(...cell) {
        this.values.matrix = this.#toObject`matrix(${cell.join(',')})`;
        return this;
    }

    skew(angleX, angleY) {
        this.values.skew = this.#toObject`skew(${angleX}deg,${angleY}deg)`;
        return this;
    }

    interpolateWith(other, progress) {
        if (!other instanceof Transform) throw new Error(`${other} n'est pas du type other`);

        let thisKeys = Object.keys(this.values);
        let otherKeys = Object.keys(other.values);

        let [keys1, intersection, keys2] = LinearInterpolate.divide(thisKeys, otherKeys);

        let interpolated = {};

        intersection.forEach(key => {
            interpolated[key] = {
                strings: this.values[key].strings,
                values: LinearInterpolate.array(this.values[key].values, other.values[key].values, progress),
            }
        });

        keys1.forEach(key => { interpolated[key] = this.values[key]; });
        keys2.forEach(key => { interpolated[key] = other.values[key]; });

        return new Transform(interpolated);
    }
}

module.exports = Transform;