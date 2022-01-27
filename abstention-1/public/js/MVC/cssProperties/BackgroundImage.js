const CSSProperty = require("./CSSProperty");

class BackgroundImage extends CSSProperty {
    constructor(value){
        super("BackgroundImage", value);
    }
}

module.exports = BackgroundImage;