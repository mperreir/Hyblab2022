window.onload = () => {
    document.getElementById("next-question").addEventListener("click", () => { 
        window.location.href = "./score.html";
     });
     document.getElementById("exit").addEventListener("click", () => { 
        window.location.href = "./index.html";
     });

}