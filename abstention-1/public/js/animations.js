const Opacity = require("./MVC/cssProperties/Opacity");
const Transform = require("./MVC/cssProperties/Transform");

const ANIMATIONS = {
    ordre : ["ecole", "skatepark", "camion", "parc", "mairie", "conclusion"],
    animations : {
        ecole : {
            [0] : {
                transform : new Transform().translate(0,0),
                opacity : new Opacity(1),
            },
            [0.5] : {
                transform : new Transform().translate(10,20),
                opacity : new Opacity(0),
            }
        },

        skatepark : {

        },

        camion : {

        },

        parc : {

        },

        mairie : {

        },

        conclusion : {

        },
    }
}

module.exports = ANIMATIONS;