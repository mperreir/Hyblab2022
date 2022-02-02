let dataVoisins;
async function fetchData() {
	let response = await fetch("api/dataVoisins");
	let d =  await response.json();
	return d;
}
dataVoisins = await fetchData();
dataVoisins = dataVoisins.data_voisins
const data_voisins = new Map(Object.entries(dataVoisins));
const list_communes = {
	"2": "Allonnes",
	"3": "Tuffalun",
	"7": "Angers",
	"8": "Angrie",
	"9": "Antoigné",
	"10": "Armaillé",
	"11": "Artannes-sur-Thouet",
	"12": "Aubigné-sur-Layon",
	"15": "Avrillé",
	"17": "Baracé",
	"18": "Baugé-en-Anjou",
	"20": "Beaucouzé",
	"21": "Beaufort-en-Anjou",
	"22": "Beaulieu-sur-Layon",
	"23": "Beaupréau-en-Mauges",
	"26": "Bécon-les-Granits",
	"27": "Bégrolles-en-Mauges",
	"28": "Béhuard",
	"29": "Blaison-Saint-Sulpice",
	"30": "Blou",
	"35": "Bouchemaine",
	"36": "Bouillé-Ménard",
	"38": "Bourg-l'Evêque",
	"41": "Brain-sur-Allonnes",
	"45": "La Breille-les-Pins",
	"46": "Brézé",
	"48": "Briollay",
	"50": "Brissac-Loire-Aubance",
	"53": "Brossay",
	"54": "Candé",
	"55": "Cantenay-Epinard",
	"56": "Carbay",
	"57": "Cernusson",
	"58": "Les Cerqueux",
	"60": "Chacé",
	"61": "Challain-la-Potherie",
	"63": "Chalonnes-sur-Loire",
	"64": "Chambellay",
	"65": "Les Hauts-d'Anjou",
	"67": "Chenillé-Champteussé",
	"68": "Champtocé-sur-Loire",
	"69": "Orée-d'Anjou",
	"70": "Chanteloup-les-Bois",
	"76": "La Chapelle-Saint-Laud",
	"80": "Châteauneuf-sur-Sarthe",
	"82": "Chaudefonds-sur-Layon",
	"86": "Terranjou",
	"89": "Chazé-sur-Argos",
	"90": "Cheffes",
	"92": "Chemillé-en-Anjou",
	"99": "Cholet",
	"100": "Cizay-la-Madeleine",
	"102": "Cléré-sur-Layon",
	"107": "Cornillé-les-Caves",
	"109": "Coron",
	"110": "Corzé",
	"112": "Le Coudray-Macouard",
	"113": "Courchamps",
	"114": "Courléon",
	"120": "Denée",
	"121": "Dénezé-sous-Doué",
	"123": "Distré",
	"125": "Doué-en-Anjou",
	"127": "Durtal",
	"129": "Ecouflant",
	"130": "Ecuillé",
	"131": "Epieds",
	"132": "Etriché",
	"135": "Feneu",
	"138": "Les Bois-d'Anjou",
	"140": "Fontevraud-l'Abbaye",
	"144": "Freigné",
	"149": "Gennes-Val-de-Loire",
	"155": "Grez-Neuville",
	"159": "Huillé",
	"160": "Ingrandes-Le-Fresne-sur-Loire",
	"161": "La Jaille-Yvon",
	"163": "Jarzé-Villages",
	"167": "Les Garennes-sur-Loire",
	"170": "Juvardeil",
	"171": "La Lande-Chasles",
	"174": "Lézigné",
	"176": "Le Lion-d'Angers",
	"178": "Loiré",
	"180": "Longué-Jumelles",
	"182": "Louresse-Rochemenier",
	"183": "Val-d'Erdre-Auxence",
	"188": "Marcé",
	"192": "Maulévrier",
	"193": "Le May-sur-Evre",
	"194": "Mazé-Milon",
	"195": "Mazières-en-Mauges",
	"200": "Longuenée-en-Anjou",
	"201": "La Ménitré",
	"205": "Miré",
	"209": "Montigné-lès-Rairies",
	"211": "Montilliers",
	"214": "Montreuil-Juigné",
	"215": "Montreuil-Bellay",
	"216": "Montreuil-sur-Loir",
	"217": "Montreuil-sur-Maine",
	"218": "Montrevault-sur-Evre",
	"219": "Montsoreau",
	"220": "Morannes-sur-Sarthe-Daumeray",
	"221": "Mouliherne",
	"222": "Mozé-sur-Louet",
	"223": "Mûrs-Erigné",
	"224": "Neuillé",
	"228": "Noyant-Villages",
	"231": "Nuaillé",
	"235": "Parnay",
	"236": "Passavant-sur-Layon",
	"237": "La Pellerine",
	"240": "La Plaine",
	"241": "Le Plessis-Grammoire",
	"244": "Mauges-sur-Loire",
	"246": "Les Ponts-de-Cé",
	"247": "La Possonnière",
	"248": "Ombrée-d'Anjou",
	"253": "Le Puy-Notre-Dame",
	"257": "Les Rairies",
	"259": "Rochefort-sur-Loire",
	"260": "La Romagne",
	"261": "Les Rosiers-sur-Loire",
	"262": "Rou-Marson",
	"266": "Saint-Augustin-des-Bois",
	"267": "Saint-Barthélemy-d'Anjou",
	"269": "Saint-Christophe-du-Bois",
	"271": "Saint-Clément-de-la-Place",
	"272": "Saint-Clément-des-Levées",
	"274": "Saint-Cyr-en-Bourg",
	"278": "Sainte-Gemmes-sur-Loire",
	"283": "Saint-Georges-sur-Loire",
	"284": "Saint-Germain-des-Prés",
	"288": "Saint-Jean-de-la-Croix",
	"289": "Saint-Jean-de-Linières",
	"291": "Saint-Just-sur-Dive",
	"292": "Val-du-Layon",
	"294": "Saint-Lambert-la-Potherie",
	"298": "Saint-Léger-des-Bois",
	"299": "Saint-Léger-sous-Cholet",
	"301": "Sèvremoine",
	"302": "Saint-Macaire-du-Bois",
	"304": "Saint-Martin-de-la-Place",
	"306": "Saint-Martin-du-Fouilloux",
	"307": "Loire-Authion",
	"308": "Saint-Melaine-sur-Aubance",
	"310": "Saint-Paul-du-Bois",
	"311": "Saint-Philbert-du-Peuple",
	"321": "Saint-Sigismond",
	"323": "Verrière-en-Anjou",
	"326": "Sarrigné",
	"328": "Saumur",
	"329": "Savennières",
	"330": "Sceaux-d'Anjou",
	"331": "Segré-en-Anjou-Bleu",
	"332": "La Séguinière",
	"333": "Seiches-sur-le-Loir",
	"334": "Sermaise",
	"336": "Somloire",
	"337": "Soucelles",
	"338": "Soulaines-sur-Aubance",
	"339": "Soulaire-et-Bourg",
	"341": "Souzay-Champigny",
	"343": "La Tessoualle",
	"344": "Thorigné-d'Anjou",
	"345": "Bellevigne-en-Layon",
	"347": "Tiercé",
	"352": "Toutlemonde",
	"353": "Trélazé",
	"355": "Trémentines",
	"358": "Turquant",
	"359": "Les Ulmes",
	"361": "Varennes-sur-Loire",
	"362": "Varrains",
	"364": "Vaudelnay",
	"367": "Erdre-en-Anjou",
	"368": "Vernantes",
	"369": "Vernoil-le-Fourrier",
	"370": "Verrie",
	"371": "Vezins",
	"373": "Lys-Haut-Layon",
	"374": "Villebernier",
	"377": "Villevêque",
	"378": "Vivy",
	"381": "Yzernay"
}


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
	let adversaires = ["7", "99", "328", "331"];
	let voisins = data_voisins.get(code_commune_joueur);
	if (adversaires.includes(code_commune_joueur)) {
		adversaires.splice(adversaires.indexOf(code_commune_joueur), 1);
		if (voisins.length >= 7) {
			for (let i = 0; i < 7; i++) {
				adversaires.push(voisins[i].toString());
			}
		}
	}
	else  {
		if (voisins.length >= 6) {
			for (let i = 0; i < 6; i++) {
				adversaires.push(voisins[i].toString());
			}
		}
		else {
			let nb_villes_manquantes = 6 - voisins.length;
			for (let idx in voisins) {
				adversaires.push(voisins[idx].toString());
			}


			for (let idx_voisin in voisins) {
				let voisinsRangDeux = data_voisins.get(voisins[idx_voisin]);
				for (let idx_voisinDouble in voisinsRangDeux) {
					if (!adversaires.includes(voisinsRangDeux[idx_voisinDouble])) {
						adversaires.push(voisinsRangDeux[idx_voisinDouble].toString());
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
	//TODO mettre le nom de la commune avec le numéro
	adversaires = randomize(adversaires);

	for (let adv in adversaires) {
		adversaires[adv] = [adversaires[adv].toString(), list_communes[adversaires[adv].toString()]]
	}
	return adversaires;
}

export {generate_enemy}

