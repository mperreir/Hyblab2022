function sondage(date, echantillon, candidats) {
	this.date = date;
	this.echantillon = echantillon;
	this.candidats = candidats;
}

function candidat(nom, intentions, position) {
	this.nom = nom;
	this.intentions = intentions;
	this.position = position;
}

class Parser {

	constructor(){

	}

	createListeCandidats() {
		let candidats = ['Anne Hidalgo', 'Arnaud Montebourg', 'Yannick Jadot', 'Valérie Pécresse', 'Florian Philippot', 'François Asselineau',
		'Hélène Thouy', 'Fabien Roussel', 'Eric Zemmour', 'Philippe Poutou', 'Emmanuel Macron', 'Jean-Luc Mélenchon', 'Jean Lassalle',
		'Nicolas Dupont-Aignan', 'Nathalie Arthaud', 'Marine Le Pen'];
		let liste = [];
		candidats.forEach(nom => liste.push(new candidat(nom, null, null)));
		return liste;
	}

	calculatePosition(listeCandidats) {
		// we sort candidat per intentions
		listeCandidats.sort(function compare(a, b) {
			if (a.intentions < b.intentions)
	    		return 1;
	  		if (a.intentions > b.intentions )
	     		return -1;
	  		return 0;
		});
		// we set for each candidat, his position
		for (var i = 0; i < listeCandidats.length; i++) {
			if (listeCandidats[i].intentions != null) {
				listeCandidats[i].position = i+1;
			}
		}
		return listeCandidats;
	}

	sortCandidats(listeCandidats) {
		// we sort the candidats per name
		listeCandidats.sort(function compare(a, b) {
			if (a.nom < b.nom)
	    		return -1;
	  		if (a.nom > b.nom)
	     		return 1;
	  		return 0;
		});
		return listeCandidats;
	}

	parseCandidats(listeCandidats) {
		// we create the structure
		let liste = this.createListeCandidats();
		// we add data
		listeCandidats.forEach(candidat => {
			liste.forEach(candidat2 => {
				if (candidat.candidat === candidat2.nom) {
					candidat2.intentions = candidat.intentions;
				}
			})
		})
		// we calculate position and sort the list of candidats
		liste = this.calculatePosition(liste);
		liste = this.sortCandidats(liste);
		return liste;
	}

	moyenneSondages(listeSondages) {
		// weighted mean
		if (listeSondages.length === 1){
			return listeSondages[0];
		}
		// we create new sondage and set his echantillon value with the sum of echantillon values of each sondages of listeSondages
		let sondageMoyen = new sondage(listeSondages[0].date, null, this.createListeCandidats());
		listeSondages.forEach(sondage => {
			sondageMoyen.echantillon += sondage.echantillon;
		})
		// we calculate weighted mean of intentions for each candidat
		for (var i = 0; i < sondageMoyen.candidats.length; i++) {
			listeSondages.forEach(sondage => {
				if (sondage.candidats[i].intentions != null) {
					sondageMoyen.candidats[i].intentions += (sondage.candidats[i].intentions * sondage.echantillon);
				}
			})
			if (sondageMoyen.candidats[i].intentions != null) {
				sondageMoyen.candidats[i].intentions /= sondageMoyen.echantillon;
			}
		}
		// we calculate positions and sort the list of candidats
		sondageMoyen.candidats = this.calculatePosition(sondageMoyen.candidats);
		sondageMoyen.candidats = this.sortCandidats(sondageMoyen.candidats);
		return sondageMoyen;
	}

	parse(data){
		let donnee = [];

		// we keep only "Premier tour" sondage with hypothese "null"
		data.forEach(element => {
			element.tours.forEach(tour => {
				if (tour.tour === "Premier tour") {
					tour.hypotheses.forEach(hypothese => {
						if (hypothese.hypothese === null) {
							donnee.push(new sondage(element.fin_enquete, hypothese.sous_echantillon, this.parseCandidats(hypothese.candidats)));
						}
					})
				}
			})
		})

		// we sort data per date
		donnee.sort(function compare(a, b) {
			if (a.date < b.date)
				return -1;
			if (a.date > b.date)
		 		return 1;
			return 0;
		});

		// we group data with the same date
		let donnee2 = [[donnee[0]]];
		let cpt = 0;
		for (var i = 1; i < donnee.length; i++) {
			if (donnee2[cpt][0].date === donnee[i].date) {
				donnee2[cpt].push(donnee[i]);
			}
			else {
				donnee2.push([donnee[i]]);
				cpt += 1;
			}
		}

		// we calculate the mean of each group of data
		let donnee3 = [];
		donnee2.forEach(listeSondages => {
			donnee3.push(this.moyenneSondages(listeSondages));
		})
		return JSON.stringify(donnee3, null, "\t");
	}
}

module.exports = new Parser();