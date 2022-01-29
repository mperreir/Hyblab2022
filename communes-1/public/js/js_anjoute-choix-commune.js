'use strict';

document.documentElement.style.setProperty('overflow', 'auto');

const metaViewport = document.querySelector('meta[name=viewport]');
const body = document.querySelector('body');

var test =  body.offsetHeight;

console.log(test);


let testttt = () => {
	metaViewport.setAttribute('content', 'height=' + test + 'px, width=device-width, initial-scale=1.0');
	console.log('+' + test);
}

window.onresize = testttt;