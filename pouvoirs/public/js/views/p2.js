const canvas = document.getElementById("drawPlace");
const ctx = canvas.getContext("2d");

const init_p2 = function () {
	swiper.disable();

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

let coord = { x: 0, y: 0 };

function reposition(event) {
	coord.x = event.clientX - canvas.getBoundingClientRect().x;
	coord.y = event.clientY - canvas.getBoundingClientRect().y;
}

function start(event) {
	document.addEventListener("mousemove", draw);
	reposition(event);
}

function stop() {
	document.removeEventListener("mousemove", draw);
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
