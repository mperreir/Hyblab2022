"use strict";

window.onload = () => {
    document.getElementById("return").addEventListener("click", () => { 
      window.location.href = "./index.html";
    });
  
    const imgSelecCandid = document.getElementsByClassName('img-selec-candidat');
    for (let i = 0; i < imgSelecCandid.length; i++) {
      imgSelecCandid[i].addEventListener('click', () => {
        document.getElementById('selection-candidat').style.visibility = 'hidden';
        document.getElementById('categorie').style.visibility = 'visible';
      });
    }
}