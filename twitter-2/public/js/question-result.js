"use strict";

window.addEventListener("load", function(event) {
   if (sessionStorage.answer == '0') {
      const collectionRight = document.getElementsByClassName("right");
      const collectionWrong = document.getElementsByClassName("wrong");
      for (let i = 0; i < collectionRight.length; i++) {
         collectionRight[i].style.visibility = "hidden";
      }
      for (let i = 0; i < collectionWrong.length; i++) {
         collectionWrong[i].style.visibility = "visible";
      }
   }
});

window.onload = () => {
    document.getElementById("next-question").addEventListener("click", () => { 
        window.location.href = "./score.html";
     });
     document.getElementById("exit").addEventListener("click", () => { 
        window.location.href = "./index.html";
     });

}