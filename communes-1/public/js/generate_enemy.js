let data_voisins = require('./chargement.js').data_voisins;


function randomize(tab) {
	let i, j, tmp;
	for (i = tab.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		tmp = tab[i];
		tab[i] = tab[j];
		tab[j] = tmp;
	}
	return tab;
}


function generate_enemy(code_commune_joueur) {
	let adversaires = [7, 99, 328, 331];
	let voisins = data_voisins.get(code_commune_joueur);

	if (adversaires.includes(code_commune_joueur)) {
		adversaires.splice(adversaires.indexOf(code_commune_joueur), 1);
		if (voisins.length >= 7) {
			for (let i = 0; i < 7; i++) {
				adversaires.push(voisins[i]);
			}
		}
	}
	else  {
		if (voisins.length >= 6) {
			for (let i = 0; i < 6; i++) {
				adversaires.push(voisins[i]);
			}
		}
		else {
			let nb_villes_manquantes = 6 - voisins.length;
			adversaires.push(...voisins);

			for (let idx_voisin in voisins) {
				let voisinsRangDeux = data_voisins.get(voisins[idx_voisin]);
				for (let idx_voisinDouble in voisinsRangDeux) {
					if (!adversaires.includes(voisinsRangDeux[idx_voisinDouble])) {
						adversaires.push(voisinsRangDeux[idx_voisinDouble]);
						nb_villes_manquantes--;
						if (nb_villes_manquantes === 0) {
							break;
						}
					}
				}
				if (nb_villes_manquantes === 0) {
					break;
				}
			}
		}
	}
	adversaires = randomize(adversaires);
	return adversaires;
}


