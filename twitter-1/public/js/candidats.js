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


  for (const candidat of all_candidats) {
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

    /*$("select-" + candidat.id).on('change', function (){
      console.log("truc");
      console.log($("select-" + candidat.id).value);
      
    })*/

    select = document.querySelector('#select-' + candidat.id);
    select.style.borderRadius = "80px";
    select.style.marginLeft = "25%";
    select.style.marginTop = "1em";
    select.style.fontFamily = "'Outfit', sans-serif";
    select.style.height = "3em";


    select.addEventListener("input", ev =>  {
      console.log(select.value);
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

    let image = document.querySelector('#images' + candidat.id);

    if (candidat.name === "Yannick Jadot"){
      poppups.style.background = "#47d19f";
      headerpoppup.style.background = "#47d19f";

      let image1 = document.createElement('img');
      image1.src="img/emotes/@-1.png";
      image1.setAttribute("id","image1");
      image1.setAttribute("class","rotateimg320");
      image1.style.width="30%";
      image1.style.position = "absolute";
      image1.style.top = "65%";
      image1.style.left = "5%";
      image1.style.zIndex = "5";
      image.appendChild(image1);

      let image2 = document.createElement('img');
      image2.src="img/emotes/hashtag-1.png";
      image2.setAttribute("id","image1");
      image2.setAttribute("class","rotateimg20");
      image2.style.width="20%";
      image2.style.position = "absolute";
      image2.style.top = "45%";
      image2.style.left = "70%";
      image2.style.zIndex = "5";
      image.appendChild(image2);

      let image3 = document.createElement('img');
      image3.src="img/emotes/twitter-1.png";
      image3.setAttribute("id","image1");
      image3.setAttribute("class","rotateimg20");
      image3.style.width="15%";
      image3.style.position = "absolute";
      image3.style.top = "70%";
      image3.style.left = "25%";
      image3.style.zIndex = "5";
      image.appendChild(image3);
    }
    if (candidat.name === "Jean-Luc Mélenchon" || candidat.name === "Philippe Poutou" || candidat.name === "Anne Hidalgo" || candidat.name === "Christiane Taubira"){
      poppups.style.background = "#ef7767";
      headerpoppup.style.background = "#ef7767";

      let image1 = document.createElement('img');
      image1.src="img/emotes/coeur-1.png";
      image1.setAttribute("id","image1");
      image1.setAttribute("class","rotateimg320");
      image1.style.width="30%";
      image1.style.position = "absolute";
      image1.style.top = "65%";
      image1.style.left = "5%";
      image1.style.zIndex = "5";
      image.appendChild(image1);

      let image2 = document.createElement('img');
      image2.src="img/emotes/retweet-1.png";
      image2.setAttribute("id","image1");
      image2.setAttribute("class","rotateimg20");
      image2.style.width="25%";
      image2.style.position = "absolute";
      image2.style.top = "45%";
      image2.style.left = "70%";
      image2.style.zIndex = "5";
      image.appendChild(image2);

      let image3 = document.createElement('img');
      image3.src="img/emotes/twitter-1.png";
      image3.setAttribute("id","image1");
      image3.setAttribute("class","rotateimg20");
      image3.style.width="15%";
      image3.style.position = "absolute";
      image3.style.top = "44%";
      image3.style.left = "64%";
      image3.style.zIndex = "5";
      image.appendChild(image3);
    }
    if (candidat.name === "Emmanuel Macron" || candidat.name === "Valérie Pécresse" || candidat.name === "Marine Le Pen" || candidat.name === "Eric Zemmour" || candidat.name === "Florian Philippot" || candidat.name === "N. Dupont-Aignan" || candidat.name === "François Asselineau"){
      poppups.style.background = "#5467d3";
      headerpoppup.style.background = "#5467d3";

      let image1 = document.createElement('img');
      image1.src="img/emotes/discussion-1.png";
      image1.setAttribute("id","image1");
      image1.setAttribute("class","rotateimg20");
      image1.style.width="20%";
      image1.style.position = "absolute";
      image1.style.top = "65%";
      image1.style.left = "10%";
      image1.style.zIndex = "5";
      image.appendChild(image1);

      let image2 = document.createElement('img');
      image2.src="img/emotes/retweet-1.png";
      image2.setAttribute("id","image1");
      image2.setAttribute("class","rotateimg20");
      image2.style.width="25%";
      image2.style.position = "absolute";
      image2.style.top = "45%";
      image2.style.left = "70%";
      image2.style.zIndex = "5";
      image.appendChild(image2);

      let image3 = document.createElement('img');
      image3.src="img/emotes/hashtag-1.png";
      image3.setAttribute("id","image1");
      image3.setAttribute("class","rotateimg320");
      image3.style.width="15%";
      image3.style.position = "absolute";
      image3.style.top = "53%";
      image3.style.left = "82%";
      image3.style.zIndex = "5";
      image.appendChild(image3);
    }

    let table = document.querySelector('#downup-' + candidat.id + ' tbody');
    table = table.childNodes[1];
    table.style.color = "white";

    try {
      // statistiques
      const les_candidats = await (await fetch(`./api/candidat/${candidat.id}/stats`)).json();

      let followers = table.childNodes[1];
      followers.innerHTML = '+ ' + `${parseInt(les_candidats.followers_diff).toLocaleString('en').replaceAll(',', ' ')}`
          + " followers";

      let tweets = table.childNodes[3];
      tweets.innerHTML = '+ ' + `${les_candidats.total_week_tweets.toLocaleString('en').replaceAll(',', ' ')}`
          + " tweets";

      let retweets = table.childNodes[5];
      retweets.innerHTML = '+ ' + `${les_candidats.total_retweets_week.toLocaleString('en').replaceAll(',', ' ')}`
          + " retweets";
    } catch(e) {
      console.error(e);
    }


  }

};

/*const Semaine = async function(truc){
  if (truc=="semaine"){
    try {
      // statistiques
      const les_candidats = await (await fetch(`./api/candidat/${candidat.id}/stats`)).json();

      let followers = table.childNodes[1];
      followers.innerHTML = '+ ' + `${parseInt(les_candidats.followers_diff).toLocaleString('en').replaceAll(',', ' ')}`
          + " followers";

      let tweets = table.childNodes[3];
      tweets.innerHTML = '+ ' + `${les_candidats.total_tweets_week.toLocaleString('en').replaceAll(',', ' ')}`
          + " tweets";

      let retweets = table.childNodes[5];
      retweets.innerHTML = '+ ' + `${les_candidats.total_retweets_week.toLocaleString('en').replaceAll(',', ' ')}`
          + " retweets";
    } catch(e) {
      console.error(e);
    }

  }else{
    if (truc=="tous"){
      try {
        // statistiques
        const les_candidats = await (await fetch(`./api/candidat/${candidat.id}/stats`)).json();
  
        let followers = table.childNodes[1];
        followers.innerHTML = '+ ' + `${parseInt(les_candidats.followers_now).toLocaleString('en').replaceAll(',', ' ')}`
            + " followers";
  
        let tweets = table.childNodes[3];
        tweets.innerHTML = '+ ' + `${les_candidats.total_tweets.toLocaleString('en').replaceAll(',', ' ')}`
            + " tweets";
  
        let retweets = table.childNodes[5];
        retweets.innerHTML = '+ ' + `${les_candidats.total_retweets.toLocaleString('en').replaceAll(',', ' ')}`
            + " retweets";
      } catch(e) {
        console.error(e);
      }
    }
  }
};*/