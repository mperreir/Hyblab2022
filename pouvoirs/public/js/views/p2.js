const canvas = document.getElementById("drawPlace");
const ctx = canvas.getContext("2d");
const button = document.getElementById("send-button");
const bulle = document.getElementById("bulle-container");
const drawing = document.getElementById("drawing-container");

let coord = { x: 0, y: 0 };
let enableButton = false;

button.disabled = true;

controller = {bottom: -50};

const init_p2 = function () {
	// Disable swiper whilst decret has not been signed
	swiper.disable();

	bulle.classList.add("apply-shake");
	bulle.style.marginBottom = "10px";
	document.querySelector("#p2 p").style.marginTop = "20px";
	setTimeout(() => {
		document.querySelector("#p2 p").style.marginTop = "0px";
		bulle.style.marginBottom = "0px";
		bulle.classList.remove("apply-shake");

		anime({
			targets: controller,
			bottom: 0,
			loop: false,
			easing: 'easeInOutCubic',
			complete: (anim) => {
				initHandlers();
			},
			update: (anim) => {
				drawing.style.bottom = controller.bottom + "%";
			}
		});
	}, 750);

	
}

function initHandlers() {
	// Handling mouse
	document.addEventListener("mousedown", start);
	document.addEventListener("mouseup", stop);

	// Handling touch conversion to mouse
	document.addEventListener("touchstart", mouseHandler);
	document.addEventListener("touchend", mouseHandler);
	document.addEventListener("touchmove", mouseHandler);

	// Fixing canvas on screen
	const size = canvas.getBoundingClientRect();
	canvas.width = size.width;
	canvas.height = size.height;
}

function reposition(event) {
	const size = canvas.getBoundingClientRect();
	coord.x = event.clientX - size.x;
	coord.y = event.clientY - size.y;

	if (button.disabled && 0 <= coord.x && coord.x <= size.width && 0 <= coord.y && coord.y <= size.height) {
		enableButton = true;
	}
}

function start(event) {
	document.addEventListener("mousemove", draw);
	reposition(event);
}

function stop() {
	document.removeEventListener("mousemove", draw);

	// Enabling the button
	if (enableButton) {
		button.disabled = false;
		button.addEventListener("click", nextMission);
	}
}

function draw(event) {
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ACD3ED";
	ctx.moveTo(coord.x, coord.y);
	reposition(event);
	ctx.lineTo(coord.x, coord.y);
	ctx.stroke();
}

function mouseHandler(event)
{
	let type = "";

	switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

	let mouseEvent = new MouseEvent(type, {
		clientX: event.touches[0].clientX,
		clientY: event.touches[0].clientY,
	});

	document.dispatchEvent(mouseEvent);
}


function nextMission(event) {
	swiper.enable();
	swiper.slideNext();
}
