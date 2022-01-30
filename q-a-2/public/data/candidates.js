const candidates = [
    {
        "id": 0,
        "nameId": "hexagon",
        "baseY": "99",
        "name": "M. Hexagone",
        "stepOneGame" : {
            "age": "35 ans",
            "address": "Paris",
            "politicalOrientation": "Droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "4 200",
            "amountInFull": "Quatre mille deux cents euros",
            "senderAddress": "Mme. Pierre\nRue Biscarra\nNice",
            "city": "Nice",
            "date": "28/12/21",
            "valid": true
        }
    },
    {
        "id": 1,
        "nameId": "diamond",
        "baseY": "114",
        "name": "M. Losange",
        "stepOneGame" : {
            "age": "54 ans",
            "address": "Angers",
            "politicalOrientation": "Gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "667 000",
            "amountInFull": "Six cent soixante-sept mille euros",
            "senderAddress": "Banque française\nParis",
            "city": "Nantes",
            "date": "15/01/22",
            "valid": true
        }
    },
    {
        "id": 2,
        "nameId": "rectangle",
        "baseY": "101",
        "name": "M. Pavé",
        "stepOneGame" : {
            "age": "66 ans",
            "address": "Paris",
            "politicalOrientation": "Centre-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "9 300 000",
            "amountInFull": "Neuf millions trois cent mille euros",
            "senderAddress": "Banque française\nParis",
            "city": "Paris",
            "date": "01/02/22",
            "valid": true
        }
    },
    {
        "id": 3,
        "nameId": "triangle",
        "baseY": "110",
        "name": "Mme. Equilatérale",
        "stepOneGame" : {
            "age": "52 ans",
            "address": "Paris",
            "politicalOrientation": "Conservateurs",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "1 760",
            "amountInFull": "Mille sept cent soixante euros",
            "senderAddress": "M. Raymond\nRue Durieux\nLimoges",
            "city": "Limoges",
            "date": "12/01/22",
            "valid": true
        }
    },
    {
        "id": 4,
        "nameId": "square",
        "baseY": "103",
        "name": "Mme. Carré",
        "stepOneGame" : {
            "age": "31 ans",
            "address": "Tours",
            "politicalOrientation": "Extrême-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "2 814",
            "amountInFull": "Deux mille huit cent quatorze euros",
            "senderAddress": "Mme. Puits\nRue Chantrerie\nBordeaux",
            "city": "Bordeaux",
            "date": "17/12/21",
            "valid": true
        }
    },
    {
        "id": 5,
        "nameId": "circle",
        "baseY": "115",
        "name": "M. Lerond",
        "stepOneGame" : {
            "age": "47 ans",
            "address": "Nice",
            "politicalOrientation": "Centre-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "200 000",
            "amountInFull": "Deux cent mille euros",
            "senderAddress": "État français\nParis",
            "city": "Rennes",
            "date": "03/02/22",
            "valid": true
        }
    },
    {
        "id": 6,
        "nameId": "oval",
        "baseY": "133",
        "name": "M. Cylindre",
        "stepOneGame" : {
            "age": "42 ans",
            "address": "Nantes",
            "politicalOrientation": "Ecologistes",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "2 700 000",
            "amountInFull": "Deux millions sept cent mille euros",
            "senderAddress": "Banque Européenne\nBruxelles",
            "city": "Paris",
            "date": "03/02/22",
            "valid": true
        }
    },
    {
        "id": 7,
        "nameId": "semi_circle",
        "baseY": "98",
        "name": "Mme. Amphi",
        "stepOneGame" : {
            "age": "18 ans",
            "address": "Rennes",
            "politicalOrientation": "Centre-droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true
        },
        "stepThreeGame": {
            "statements": [],
            "valid": true
        },
        "stepFourGame": {
            "amountDigits": "200 000",
            "amountInFull": "Deux cent mille euros",
            "senderAddress": "État français\nParis",
            "city": "Lyon",
            "date": "21/12/21",
            "valid": true
        }
    }
]