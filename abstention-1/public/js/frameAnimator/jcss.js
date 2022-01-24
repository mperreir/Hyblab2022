class JCSS {
    constructor(strings, values) {
      this.strings = strings;
      this.values = values;
    }

    toCSS() {
      return this.values.reduce((finalString, value, index) => {
            return `${finalString}${value}${this.strings[index + 1]}`
        }, this.strings[0]);
    }

    interpolateWith(jcss, progress){

    }
}
  
function jcss(strings, ...values) {
    return new JCSS(strings, values);
}

module.exports = {
    translate: (x, y) => jcss`translate(${x}vw, ${y}vh)`,
    scale: (sx, sy) => jcss`scale(${sx}, ${sy || sx})`,
    rotate: angle => jcss`rotate(${angle}deg)`,
    matrix: (...cell) => jcss`matrix(${cell.join(',')})`,
    skew: (angleX, angleY) => jcss`skew(${angleX}deg,${angleY}deg)`,
    multiple: (...css) => {
        let strings = [];
        let values = [];

        css.forEach(el => {
            strings = strings.concat(el.strings);
            values = values.concat(el.values);
        })

        return new JCSS(strings, values);
    },
}