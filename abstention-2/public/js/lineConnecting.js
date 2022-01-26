const containerDiv = document.getElementById("container");
const containerBoundingRect = containerDiv.getBoundingClientRect();

let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
let line;

svg.style.position = "absolute";
svg.style.width = "1000vh";
svg.style.height = "1000vh";

for (let i = 0; i < proofTarget.length - 1; i++) {
    const child = proofTarget[i];


    let boundingRect = child.getBoundingClientRect();
    let nextChildBoundingRect = proofTarget[i + 1].getBoundingClientRect();

    let x1, x2, y1, y2;

    if (nextChildBoundingRect.left > boundingRect.right) {
        x1 = boundingRect.right - containerBoundingRect.left;
        // y1 = boundingRect.top + (boundingRect.bottom - boundingRect.top) / 2
        // } else if (nextChildBoundingRect.right < boundingRect.left) {
        //     x1 = boundingRect.left - containerBoundingRect.left;
    } else {
        x1 = (boundingRect.left + (boundingRect.right - boundingRect.left) / 2) - containerBoundingRect.left;
    }

    if (nextChildBoundingRect.top > boundingRect.bottom) {
        y1 = boundingRect.bottom - containerBoundingRect.top;
        // y1 = boundingRect.top + (boundingRect.bottom - boundingRect.top) / 2
    } else if (nextChildBoundingRect.bottom < boundingRect.top) {
        y1 = boundingRect.top - containerBoundingRect.top;
    } else {
        y1 = boundingRect.top + (boundingRect.bottom - boundingRect.top) / 2
    }

    if (nextChildBoundingRect.left > boundingRect.right) {
        x2 = nextChildBoundingRect.left - containerBoundingRect.left;
        // y1 = boundingRect.top + (boundingRect.bottom - boundingRect.top) / 2
        // } else if (nextChildBoundingRect.right < boundingRect.left) {
        //     x1 = boundingRect.left - containerBoundingRect.left;
    } else {
        x2 = (nextChildBoundingRect.left + (nextChildBoundingRect.right - nextChildBoundingRect.left) / 2) - containerBoundingRect.left;
    }

    if (nextChildBoundingRect.top > boundingRect.bottom) {
        y2 = nextChildBoundingRect.top - containerBoundingRect.top;
    } else if (nextChildBoundingRect.bottom < boundingRect.top) {
        y2 = nextChildBoundingRect.bottom - containerBoundingRect.top;
    } else {
        y2 = nextChildBoundingRect.top + (nextChildBoundingRect.bottom - nextChildBoundingRect.top) / 2
    }

    line = document.createElementNS("http://www.w3.org/2000/svg", 'line');


    // x2 = (nextChildBoundingRect.left + (nextChildBoundingRect.right - nextChildBoundingRect.left) / 2) - containerBoundingRect.left;
    // y2 = nextChildBoundingRect.bottom;
    line.setAttribute("stroke", "red");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "red");
    line.setAttribute("stroke-width", "20");
    line.classList.add("panning-animated");


    svg.appendChild(line);



    document.getElementById("container").appendChild(svg);
}
