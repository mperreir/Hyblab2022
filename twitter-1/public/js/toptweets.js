select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');
theme_pic_div = document.querySelector('#theme-pic');
theme_pic = document.querySelector('img#theme');
let themes;



(() => initThemesTopTweets())();

async function initThemesTopTweets() {
    themes = await fetchThemes();
    let o = document.createElement('option');
    o.setAttribute("value", '0');
    o.innerText = "TOUS";
    select.appendChild(o);

    themes.forEach((theme) => {
        o = document.createElement('option');
        o.setAttribute("value", theme.id + '');
        o.innerText = theme.name.toUpperCase();
        select.appendChild(o);
    });
    
    await showTopTweets();
}

select.addEventListener("input", async ev =>  {
    await showTopTweets();
})

async function showTopTweets () {
    tweet.removeChild(document.querySelector('#tweet-theme'));
    let tweet_theme_div = document.createElement('div');
    tweet_theme_div.setAttribute("id",'tweet-theme');

    let tweets = await fetchTopTweetsTheme(parseInt(select.value));
    
    TopTweetsThemePic(select.value);

    tweets.forEach((t) => {
        let p = document.createElement('p');
        p.appendChild(document.createTextNode(t.name + '\n' + t.text));
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
    theme_pic_div.style.display = "flex";
    switch (theme_id) {
        case "0":
          theme_pic_div.style.display = "none";
          page.style.background= "#fff";
          break;
        case "1":
          theme_pic.src = './img/topics/securite.png';
          page.style.background= "rgb(77, 109, 214)";
          break;
        case "2":
          theme_pic.src = './img/topics/sante.png';
          page.style.background= "rgb(207, 79, 207)";
          break;
        case "3":
          theme_pic.src = './img/topics/economie.png';
          page.style.background= "#f1de68";
          break;
        case "4":
          theme_pic.src = './img/topics/education.png';
          page.style.background= "#ef7767";
          break;
        case "5":
          theme_pic.src = './img/topics/environnement.png';
          page.style.background= "rgb(53, 226, 68)";
          break;
        case "6":
          theme_pic.src = './img/topics/culture.png';
          page.style.background= "rgb(153, 0, 241)";
          break;
      }
}