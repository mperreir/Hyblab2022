"use strict";

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onload = () => {
    window.scrollTo(0, 25);

    document.getElementById("return").addEventListener("click", () => {
        window.location.href = "./index.html";
    });

    const candidate = sessionStorage.getItem("selected_candidate");
    const theme = sessionStorage.getItem("selected_theme");

    // append the svg object to the body of the page
    const svg = d3.select("#dataviz")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 400)
        .append("g")

    fetch(`api/ratioNearCandidate/${theme}/${candidate}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Initialize the nodes
            const node = svg
                .selectAll("circle")
                .data(data.nodes)
                .join("g")

            const candidates = node
                .append("image")
                .attr("xlink:href", d => {
                    return d.img;
                })
                .attr("heigh", d => {
                    return 50 + parseFloat(d.ratio);
                })
                .attr("width", d => {
                    return 50 + parseFloat(d.ratio);
                });

            const shortname = node.append("text")
                .text(d => {
                    return d.shortname;
                });

            const ratio = node.append("text")
                .attr("class", "lato")
                .text(d => {
                    if (theme != "followers") {
                        return "" + parseFloat(d.ratio).toFixed(2) + "%";
                    } else if (d.id != 1) {
                        return "" + parseFloat(d.ratio).toFixed(2) + "%";
                    }
                });

            // Let's list the force we wanna apply on the network
            d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
                .force("link", d3.forceLink()                               // This force provides links between nodes
                    .id(d => d.id)                     // This provide  the id of a node
                    .links(data.links)                                    // and this the list of links
                )
                .force("charge", d3.forceManyBody().strength(function () {
                    return random(-3000, -3500);
                }))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
                .force("center", d3.forceCenter(150, 150))     // This force attracts nodes to the center of the svg area
                .on("end", ticked);

            // This function is run at each iteration of the force algorithm, updating the nodes position.
            function ticked() {
                candidates
                    .attr('transform', d => `translate(${d.x}, ${d.y})`)

                shortname
                    .attr('dy', d => 50 + parseFloat(d.ratio) + 12)
                    .attr('transform', d => `translate(${d.x}, ${d.y})`);

                ratio
                    .attr('dy', d => 50 + parseFloat(d.ratio) + 25)
                    .attr('transform', d => `translate(${d.x}, ${d.y})`);
            }
        });
}