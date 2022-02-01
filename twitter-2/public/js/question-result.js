"use strict";

window.addEventListener("load", function (event) {
   if (sessionStorage.answer == '0') {
      const collectionRight = document.getElementsByClassName("right");
      const collectionWrong = document.getElementsByClassName("wrong");
      document.getElementById("container").style.backgroundColor = "#F24A41";
      this.document.getElementById("about").style.backgroundColor = "#F24A41";
      for (let i = 0; i < collectionRight.length; i++) {
         collectionRight[i].style.visibility = "hidden";
      }
      for (let i = 0; i < collectionWrong.length; i++) {
         collectionWrong[i].style.visibility = "visible";
      }
   }
   else {
      sessionStorage.setItem("score", sessionStorage.getItem("score") + 1);
   }
});



window.onload = () => {

   document.getElementById("about").addEventListener("click", () => {
      window.location.href = "./index.html";
   });
   document.getElementById("next-question").addEventListener("click", () => {
      window.location.href = "./question.html";
   });

   
   let mainCandidate = sessionStorage.getItem("mainCandidate");
   let solutionCandidate = sessionStorage.getItem("solutionCandidate");
   let ratio = sessionStorage.getItem("ratio");
   document.getElementById("mainCandidate").innerHTML = mainCandidate;
   document.getElementById("solutionCandidate").innerHTML = solutionCandidate;
   document.getElementById("percentage").innerHTML = Math.trunc(ratio * 10) / 10;
   if (sessionStorage.getItem("question").length == 3) {
      sessionStorage.removeItem("mainCandidate");
      sessionStorage.removeItem("solutionCandidate");
      sessionStorage.removeItem("ratio");
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