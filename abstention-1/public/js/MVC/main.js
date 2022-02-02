const sujetAnimation = new AnimationModel(
    ".container.sujet",
    [
        {
            visibility: [0.75, 1],
            keyframes: ANIMATIONS.animations.sujet.scroll,
            player: "#sujet",
        },
        {
            visibility: [1.2, 1.5],
            keyframes: ANIMATIONS.animations.sujet.hide,
            player: "#sujet",
        },
    ]
)

let sujetControler = new AnimationControler([sujetAnimation]);

const scrollIndicatorAnimation = new AnimationModel(
    ".container.sujet",
    [
        {
            visibility: [0.7, 1],
            keyframes: ANIMATIONS.animations.fade.out,
            player: "#scrollIndicator",
        }
    ]
);

let scrollIndicatorControler = new AnimationControler([scrollIndicatorAnimation]);

let scenes = [
    new DialogueModel(dialogues[0].Texte,"M. Martin 51ans"),
    new DialogueModel(dialogues[1].Texte,"Arthur 17ans"),
    new DialogueModel(dialogues[2].Texte,"Nouvelle arrivante 24ans"),
    new DialogueModel(dialogues[3].Texte,"M. le maire 46ans"),
    new DialogueModel(dialogues[4].Texte,"Mme Robert 82ans"),
    new DialogueModel(dialogues[5].Texte,"M. Martin 51ans"),
]

// let controleur = [new Controler(scene1), new Controler(scene2), new Controler(scene3), new Controler(scene4), new Controler(scene5)];
const dialogueControler = new DialogueControler(scenes);

function mod(a,b) {
	return (( a % b ) + b ) % b;
};

function getDialogueTransition(etape){
    return [
        {
            visibility: [0.1, 0.25],
            keyframes: ANIMATIONS.animations.fade.in,
            player: "#Dialogue",
        },
        {
            visibility: [0.1, 0.5],
            keyframes: ANIMATIONS.animations[etape].perso1.in,
            player: "#personnage1",
        },
        {
            visibility: [0.1, 0.5],
            keyframes: ANIMATIONS.animations[etape].perso2.in,
            player: "#personnage2",
        },
        {
            visibility: [0.5, 0.9],
            keyframes: ANIMATIONS.animations[etape].perso1.out,
            player: "#personnage1",
        },
        {
            visibility: [0.5, 0.9],
            keyframes: ANIMATIONS.animations[etape].perso2.out,
            player: "#personnage2",
        },
        {
            visibility: [0.75, 0.9],
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
                    ...getDialogueTransition(etape),
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


const animations = getAnimations().map(({container, actions}) => new AnimationModel(container, actions, dialogueControler));

let animationControler = new AnimationControler(animations);

scenes.forEach((scene, i) => scene.linkAnimationModel(animations[i]));

const AUDIO = new Audio("sound/SONS-ANIMATION.mp3");
AUDIO.loop = true;

window.addEventListener("scroll", () => {
    const dialogue = document.getElementById("Dialogue");

    if(dialogueControler.nextModelIndex > 0 && dialogue.style.opacity <= 0) {
        AUDIO.play();
        //TODO : transition smooth du son
    }
    else {
        AUDIO.pause();
    }
})


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
    player:'.player.camion-vers-mairie',
    mode:"scroll",
    container:".container.camion-vers-mairie",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.mairie-vers-theatre',
    mode:"scroll",
    container:".container.mairie-vers-theatre",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.theatre-vers-ecole2',
    mode:"scroll",
    container:".container.theatre-vers-ecole2",
    actions: [
        {
            visibility:[0,1],
            type: "seek",
            frames: [0],
        },
    ]
});