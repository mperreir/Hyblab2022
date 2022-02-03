"use-strict";

window.onload = () => {
  window.scrollTo(0, 25);
    document.getElementById("return").addEventListener("click", () => { 
        window.location.href = "./index.html#2";
    });
  
    document.getElementById("button-explorer").addEventListener("click", () => { 
      window.location.href = "./exploration.html";
    });
  
}