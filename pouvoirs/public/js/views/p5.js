var bool = false;
const init_p5 = function(){
    if (!bool){

    let dialogBox = document.querySelector(".dialogBox");
    const ringtone = createAudio("data/sounds/marimba.mp3",true,1,0.7);
    const phoneButton = document.querySelector(".phoneButton");
    const animationsContainer = document.querySelector("#animationsContainer");

    const callingAnimation = createAnimation("animationsContainer","data/animations/callAnimation.json",true);
    callingAnimation.play();
    ringtone.play();
    
    phoneButton.addEventListener("click", () => {
        phoneButton.style.display = "none";
        ringtone.pause();
        callingAnimation.destroy();
        const prisonGridDownSound = createAudio("data/sounds/prisonGridDown.mp3",false,0.7,0.5);
        const phoneCallSound = createAudio("data/sounds/phoneCall.mp3",false,1.0,0.7);
        const prisonGridDown = createAnimation("animationsContainer","data/animations/prisonGridDown.json",false,0.7,0.7);
        showDialogBox(dialogBox);
        setTimeout(2500);
        phoneCallSound.play();
        prisonGridDownSound.play();
        prisonGridDown.play();
    });

    animationsContainer.addEventListener("click",() =>{
        const prisonGridUp = createAnimation("animationsContainer","data/animations/prisonGridUp.json",false);
        const prisonGridUpSound = createAudio("data/sounds/good_choice.mp3");
        prisonGridUpSound.play();
        prisonGridUp.play();
        dialogBox.classList.add("apply-shake");
        setTimeout(() =>{
            dialogBox.classList.remove("apply-shake");
        },500);        
        const textContainer= dialogBox.querySelector("p");
        textContainer.innerHTML = "Vous venez d'invoquer le pouvoir de grâce présidentielle ! <br> (<b>Article 17</b> de la Constitution)"
        textContainer.style.bottom = "56%";
    })
    bool = true;
    }
}
const showDialogBox = function(dBox) {
    dBox.style.display = "block";
    dBox.classList.add("apply-shake");
    setTimeout(() =>{
        dBox.classList.remove("apply-shake");
    },500); 
    const textContainer = document.createElement("p");
    textContainer.innerHTML = "Une majorité des députés de votre camp n'est pas d'accord avec votre politique et a rallié l'opposition. <br> <b> Que peux-tu faire ? </b>"
    dBox.appendChild(textContainer);
}