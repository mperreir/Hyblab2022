"use strict";

window.onload = () => {
  
    const imgSelecCandid = document.getElementsByClassName('img-selec-candidat');
    for (let i = 0; i < imgSelecCandid.length; i++) {
      imgSelecCandid[i].addEventListener('click', () => {
        document.getElementById('selection-candidat').style.visibility = 'hidden';
        document.getElementById('categorie').style.visibility = 'visible';
      });
    }
}