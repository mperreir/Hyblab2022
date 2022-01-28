const CSSProperty = require("./CSSProperty");

class Opacity extends CSSProperty {
    constructor(value){
        super("Opacity", value);
    }
}

module.exports = Opacity;