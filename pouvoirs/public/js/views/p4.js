let points = 3;

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
            element.querySelector(".validityIcon").style.display = "block";

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
            element.style.background = "#FF2019";
            element.querySelector(".validityIcon").style.display = "block";
        }, false);
    }
}

function deleteEventListener(divId) {
    const element = document.getElementById(divId);
    element.replaceWith(element.cloneNode(true));
}
