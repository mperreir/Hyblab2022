"use strict";
/* global Mustache, Swiper, $ */

// fonction utilitaire permettant de faire du
// lazy loading (chargement à la demande) des templates
const templates = (() => {
  let templates = {};
  return function load(url) {
    if (templates[url]) {
      return Promise.resolve(templates[url]);
    } else {
      return fetch(url)
          .then(res => res.text())
          .then(text => {
            return templates[url] = text;
          })
    }
  }
})();

const initSlide3 = async function(){

  const candidats_dom = $("#candidats");
  const third_slide_dom = $("#third-slide");
  // fetch data + templates
  const all_candidats = await (await fetch("./api/candidat/all")).json();
  const candidats_template = await (await fetch("./templates/button-candidat.mustache")).text();
  const downup_template = await (await fetch("./templates/downup-popup.mustache")).text();


  all_candidats.forEach((candidat) => {
    // remplace la photo tweeter par une plus grande qualité
    candidat["profile_image_url"] = candidat["profile_image_url"].replace("_normal.j", '.j');
    // render des templates
    const candidats_template_rendered = Mustache.render(candidats_template, candidat);
    const downup_template_rendered = Mustache.render(downup_template, candidat);
    // ajout au html
    candidats_dom.append(candidats_template_rendered);
    third_slide_dom.append(downup_template_rendered);

    $("#downup-" + candidat.id).downupPopup({
      width: "100%",
      contentScroll: false,
      background: false,
    });

    const swiper2 = new Swiper("#mySwiper" + candidat.id, {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    $("#btn-" + candidat.id).click(function () {
      $("#downup-" + candidat.id).downupPopup("open");
    });

    //Get the candidats from html document
    let button = document.querySelector('#btn-' + candidat.id);
    /*let nom = button.childNodes[1];
    nom.data = `${candidats[i-1].name}`;*/

    //Get the candidats:popup from html document (have to change number)
    let poppups = document.querySelector('#downup-' + candidat.id);
    let headerpoppup = document.querySelector('.downupPopup:last-child .downupPopup-header');

    //Name of popup
    let title = document.querySelector('#downup-' + candidat.id + ' h3');
    title.style.color = "white";
    title.style.fontWeight = "700";

    if (candidat.name === "Yannick Jadot"){
      poppups.style.background = "#47d19f";
      headerpoppup.style.background = "#47d19f";
    }
    if (candidat.name === "Jean-Luc Mélenchon" || candidat.name === "Philippe Poutou" || candidat.name === "Anne Hidalgo" || candidat.name === "Christiane Taubira"){
      poppups.style.background = "#ef7767";
      headerpoppup.style.background = "#ef7767";
    }
    if (candidat.name === "Emmanuel Macron" || candidat.name === "Valérie Pécresse" || candidat.name === "Marine Le Pen" ){
      poppups.style.background = "#5467d3";
      headerpoppup.style.background = "#5467d3";
    }

    poppups.style.background = "#ef7767";
    headerpoppup.style.background = "#ef7767";

    let table = document.querySelector('#downup-' + candidat.id + ' tbody');
    table = table.childNodes[1];
    table.style.color = "white";

    let followers = table.childNodes[1];
    followers.innerHTML = `${candidat.followers}` +" followers";


    let tweets = table.childNodes[3];

    tweets.innerHTML = `${candidat.tweets}` +" tweets";

    let retweets = table.childNodes[5];
    retweets.innerHTML = `${candidat.retweets}` +" retweets";

  });

};