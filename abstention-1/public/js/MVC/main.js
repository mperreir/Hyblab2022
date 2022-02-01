let scenes = [
    new ModelDialogue(dialogues[0].Texte,"img/Charlie.svg","img/VieuxActif.svg","M. Martin 51ans"),
    new ModelDialogue(dialogues[1].Texte,"img/Charlie.svg","img/Jeune.svg","Arthur 17ans"),
    new ModelDialogue(dialogues[2].Texte,"img/Charlie.svg","img/JeuneActive.svg","Nouvelle arrivante 24ans"),
    new ModelDialogue(dialogues[3].Texte,"img/Charlie.svg","img/Maire.svg","M. le maire 46ans"),
    new ModelDialogue(dialogues[4].Texte,"img/Charlie.svg","img/Vieille.svg","Mme Robert 82ans"),
    new ModelDialogue(dialogues[5].Texte,"img/Charlie.svg","img/VieuxActif.svg","M. Martin 51ans"),
]

// let controleur = [new Controler(scene1), new Controler(scene2), new Controler(scene3), new Controler(scene4), new Controler(scene5)];
const dialogueControler = new Controler(scenes);

function mod(a,b) {
	return (( a % b ) + b ) % b;
};

function getDialogueTransition(etape){
    return [
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
        }
    ]
}


function getAnimations() {
    const etapes = ANIMATIONS.ordre;

    const firstAnim = {
        container: `.container.dialogue.${etapes[0]}`,
        actions: [
            ...getDialogueTransition(etapes[0]),
            {
                visibility: [0.9, 1],
                keyframes: ANIMATIONS.animations.fade.in,
                player: `.player.${etapes[0]}-vers-${etapes[1]}`,
            },
        ]
    };

    const lastAnim = {
        container: `.container.dialogue.${etapes[etapes.length - 1]}`,
        actions: [
            {
                visibility: [0, 0.1],
                keyframes: ANIMATIONS.animations.fade.out,
                player: `.player.${etapes[etapes.length - 2]}-vers-${etapes[etapes.length - 1]}`,
            },
            ...getDialogueTransition(etapes[etapes.length - 1]),
        ]
    };

    let anims = [];

    for (let i = 1; i < etapes.length - 1; i++) {
        const prevEtape = etapes[i - 1];
        const etape = etapes[i];
        const nextEtape = etapes[i + 1];

        anims.push({
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
        })

    }


    return [firstAnim, ...anims, lastAnim];
}

console.log(getAnimations());
const animations = getAnimations().map(({container, actions}) => new AnimationModel(container, actions, dialogueControler));

let animationControler = new AnimationControler(animations);

scenes.forEach((scene, i) => scene.linkAnimationModel(animations[i]));


LottieInteractivity.create({
    player:'.player.ecole1-vers-foraine',
    mode:"scroll",
    container:".container.ecole1-vers-foraine",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.foraine-vers-camion',
    mode:"scroll",
    container:".container.foraine-vers-camion",
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
    player:'.player.mairie-vers-ecole2',
    mode:"scroll",
    container:".container.mairie-vers-ecole2",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

