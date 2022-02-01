let textes;
let gotText = false;

fetch("./data/textes.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        gotText = true;
        textes = jsondata;
    })

function getText(key) {
    console.log(key);
    if (gotText) return textes[key];
    return;
}
