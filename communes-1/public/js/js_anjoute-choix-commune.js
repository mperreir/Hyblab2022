'use strict';

var viewport = document.querySelector('meta[name=viewport]');
viewport.setAttribute('content', viewport.content + ', height=' + window.innerHeight);

// Autocomplete
const communes = [
	{name: 'Allonnes'},
	{name: 'Tuffalun'},
	{name: 'Angers'},
	{name: 'Angrie'},
	{name: 'Antoigné'},
	{name: 'Armaillé'},
	{name: 'Artannes-sur-Thouet'},
	{name: 'Aubigné-sur-Layon'},
	{name: 'Avrillé'},
	{name: 'Baracé'},
	{name: 'Baugé-en-Anjou'},
	{name: 'Beaucouzé'},
	{name: 'Beaufort-en-Anjou'},
	{name: 'Beaulieu-sur-Layon'},
	{name: 'Beaupréau-en-Mauges'},
	{name: 'Bécon-les-Granits'},
	{name: 'Bégrolles-en-Mauges'},
	{name: 'Béhuard'},
	{name: 'Blaison-Saint-Sulpice'},
	{name: 'Blou'},
	{name: 'Bouchemaine'},
	{name: 'Bouillé-Ménard'},
	{name: 'Bourg-l\'Evêque'},
	{name: 'Brain-sur-Allonnes'},
	{name: 'La Breille-les-Pins'},
	{name: 'Brézé'},
	{name: 'Briollay'},
	{name: 'Brissac-Loire-Aubance'},
	{name: 'Brossay'},
	{name: 'Candé'},
	{name: 'Cantenay-Epinard'},
	{name: 'Carbay'},
	{name: 'Cernusson'},
	{name: 'Les Cerqueux'},
	{name: 'Chacé'},
	{name: 'Challain-la-Potherie'},
	{name: 'Chalonnes-sur-Loire'},
	{name: 'Chambellay'},
	{name: 'Les Hauts-d\'Anjou'},
	{name: 'Chenillé-Champteussé'},
	{name: 'Champtocé-sur-Loire'},
	{name: 'Orée-d\'Anjou'},
	{name: 'Chanteloup-les-Bois'},
	{name: 'La Chapelle-Saint-Laud'},
	{name: 'Châteauneuf-sur-Sarthe'},
	{name: 'Chaudefonds-sur-Layon'},
	{name: 'Terranjou'},
	{name: 'Chazé-sur-Argos'},
	{name: 'Cheffes'},
	{name: 'Chemillé-en-Anjou'},
	{name: 'Cholet'},
	{name: 'Cizay-la-Madeleine'},
	{name: 'Cléré-sur-Layon'},
	{name: 'Cornillé-les-Caves'},
	{name: 'Coron'},
	{name: 'Corzé'},
	{name: 'Le Coudray-Macouard'},
	{name: 'Courchamps'},
	{name: 'Courléon'},
	{name: 'Denée'},
	{name: 'Dénezé-sous-Doué'},
	{name: 'Distré'},
	{name: 'Doué-en-Anjou'},
	{name: 'Durtal'},
	{name: 'Ecouflant'},
	{name: 'Ecuillé'},
	{name: 'Epieds'},
	{name: 'Etriché'},
	{name: 'Feneu'},
	{name: 'Les Bois-d\'Anjou'},
	{name: 'Fontevraud-l\'Abbaye'},
	{name: 'Freigné'},
	{name: 'Gennes-Val-de-Loire'},
	{name: 'Grez-Neuville'},
	{name: 'Huillé'},
	{name: 'Ingrandes-Le-Fresne-sur-Loire'},
	{name: 'La Jaille-Yvon'},
	{name: 'Jarzé-Villages'},
	{name: 'Les Garennes-sur-Loire'},
	{name: 'Juvardeil'},
	{name: 'La Lande-Chasles'},
	{name: 'Lézigné'},
	{name: 'Le Lion-d\'Angers'},
	{name: 'Loiré'},
	{name: 'Longué-Jumelles'},
	{name: 'Louresse-Rochemenier'},
	{name: 'Val-d\'Erdre-Auxence'},
	{name: 'Marcé'},
	{name: 'Maulévrier'},
	{name: 'Le May-sur-Evre'},
	{name: 'Mazé-Milon'},
	{name: 'Mazières-en-Mauges'},
	{name: 'Longuenée-en-Anjou'},
	{name: 'La Ménitré'},
	{name: 'Miré'},
	{name: 'Montigné-lès-Rairies'},
	{name: 'Montilliers'},
	{name: 'Montreuil-Juigné'},
	{name: 'Montreuil-Bellay'},
	{name: 'Montreuil-sur-Loir'},
	{name: 'Montreuil-sur-Maine'},
	{name: 'Montrevault-sur-Evre'},
	{name: 'Montsoreau'},
	{name: 'Morannes-sur-Sarthe-Daumeray'},
	{name: 'Mouliherne'},
	{name: 'Mozé-sur-Louet'},
	{name: 'Mûrs-Erigné'},
	{name: 'Neuillé'},
	{name: 'Noyant-Villages'},
	{name: 'Nuaillé'},
	{name: 'Parnay'},
	{name: 'Passavant-sur-Layon'},
	{name: 'La Pellerine'},
	{name: 'La Plaine'},
	{name: 'Le Plessis-Grammoire'},
	{name: 'Mauges-sur-Loire'},
	{name: 'Les Ponts-de-Cé'},
	{name: 'La Possonnière'},
	{name: 'Ombrée-d\'Anjou'},
	{name: 'Le Puy-Notre-Dame'},
	{name: 'Les Rairies'},
	{name: 'Rochefort-sur-Loire'},
	{name: 'La Romagne'},
	{name: 'Les Rosiers-sur-Loire'},
	{name: 'Rou-Marson'},
	{name: 'Saint-Augustin-des-Bois'},
	{name: 'Saint-Barthélemy-d\'Anjou'},
	{name: 'Saint-Christophe-du-Bois'},
	{name: 'Saint-Clément-de-la-Place'},
	{name: 'Saint-Clément-des-Levées'},
	{name: 'Saint-Cyr-en-Bourg'},
	{name: 'Sainte-Gemmes-sur-Loire'},
	{name: 'Saint-Georges-sur-Loire'},
	{name: 'Saint-Germain-des-Prés'},
	{name: 'Saint-Jean-de-la-Croix'},
	{name: 'Saint-Jean-de-Linières'},
	{name: 'Saint-Just-sur-Dive'},
	{name: 'Val-du-Layon'},
	{name: 'Saint-Lambert-la-Potherie'},
	{name: 'Saint-Léger-des-Bois'},
	{name: 'Saint-Léger-sous-Cholet'},
	{name: 'Sèvremoine'},
	{name: 'Saint-Macaire-du-Bois'},
	{name: 'Saint-Martin-de-la-Place'},
	{name: 'Saint-Martin-du-Fouilloux'},
	{name: 'Loire-Authion'},
	{name: 'Saint-Melaine-sur-Aubance'},
	{name: 'Saint-Paul-du-Bois'},
	{name: 'Saint-Philbert-du-Peuple'},
	{name: 'Saint-Sigismond'},
	{name: 'Verrière-en-Anjou'},
	{name: 'Sarrigné'},
	{name: 'Saumur'},
	{name: 'Savennières'},
	{name: 'Sceaux-d\'Anjou'},
	{name: 'Segré-en-Anjou-Bleu'},
	{name: 'La Séguinière'},
	{name: 'Seiches-sur-le-Loir'},
	{name: 'Sermaise'},
	{name: 'Somloire'},
	{name: 'Soucelles'},
	{name: 'Soulaines-sur-Aubance'},
	{name: 'Soulaire-et-Bourg'},
	{name: 'Souzay-Champigny'},
	{name: 'La Tessoualle'},
	{name: 'Thorigné-d\'Anjou'},
	{name: 'Bellevigne-en-Layon'},
	{name: 'Tiercé'},
	{name: 'Toutlemonde'},
	{name: 'Trélazé'},
	{name: 'Trémentines'},
	{name: 'Turquant'},
	{name: 'Les Ulmes'},
	{name: 'Varennes-sur-Loire'},
	{name: 'Varrains'},
	{name: 'Vaudelnay'},
	{name: 'Erdre-en-Anjou'},
	{name: 'Vernantes'},
	{name: 'Vernoil-le-Fourrier'},
	{name: 'Verrie'},
	{name: 'Vezins'},
	{name: 'Lys-Haut-Layon'},
	{name: 'Villebernier'},
	{name: 'Villevêque'},
	{name: 'Vivy'},
	{name: 'Yzernay'},
];
  
const searchInput = document.querySelector('.input-communes');
const suggestionsPanel = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', function() {

	const input = searchInput.value;
	suggestionsPanel.innerHTML = '';
	const suggestions = communes.filter(function(commune) {
		return commune.name.startsWith(input);
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
		if (commune.name == searchInput.value) {
			window.location.href = 'anjoute-game-1.html';
		}
	});
});