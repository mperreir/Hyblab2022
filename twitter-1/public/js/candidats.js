"use strict";

for (let i = 1; i <= 12; i++){
  $("#myElement" + i).downupPopup({
    width: "100%",
    contentScroll: false,
    background: false,
  });

  const swiper2 = new Swiper("#mySwiper" +i, {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $("#btn-" + i).click(function () { 
    $("#myElement" + i).downupPopup("open");
  });
}


const initSlide3 = async function(){
  
  //Add name of the candidats from the database to the profil page
  let response = await fetch('api/candidat/filtre');
  const candidats = await response.json();
  console.log(response);

  for (let i = 1; i <= 12; i++) {

    //Get the candidats from html document
    let button = document.querySelector('#btn-' + i);
    /*let nom = button.childNodes[1];
    nom.data = `${candidats[i-1].name}`;*/

    //Get the candidats:popup from html document (have to change number)
    let poppups = document.querySelector('#myElement' + i);
    let headerpoppups = document.getElementsByClassName('downupPopup-header');

    //Name of popup
    let title = document.querySelector('#myElement' + i + ' h3');
    title.innerHTML = `${candidats[i-1].name}`;
    title.style.color = "white";
    title.style.fontWeight = "700";

    if (candidats[i-1].name == "Yannick Jadot"){
      poppups.style.background = "#47d19f";
      headerpoppups[i-1].style.background = "#47d19f";
    }
    if (candidats[i-1].name == "Jean-Luc Mélenchon" || candidats[i-1].name == "Philippe Poutou" || candidats[i-1].name == "Anne Hidalgo" || candidats[i-1].name == "Christiane Taubira"){
      poppups.style.background = "#ef7767";
      headerpoppups[i-1].style.background = "#ef7767";
    }
    if (candidats[i-1].name == "Emmanuel Macron" || candidats[i-1].name == "Valérie Pécresse" || candidats[i-1].name == "Marine Le Pen" ){
      poppups.style.background = "#5467d3";
      headerpoppups[i-1].style.background = "#5467d3";
    }

    let table = document.querySelector('#myElement' + i + ' tbody');
    table = table.childNodes[1];
    table.style.color = "white";

    let followers = table.childNodes[1];
    followers.innerHTML = `${candidats[i-1].followers}` +" followers";


    let tweets = table.childNodes[3];
    tweets.innerHTML = `${candidats[i-1].tweets}` +" tweets";

    let retweets = table.childNodes[5];
    retweets.innerHTML = `${candidats[i-1].retweets}` +" retweets";

  }

};