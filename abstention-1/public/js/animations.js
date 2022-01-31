const ANIMATIONS = {
    ordre : ["ecole", "skatepark", "camion", "mairie", "theatre"],
    animations : {
        perso1 : {
            in : {
                [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(-10,0)),
                [1]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0)),
            },
            out : {
                [0]: new AnimationFrame()
                .addProperty(new Transform().translate(0,0)),
                [1]: new AnimationFrame()
                    .addProperty(new Transform().translate(-10,0)),
            }
        },
        perso2 : {
            in : {
                [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(10,0)),
                [1]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0)),
            },
            out : {
                [0]: new AnimationFrame()
                .addProperty(new Transform().translate(0,0)),
                [1]: new AnimationFrame()
                    .addProperty(new Transform().translate(10,0)),
            }
        },
        fade : {
            in : {
                [0] : new AnimationFrame()
                    .addProperty(new Opacity(-1)),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(2)),
            },
            out : {
                [0] : new AnimationFrame()
                    .addProperty(new Opacity(2)),

                [1] : new AnimationFrame()
                    .addProperty(new Opacity(-1)),
            }
        }
    }
}