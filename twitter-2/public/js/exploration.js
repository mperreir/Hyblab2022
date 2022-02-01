"use strict";

window.onload = () => {
  document.getElementById("autre_candidat").addEventListener("click", () => {
    window.location.reload();
  });
  document.getElementById("return").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  fetch("api/candidats")
    .then(res => res.json())
    .then(candidats => {

      let html = '';

      candidats.forEach(candidat => {
        html += `<li><img src="img/candidats/${candidat.imageLink}.png" class="img-selec-candidat" name="${candidat.userName}"><p class="txt-selec-candidat">${candidat.displayShortName}</p></li>`;
      });

      const divCandidats = document.querySelector('#list-candidat');
      divCandidats.innerHTML = html;

      const imgSelecCandid = document.getElementsByClassName('img-selec-candidat');
      for (let i = 0; i < imgSelecCandid.length; i++) {
        imgSelecCandid[i].addEventListener('click', () => {
          sessionStorage.setItem("selected_candidate", imgSelecCandid[i].name);
          document.getElementById('selection-candidat').style.visibility = 'hidden';
          document.getElementById('categorie').style.visibility = 'visible';
        });
      }
    });

  // partie visu de données
  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length-1; i++) {
    buttons[i].addEventListener("click", () => {
      sessionStorage.setItem("selected_theme", buttons[i].id);
      window.location.href = "./visu_donnees.html";
    })
  }
}