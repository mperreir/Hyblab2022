window.onload = () => {
    document.getElementById("ans1").addEventListener("click", () => { 
        console.log("reponse 1");
        sessionStorage.setItem('answer', '1');
        window.location.href = "./question-result.html";
     });
    document.getElementById("ans2").addEventListener("click", () => { 
        console.log("reponse 2");
        sessionStorage.setItem('answer', '0');
        window.location.href = "./question-result.html";
     });
    document.getElementById("ans3").addEventListener("click", () => { 
        console.log("reponse 3");
        sessionStorage.setItem('answer', '0');
        window.location.href = "./question-result.html";
     });
    document.getElementById("exit").addEventListener("click", () => { 
        window.location.href = "./index.html";
     });
}