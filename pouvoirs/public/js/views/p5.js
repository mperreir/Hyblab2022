"use strict";
let released = false;
let isClickable = false;
const init_p5 = function(){
    let dialogBox = document.querySelector(".dialogBox");
    const ringtone = createAudio("data/sounds/marimba.mp3",true,1,0.7);
    const phoneButton = document.querySelector(".phoneButton");
    const nameContainer = document.createElement("div");
    nameContainer.setAttribute("id","nameContainer");
    const name = document.createElement("h3");
    name.innerHTML = "Bernard le taulard";
    nameContainer.appendChild(name);
    nameContainer.classList.add("apply-shake");
    nameContainer.style.position = "absolute";
    nameContainer.style.bottom = "35%";

    const animationsContainer = document.querySelector("#animationsContainer");
    animationsContainer.parentNode.insertBefore(nameContainer,animationsContainer.nextSibling);
    const callingAnimation = createAnimation("animationsContainer","data/animations/callAnimation.json",true);
    callingAnimation.play();
    ringtone.play();
    
    phoneButton.addEventListener("click", () => pickUp(ringtone,callingAnimation,nameContainer,dialogBox));

    animationsContainer.addEventListener("click",() => {
        const prisonGridUp = switchingAnimation();
        const prisonGridUpSound = createAudio("data/sounds/good_choice.mp3");
        if (!released && isClickable) {
            animationsContainer.removeChild(document.querySelector("#animationsContainer img"));
            prisonGridUpSound.play();
            prisonGridUp.play();
            shakeElement(dialogBox);
            const textContainer= dialogBox.querySelector("p");
            textContainer.innerHTML = "Vous venez d'invoquer le pouvoir de grâce présidentielle ! <br><br> (<b>Article 17</b> de la Constitution)"
            textContainer.style.bottom = "50%";
            textContainer.style.textAlign = "center";
            released = true;
        }
    })
}
const pickUp = function(ringtone,callingAnimation,nameContainer,dialogBox) {
    document.querySelector(".phoneButton").remove();
    ringtone.pause();
    ringtone.unload();
    callingAnimation.destroy();
    nameContainer.classList.remove("apply-shake");
    const prisonGridDownSound = createAudio("data/sounds/prisonGridDown.mp3",false,0.7,0.5);
    const phoneCallSound = createAudio("data/sounds/phoneCall.mp3",false,1.0,0.7);
    const prisonGridDown = createAnimation("animationsContainer","data/animations/prisonGridDown.json",false,0.7,0.7);
    showDialogBox(dialogBox);
    phoneCallSound.play();
    prisonGridDown.play();         
    prisonGridDownSound.play();
    prisonGridDown.addEventListener('complete', () => {
        phoneCallSound.unload();
        prisonGridDownSound.unload();
        isClickable = true;
        showTitle("p5");
        displayHelp();     
    });
};
const switchingAnimation = function() {
    animationsContainer.removeChild(document.querySelector("#animationsContainer svg"));
    const prisonGridUp = createAnimation("animationsContainer","data/animations/prisonGridUp.json",false);
    return prisonGridUp;
};
const displayHelp = function(){
    const clickHere = document.createElement("img");  
    clickHere.setAttribute("src","img/elements/click-here.png");
    animationsContainer.appendChild(clickHere);
    document.querySelector("#animationsContainer img").style.visibility = "hidden";
    setTimeout(()=>{
        if(!released){
            document.querySelector("#animationsContainer img").style.visibility = "visible";
        }                    
    },7000);
};
const showDialogBox = function(dBox) {
    dBox.style.display = "block";
    shakeElement(dBox);
    const textContainer = document.createElement("p");
    textContainer.innerHTML = "Une majorité des députés de votre camp n'est pas d'accord avec votre politique et a rallié l'opposition. <br> <b> Que peux-tu faire ? </b>"
    dBox.appendChild(textContainer);
}
const shakeElement = function(elt){
    elt.classList.add("apply-shake");
    setTimeout(() =>{
        elt.classList.remove("apply-shake");
    },500);
}
