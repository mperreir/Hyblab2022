select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');
let themes;

(() => initThemesTopTweets())();

async function initThemesTopTweets() {
    themes = await fetchThemes();
    themes.forEach((theme, index_theme) => {
        let o = document.createElement('option');
        o.setAttribute("value", index_theme + '');
        o.innerText = theme.name;
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