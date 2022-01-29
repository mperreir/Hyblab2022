"use strict";

  $("#myElement1").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement2").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement3").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement4").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement5").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement6").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement7").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement8").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement9").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement10").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement11").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#myElement12").downupPopup({
    distance: -70,
    width: "90%",
    contentScroll: true,
    background: false,
  });

  $("#btn-1").click(function () { 
    $("#myElement1").downupPopup("open"); 
  });

  $("#btn-2").click(function () { 
    $("#myElement2").downupPopup("open"); 
  });

  $("#btn-3").click(function () { 
    $("#myElement3").downupPopup("open"); 
  });

  $("#btn-4").click(function () { 
    $("#myElement4").downupPopup("open"); 
  });

  $("#btn-5").click(function () { 
    $("#myElement5").downupPopup("open"); 
  });

  $("#btn-6").click(function () { 
    $("#myElement6").downupPopup("open"); 
  });

  $("#btn-7").click(function () { 
    $("#myElement7").downupPopup("open"); 
  });

  $("#btn-8").click(function () { 
    $("#myElement8").downupPopup("open"); 
  });

  $("#btn-9").click(function () { 
    $("#myElement9").downupPopup("open"); 
  });

  $("#btn-10").click(function () { 
    $("#myElement10").downupPopup("open"); 
  });

  $("#btn-11").click(function () { 
    $("#myElement11").downupPopup("open"); 
  });

  $("#btn-12").click(function () { 
    $("#myElement12").downupPopup("open"); 
  });


const initSlide3 = async function(){
  
  //Add name of the candidats from the database to the profil page
  let response = await fetch('api/candidat/all');
  const candidats = await response.json();

  //Get the candidats from html document
  const noms = document.querySelector('#candidats');
  noms.removeChild(noms.firstChild);
  noms.childNodes.forEach((nom, nom_index) => {if(nom_index%2 == 0) nom.childNodes[1].data = `${candidats[nom_index/2].name}`});

  //Get the candidats:popup from html document (have to change number)
  for (let i = 1; i < 12; i++) {
    let poppups = document.querySelector('#myElement' + i);
    //Name of popup
    let title = document.querySelector('#myElement' + i + ' h3');
    title.innerHTML = `${candidats[i-1].name}`;

    let table = document.querySelector('#myElement' + i + ' tbody');
    table = table.childNodes[1];

    let followers = table.childNodes[1];
    followers.innerHTML = `${candidats[i-1].followers}`;

    let tweets = table.childNodes[3];
    tweets.innerHTML = `${candidats[i-1].text}`;


  }

};