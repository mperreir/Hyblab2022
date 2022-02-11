function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function generateObject() {
    let inventaire = localStorage.getItem("inventaire");
    if (inventaire === "") {
        inventaire = [];
    } else {
        inventaire = inventaire.split(',');
    }
    let objets = ['magnum', 'boules_de_fort', 'oie', 'medaille', 'soupe', 'bottereau', 'manuscrit', 'chateau', 'cheval', 'bateau',]
    objets = objets.filter((objet) => !inventaire.includes(objet));
    objets = shuffle(objets);
    return objets.shift();
}
export {generateObject}