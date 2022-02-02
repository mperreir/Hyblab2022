const ANIMATIONS = {
    ordre : ["ecole1", "foraine", "camion", "theatre", "mairie", "ecole2"],
    animations : {
        sujet: {
            scroll: {
                [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0))
                    .addProperty(new Opacity(1)),
                [1]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,-100))
                    .addProperty(new Opacity(0)),
            },
            hide: {
                [0]: new AnimationFrame()
                    .addProperty(new Display("none")),
                [1]: new AnimationFrame()
                    .addProperty(new Display("none")),
            }
        },
        ecole1: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0))
                    .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                }
            },
        },
        foraine: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0))
                    .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,0))
                        .addProperty(new BackgroundImage("url(img/Jeune.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Jeune.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Jeune.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,0))
                        .addProperty(new BackgroundImage("url(img/Jeune.svg)")),
                }
            },
        },
        camion: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,-3).scale(0.8,0.8))
                        .addProperty(new BackgroundImage("url(img/JeuneActive.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-2,-3).scale(0.8,0.8))
                        .addProperty(new BackgroundImage("url(img/JeuneActive.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(-2,-3).scale(0.8,0.8))
                    .addProperty(new BackgroundImage("url(img/JeuneActive.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,-3).scale(0.8,0.8))
                        .addProperty(new BackgroundImage("url(img/JeuneActive.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
        },
        theatre: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Vieille.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Vieille.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0))
                    .addProperty(new BackgroundImage("url(img/Vieille.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Vieille.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
        },
        mairie: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,-5).scale(0.7,0.7))
                        .addProperty(new BackgroundImage("url(img/Maire.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,-5).scale(0.7,0.7))
                        .addProperty(new BackgroundImage("url(img/Maire.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,-5).scale(0.7,0.7))
                    .addProperty(new BackgroundImage("url(img/Maire.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,-5).scale(0.7,0.7))
                        .addProperty(new BackgroundImage("url(img/Maire.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,7).scale(-1,1))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
        },
        ecole2: {
            perso1 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                    .addProperty(new Transform().translate(0,0))
                    .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(-10,0))
                        .addProperty(new BackgroundImage("url(img/Charlie.svg)")),
                }
            },
            perso2 : {
                in : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                },
                out : {
                    [0]: new AnimationFrame()
                        .addProperty(new Transform().translate(0,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                    [1]: new AnimationFrame()
                        .addProperty(new Transform().translate(10,6))
                        .addProperty(new BackgroundImage("url(img/VieuxActif.svg)")),
                }
            },
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