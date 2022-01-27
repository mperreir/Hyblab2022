
window.onload = () => {

   document.body.style.backgroundImage="url('img/anim-confetti-quiz_1.gif')";
    document.getElementById("new-quiz").addEventListener("click", () => { 
        window.location.href = "./question.html";
     });

     document.getElementById("exit").addEventListener("click", () => { 
        window.location.href = "./index.html";
     });

     document.getElementById("go-exploration").addEventListener("click", () => { 
        window.location.href = "./index.html#third-slide";
      
     });
}