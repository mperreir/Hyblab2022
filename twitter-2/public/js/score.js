
window.onload = () => {

   window.scrollTo(0, 25);
   
   let score = sessionStorage.getItem("score").length;
   sessionStorage.removeItem("score");
   if (score >= 2) {
      document.body.style.backgroundImage = "url('img/anim-confetti-quiz_1.gif')";
      document.getElementById("fail").style.visibility = "hidden";
      document.getElementById("success").style.visibility = "visible";
      document.querySelector("video").style.visibility = "visible";
   }
   else{
      document.getElementById("sentence").appendChild(document.createElement("br"));
   }
   document.getElementById("new-quiz").addEventListener("click", () => {
      window.location.href = "./question.html";
   });

   document.getElementById("exit").addEventListener("click", () => {
      window.location.href = "./index.html";
   });

   document.getElementById("go-exploration").addEventListener("click", () => {
      window.location.href = "./exploration.html";

   });
   document.getElementById("score").innerHTML = score;
   sessionStorage.removeItem("question");
   sessionStorage.setItem('question', '1');
   sessionStorage.removeItem("alreadyGivenCandidate1");
   sessionStorage.removeItem("alreadyGivenCandidate2");

}