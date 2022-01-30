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
                    .addProperty(new Opacity(0))
                    .addProperty(new Transform()
                        .translate(10,10)    
                    ),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(1))
                    .addProperty(new Transform()
                        .translate(0,0)    
                    ),
            },
            out : {
                [0] : new AnimationFrame()
                    .addProperty(new Opacity(1))
                    .addProperty(new Transform()
                        .translate(10,10)    
                    ),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(0))
                    .addProperty(new Transform()
                        .translate(0,0)    
                    ),
            }
        }
    }
}