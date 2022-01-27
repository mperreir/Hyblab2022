"use strict";

for (let i = 1; i <= 12; i++){
  $("#myElement" + i).downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#btn-" + i).click(function () { 
    $("#myElement" + i).downupPopup("open");
  });
}


const initSlide3 = async function(){
  
  //Add name of the candidats from the database to the profil page
  let response = await fetch('api/candidat/filtre');
  const candidats = await response.json();

  for (let i = 1; i <= 12; i++) {

    //Get the candidats from html document
    let button = document.querySelector('#btn-' + i);
    let nom = button.childNodes[1];
    nom.data = `${candidats[i-1].name}`;

    //Get the candidats:popup from html document (have to change number)
    let poppups = document.querySelector('#myElement' + i);

    //Name of popup
    let title = document.querySelector('#myElement' + i + ' h3');
    title.innerHTML = `${candidats[i-1].name}`;

    let table = document.querySelector('#myElement' + i + ' tbody');
    table = table.childNodes[1];

    let followers = table.childNodes[1];
    followers.innerHTML = `${candidats[i-1].followers}`;

    let tweets = table.childNodes[3];
    tweets.innerHTML = `${candidats[i-1].tweets}`;

  }

};