"use strict";

function random(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", function (event) {
   if (sessionStorage.answer == '0') {

      const collectionWrong = document.getElementsByClassName("wrong");
      document.getElementById("first-slide").style.backgroundColor = "#F24A41";
      document.getElementById("about").style.backgroundColor = "#F24A41";

      for (let i = 0; i < collectionWrong.length; i++) {
         collectionWrong[i].style.visibility = "visible";
      }
   }
   else {
      const collectionRight = document.getElementsByClassName("right");
      document.getElementById("first-slide").style.backgroundColor = "#5571E5";
      document.getElementById("about").style.backgroundColor = "#5571E5";
      for (let i = 0; i < collectionRight.length; i++) {
         collectionRight[i].style.visibility = "visible";
      }
      sessionStorage.setItem("score", sessionStorage.getItem("score") + 1);
   }
});

const animation = async function(){
   anime({
      targets: '#vector1',
      scale: 1.1,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
   });

   anime({
      targets: '#vector2',
      scale: 1.1,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
   });
 };


window.onload = () => {
   window.scrollTo(0, 25);

   animation();

   document.getElementById("about").addEventListener("click", () => {
      window.location.href = "./question-result.html#second-slide";
   });

   document.getElementById("back-toquiz").addEventListener("click", () => {
      window.location.href = "./question-result.html#first-slide";
   });

   document.getElementById("next-question").addEventListener("click", () => {
      window.location.href = "./question.html";
   });

   let mainCandidate = sessionStorage.getItem("mainCandidate");
   let solutionCandidate = sessionStorage.getItem("solutionCandidate");

   const theme = sessionStorage.getItem("theme");
   if (theme === 'followers') {
      let ratio = sessionStorage.getItem("ratio");
      document.querySelector("#themes").style.visibility = 'hidden';
      document.querySelector("#followers").style.visibility = 'visible';

      document.getElementById("solutionCandidate").innerHTML = solutionCandidate;
      document.getElementById("mainCandidate").innerHTML = mainCandidate;
      document.getElementById("percentage").innerHTML = Math.trunc(ratio * 10) / 10;

   } else {
      document.querySelector("#themes").style.visibility = 'visible';
      document.querySelector("#followers").style.visibility = 'hidden';

      document.querySelector("#theme_percentage1").innerHTML = sessionStorage.getItem("percentage1");
      document.querySelector("#theme_mainCandidate").innerHTML = mainCandidate;
      document.querySelector("#theme").innerHTML = sessionStorage.getItem("wordsTheme");
      document.querySelector("#theme_solutionCandidate").innerHTML = solutionCandidate;
      document.querySelector("#theme_percentage2").innerHTML = sessionStorage.getItem("percentage2");
   }

   if (sessionStorage.getItem("question").length >= 3) {
      sessionStorage.removeItem("mainCandidate");
      sessionStorage.removeItem("solutionCandidate");
      sessionStorage.removeItem("ratio");
      sessionStorage.removeItem("theme");
      sessionStorage.removeItem("wordsTheme");
      sessionStorage.removeItem("percentage1");
      sessionStorage.removeItem("percentage2");
      document.getElementById("next-question").innerHTML = "Voir mon score";
      document.getElementById("next-question").addEventListener("click", () => {
         window.location.href = "./score.html";
      });
   }
   else {
      document.getElementById("next-question").addEventListener("click", () => {
         window.location.href = "./question.html";
      });
   }
   sessionStorage.setItem("question", sessionStorage.getItem("question") + 1);

   document.getElementById("exit").addEventListener("click", () => {
      window.location.href = "./index.html";
   });


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
      document.getElementById("legende").innerHTML = "<span>Followers</span> en commun en %";
   } else {
      document.getElementById("legende").innerHTML = `Les candidats qui parlent autant <span>${str_theme}</span> que <span>${mainCandidate}</span>`;
   }

   const usernameMainCandidate = sessionStorage.getItem("usernameMainCandidate");

   // append the svg object to the body of the page
   const svg = d3.select("#dataviz")
      .append("svg")
      .attr("width", "100%")
      .attr("height", 450)
      .style('margin-top', '7%')
      .append("g")

   fetch(`api/ratioNearCandidate/${theme}/${usernameMainCandidate}`)
      .then(res => res.json())
      .then(data => {
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
               if (d.id === 1) return 50 + 3 * parseFloat(d.ratio);
               if (d.ratio < 10) {
                  return 50 + 2 * parseFloat(d.ratio);
               }
               return 50 + 1.5 * parseFloat(d.ratio);
            });

         const shortname = node.append("text")
            .attr("class", "label")
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
      document.getElementById("main").style.display = "block";
   });
}
