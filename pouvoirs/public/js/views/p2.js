const canvas = document.getElementById("drawPlace");
const ctx = canvas.getContext("2d");
const button = document.getElementById("send-button");
const bullePm = document.getElementById("bulle-container-pm");
const bulleMoua = document.getElementById("bulle-container-moua");
const drawing = document.getElementById("drawing-container");
const penSound = createAudio("data/sounds/pen.mp3", true, 1, 0.5);

const interestPoint = document.getElementById("interest-point");
const hintText = document.querySelector('#drawing-container p');
const hintNote = document.querySelector('#p2 #note p');

const textMoua = document.querySelector("#bulle-container-moua p");
const textPm = document.querySelector("#bulle-container-pm p");

let coord = { x: 0, y: 0 };
let enableButton = false;
let controller = { bottom: -50 };

button.disabled = true;

const init_p2 = function () {
	// Setting texts
	textMoua.textContent = getText("p2-moua");
	textPm.textContent = getText("p2-prime");
	hintNote.textContent = getText("p2-neutral");

	// Disable swiper whilst decret has not been signed
	swiper.disable();

	// Bulle Moua moves into view
	anime({
		targets: bulleMoua,
		opacity: 1,
		loop: false,
		easing: 'easeInOutCubic',
		complete: (anim) => {
			setTimeout(() => {
				// Bulle PM moves into view
				anime({
					targets: bullePm,
					opacity: 1,
					loop: false,
					easing: 'easeInOutCubic',
					complete: (anim) => {
						setTimeout(() => {
							interestPoint.style.display = 'block';
							document.getElementById("p2").addEventListener("click", showNote);

						}, 1000)
					}
				});

			}, 1000)
		}
	})
}

/* Code handling drawing in the Canvas */

const p2 = document.getElementById("p2");

function initHandlers() {
	// Handling mouse
	p2.addEventListener("mousedown", start);
	p2.addEventListener("mouseup", stop);

	// Handling touch conversion to mouse
	p2.addEventListener("touchstart", mouseHandler);
	p2.addEventListener("touchend", mouseHandler);
	p2.addEventListener("touchmove", mouseHandler);

	p2.addEventListener("pointerup", stop);

	// Fixing canvas on screen
	const size = canvas.getBoundingClientRect();
	canvas.width = size.width;
	canvas.height = size.height;
}

function reposition(event) {
	const size = canvas.getBoundingClientRect();
	coord.x = event.clientX - size.x;
	coord.y = event.clientY - size.y;

	// Useful for activating Send button once something has been handwritten in the canvas
	if (button.disabled && 0 <= coord.x && coord.x <= size.width && 0 <= coord.y && coord.y <= size.height) {
		enableButton = true;
	}
}

function start(event) {
	p2.addEventListener("mousemove", draw);
	hintText.style.opacity = '0';
	penSound.play();
	reposition(event);
}

let alreadyShowedTitle = false;

function stop() {
	p2.removeEventListener("mousemove", draw);
	penSound.pause();
	// Enabling the button
	if (enableButton) {
		if (!alreadyShowedTitle) {
			showTitle("p2");
			alreadyShowedTitle = true;
		}

		button.disabled = false;
		button.addEventListener("click", nextMission);
	}
}

function draw(event) {
	// Actually drawing in the canvas (user signing decret)
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#ACD3ED";
	ctx.moveTo(coord.x, coord.y);
	reposition(event);
	ctx.lineTo(coord.x, coord.y);
	ctx.stroke();
}

function mouseHandler(event) {
	// Converting touch events to mouse events
	let type = "";
	switch (event.type) {
		case "touchstart": type = "mousedown"; break;
		case "touchmove": type = "mousemove"; break;
		case "touchend": type = "mouseup"; break;
		default: return;
	}

	let mouseEvent = new MouseEvent(type, {
		clientX: event.touches[0].clientX,
		clientY: event.touches[0].clientY,
	});

	p2.dispatchEvent(mouseEvent);
}

/* End of code for drawing in the Canvas */

function nextMission(event) {
	// Removing all sets events
	p2.removeEventListener("mousedown", start);
	p2.removeEventListener("mouseup", stop);

	// Removing touch events
	p2.removeEventListener("touchstart", mouseHandler);
	p2.removeEventListener("touchend", mouseHandler);
	p2.removeEventListener("touchmove", mouseHandler);

	p2.removeEventListener("pointerup", stop);

	swiper.enable();
	wrapper_nextSlide();
}


let noteShown = false;
function showNote() {
	if (noteShown) { return; }
	noteShown = true;

	interestPoint.style.display = 'none';

	anime({
		targets: bullePm,
		opacity: 0,
		loop: false,
		easing: 'easeInOutCubic',
	});

	anime({
		targets: bulleMoua,
		opacity: 0,
		loop: false,
		easing: 'easeInOutCubic',
		complete: (anim) => {
			anime({
				targets: document.querySelector('#p2 #note'),
				opacity: 1,
				loop: false,
				easing: 'easeInOutCubic',
				complete: (anim) => {

					// Make decret appear
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
				}
			})
		}
	});
}
