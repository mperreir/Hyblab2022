fetch('./api/getCandidate')
    .then(e => e.json())
    .then(candidats => AjoutDesCandidats(candidats))
    .catch(err => console.error(err));

/*
fetch('./api/getData')
    .then(e => e.json())
    .then(candidats => {
        candidats.forEach(candidat => {
            const divCandidat = document.createElement('div');
            divCandidat.setAttribute('data-name') = candidat.prenom + ' ' + candidat.nom;
            const divName = document.createElement('div');
            divName.classList.add('firstName', candidat.prenom);
            divName.classList.add('lastName', candidat.nom);
            const divBlock = document.createElement('div');
            divBlock.classList.add('block');
            const img = document.createElement('img');
            img.setAttribute('src', candidat.image);
            const divPourcent = document.createElement('div');
            divPourcent.classList.add('pourcent', candidat.)
        });
    })
    .then(e => console.log(e))
    .catch(err => console.error(err));*/