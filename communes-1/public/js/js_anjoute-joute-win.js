const recompense_div = document.querySelector('.recompense');
const label_joute = document.querySelector('.label-joute-recompense');

function toLowerMdr(nom)
{
	let temp = "";
	for (var i = 0; i < nom.length; i++) {
		if(nom[i].toLowerCase() !=="l") {
			temp += nom.charAt(i).toLowerCase();
		}
		else {
			temp += nom.charAt(i).toUpperCase();
		}
	}
	return temp
}

function bonneVersion(name){
	switch (name){
		case 'Un magnum de Cointreau':
			return "img/recompenses/Un_Magnum_De_Cointreau.png"
		case 'Boules de fort gagnantes':
			return "img/recompenses/Boules_De_Fort_Gagnantes.png"
		case 'L\'oie aux Œufs d\'or':
			return "img/recompenses/L_oie_Aux_Œufs_D_or.png"
		case 'Une médaille du roi René':
			return "img/recompenses/Médaille_Du_Roi_René.png"
		case 'Une soupe angevine à volonté':
			return "img/recompenses/Soupe_Angevine_À_Volonté_.png"
		case 'Les meilleurs bottereaux':
			return "img/recompenses/Les_Meilleurs_Bottereaux_.png"
		case 'Le manuscrit de Joachim du Belay':
			return "img/recompenses/Manuscrit_De_Joachim_Du_Belay_.png"
		case 'Le chateau d \'Angers':
			return "img/recompenses/Château_D_Angers.png"
		case 'Un cheval du Cadre noir':
			return "img/recompenses/Cheval_Du_Cadre_Noir.png"
		case 'Le bateau de Loire Express':
			return "img/recompenses/Bateau_De_Loire_Expres.png"
	}

}

let objet = localStorage.getItem('objetGagner');
let src = bonneVersion(objet);

let img = document.createElement('img');
img.setAttribute('src', src);
img.setAttribute('alt', objet);

recompense_div.appendChild(img);

label_joute.innerHTML = toLowerMdr(objet);