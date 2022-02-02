let scenes = [
    new ModelDialogue(SCRIPT.Scene1,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans"),
    new ModelDialogue(SCRIPT.Scene2,"img/Charlie.svg","img/Jeune.svg","Arthur 17ans"),
    new ModelDialogue(SCRIPT.Scene3,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans"),
    new ModelDialogue(SCRIPT.Scene4,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans"),
    new ModelDialogue(SCRIPT.Scene5,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans"),
]

// let controleur = [new Controler(scene1), new Controler(scene2), new Controler(scene3), new Controler(scene4), new Controler(scene5)];
const dialogueControler = new Controler(scenes);

function mod(a,b) {
	return (( a % b ) + b ) % b;
};


function getAnimations() {
    return ANIMATIONS.ordre.map((etape, i, etapes) => {
        const prevEtape = etapes[mod(i - 1, etapes.length)];
        const nextEtape = etapes[(i+1) % etapes.length];

        return {
            container: `.container.dialogue.${etape}`,
            actions: [
                {
                    visibility: [0, 0.1],
                    keyframes: ANIMATIONS.animations.fade.out,
                    player: `.player.${prevEtape}-vers-${etape}`,
                },
                {
                    visibility: [0.1, 0.2],
                    keyframes: ANIMATIONS.animations.fade.in,
                    player: "#Dialogue",
                },
                {
                    visibility: [0.1, 0.3],
                    keyframes: ANIMATIONS.animations[etape].perso1.in,
                    player: "#personnage1",
                },
                {
                    visibility: [0.1, 0.3],
                    keyframes: ANIMATIONS.animations[etape].perso2.in,
                    player: "#personnage2",
                },
                {
                    visibility: [0.7, 0.9],
                    keyframes: ANIMATIONS.animations[etape].perso1.out,
                    player: "#personnage1",
                },
                {
                    visibility: [0.7, 0.9],
                    keyframes: ANIMATIONS.animations[etape].perso2.out,
                    player: "#personnage2",
                },
                {
                    visibility: [0.8, 0.9],
                    keyframes: ANIMATIONS.animations.fade.out,
                    player: "#Dialogue",
                },
                {
                    visibility: [0.9, 1],
                    keyframes: ANIMATIONS.animations.fade.in,
                    player: `.player.${etape}-vers-${nextEtape}`,
                },
            ],
        }
    })
}
console.log(getAnimations());
const animations = getAnimations().map(({container, actions}) => new AnimationModel(container, actions, dialogueControler));

let animationControler = new AnimationControler(animations);

scenes.forEach((scene, i) => scene.linkAnimationModel(animations[i]));


LottieInteractivity.create({
    player:'.player.ecole-vers-skatepark',
    mode:"scroll",
    container:".container.ecole-vers-skatepark",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.skatepark-vers-camion',
    mode:"scroll",
    container:".container.skatepark-vers-camion",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.camion-vers-theatre',
    mode:"scroll",
    container:".container.camion-vers-theatre",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.theatre-vers-mairie',
    mode:"scroll",
    container:".container.theatre-vers-mairie",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.mairie-vers-ecole',
    mode:"scroll",
    container:".container.mairie-vers-ecole",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

