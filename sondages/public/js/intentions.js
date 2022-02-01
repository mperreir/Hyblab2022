fetch('./api/getCandidate')
    .then(e => e.json())
    .then(candidats => AjoutDesCandidats(candidats))
    .catch(err => console.error(err));


fetch('./api/getData')
    .then(e => e.json())
    .then(candidats => {
        console.log(candidats);
        InitDesIntentions(candidats);
    })
    .then(e => console.log(e))
    .catch(err => console.error(err));