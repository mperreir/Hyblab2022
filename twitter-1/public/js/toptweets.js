select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');
theme_pic = document.querySelector('img#theme');
let themes;
let i = false;

(() => initThemesTopTweets())();

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

//Update top tweet when option is selected
select.addEventListener("input", async ev =>  {
    await showTopTweets();
})

async function showTopTweets () {
    const all_candidats = await (await fetch("./api/candidat/all")).json();

    //Get the swiper template
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

    const comment = document.getElementById("comment");
    comment.innerHTML = "Ils tweetent le plus cette semaine :";

    if (select.value === '1'){
        comment.innerHTML = "Ils tweetent le plus sur la sécurité cette semaine :";
    }
    if (select.value === '2'){
        comment.innerHTML = "Ils tweetent le plus sur la santé cette semaine :";
    }
    if (select.value === '3'){
        comment.innerHTML = "Ils tweetent le plus sur l'économie cette semaine :";
    }
    if (select.value === '4'){
        comment.innerHTML = "Ils tweetent le plus sur l'éducation cette semaine :";
    }
    if (select.value === '5'){
        comment.innerHTML = "Ils tweetent le plus sur l'environnement cette semaine :";
    }
    if (select.value === '6'){
        comment.innerHTML = "Ils tweetent le plus sur la culture cette semaine :";
    }
    

    TopTweetsThemePic(select.value);

    let j = 0;
    //Add each top tweet to the swiper
    tweets.forEach((t) => {
        let candidat = all_candidats.filter(c => t.user_id === c.id);
        if (candidat){
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

    // no tweet for this themas
    if (tweets.length === 0) {
        for (let i = 0; i < 5; i++) {
            let slide = document.createElement('div');
            slide.setAttribute("class", "swiper-slide no-tweet");
            slide.innerHTML = "Aucun tweet n’a été populaire sur ce thème cette semaine."
            swiper_wrapper.appendChild(slide);
        }
    }
}


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