"use strict";

window.onload = () => {
  window.scrollTo(0, 25);
  document.getElementById("autre_candidat").addEventListener("click", () => {
    sessionStorage.removeItem('selected_candidate');
    window.location.reload();
  });
  document.getElementById("return").addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  if (sessionStorage.getItem("selected_candidate") === null) {
    document.getElementById('selection-candidat').style.visibility = 'visible';
  }
  else if (sessionStorage.getItem('selected_theme') === null) {
    document.getElementById('categorie').style.visibility = 'visible';
  }

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
      const textImg = document.getElementsByClassName("txt-selec-candidat");
      for (let i = 0; i < imgSelecCandid.length; i++) {
        imgSelecCandid[i].addEventListener('click', () => {
          sessionStorage.setItem("selected_candidate", imgSelecCandid[i].name);
          sessionStorage.setItem("selected_nameCandidate", textImg[i].innerHTML);

          let selected_candidate = sessionStorage.getItem("selected_nameCandidate");
          document.getElementById("reminder_candidate").innerHTML = `Vous avez choisi <span>${selected_candidate}</span>.`

          document.getElementById('selection-candidat').style.visibility = 'hidden';
          document.getElementById('categorie').style.visibility = 'visible';
        });
      }
    });

  const selected_candidate = sessionStorage.getItem("selected_nameCandidate");
  document.getElementById("reminder_candidate").innerHTML = `Vous avez choisi <span>${selected_candidate}</span>.`

  // partie visu de données
  const buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].addEventListener("click", () => {
      sessionStorage.setItem("selected_theme", buttons[i].id);
      window.location.href = "./visu_donnees.html";
    })
  }
}