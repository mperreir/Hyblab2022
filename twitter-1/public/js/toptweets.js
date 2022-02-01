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
    tweet.removeChild(document.querySelector('#tweet-theme'));
    let tweet_theme_div = document.createElement('div');
    tweet_theme_div.setAttribute("id",'tweet-theme');

    let tweets = await fetchTopTweetsTheme(parseInt(select.value));
    
    TopTweetsThemePic(select.value);

    //Add each top tweet
    tweets.forEach((t) => {
        let p = document.createElement('p');
        // let img = document.createElement('img');
        // img.src = t.src;
        p.appendChild(document.createTextNode(t.name + " @" + t.screen_name + '\n' + t.text));
        tweet_theme_div.appendChild(p);
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