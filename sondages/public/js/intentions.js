fetch('./api/getCandidate')
    .then(e => e.json())
    .then(candidats => AjoutDesCandidats(candidats))
    .catch(err => console.error(err));


fetch('./api/getData')
    .then(e => e.json())
    .then(candidats => {
        InitDesIntentions(candidats);
    })
    .catch(err => console.error(err));