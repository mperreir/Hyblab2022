let points = 3;
let change  = 0;
const goodAns = createAudio("data/sounds/good_choice.mp3", false,0.7, 1);
const badAns = createAudio("data/sounds/bad_choice.mp3", false,0.7, 1);
const cancel = createAudio("data/sounds/cancel.wav", false,0.7, 1);

function init_p4() {
    // Disable swiper when arriving
    //swiper.disable();
    linkDiv("assemblee", false);
    linkDiv("maires", true);
    linkDiv("conseil", true);
    linkDiv("prime", true);
}

function linkDiv(divId, valid) {
    const element = document.getElementById(divId);
    if (valid) {
        element.addEventListener("click", event => {
            element.style.background = "#0AF2E1";
            element.querySelector(".positiontext").style.background = "#fff";
            element.querySelector(".positiontext").style.color = "#4F00EC";
            element.querySelector(".validityIcon").style.display = "block";
            goodAns.play();

            points = points - 1;

            if (points <= 0) {
                // Enable swiper once the right answers have been given
                showTitle("p4");
                swiper.enable();
                deleteEventListener("assemblee");
                deleteEventListener("maires");
                deleteEventListener("conseil");
                deleteEventListener("prime");
            }

        }, false);
    } else {
        element.addEventListener("click", event => {
            if(change == 1){
                element.style.background = "#fff";
                element.querySelector(".positiontext").style.background = "#d0bff7";
                element.querySelector(".positiontext").style.color = "#fff";
                element.querySelector(".validityIcon").style.display = "none";
                cancel.play();
                change = 0;

            }else{
                element.style.background = "#FF2019";
                element.querySelector(".positiontext").style.background = "#fff";
                element.querySelector(".positiontext").style.color = "#4F00EC";
                element.querySelector(".validityIcon").style.display = "block";
                badAns.play();
                change = 1;
            }
            
        }, false);
    }
}

function deleteEventListener(divId) {
    const element = document.getElementById(divId);
    element.replaceWith(element.cloneNode(true));
}
