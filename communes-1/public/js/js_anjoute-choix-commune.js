'use strict';

var viewport = document.querySelector('meta[name=viewport]');
viewport.setAttribute('content', viewport.content + ', height=' + window.innerHeight);
import {generate_enemy} from "./generate_enemy.js";
// Autocomplete
const communes = [
		{
			code: 2,
			name: "Allonnes"
		},
		{
			code: 3,
			name: "Tuffalun"
		},
		{
			code: 7,
			name: "Angers"
		},
		{
			code: 8,
			name: "Angrie"
		},
		{
			code: 9,
			name: "Antoigné"
		},
		{
			code: 10,
			name: "Armaillé"
		},
		{
			code: 11,
			name: "Artannes-sur-Thouet"
		},
		{
			code: 12,
			name: "Aubigné-sur-Layon"
		},
		{
			code: 15,
			name: "Avrillé"
		},
		{
			code: 17,
			name: "Baracé"
		},
		{
			code: 18,
			name: "Baugé-en-Anjou"
		},
		{
			code: 20,
			name: "Beaucouzé"
		},
		{
			code: 21,
			name: "Beaufort-en-Anjou"
		},
		{
			code: 22,
			name: "Beaulieu-sur-Layon"
		},
		{
			code: 23,
			name: "Beaupréau-en-Mauges"
		},
		{
			code: 26,
			name: "Bécon-les-Granits"
		},
		{
			code: 27,
			name: "Bégrolles-en-Mauges"
		},
		{
			code: 28,
			name: "Béhuard"
		},
		{
			code: 29,
			name: "Blaison-Saint-Sulpice"
		},
		{
			code: 30,
			name: "Blou"
		},
		{
			code: 35,
			name: "Bouchemaine"
		},
		{
			code: 36,
			name: "Bouillé-Ménard"
		},
		{
			code: 38,
			name: "Bourg-l'Evêque"
		},
		{
			code: 41,
			name: "Brain-sur-Allonnes"
		},
		{
			code: 45,
			name: "La Breille-les-Pins"
		},
		{
			code: 46,
			name: "Brézé"
		},
		{
			code: 48,
			name: "Briollay"
		},
		{
			code: 50,
			name: "Brissac-Loire-Aubance"
		},
		{
			code: 53,
			name: "Brossay"
		},
		{
			code: 54,
			name: "Candé"
		},
		{
			code: 55,
			name: "Cantenay-Epinard"
		},
		{
			code: 56,
			name: "Carbay"
		},
		{
			code: 57,
			name: "Cernusson"
		},
		{
			code: 58,
			name: "Les Cerqueux"
		},
		{
			code: 60,
			name: "Chacé"
		},
		{
			code: 61,
			name: "Challain-la-Potherie"
		},
		{
			code: 63,
			name: "Chalonnes-sur-Loire"
		},
		{
			code: 64,
			name: "Chambellay"
		},
		{
			code: 65,
			name: "Les Hauts-d'Anjou"
		},
		{
			code: 67,
			name: "Chenillé-Champteussé"
		},
		{
			code: 68,
			name: "Champtocé-sur-Loire"
		},
		{
			code: 69,
			name: "Orée-d'Anjou"
		},
		{
			code: 70,
			name: "Chanteloup-les-Bois"
		},
		{
			code: 76,
			name: "La Chapelle-Saint-Laud"
		},
		{
			code: 80,
			name: "Châteauneuf-sur-Sarthe"
		},
		{
			code: 82,
			name: "Chaudefonds-sur-Layon"
		},
		{
			code: 86,
			name: "Terranjou"
		},
		{
			code: 89,
			name: "Chazé-sur-Argos"
		},
		{
			code: 90,
			name: "Cheffes"
		},
		{
			code: 92,
			name: "Chemillé-en-Anjou"
		},
		{
			code: 99,
			name: "Cholet"
		},
		{
			code: 100,
			name: "Cizay-la-Madeleine"
		},
		{
			code: 102,
			name: "Cléré-sur-Layon"
		},
		{
			code: 107,
			name: "Cornillé-les-Caves"
		},
		{
			code: 109,
			name: "Coron"
		},
		{
			code: 110,
			name: "Corzé"
		},
		{
			code: 112,
			name: "Le Coudray-Macouard"
		},
		{
			code: 113,
			name: "Courchamps"
		},
		{
			code: 114,
			name: "Courléon"
		},
		{
			code: 120,
			name: "Denée"
		},
		{
			code: 121,
			name: "Dénezé-sous-Doué"
		},
		{
			code: 123,
			name: "Distré"
		},
		{
			code: 125,
			name: "Doué-en-Anjou"
		},
		{
			code: 127,
			name: "Durtal"
		},
		{
			code: 129,
			name: "Ecouflant"
		},
		{
			code: 130,
			name: "Ecuillé"
		},
		{
			code: 131,
			name: "Epieds"
		},
		{
			code: 132,
			name: "Etriché"
		},
		{
			code: 135,
			name: "Feneu"
		},
		{
			code: 138,
			name: "Les Bois-d'Anjou"
		},
		{
			code: 140,
			name: "Fontevraud-l'Abbaye"
		},
		{
			code: 144,
			name: "Freigné"
		},
		{
			code: 149,
			name: "Gennes-Val-de-Loire"
		},
		{
			code: 155,
			name: "Grez-Neuville"
		},
		{
			code: 159,
			name: "Huillé"
		},
		{
			code: 160,
			name: "Ingrandes-Le-Fresne-sur-Loire"
		},
		{
			code: 161,
			name: "La Jaille-Yvon"
		},
		{
			code: 163,
			name: "Jarzé-Villages"
		},
		{
			code: 167,
			name: "Les Garennes-sur-Loire"
		},
		{
			code: 170,
			name: "Juvardeil"
		},
		{
			code: 171,
			name: "La Lande-Chasles"
		},
		{
			code: 174,
			name: "Lézigné"
		},
		{
			code: 176,
			name: "Le Lion-d'Angers"
		},
		{
			code: 178,
			name: "Loiré"
		},
		{
			code: 180,
			name: "Longué-Jumelles"
		},
		{
			code: 182,
			name: "Louresse-Rochemenier"
		},
		{
			code: 183,
			name: "Val-d'Erdre-Auxence"
		},
		{
			code: 188,
			name: "Marcé"
		},
		{
			code: 192,
			name: "Maulévrier"
		},
		{
			code: 193,
			name: "Le May-sur-Evre"
		},
		{
			code: 194,
			name: "Mazé-Milon"
		},
		{
			code: 195,
			name: "Mazières-en-Mauges"
		},
		{
			code: 200,
			name: "Longuenée-en-Anjou"
		},
		{
			code: 201,
			name: "La Ménitré"
		},
		{
			code: 205,
			name: "Miré"
		},
		{
			code: 209,
			name: "Montigné-lès-Rairies"
		},
		{
			code: 211,
			name: "Montilliers"
		},
		{
			code: 214,
			name: "Montreuil-Juigné"
		},
		{
			code: 215,
			name: "Montreuil-Bellay"
		},
		{
			code: 216,
			name: "Montreuil-sur-Loir"
		},
		{
			code: 217,
			name: "Montreuil-sur-Maine"
		},
		{
			code: 218,
			name: "Montrevault-sur-Evre"
		},
		{
			code: 219,
			name: "Montsoreau"
		},
		{
			code: 220,
			name: "Morannes-sur-Sarthe-Daumeray"
		},
		{
			code: 221,
			name: "Mouliherne"
		},
		{
			code: 222,
			name: "Mozé-sur-Louet"
		},
		{
			code: 223,
			name: "Mûrs-Erigné"
		},
		{
			code: 224,
			name: "Neuillé"
		},
		{
			code: 228,
			name: "Noyant-Villages"
		},
		{
			code: 231,
			name: "Nuaillé"
		},
		{
			code: 235,
			name: "Parnay"
		},
		{
			code: 236,
			name: "Passavant-sur-Layon"
		},
		{
			code: 237,
			name: "La Pellerine"
		},
		{
			code: 240,
			name: "La Plaine"
		},
		{
			code: 241,
			name: "Le Plessis-Grammoire"
		},
		{
			code: 244,
			name: "Mauges-sur-Loire"
		},
		{
			code: 246,
			name: "Les Ponts-de-Cé"
		},
		{
			code: 247,
			name: "La Possonnière"
		},
		{
			code: 248,
			name: "Ombrée-d'Anjou"
		},
		{
			code: 253,
			name: "Le Puy-Notre-Dame"
		},
		{
			code: 257,
			name: "Les Rairies"
		},
		{
			code: 259,
			name: "Rochefort-sur-Loire"
		},
		{
			code: 260,
			name: "La Romagne"
		},
		{
			code: 261,
			name: "Les Rosiers-sur-Loire"
		},
		{
			code: 262,
			name: "Rou-Marson"
		},
		{
			code: 266,
			name: "Saint-Augustin-des-Bois"
		},
		{
			code: 267,
			name: "Saint-Barthélemy-d'Anjou"
		},
		{
			code: 269,
			name: "Saint-Christophe-du-Bois"
		},
		{
			code: 271,
			name: "Saint-Clément-de-la-Place"
		},
		{
			code: 272,
			name: "Saint-Clément-des-Levées"
		},
		{
			code: 274,
			name: "Saint-Cyr-en-Bourg"
		},
		{
			code: 278,
			name: "Sainte-Gemmes-sur-Loire"
		},
		{
			code: 283,
			name: "Saint-Georges-sur-Loire"
		},
		{
			code: 284,
			name: "Saint-Germain-des-Prés"
		},
		{
			code: 288,
			name: "Saint-Jean-de-la-Croix"
		},
		{
			code: 289,
			name: "Saint-Jean-de-Linières"
		},
		{
			code: 291,
			name: "Saint-Just-sur-Dive"
		},
		{
			code: 292,
			name: "Val-du-Layon"
		},
		{
			code: 294,
			name: "Saint-Lambert-la-Potherie"
		},
		{
			code: 298,
			name: "Saint-Léger-des-Bois"
		},
		{
			code: 299,
			name: "Saint-Léger-sous-Cholet"
		},
		{
			code: 301,
			name: "Sèvremoine"
		},
		{
			code: 302,
			name: "Saint-Macaire-du-Bois"
		},
		{
			code: 304,
			name: "Saint-Martin-de-la-Place"
		},
		{
			code: 306,
			name: "Saint-Martin-du-Fouilloux"
		},
		{
			code: 307,
			name: "Loire-Authion"
		},
		{
			code: 308,
			name: "Saint-Melaine-sur-Aubance"
		},
		{
			code: 310,
			name: "Saint-Paul-du-Bois"
		},
		{
			code: 311,
			name: "Saint-Philbert-du-Peuple"
		},
		{
			code: 321,
			name: "Saint-Sigismond"
		},
		{
			code: 323,
			name: "Verrière-en-Anjou"
		},
		{
			code: 326,
			name: "Sarrigné"
		},
		{
			code: 328,
			name: "Saumur"
		},
		{
			code: 329,
			name: "Savennières"
		},
		{
			code: 330,
			name: "Sceaux-d'Anjou"
		},
		{
			code: 331,
			name: "Segré-en-Anjou-Bleu"
		},
		{
			code: 332,
			name: "La Séguinière"
		},
		{
			code: 333,
			name: "Seiches-sur-le-Loir"
		},
		{
			code: 334,
			name: "Sermaise"
		},
		{
			code: 336,
			name: "Somloire"
		},
		{
			code: 337,
			name: "Soucelles"
		},
		{
			code: 338,
			name: "Soulaines-sur-Aubance"
		},
		{
			code: 339,
			name: "Soulaire-et-Bourg"
		},
		{
			code: 341,
			name: "Souzay-Champigny"
		},
		{
			code: 343,
			name: "La Tessoualle"
		},
		{
			code: 344,
			name: "Thorigné-d'Anjou"
		},
		{
			code: 345,
			name: "Bellevigne-en-Layon"
		},
		{
			code: 347,
			name: "Tiercé"
		},
		{
			code: 352,
			name: "Toutlemonde"
		},
		{
			code: 353,
			name: "Trélazé"
		},
		{
			code: 355,
			name: "Trémentines"
		},
		{
			code: 358,
			name: "Turquant"
		},
		{
			code: 359,
			name: "Les Ulmes"
		},
		{
			code: 361,
			name: "Varennes-sur-Loire"
		},
		{
			code: 362,
			name: "Varrains"
		},
		{
			code: 364,
			name: "Vaudelnay"
		},
		{
			code: 367,
			name: "Erdre-en-Anjou"
		},
		{
			code: 368,
			name: "Vernantes"
		},
		{
			code: 369,
			name: "Vernoil-le-Fourrier"
		},
		{
			code: 370,
			name: "Verrie"
		},
		{
			code: 371,
			name: "Vezins"
		},
		{
			code: 373,
			name: "Lys-Haut-Layon"
		},
		{
			code: 374,
			name: "Villebernier"
		},
		{
			code: 377,
			name: "Villevêque"
		},
		{
			code: 378,
			name: "Vivy"
		},
		{
			code: 381,
			name: "Yzernay"
		}
];
  
const searchInput = document.querySelector('.input-communes');
const suggestionsPanel = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', function() {

	const input = searchInput.value;
	suggestionsPanel.innerHTML = '';

	const suggestions = communes.filter(function(commune) {
		console.log(commune)
		return commune.name.toLowerCase().startsWith(input.toLowerCase());
	});

	suggestions.forEach(function(suggested) {
		const div = document.createElement('div');
		div.innerHTML = suggested.name;

		div.addEventListener('click', () => {
			searchInput.value = suggested.name;
			suggestionsPanel.innerHTML = '';
		});

		suggestionsPanel.appendChild(div);
	});

	if (input === '') {
		suggestionsPanel.innerHTML = '';  
	}
});

// Bouton c'est parti
const cestparti = document.querySelector('.goToGame');

cestparti.addEventListener('click', () => {
	communes.forEach(commune => {
		if (commune.name === searchInput.value) {
			localStorage.setItem("commune_name",commune.name);
			localStorage.setItem("commune_code",commune.code);
			const temp = generate_enemy(commune.code.toString());
			console.log(temp);
			localStorage.setItem("enemies",JSON.stringify(temp));
			localStorage.setItem("question",1);
			window.location.href = 'anjoute-game-1.html';
		}
	});
});