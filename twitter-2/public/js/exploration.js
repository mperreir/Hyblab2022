"use strict";

window.onload = () => {
    document.getElementById("return").addEventListener("click", () => { 
      window.location.href = "./index.html";
    });

    fetch("api/candidats")
      .then(res => res.json())
      .then(candidats => {

        let html = '';

        candidats.forEach(candidat => {
          html += `<li><img src="img/candidats/${candidat.imageLink}.svg" class="img-selec-candidat"><p class="txt-selec-candidat">${candidat.displayShortName}</p></li>`;
        });
        
        const divCandidats = document.querySelector('#list-candidat');
        divCandidats.innerHTML = html;

        const imgSelecCandid = document.getElementsByClassName('img-selec-candidat');
        for (let i = 0; i < imgSelecCandid.length; i++) {
          imgSelecCandid[i].addEventListener('click', () => {
            document.getElementById('selection-candidat').style.visibility = 'hidden';
            document.getElementById('categorie').style.visibility = 'visible';
          });
        }
      });
}