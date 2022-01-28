LottieInteractivity.create({
    player:'#player-ecole-vers-skatepark',
    mode:"scroll",
    container:"#container-ecole-vers-skatepark",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'#player-skatepark-vers-camion',
    mode:"scroll",
    container:"#container-skatepark-vers-camion",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'#player-camion-vers-mairie',
    mode:"scroll",
    container:"#container-camion-vers-mairie",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0, 97],
        },
    ]
});

LottieInteractivity.create({
    player:'#player-mairie-vers-theatre',
    mode:"scroll",
    container:"#container-mairie-vers-theatre",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'#player-theatre-vers-ecole',
    mode:"scroll",
    container:"#container-theatre-vers-ecole",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});