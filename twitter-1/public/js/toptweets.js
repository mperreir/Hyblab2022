select = document.querySelector('#top-select');
tweet = document.querySelector('#tweets');

select.addEventListener("input", ev =>  {
    valeur = document.querySelector('#tweet-theme');
    tweet.removeChild(valeur);
    div = document.createElement('div');
    div.setAttribute("id",'tweet-theme');
    div.appendChild(document.createTextNode(select.value));
    tweet.appendChild(div);
})