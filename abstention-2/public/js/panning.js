"use strict"

const nextBtn = document.getElementById('nextBtn');
nextBtn.addEventListener('click', next);

const previousBtn = document.getElementById('previousBtn');
previousBtn.addEventListener('click', previous);

const trajectory = [{ in: [-200, 50] }, { in: [-100, -140] }]

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
        targets: document.getElementsByClassName('proof'),
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
