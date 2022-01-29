"use strict";

window.addEventListener("load", function (event) {
   if (sessionStorage.answer == '0') {
      const collectionRight = document.getElementsByClassName("right");
      const collectionWrong = document.getElementsByClassName("wrong");
      document.getElementById("container").style.backgroundColor = "#F24A41";
      for (let i = 0; i < collectionRight.length; i++) {
         collectionRight[i].style.visibility = "hidden";
      }
      for (let i = 0; i < collectionWrong.length; i++) {
         collectionWrong[i].style.visibility = "visible";
      }
   }
   else{
      sessionStorage.setItem("score", sessionStorage.getItem("score")+1);
   }
});



window.onload = () => {
   let mainCandidate = sessionStorage.getItem("mainCandidate");
   let solutionCandidate = sessionStorage.getItem("solutionCandidate");
   let ratio = sessionStorage.getItem("ratio");
   document.getElementById("mainCandidate").innerHTML = mainCandidate;
   document.getElementById("solutionCandidate").innerHTML = solutionCandidate;
   document.getElementById("percentage").innerHTML = Math.trunc(ratio*10)/10;
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




}