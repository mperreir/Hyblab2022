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

function getContainerVisibility() {
    // Get the bounding box for the lottie player or container
    // top : distance entre le haut de l'écran et le haut de l'élément
    // positif quand l'élément est en dessous de l'écran, négatif au dessus
    // height : hauteur (en pixel) de l'élément
    const { top, height } = document.getElementById("test").getBoundingClientRect();

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