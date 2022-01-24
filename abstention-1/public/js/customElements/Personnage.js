const Animable = require("./Animable");

class Personnage extends Animable {
    constructor() {
        super();

        if(this.hasAttribute('img')) {
            this.img = this.getAttribute('img');
        }
        else {
            this.img = '../../img/logo_hyblab.png';
        }
    }
}

customElements.define("animable-personnage", Personnage);

module.exports = Personnage;