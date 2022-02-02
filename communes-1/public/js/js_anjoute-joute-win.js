const recompense_div = document.querySelector('.recompense');
const label_joute = document.querySelector('.label-joute');

function bonneVersion(name){
	switch (name){
		case 'Un Magnum De Cointreau':
			return "img/recompenses/Un_Magnum_De_Cointreau.png"
		case 'BouLes De Fort Gagnantes':
			return "img/recompenses/Boules_De_Fort_Gagnantes.png"
		case 'L\'oie Aux Œufs D\'or':
			return "img/recompenses/L_oie_Aux_Œufs_D_or.png"
		case 'Une MédaiLLe Du Roi René':
			return "Médaille_Du_Roi_René.png"
		case 'Une Soupe Angevine A VoLonté':
			return "img/recompenses/Soupe_Angevine_À_Volonté_.png"
		case 'Les MeiLLeurs Bottereaux':
			return "img/recompenses/Les_Meilleurs_Bottereaux_.png"
		case 'Le Manuscrit De Joachim Du BeLay':
			return "img/recompenses/Manuscrit_De_Joachim_Du_Belay_.png"
		case'Le Chateau D \'Angers':
			return "img/recompenses/Château_D_Angers.png"
		case 'Un ChevaL Du Cadre Noir':
			return "img/recompenses/Cheval_Du_Cadre_Noir.png"
		case 'Le Bateau De Loire Expres':
			return "img/recompenses/Bateau_De_Loire_Expres.png"
	}

}

let objet = localStorage.getItem('objetGagner');
let src = bonneVersion(objet);

let img = document.createElement('img');
img.setAttribute('src', src);
img.setAttribute('alt', objet);

recompense_div.appendChild(img);

label_joute.innerHTML = 'Vous avez remporté : ' + objet;