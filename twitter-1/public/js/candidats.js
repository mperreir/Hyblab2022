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
  
  //Add name of the candidats from the database to the profil

  let response = await fetch('api/candidat/all');
  const candidat = await response.json();
  const nom1 = document.querySelector('#btn-1');
  const child = nom1.childNodes;
  nom1.childNodes[1].data = `${candidat[0].name}`;

};