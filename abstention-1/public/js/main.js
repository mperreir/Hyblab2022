LottieInteractivity.create({
    player:'.player.ecole-vers-skatepark',
    mode:"scroll",
    container:".container.ecole-vers-skatepark",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.out,
    player: '.player.ecole-vers-skatepark',
    container: ".transition.ecole-vers-skatepark",
    actions: [
        {
            visibility:[0.25, 0.33],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.in,
    player: '.player.skatepark-vers-camion',
    container: ".transition.ecole-vers-skatepark",
    actions: [
        {
            visibility:[0.66, 0.75],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.skatepark-vers-camion',
    mode:"scroll",
    container:".container.skatepark-vers-camion",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.out,
    player: '.player.skatepark-vers-camion',
    container: ".transition.skatepark-vers-camion",
    actions: [
        {
            visibility:[0, 0.5],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.in,
    player: '.player.camion-vers-mairie',
    container: ".transition.skatepark-vers-camion",
    actions: [
        {
            visibility:[0.5, 1],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.camion-vers-mairie',
    mode:"scroll",
    container:".container.camion-vers-mairie",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.out,
    player: '.player.camion-vers-mairie',
    container: ".transition.camion-vers-mairie",
    actions: [
        {
            visibility:[0, 0.5],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.in,
    player: '.player.mairie-vers-theatre',
    container: ".transition.camion-vers-mairie",
    actions: [
        {
            visibility:[0.5, 1],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.mairie-vers-theatre',
    mode:"scroll",
    container:".container.mairie-vers-theatre",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.out,
    player: '.player.mairie-vers-theatre',
    container: ".transition.mairie-vers-theatre",
    actions: [
        {
            visibility:[0, 0.5],
        },
    ]
});

new AnimationTransition({
    keyframes: ANIMATIONS.animations.fade.in,
    player: '.player.theatre-vers-ecole',
    container: ".transition.mairie-vers-theatre",
    actions: [
        {
            visibility:[0.5, 1],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.theatre-vers-ecole',
    mode:"scroll",
    container:".container.theatre-vers-ecole",
    actions: [
        {
            visibility:[0, 1],
            type: "seek",
            frames: [0],
        },
    ]
});