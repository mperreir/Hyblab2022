const ANIMATIONS = {
    ordre : ["ecole", "skatepark", "camion", "parc", "mairie", "conclusion"],
    animations : {
        ecole : {

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

        fade : {
            in : {
                [0] : new AnimationFrame()
                    .addProperty(new Opacity(0)),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(1)),
            },
            out : {
                [0] : new AnimationFrame()
                    .addProperty(new Opacity(1)),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(0)),
            }
        }
    }
}