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

const initSlide3 = async function () {

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

        let select = document.querySelector('#select-' + candidat.id);
        select.style.borderRadius = "80px";
        select.style.marginLeft = "20%";
        select.style.marginTop = "1em";
        select.style.fontFamily = "'Outfit', sans-serif";
        select.style.height = "3em";


        select.addEventListener("change", async ev => {
            console.log(select.value);

            update_semaine(select.value, candidat.id);
        });

        //Get the candidats from html document
        let button = document.querySelector('#btn-' + candidat.id);
        button.style.fontFamily = "'Outfit', sans-serif";
        let nom = button.childNodes[3];

        if (candidat.name === "N. Dupont-Aignan") {
            nom.innerHTML = "Nicolas Dupont-Aignan"
        }else{
            nom.innerHTML = `${candidat.name}`;
        }
        console.log(nom);

        //Get the candidats:popup from html document (have to change number)
        let poppups = document.querySelector('#downup-' + candidat.id);
        let headerpoppup = document.querySelector('.downupPopup:last-child .downupPopup-header');

        //Name of popup
        let title = document.querySelector('#downup-' + candidat.id + ' h3');
        title.style.color = "white";
        title.style.fontWeight = "700";
        title.style.marginBottom = "-12%";

        let image = document.querySelector('#images' + candidat.id);

        if (candidat.name === "Yannick Jadot") {
            poppups.style.background = "#47d19f";
            headerpoppup.style.background = "#47d19f";

            let image1 = document.createElement('img');
            image1.src="img/emotes/@-1.png";
            image1.setAttribute("id","image1");
            image1.setAttribute("class","rotateimg320");
            image1.style.width="30%";
            image1.style.position = "absolute";
            image1.style.top = "84%";
            image1.style.left = "0%";
            image1.style.zIndex = "5";
            image.appendChild(image1);

            let image2 = document.createElement('img');
            image2.src="img/emotes/hashtag-1.png";
            image2.setAttribute("id","image1");
            image2.setAttribute("class","rotateimg20");
            image2.style.width="20%";
            image2.style.position = "absolute";
            image2.style.top = "-10%";
            image2.style.left = "82%";
            image2.style.zIndex = "5";
            image.appendChild(image2);

            let image3 = document.createElement('img');
            image3.src="img/emotes/twitter-1.png";
            image3.setAttribute("id","image1");
            image3.setAttribute("class","rotateimg20");
            image3.style.width="15%";
            image3.style.position = "absolute";
            image3.style.top = "89%";
            image3.style.left = "18%";
            image3.style.zIndex = "5";
            image.appendChild(image3);
        }
        if (candidat.name === "Jean-Luc Mélenchon" || candidat.name === "Philippe Poutou" || candidat.name === "Anne Hidalgo" || candidat.name === "Christiane Taubira") {
            poppups.style.background = "#ef7767";
            headerpoppup.style.background = "#ef7767";

            let image1 = document.createElement('img');
            image1.src="img/emotes/coeur-1.png";
            image1.setAttribute("id","image1");
            image1.setAttribute("class","rotateimg320");
            image1.style.width="30%";
            image1.style.position = "absolute";
            image1.style.top = "82%";
            image1.style.left = "5%";
            image1.style.zIndex = "5";
            image.appendChild(image1);

            let image2 = document.createElement('img');
            image2.src="img/emotes/retweet-1.png";
            image2.setAttribute("id","image1");
            image2.setAttribute("class","rotateimg20");
            image2.style.width="25%";
            image2.style.position = "absolute";
            image2.style.top = "-8%";
            image2.style.left = "87%";
            image2.style.zIndex = "5";
            image.appendChild(image2);

            let image3 = document.createElement('img');
            image3.src="img/emotes/twitter-1.png";
            image3.setAttribute("id","image1");
            image3.setAttribute("class","rotateimg20");
            image3.style.width="15%";
            image3.style.position = "absolute";
            image3.style.top = "-8%";
            image3.style.left = "80%";
            image3.style.zIndex = "5";
            image.appendChild(image3);
    
        }
        if (candidat.name === "Emmanuel Macron" || candidat.name === "Valérie Pécresse" || candidat.name === "Marine Le Pen" || candidat.name === "Eric Zemmour" || candidat.name === "Florian Philippot" || candidat.name === "N. Dupont-Aignan" || candidat.name === "François Asselineau") {
            poppups.style.background = "#5467d3";
            headerpoppup.style.background = "#5467d3";

            let image1 = document.createElement('img');
            image1.src="img/emotes/discussion-1.png";
            image1.setAttribute("id","image1");
            image1.setAttribute("class","rotateimg20");
            image1.style.width="20%";
            image1.style.position = "absolute";
            image1.style.top = "82%";
            image1.style.left = "9%";
            image1.style.zIndex = "5";
            image.appendChild(image1);

            let image2 = document.createElement('img');
            image2.src="img/emotes/retweet-1.png";
            image2.setAttribute("id","image1");
            image2.setAttribute("class","rotateimg20");
            image2.style.width="25%";
            image2.style.position = "absolute";
            image2.style.top = "-13%";
            image2.style.left = "82%";
            image2.style.zIndex = "5";
            image.appendChild(image2);

            let image3 = document.createElement('img');
            image3.src="img/emotes/hashtag-1.png";
            image3.setAttribute("id","image1");
            image3.setAttribute("class","rotateimg320");
            image3.style.width="15%";
            image3.style.position = "absolute";
            image3.style.top = "9%";
            image3.style.left = "89%";
            image3.style.zIndex = "5";
            image.appendChild(image3);
        }

        update_semaine(select.value, candidat.id);
    }

};

const update_semaine = async function (truc, candidat_id) {
    let table = document.querySelector('#downup-' + candidat_id + ' tbody');
    table = table.childNodes[1];
    table.style.color = "white";

    const candidat_stat = await (await fetch(`./api/candidat/${candidat_id}/stats`)).json();


    if (truc === "semaine") {
        try {
            // statistiques
            let followers = table.childNodes[1];
            followers.innerHTML = (candidat_stat.followers_diff > 0 ? '+ ' : '- ')
                + `${parseInt(candidat_stat.followers_diff).toLocaleString('en').replaceAll(',', ' ')}`
                + " followers";

            let tweets = table.childNodes[3];
            tweets.innerHTML = '+' + `${candidat_stat.total_week_tweets.toLocaleString('en').replaceAll(',', ' ')}`
                + " tweets";

            let retweets = table.childNodes[5];
            retweets.innerHTML = '+' + `${candidat_stat.total_retweets_week.toLocaleString('en').replaceAll(',', ' ')}`
                + " retweets";
        } catch (e) {
            console.error(e);
        }

    } else {
        if (truc === "tous") {
            try {
                let followers = table.childNodes[1];
                followers.innerHTML = `${parseInt(candidat_stat.followers_now).toLocaleString('en').replaceAll(',', ' ')}`
                    + " followers";

                let tweets = table.childNodes[3];
                tweets.innerHTML = `${candidat_stat.total_tweets.toLocaleString('en').replaceAll(',', ' ')}`
                    + " tweets";

                let retweets = table.childNodes[5];
                retweets.innerHTML = `${candidat_stat.total_retweets.toLocaleString('en').replaceAll(',', ' ')}`
                    + " retweets";
            } catch (e) {
                console.error(e);
            }
        }
    }

    // tops tweets
    let swiper_wrapper = document.querySelector('#mySwiper' + candidat_id + ' .swiper-wrapper');
    swiper_wrapper.innerHTML = '';

    let top_tweets;
    if (truc === "semaine") {
        top_tweets = await (await fetch(`./api/tweets/tops/semaine/candidat/${candidat_id}`)).json();
    } else {
        top_tweets = await (await fetch(`./api/tweets/tops/all/candidat/${candidat_id}`)).json();
    }

        top_tweets.forEach(top_tweet => {
        let new_slide = document.createElement('div');
        let p = document.createElement('p');
        new_slide.setAttribute("class", "swiper-slide tweet");
        p.innerHTML = top_tweet.text;
        new_slide.appendChild(p);
        var tablefave = document.createElement("table");
        tablefave.setAttribute("class","table-candidat");
        var tblBody = document.createElement("tbody");
        var row = document.createElement("tr");

        var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("viewBox", "0 0 24 16");
        svg.setAttribute("width", "24");
        svg.setAttribute("height", "16");
        

        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        newElement.setAttribute("d","M13.4481 14.6256H7.19616C6.77634 14.6256 6.37365 14.4591 6.07637 14.1627C5.77909 13.8662 5.61147 13.464 5.61025 13.0442V2.70834L7.82869 4.59217C7.96788 4.71008 8.14821 4.76789 8.33001 4.75285C8.51182 4.7378 8.68019 4.65115 8.7981 4.51196C8.91602 4.37277 8.97383 4.19244 8.95878 4.01064C8.94374 3.82884 8.85709 3.66046 8.7179 3.54255L5.35358 0.686991C5.22931 0.583738 5.07283 0.527222 4.91126 0.527222C4.7497 0.527222 4.59322 0.583738 4.46895 0.686991L1.02212 3.54255C0.882536 3.65938 0.794977 3.82681 0.778651 4.0081C0.762326 4.1894 0.818565 4.36977 0.935036 4.50967C0.998792 4.58772 1.07924 4.65048 1.17047 4.69332C1.26169 4.73615 1.36136 4.75798 1.46214 4.75718C1.62877 4.76253 1.79166 4.70714 1.9205 4.60134L4.25352 2.66709V13.0305C4.25473 13.815 4.56723 14.5669 5.12239 15.1212C5.67755 15.6755 6.42999 15.9869 7.21449 15.9869H13.4665C13.6488 15.9869 13.8237 15.9144 13.9526 15.7855C14.0815 15.6566 14.154 15.4817 14.154 15.2993C14.154 15.117 14.0815 14.9421 13.9526 14.8132C13.8237 14.6842 13.6488 14.6118 13.4665 14.6118L13.4481 14.6256Z"); //Set path's data
        newElement.style.fill = "#47D19F"; //Set stroke colour
        svg.appendChild(newElement);

        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        newElement2.setAttribute("d","M10.8721 1.91996H17.1241C17.5439 1.91995 17.9466 2.08642 18.2438 2.38284C18.5411 2.67927 18.7087 3.08147 18.71 3.50129V13.8188L16.4915 11.935C16.3523 11.8171 16.172 11.7593 15.9902 11.7743C15.8084 11.7894 15.64 11.876 15.5221 12.0152C15.4042 12.1544 15.3464 12.3347 15.3614 12.5165C15.3765 12.6983 15.4631 12.8667 15.6023 12.9846L18.9666 15.8402C19.0909 15.9434 19.2474 16 19.409 16C19.5705 16 19.727 15.9434 19.8513 15.8402L23.2935 12.9846C23.3635 12.9275 23.4214 12.857 23.4639 12.7773C23.5065 12.6975 23.5328 12.6102 23.5413 12.5202C23.5498 12.4303 23.5404 12.3395 23.5136 12.2532C23.4868 12.1669 23.4432 12.0868 23.3852 12.0175C23.3214 11.9395 23.241 11.8767 23.1498 11.8339C23.0585 11.791 22.9589 11.7692 22.8581 11.77C22.6915 11.7647 22.5286 11.82 22.3997 11.9258L20.0667 13.8601V3.50129C20.0655 2.71678 19.753 1.96482 19.1978 1.41052C18.6427 0.856218 17.8902 0.54489 17.1057 0.544891H10.8721C10.6898 0.544891 10.5149 0.617324 10.3859 0.746261C10.257 0.875198 10.1846 1.05008 10.1846 1.23242C10.1846 1.41477 10.257 1.58965 10.3859 1.71859C10.5149 1.84752 10.6898 1.91996 10.8721 1.91996Z"); //Set path's data
        newElement2.style.fill = "#47D19F"; //Set stroke colour
        svg.appendChild(newElement2);

        var svg2 = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg2.setAttribute("viewBox", "0 0 15 14");
        svg2.setAttribute("width", "15");
        svg2.setAttribute("height", "14");
        //svg2.style.height = "1%";

        var newElement3 = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        newElement3.setAttribute("d","M7.99393 13.9105C7.87396 13.9694 7.74222 14 7.60873 14C7.47523 14 7.34349 13.9694 7.22352 13.9105C5.93307 13.2401 1.85758 10.7871 0.255115 5.82695C0.255115 5.82695 -0.900506 1.91692 1.70735 0.626501C4.3152 -0.663921 6.4377 0.684628 7.10025 2.17656C7.11988 2.22468 7.15215 2.26652 7.19361 2.29761C7.23507 2.32869 7.28415 2.34785 7.3356 2.35303C7.38705 2.3582 7.43893 2.3492 7.48569 2.32698C7.53244 2.30477 7.57231 2.27019 7.60103 2.22694C8.3907 1.03727 10.6365 -1.53971 13.903 1.25427C13.903 1.25427 16.0679 3.43985 14.3152 7.06699C12.5009 10.76 10.1858 12.8216 7.99393 13.9105Z"); //Set path's data
        newElement3.style.fill = "#E26088"; //Set stroke colour
        svg2.appendChild(newElement3);

        let fave= document.createElement("td");
        fave.appendChild(svg2);
        fave.appendChild(document.createTextNode(' ' + top_tweet.favorite_count + ' favoris'));
        let retweet= document.createElement("td");
        retweet.appendChild(svg);
        retweet.appendChild(document.createTextNode(' ' + top_tweet.retweet_count + ' retweets'));
        row.appendChild(retweet);
        row.appendChild(fave);
        tblBody.appendChild(row);
        tablefave.appendChild(tblBody);
        new_slide.appendChild(tablefave);
        swiper_wrapper.appendChild(new_slide);
    });

    if (top_tweets.length === 0) {

        let new_slide = document.createElement('div');
        let p = document.createElement('p');
        new_slide.setAttribute("class", "swiper-slide tweet");
        p.innerText = "Pas de top tweet trouvé pour ce candidat !";
        new_slide.appendChild(p);
        swiper_wrapper.appendChild(new_slide);
    }
};