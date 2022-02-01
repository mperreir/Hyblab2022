let dataset_obj = require('./abstention_dataset.json');

//Partie 3 : Ecole
//création de la colonne de la profession majoritaire
let categories = ["ETRANGERS","AGRIC_2017","ART_COM_CHEF_2017","CADRES_INTELLECT_2017","PROF_INTERM_2017","EMPLOYES_2017","OUVRIERS_2017","RETRAITES_2017","SANS_ACTIV_2017"];
dataset_obj.forEach(function(town){
	let nb_by_category = [];
	categories.forEach(function(category){
		nb_by_category.push(town[category]);
	})
	const max = Math.max.apply(null, nb_by_category);
	const index = nb_by_category.indexOf(max);
	town["PROFESSION_MAJORITAIRE"] = categories[index];
})

//taux d'abstention des villes en fonction de la catégorie socio-pro la plus présente (le coefficient de correlation nous permet d'etendre et de valider pour toutes les professions)
let abstention_by_category = {"ETRANGERS":null,"PROF_INTERM_2017":null,"EMPLOYES_2017":null,"OUVRIERS_2017":null,"RETRAITES_2017":null,"SANS_ACTIV_2017":null};
Object.keys(abstention_by_category).forEach(function(category){
	let nb_abs_t1_by_category = 0;
	let nb_adults_by_category = 0;
	dataset_obj.forEach(function(town){
		if (category == town["PROFESSION_MAJORITAIRE"]){
			nb_abs_t1_by_category += town["ABSTENTIONS_PRESID_T1_2017"];
			nb_adults_by_category += town["ADULTES"];
		}
	})
	let tx_abs_t1_by_category = nb_abs_t1_by_category/nb_adults_by_category;
	abstention_by_category[category] = tx_abs_t1_by_category;
})

//création de la colonne des adultes pouvant voter
dataset_obj.forEach(function(town){
	let nb_adults = 0;
	nb_adults += town["18_24_ANS_2017"];
	nb_adults += town["25_39_ANS_2017"];
	nb_adults += town["40_54_ANS_2017"];
	nb_adults += town["55_64_ANS_2017"];
	nb_adults += town["65_79_ANS_2017"];
	nb_adults += town["80_ANS_ETPLUS_2017"];
	town["ADULTES"] = nb_adults;
})

//création de la colonne du taux d'abstention
dataset_obj.forEach(function(town){
	let nb_abstention = town["ABSTENTIONS_PRESID_T1_2017"];
	let nb_adults = town["ADULTES"];
	let tx_abstention = nb_abstention/nb_adults;
	town["TAUX_ABSTENTION"] = tx_abstention;
})

//données nationales sur le taux d'abstention des catégories socio-pro pour montrer la nuance


//Partie 4 : Fête forraine
//Proportion de jeunes de moins de 18 ans à Bordeaux qui ne peuvent pas voter

//création de la colonne des jeunes ne pouvant pas voter
dataset_obj.forEach(function(town){
	let nb_youngs = town["MOINS_DE_11_ANS_2017"];
	nb_youngs += town["11_17_ANS_2017"];
	town["JEUNES"] = nb_youngs;
})

//proportion des jeunes ne pouvant pas voter
let nb_youngs = 0;
let nb_people = 0;
dataset_obj.forEach(function(town){
	nb_youngs += town["JEUNES"];
	nb_people += town["POP_TOTALE_2017"];
})
let youngs_prop = nb_youngs/nb_people;

//proportion d'étrangers ne pouvant pas voter
let nb_strangers = 0;
let nb_people_2 = 0;
dataset_obj.forEach(function(town){
	nb_strangers += town["ETRANGERS"];
	nb_people_2 += town["POP_TOTALE_2017"];
})
let strangers_prop = nb_strangers/nb_people_2;


//Partie 5 : Camion déménagement
//Proportion du nombre de personnes non inscrites sur les listes à Bordeaux si on peut l'avoir

//taux d'adultes non inscrits sur les listes
let nb_registered = 0;
let nb_adults = 0;
dataset_obj.forEach(function(town){
	nb_registered += town["INSCRITS_PRESID_T1_2017"];
	nb_adults += town["ADULTES"];
})
let tx_adults_unregistered = (nb_adults-nb_registered)/nb_adults;


//Partie 6 : Mairie
//Nombre de villes dans l'aire urbaine de Bordeaux où l'abstention est supérieure au Tour 2 par rapport au Tour 1 (cf page "Etude tour élections" dans doc données)

//création de la colonne du tour d'abstention majoritaire (leger biais)
dataset_obj.forEach(function(town){
	nb_abstention_t1 = town["ABSTENTIONS_PRESID_T1_2017"];
	nb_abstention_t2 = town["ABSTENTIONS_PRESID_T2_2017"];
	if (nb_abstention_t1 > nb_abstention_t2){
		town["TOUR_ABSTENTIONS_MAJORITAIRE"] = "ABSTENTIONS_PRESID_T1_2017";
	} else {
		town["TOUR_ABSTENTIONS_MAJORITAIRE"] = "ABSTENTIONS_PRESID_T2_2017";
	}
})

//nombre de villes où l'abstention est supérieure au tour 2 par rapport au tour 1
let nb_towns_abs_sup_t2 = 0;
dataset_obj.forEach(function(town){
	most_abstention_tour = town["TOUR_ABSTENTIONS_MAJORITAIRE"];
	if (most_abstention_tour == "ABSTENTIONS_PRESID_T2_2017"){
		nb_towns_abs_sup_t2 += 1;
	}
})

//Idem avec les votes blancs et nuls

//création de la colonne du tour de votes blancs majoritaire (leger biais)
dataset_obj.forEach(function(town){
	nb_blank_t1 = town["BLANCS_PRESID_T1_2017"];
	nb_blank_t2 = town["BLANCS_PRESID_T2_2017"];
	if (nb_blank_t1 > nb_blank_t2){
		town["TOUR_BLANCS_MAJORITAIRE"] = "BLANCS_PRESID_T1_2017";
	} else {
		town["TOUR_BLANCS_MAJORITAIRE"] = "BLANCS_PRESID_T2_2017";
	}
})

//nombre de villes où le vote blanc est supérieur au tour 2 par rapport au tour 1
let nb_towns_blank_sup_t2 = 0;
dataset_obj.forEach(function(town){
	most_blank_tour = town["TOUR_BLANCS_MAJORITAIRE"];
	if (most_blank_tour == "BLANCS_PRESID_T2_2017"){
		nb_towns_blank_sup_t2 += 1;
	}
})

//création de la colonne du tour de votes nuls majoritaire (leger biais)
dataset_obj.forEach(function(town){
	nb_null_t1 = town["NULS_PRESID_T1_2017"];
	nb_null_t2 = town["NULS_PRESID_T2_2017"];
	if (nb_null_t1 > nb_null_t2){
		town["TOUR_NULS_MAJORITAIRE"] = "NULS_PRESID_T1_2017";
	} else {
		town["TOUR_NULS_MAJORITAIRE"] = "NULS_PRESID_T2_2017";
	}
})

//nombre de villes où le vote nul est supérieur au tour 2 par rapport au tour 1
let nb_towns_null_sup_t2 = 0;
dataset_obj.forEach(function(town){
	most_null_tour = town["TOUR_NULS_MAJORITAIRE"];
	if (most_null_tour == "NULS_PRESID_T2_2017"){
		nb_towns_null_sup_t2 += 1;
	}
})


//Partie 7 : Théatre
//création de la colonne de la age majoritaire
let age_ranges = ["MOINS_DE_11_ANS_2017","11_17_ANS_2017","18_24_ANS_2017","25_39_ANS_2017","40_54_ANS_2017","55_64_ANS_2017","65_79_ANS_2017","80_ANS_ETPLUS_2017"];
dataset_obj.forEach(function(town){
	let nb_by_age_range = [];
	age_ranges.forEach(function(age_range){
		nb_by_age_range.push(town[age_range]);
	})
	const max = Math.max.apply(null, nb_by_age_range);
	const index = nb_by_age_range.indexOf(max);
	town["AGE_MAJORITAIRE"] = age_ranges[index];
})

//taux d'abstention des villes en fonction de la tranche d'age la plus présente (le coefficient de correlation nous permet d'etendre et de valider pour toutes les tranches d'ages)
let abstention_by_age_range = {"18_24_ANS_2017":null,"25_39_ANS_2017":null,"40_54_ANS_2017":null,"55_64_ANS_2017":null,"65_79_ANS_2017":null};
Object.keys(abstention_by_age_range).forEach(function(age_range){
	let nb_abs_t1_by_age_range = 0;
	let nb_adults_by_age_range = 0;
	dataset_obj.forEach(function(town){
		if (age_range == town["AGE_MAJORITAIRE"]){
			nb_abs_t1_by_age_range += town["ABSTENTIONS_PRESID_T1_2017"];
			nb_adults_by_age_range += town["ADULTES"];
		}
	})
	let tx_abs_t1_by_age_range = nb_abs_t1_by_age_range/nb_adults_by_age_range;
	abstention_by_age_range[age_range] = tx_abs_t1_by_age_range;
})

//Données nationales pour nuancer

/*Affichage
console.log(dataset_obj[0]);
console.log(dataset_obj[1]);

//pourcentage des jeunes
console.log(youngs_prop);
//pourcentage des etrangers
console.log(strangers_prop);
//pourcentage des autres
console.log(1-youngs_prop-strangers_prop);
*/