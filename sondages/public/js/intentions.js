fetch('./api/getData')
    .then(e => e.json())
    .then(e => console.log(e))
    .catch(err => console.error(err));