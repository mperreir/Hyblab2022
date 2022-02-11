//Select some global element and create global constante
select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');
theme_pic = document.querySelector('img#theme');
let themes;
let notif = false;

(() => initThemesTopTweets())(); //Initialize the top tweet page

async function initThemesTopTweets() {

    themes = await fetchThemes();
    let o = document.createElement('option');
    o.setAttribute("value", '0');
    o.innerText = "TOUS";
    select.appendChild(o);

    //Create the list of options
    themes.forEach((theme) => {
        o = document.createElement('option');
        o.setAttribute("value", theme.id + '');
        o.innerText = theme.name.toUpperCase();
        select.appendChild(o);
    });
    
    await showTopTweets(); //Ask for top tweets
}

//Update top tweet when an option is selected
select.addEventListener("input", async ev =>  {
    await showTopTweets();
})

async function showTopTweets () {
    const all_candidats = await (await fetch("./api/candidat/all")).json();

    //Get the inside swiper template
    const swiper_inside_template = await (await fetch("./templates/swiper-insidetoptweet.mustache")).text();

    let swiper_wrapper = document.querySelector('#mySwiperTop .swiper-wrapper');
    swiper_wrapper.innerHTML = '';

    let tweets = await fetchTopTweetsTheme(parseInt(select.value));

    //Create a new Swiper
    const swiper = new Swiper("#mySwiperTop", {
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    

    TopTweetsThemePic(select.value);

    let j = 0;
    //Add each top tweet to the swiper
    tweets.forEach((t) => {
        let candidat = all_candidats.filter(c => t.user_id === c.id);
        if (candidat){

            //Add all candidat info needed with the tweet
            let new_slide = document.createElement('div');
            let name = document.createTextNode(t.name);
            t["name_UP"] = name.data.toUpperCase();
            candidat[0].profile_image_url = candidat[0].profile_image_url.replace("_normal.j", '.j');
            t["url"] = candidat[0].profile_image_url;
            const swiper_inside_template_rendered = Mustache.render(swiper_inside_template,t);
            new_slide.setAttribute("class", "swiper-slide tweet");
            new_slide.setAttribute("data-hash", "slide" + j);
            new_slide.innerHTML = swiper_inside_template_rendered;
            swiper_wrapper.appendChild(new_slide);
        }
        j = j + 1;
    });
    

    // If there is no tweet for this theme
    if (tweets.length === 0) {
        for (let i = 0; i < 5; i++) {
            let slide = document.createElement('div');
            slide.setAttribute("class", "swiper-slide no-tweet");
            slide.innerHTML = "Aucun tweet n’a été populaire sur ce thème cette semaine."
            swiper_wrapper.appendChild(slide);
        }
    }

    //Don't let more than one instance of swiper-pagination exist each time you change theme
    if (!notif) {
        const SwiperTop = document.querySelector("#mySwiperTop");
        SwiperTop.removeChild(SwiperTop.childNodes[5]);
    }
    else {notif = true}
}

// Get all the available themes
async function fetchThemes() {
    let result;
    try {
        // On fait ensuite un fetch sur l'api pour s'authentifier
        result = await fetch('./api/theme/all', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            method: 'GET',
        });
    } catch (e) {
        console.error(e);
        return;
    }

    try {
        if (result.ok) {
            // Si tout s'est bien passé
            result = await result.json();
            return result;
        }
    } catch (e) {
        console.error(e);
        return;
    }
}

//Get Top Tweets in general or with a specific theme
async function fetchTopTweetsTheme(theme_id) {
    let result;
    if (theme_id === 0)
    {
        try {
            // On fait ensuite un fetch sur l'api pour s'authentifier
            result = await fetch('./api/tweets/tops/');
        } catch (e) {
            console.error(e);
            return;
        }
    }
    else {
        try {
            // On fait ensuite un fetch sur l'api pour s'authentifier
            result = await fetch('./api/tweets/tops/' + theme_id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
                method: 'GET',
            });
        } catch (e) {
            console.error(e);
            return;
        }
    }
    

    try {
        if (result.ok) {
            // Si tout s'est bien passé
            result = await result.json();
            return result;
        }
    } catch (e) {
        console.error(e);
        return;
    }
}

//Put the image corresponding to the top tweet theme chosen
function TopTweetsThemePic(theme_id) {
    page = document.querySelector('#fourth-slide');
    switch (theme_id) {
        case "0": //All Tweet
          theme_pic.src = './img/topics/podium.png';
          page.style.background= "#fff";
          break;
        case "1": //Topic Security
          theme_pic.src = './img/topics/securite.png';
          page.style.background= "#5467D3";
          break;
        case "2": //Topic Health
          theme_pic.src = './img/topics/sante.png';
          page.style.background= "#E26088";
          break;
        case "3": //Topic Economie
          theme_pic.src = './img/topics/economie.png';
          page.style.background= "#f1de68";
          break;
        case "4": //Topic Education
          theme_pic.src = './img/topics/education.png';
          page.style.background= "#EF7767";
          break;
        case "5": //Topic Environnement
          theme_pic.src = './img/topics/environnement.png';
          page.style.background= "#47D19F";
          break;
        case "6": //Topic Culture
          theme_pic.src = './img/topics/culture.png';
          page.style.background= "#A08AFF";
          break;
      }
}