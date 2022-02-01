select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');
theme_pic = document.querySelector('img#theme');
let themes;

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
    //Get the swiper template
    const fourth_slide_dom = $("#fourth-slide #SlideTop");
    const swiper_template = await (await fetch("./templates/swiper-toptweet.mustache")).text();
    const swiper_inside_template = await (await fetch("./templates/swiper-insidetoptweet.mustache")).text();

    //Render the swiper template
    const swiper_template_rendered = Mustache.render(swiper_template);
    fourth_slide_dom.append(swiper_template_rendered);

    //Get the rendered swiper
    let swiper_wrapper = document.querySelector('#mySwiperTop .swiper-wrapper');
    swiper_wrapper.innerHTML = '';

    tweet.removeChild(document.querySelector('#tweet-theme'));
    let tweet_theme_div = document.createElement('div');
    tweet_theme_div.setAttribute("id",'tweet-theme');

    let tweets = await fetchTopTweetsTheme(parseInt(select.value));
    
    const swiper = new Swiper("#mySwiperTop", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    TopTweetsThemePic(select.value);

    //Add each top tweet to the swiper
    tweets.forEach((t) => {
        let new_slide = document.createElement('div');
        let name = document.createTextNode(t.name);
        t["name_UP"] = name.data.toUpperCase();
        const swiper_inside_template_rendered = Mustache.render(swiper_inside_template,t);
        //p_name.innerHTML = document.createTextNode(name.data.toUpperCase() + " @" + t.screen_name).data;

        //p_text.setAttribute('id','tweetcontent');
        //p_text.innerHTML = document.createTextNode(t.text).data;

        new_slide.setAttribute("class", "swiper-slide tweet");
        new_slide.innerHTML = swiper_inside_template_rendered;
        //new_slide.appendChild(p_name);
        //new_slide.appendChild(p_text);
        swiper_wrapper.appendChild(new_slide);

        //const slide_dom = $("#swiper-slide" + i);
        //slide_dom.append(swiper_inside_template_rendered);

        // let img = document.createElement('img');
        // img.src = t.src;

        //tweet_theme_div.appendChild(p);
    });

    // no tweet for this themas
    if (tweets.length === 0) {

        tweet_theme_div.appendChild(document.createTextNode("Pas de top tweet trouvé pour ce theme !"));
    }
    tweet.appendChild(tweet_theme_div);
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


// tops tweets
/*
let swiper_wrapper = document.querySelector('#mySwiperTop' + candidat_id + ' .swiper-wrapper');
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
    p.innerText = top_tweet.text;
    new_slide.appendChild(p);
    swiper_wrapper.appendChild(new_slide);
});
*/