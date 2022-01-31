"use-strict";

window.onload = () => {
    document.getElementById("return").addEventListener("click", () => { 
        window.location.href = "./index.html";
    });
  
    document.getElementById("button-explorer").addEventListener("click", () => { 
      window.location.href = "./exploration.html";
    });
  
}