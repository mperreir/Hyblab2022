"use strict";
let released = false;
const init_p5 = function(){
    swiper.disable();
    const ringtone = createAudio("data/sounds/marimba.mp3",true,1,0.7);
    const phoneButton = document.querySelector(".phoneButton");
    const nameContainer = document.createElement("div");
    nameContainer.setAttribute("id","nameContainer");
    const name = document.createElement("h3");
    name.innerHTML = getText("p5-name");
    nameContainer.appendChild(name);
    nameContainer.classList.add("apply-shake");
    nameContainer.style.position = "absolute";
    nameContainer.style.bottom = "35%";

    const animationsContainer = document.querySelector("#animationsContainer");
    animationsContainer.parentNode.insertBefore(nameContainer,animationsContainer.nextSibling);
    const callingAnimation = createAnimation("animationsContainer","data/animations/callAnimation.json",true);
    callingAnimation.play();
    ringtone.play();
    
    phoneButton.addEventListener("click", () => pickUp(ringtone,callingAnimation,nameContainer), { once: true });
}

const pickUp = function(ringtone,callingAnimation,nameContainer,dialogBox) {
    const phoneButton = document.querySelector(".phoneButton");
    phoneButton.remove();
    ringtone.pause();
    ringtone.unload();
    callingAnimation.destroy();
    nameContainer.classList.remove("apply-shake");
    const prisonGridDownSound = createAudio("data/sounds/prisonGridDown.mp3",false,0.7,0.5);
    const prisonGridDown = createAnimation("animationsContainer","data/animations/prisonGridDown.json",false,0.7,0.7);
    document.querySelector("#nameContainer").remove();
    setTimeout(() => showDialogBoxes(), 2500);    
    prisonGridDown.play();         
    prisonGridDownSound.play();
    prisonGridDown.addEventListener('complete', () => {
        prisonGridDownSound.unload();
        showTitle("p5");
    });
};
const release = function() {
    const prisonGridUp = switchingAnimation();  
    const prisonGridUpSound = createAudio("data/sounds/good_choice.mp3");
    if (!released) {
        document.querySelector("#animationsContainer img").remove();
        prisonGridUpSound.play();
        prisonGridUp.play();
        released = true;
        setTimeout(() => showNoteBox(), 4000);
    }
};
const switchingAnimation = function() {
    animationsContainer.removeChild(document.querySelector("#animationsContainer svg"));
    console.log(document.querySelector("#animationsContainer"));
    const prisonGridUp = createAnimation("animationsContainer","data/animations/prisonGridUp.json",false);
    console.log(document.querySelector("#animationsContainer"));
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
const createDialogBox = function(id, bubbleBackground, startingPos, textKey) {
    const dialogBoxContainer = document.createElement("div");
    dialogBoxContainer.setAttribute("class","dialogBox");
    dialogBoxContainer.setAttribute("id","box" + id);

    const bubble = document.createElement("img");
    bubble.setAttribute("src",bubbleBackground);
    dialogBoxContainer.appendChild(bubble);

    const textContainer = document.createElement("p");
    textContainer.innerHTML = getText(textKey);
    if (id < 4) {
        textContainer.style.marginTop = "6%";
        textContainer.style.marginLeft = "12%";
    }
    else {
        textContainer.style.marginTop = "4%";
        textContainer.style.marginLeft = "18%";
    }   
    textContainer.style.marginBottom = "12%";
    textContainer.style.marginRight = "12%"; 
    dialogBoxContainer.appendChild(textContainer);

    dialogBoxContainer.style.position = "absolute";
    dialogBoxContainer.style.left = startingPos.x + "%";
    dialogBoxContainer.style.top = startingPos.y + "%";
    dialogBoxContainer.style.width = "75%";
    dialogBoxContainer.style.height = "auto";

    document.querySelector("#p5").appendChild(dialogBoxContainer);

    return dialogBoxContainer;

};
const showDialogBoxes = function() {
    const phoneCallSound = createAudio("data/sounds/prisonGridDown.mp3",false,0.7,0.7);
    phoneCallSound.play();
    let shifts = {
        bubble1: -100,
        bubble2: 100
      }
    const dialogBox1 = createDialogBox(1,"img/dialogBoxes/P5_BULLE_BIG_BERNARD.svg",{x:-100,y:55},"p5-bernard1-1");
    anime({
        targets: shifts,
        bubble1: 12,
        loop: false,
        easing: 'linear',
        update: function(anim) {
          dialogBox1.style.left = shifts.bubble1 +"%";
        },
        complete: (anim) => {
            shifts.bubble1 = -100;
            shakeElement(dialogBox1);
        }
    })
    const dialogBox2 = createDialogBox(2,"img/dialogBoxes/P5_BULLE_MEDIUM_BERNARD.svg",{x:-100,y:79},"p5-bernard1-2");
    setTimeout(()=> {
        anime({
            targets: shifts,
            bubble1: 12,
            loop: false,
            easing: 'linear',
            update: function(anim) {
              dialogBox2.style.left = shifts.bubble1 +"%";
            },
            complete: (anim) => {
                shifts.bubble1 = -100;
                shakeElement(dialogBox2);
            }
        });
    },3000);

    setTimeout(() => {
        deleteDialogBox("1");
        deleteDialogBox("2");
        const dialogBox3 = createDialogBox(3,"img/dialogBoxes/P5_BULLE_SMALL_MOUA.svg",{x:110,y:60},"p5-moua");
        displayHelp();
        anime({
            targets: shifts,
            bubble2: 12,
            loop: false,
            easing: 'linear',
            update: function(anim) {
                dialogBox3.style.left = shifts.bubble2 +"%";
            },
            complete: (anim) => {
                shifts.bubble2 = 100;
                shakeElement(dialogBox3);
            }
        });
        const dialogBox4 = createDialogBox(4,"img/dialogBoxes/P5_BULLE_SMALL_BERNARD.svg",{x:-100,y:79},"p5-bernard2");
        setTimeout(() => {
            anime({
                targets: shifts,
                bubble1: 12,
                loop: false,
                easing: 'linear',
                update: function(anim) {
                    dialogBox4.style.left = shifts.bubble1 +"%";
                },
                complete: (anim) => {
                    shifts.bubble1 = 100;
                    shakeElement(dialogBox4);
                    phoneCallSound.play();
                }
             });
        },3000);      
    },10000);
    animationsContainer.addEventListener("click",() => release(), { once: true });  
    phoneCallSound.unload();
}
const showNoteBox = function() {
    deleteDialogBox("3");
    deleteDialogBox("4");
    const hintNote = document.querySelector('#p5 #note p');
    hintNote.textContent = getText("p5-note");
    anime({
        targets: document.querySelector('#p5 #note'),
        opacity: 1,
        loop: false,
        easing: 'easeInOutCubic'
    })    
    //const noteBox = createDialogBox(5,"img/dialogBoxes/P6_BIG_NOTE.svg",{x:12,y:60},"p5-note");
    setTimeout(() => {
        swiper.enable();
        showArrow();
    }, 3000);
}

const shakeElement = function(elt){
    elt.classList.add("apply-shake");
    setTimeout(() =>{
        elt.classList.remove("apply-shake");
    },500);
}

const deleteDialogBox = function(id) {
    const dBox = document.querySelector("#p5 #box" + id);
    anime({
        targets: dBox,
        opacity: 0,
        loop: false,
        easing: 'easeInOutCubic'
    });
    dBox.remove();
}
