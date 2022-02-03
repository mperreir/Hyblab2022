"use strict";

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.onload = () => {
    window.scrollTo(0, 25);

    document.getElementById("other_candidate").addEventListener("click", () => {
        sessionStorage.removeItem('selected_candidate');
        window.location.href = "./exploration.html";
    });

    document.getElementById("other_category").addEventListener("click", () => {
        sessionStorage.removeItem('selected_theme');
        window.location.href = "./exploration.html";
    });

    document.getElementById("other_category").addEventListener("click", () => {
        window.location.href = "./exploration.html#choix-theme";
    });

    document.getElementById("exit").addEventListener("click", () => {
        sessionStorage.removeItem('selected_candidate');
        window.location.href = "./index.html";
    });

    const candidate = sessionStorage.getItem("selected_candidate");
    const candidateName = sessionStorage.getItem("selected_nameCandidate");
    const theme = sessionStorage.getItem("selected_theme");

    let str_theme = "";
    switch (theme) {
        case 'education':
            str_theme = "d'éducation";
            break;
        case 'sante':
            str_theme = "de santé";
            break;
        case 'environnement':
            str_theme = "d'environnement";
            break;
        case 'economie':
            str_theme = "d'économie";
            break;
        default:
            break;
    }

    if (theme == "followers") {
        document.getElementById("title").innerHTML = "<span>Followers</span> en commun en %";
    } else {
        document.getElementById("title").innerHTML = `Les candidats qui parlent autant <span>${str_theme}</span> que <span>${candidateName}</span>`;
    }

    // append the svg object to the body of the page
    const svg = d3.select("#dataviz")
        .append("svg")
        .attr("width", "100%")
        .attr("height", 450)
        .style('margin-top', '7%')
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
                .attr("id", d => d.id)
                .attr("xlink:href", d => {
                    return d.img;
                })
                .attr("heigh", d => {
                    if (theme == "followers") {
                        return 50 + parseFloat(d.ratio);
                    }
                    if (d.id === 1) return 50 + 3 * parseFloat(d.ratio);
                    if (d.ratio < 10) {
                        return 50 + 2 * parseFloat(d.ratio);
                     }
                    return 50 + 1.5 * parseFloat(d.ratio);
                })
                .attr("width", d => {
                    if (theme == "followers") {
                        return 50 + parseFloat(d.ratio);
                    }
                    if (d.id === 1) {
                        return 50 + 3 * parseFloat(d.ratio);
                    }
                    if (d.ratio < 10) {
                       return 50 + 2 * parseFloat(d.ratio);
                    }
                    return 50 + 1.5 * parseFloat(d.ratio);
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
                    .attr('transform', d => {
                        if (d.id === 1 && window.screen.width < 500) {
                            d.x = window.screen.width/2 - document.getElementById(d.id).width.animVal.value/2;
                         } else {
       
                            d.x = d.x - document.getElementById(d.id).width.animVal.value/2;
          
                            if (d.x + document.getElementById(d.id).width.animVal.value/2 >= window.screen.width - 20) {
                               d.x = d.x - document.getElementById(d.id).width.animVal.value/2 - 5;
                            }
                            if (d.x <= 0) d.x = d.x + document.getElementById(d.id).width.animVal.value/2 + 5;
                         }
                         return `translate(${d.x}, ${d.y})`;
                    })

                shortname
                    .attr('dy', d => {
                        if (theme == "followers") {
                            return 50 + parseFloat(d.ratio) + 12;
                        }
                        if (d.id === 1) return 50 + 3 * parseFloat(d.ratio) + 12;
                        if (d.ratio < 10) {
                            return 50 + 2 * parseFloat(d.ratio) + 12;
                         }
                        return 50 + 1.5 * parseFloat(d.ratio) + 12;
                    })
                    .attr('transform', d => {
                        if (d.x + document.getElementById(d.id).width.animVal.value >= window.screen.width - 20) {
                            return `translate(${d.x - 20}, ${d.y})`;
                        }
                        if (d.x <= 0) d.x = d.x + 20;
                        return `translate(${d.x}, ${d.y})`;
                    });

                ratio
                    .attr('dy', d => {
                        if (theme == "followers") {
                            return 50 + parseFloat(d.ratio) + 25;
                        }
                        if (d.id === 1) return 50 + 3 * parseFloat(d.ratio) + 25;
                        if (d.ratio < 10) {
                            return 50 + 2 * parseFloat(d.ratio) + 25;
                         }
                        return 50 + 1.5 * parseFloat(d.ratio) + 25;
                    })
                    .attr('transform', d => {
                        if (d.x + document.getElementById(d.id).width.animVal.value >= window.screen.width - 20) {
                            return `translate(${d.x - 20}, ${d.y})`;
                        }
                        if (d.x <= 0) d.x = d.x + 20;
                        return `translate(${d.x}, ${d.y})`;
                    });
            }
        });

    document.querySelector("video").addEventListener('ended', () => {
        document.querySelector("video").style.display = "none";
        document.getElementById("container").style.display = "block";
    });
}