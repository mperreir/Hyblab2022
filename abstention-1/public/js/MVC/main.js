let scene1 = new ModelDialogue(SCRIPT.Scene1,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans");
let scene2 = new ModelDialogue(SCRIPT.Scene2,"img/Charlie.svg","img/Jeune.svg","Arthur 17ans");
let scene3 = new ModelDialogue(SCRIPT.Scene3,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans");
let scene4 = new ModelDialogue(SCRIPT.Scene4,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans");
let scene5 = new ModelDialogue(SCRIPT.Scene5,"img/Charlie.svg","img/JeuneActive.svg","Arthur 17ans");

// let controleur = [new Controler(scene1), new Controler(scene2), new Controler(scene3), new Controler(scene4), new Controler(scene5)];
const dialogueControler = new Controler([scene1, scene2, scene3, scene4, scene5]);

function getAnimations() {
    return ANIMATIONS.ordre.map((etape, i, etapes) => {
        const classeEtape = `${etape}-vers-${etapes[(i + 1) % etapes.length]}`;
        return {
            container: `.container.${classeEtape}`,
            actions: [
                {
                    visibility: [0.05, 0.1],
                    keyframes: ANIMATIONS.animations.fade.out,
                    player: "#Dialogue",
                },
                {
                    visibility: [0, 0.1],
                    keyframes: ANIMATIONS.animations.perso1.out,
                    player: "#personnage1",
                },
                {
                    visibility: [0, 0.1],
                    keyframes: ANIMATIONS.animations.perso2.out,
                    player: "#personnage2",
                },
                {
                    visibility: [0.1, 0.2],
                    keyframes: ANIMATIONS.animations.fade.in,
                    player: `.player.${classeEtape}`,
                },
                {
                    visibility: [0.8, 0.9],
                    keyframes: ANIMATIONS.animations.fade.out,
                    player: `.player.${classeEtape}`,
                },
                {
                    visibility: [0.9, 0.95],
                    keyframes: ANIMATIONS.animations.fade.in,
                    player: "#Dialogue",
                },
                {
                    visibility: [0.9, 1],
                    keyframes: ANIMATIONS.animations.perso1.in,
                    player: "#personnage1",
                },
                {
                    visibility: [0.9, 1],
                    keyframes: ANIMATIONS.animations.perso2.in,
                    player: "#personnage2",
                },
            ]
        }
    })
}

const animations = getAnimations().map(({container, actions}) => new FullAnimationModel(container, actions, dialogueControler));

let truc = new FullAnimationControler(animations);

// let anim1 = new AnimationModel(
//     '.player.ecole-vers-skatepark',
//     ".container.ecole-vers-skatepark",
//     [
//         {
//             visibility: [0.8, 0.9],
//             keyframes: ANIMATIONS.animations.fade.out,
//         },
//     ]
// );

// let anim2 = new AnimationModel(
//     '.player.skatepark-vers-camion',
//     ".container.skatepark-vers-camion",
//     [
//         {
//             visibility: [0, 0.1],
//             keyframes: ANIMATIONS.animations.fade.in,
//         },

//         {
//             visibility: [0.9, 1],
//             keyframes: ANIMATIONS.animations.fade.out,
//         },
//     ]
// );

// let anim3 = new AnimationModel(
//     '.player.camion-vers-mairie',
//     ".container.camion-vers-mairie",
//     [
//         {
//             visibility: [0, 0.1],
//             keyframes: ANIMATIONS.animations.fade.in,
//         },
        
//         {
//             visibility: [0.9, 1],
//             keyframes: ANIMATIONS.animations.fade.out,
//         },
//     ]
// );
// let anim4 = new AnimationModel(
//     '.player.mairie-vers-theatre',
//     ".container.mairie-vers-theatre",
//     [
//         {
//             visibility: [0, 0.1],
//             keyframes: ANIMATIONS.animations.fade.in,
//         },
        
//         {
//             visibility: [0.9, 1],
//             keyframes: ANIMATIONS.animations.fade.out,
//         },
//     ]
// );
// let anim5 = new AnimationModel(
//     '.player.theatre-vers-ecole',
//     ".container.theatre-vers-ecole",
//     [
//         {
//             visibility: [0, 0.1],
//             keyframes: ANIMATIONS.animations.fade.in,
//         },
        
//         {
//             visibility: [0.9, 1],
//             keyframes: ANIMATIONS.animations.fade.out,
//         },
//     ]
// );

// let controler2 = new AnimationControler([anim1, anim2, anim3, anim4, anim5]);


LottieInteractivity.create({
    player:'.player.ecole-vers-skatepark',
    mode:"scroll",
    container:".container.ecole-vers-skatepark",
    actions: [
        {
            visibility:[0.2, 0.8],
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
            visibility:[0.2, 0.8],
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
            visibility:[0.2, 0.8],
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
            visibility:[0.2, 0.8],
            type: "seek",
            frames: [0],
        },
    ]
});

LottieInteractivity.create({
    player:'.player.theatre-vers-ecole',
    mode:"scroll",
    container:".container.theatre-vers-ecole",
    actions: [
        {
            visibility:[0.2, 0.8],
            type: "seek",
            frames: [0],
        },
    ]
});

