"use strict"

const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', next);

const previousBtn = document.getElementById('previousBtn');
previousBtn.addEventListener('click', previous);

const trajectory = [{ in: [-85, 50] }, { in: [0, -200] }, { in: [-110, -140] }, { in: [-160, -80] }, { in: [-80, -60] }]

const proofTarget = document.getElementsByClassName('proof');
for (let i = 1; i < proofTarget.length; i++) {
    const child = proofTarget[i];
    child.style.left = (-trajectory[i - 1].in[0]) + 'vw';
    child.style.top = (-trajectory[i - 1].in[1]) + 'vh';
}

let animQueue = [];


function next() {
    if (animQueue.length < trajectory.length) {
        nextAnimation(trajectory);
    }
}

function previous() {
    if (animQueue.length > 0) {
        previousAnimation();
    }
}

function previousAnimation() {
    switchButton();
    let anim = animQueue.pop();
    anim.direction = 'reverse';
    anim.complete = () => {
        switchButton();
    }
    anim.play();
}


function nextAnimation(trajectory) {
    switchButton();
    let anim = anime({
        targets: document.getElementsByClassName('panning-animated'),
        translateX: trajectory[animQueue.length].in[0] + 'vw',
        easing: 'easeInOutQuad',
        duration: 2000,
        translateY: trajectory[animQueue.length].in[1] + 'vh',
        autoplay: false,
        complete: () => {
            animQueue.push(anim);
            switchButton();
        }
    });

    anim.play();

}

function switchButton() {
    previousBtn.disabled = !previousBtn.disabled;
    nextBtn.disabled = !nextBtn.disabled;
}

// let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// // svg.setAttribute("width", "100vw");
// // svg.setAttribute("height", "100");
// let line = document.createElementNS("http://www.w3.org/2000/svg", 'line');

// line.setAttribute("stroke", "red");
// line.setAttribute("x1", "0");
// line.setAttribute("y1", "0");
// line.setAttribute("x2", "50");
// line.setAttribute("y2", "10vw");
// line.setAttribute("stroke", "red");
// line.setAttribute("stroke-width", "20");
// svg.style.position = "absolute";
// svg.appendChild(line);


// document.getElementById("container").appendChild(svg);