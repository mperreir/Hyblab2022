const candidates = [
    {
        "id": 0,
        "nameId": "hexagon",
        "nom": "M. Hexagone",
        "stepOneGame" : {
            "age": "35 ans",
            "adresse": "Paris",
            "orientationPolitique": "Droite",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "imgParrainages": "img/parrainages_",
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "4 200",
            "montantLettres": "Quatre mille deux cents euros",
            "adresseExpediteur": "Mme. Pierre\nRue Biscarra\nNice",
            "ville": "Nice",
            "date": "28/12/21",
            "valid": true
        }
    },
    {
        "id": 1,
        "nameId": "diamond",
        "nom": "M. Losange",
        "stepOneGame" : {
            "age": "54 ans",
            "adresse": "Angers",
            "orientationPolitique": "Gauche",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "667 000",
            "montantLettres": "Six cent soixante-sept mille euros",
            "adresseExpediteur": "Banque française\nParis",
            "ville": "Nantes",
            "date": "15/01/22",
            "valid": true
        }
    },
    {
        "id": 2,
        "nameId": "rectangle",
        "nom": "M. Pavé",
        "stepOneGame" : {
            "age": "66 ans",
            "adresse": "Paris",
            "orientationPolitique": "Centre-gauche",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "9 300 000",
            "montantLettres": "Neuf millions trois cent mille euros",
            "adresseExpediteur": "Banque française\nParis",
            "ville": "Paris",
            "date": "01/02/22",
            "valid": true
        }
    },
    {
        "id": 3,
        "nameId": "triangle",
        "nom": "Mme. Equilatérale",
        "stepOneGame" : {
            "age": "52 ans",
            "adresse": "Paris",
            "orientationPolitique": "Conservateurs",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "1 760",
            "montantLettres": "Mille sept cent soixante euros",
            "adresseExpediteur": "M. Raymond\nRue Durieux\nLimoges",
            "ville": "Limoges",
            "date": "12/01/22",
            "valid": true
        }
    },
    {
        "id": 4,
        "nameId": "square",
        "nom": "Mme. Carré",
        "stepOneGame" : {
            "age": "31 ans",
            "adresse": "Tours",
            "orientationPolitique": "Extrême-gauche",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "2 814",
            "montantLettres": "Deux mille huit cent quatorze euros",
            "adresseExpediteur": "Mme. Puits\nRue Chantrerie\nBordeaux",
            "ville": "Bordeaux",
            "date": "17/12/21",
            "valid": true
        }
    },
    {
        "id": 5,
        "nameId": "circle",
        "nom": "M. Lerond",
        "stepOneGame" : {
            "age": "47 ans",
            "adresse": "Nice",
            "orientationPolitique": "Centre-gauche",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "200 000",
            "montantLettres": "Deux cent mille euros",
            "adresseExpediteur": "État français\nParis",
            "ville": "Rennes",
            "date": "03/02/22",
            "valid": true
        }
    },
    {
        "id": 6,
        "nameId": "oval",
        "nom": "M. Cylindre",
        "stepOneGame" : {
            "age": "42 ans",
            "adresse": "Nantes",
            "orientationPolitique": "Ecologistes",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "2 700 000",
            "montantLettres": "Deux millions sept cent mille euros",
            "adresseExpediteur": "Banque Européenne\nBruxelles",
            "ville": "Paris",
            "date": "03/02/22",
            "valid": true
        }
    },
    {
        "id": 7,
        "nameId": "semi_circle",
        "nom": "Mme. Amphi",
        "stepOneGame" : {
            "age": "18 ans",
            "adresse": "Rennes",
            "orientationPolitique": "Centre-droite",
            "justice": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "parrainages": 500,
            "valid": true
        },
        "stepThreeGame": {
            "declarations": [],
            "valid": true
        },
        "stepFourGame": {
            "montantChiffres": "200 000",
            "montantLettres": "Deux cent mille euros",
            "adresseExpediteur": "État français\nParis",
            "ville": "Lyon",
            "date": "21/12/21",
            "valid": true
        }
    }
]