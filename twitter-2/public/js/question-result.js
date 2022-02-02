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



window.onload = () => {


   window.scrollTo(0, 25);

   document.getElementById("about").addEventListener("click", () => {
      window.location.href = "./index.html";
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

   // swipedetect( document.getElementById('swipe-down-zone'), function (swipedir) {
   //    if (swipedir == 'up') {
   //       window.location.href = "./index.html";
   //    }
   // })

   const usernameMainCandidate = sessionStorage.getItem("usernameMainCandidate");

   // append the svg object to the body of the page
   const svg = d3.select("#dataviz")
      .append("svg")
      .attr("width", "100%")
      .attr("height", 400)
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

// function swipedetect(el, callback) {

//    var touchsurface = el,
//       swipedir,
//       startX,
//       startY,
//       distX,
//       distY,
//       threshold = 150, //required min distance traveled to be considered swipe
//       restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//       allowedTime = 300, // maximum time allowed to travel that distance
//       elapsedTime,
//       startTime,
//       handleswipe = callback || function (swipedir) { }

//    touchsurface.addEventListener('touchstart', function (e) {
//       var touchobj = e.changedTouches[0]
//       swipedir = 'none'
//       let dist = 0
//       startX = touchobj.pageX
//       startY = touchobj.pageY
//       startTime = new Date().getTime() // record time when finger first makes contact with surface
//       e.preventDefault()
//    }, false)

//    touchsurface.addEventListener('touchmove', function (e) {
//       e.preventDefault() // prevent scrolling when inside DIV
//    }, false)

//    touchsurface.addEventListener('touchend', function (e) {
//       var touchobj = e.changedTouches[0]
//       distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//       distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//       elapsedTime = new Date().getTime() - startTime // get time elapsed
//       if (elapsedTime <= allowedTime) { // first condition for awipe met
//          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
//             swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//          }
//          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
//             swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
//          }
//       }
//       handleswipe(swipedir)
//       e.preventDefault()
//    }, false)
// }