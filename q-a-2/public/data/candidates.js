const candidates = [
    {
        "id": 0,
        "nameId": "hexagon",
        "name": "M. Hexagone",
        "baseY": "99",
        "baseWidth": "75",
        "stepOneGame" : {
            "age": "35 ans",
            "address": "Paris",
            "politicalOrientation": "Droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 205,
            "y": 50,
            "fontsize": "200%",
            "rotate": "rotate(23)",
            "scale": "scale(1)"
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
        "name": "M. Losange",
        "baseY": "114",
        "baseWidth": "55",
        "stepOneGame" : {
            "age": "54 ans",
            "address": "Angers",
            "politicalOrientation": "Gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 160,
            "y": -20,
            "fontsize": "160%",
            "rotate": "rotate(30)",
            "scale": "scale(1.2)"
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
        "name": "M. Pavé",
        "baseY": "101",
        "baseWidth": "69",
        "stepOneGame" : {
            "age": "66 ans",
            "address": "Paris",
            "politicalOrientation": "Centre-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 10,
            "y": 79,
            "fontsize": "200%",
            "rotate": "rotate(-23)",
            "scale": "scale(0.85)"
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
        "name": "Mme. Equilatérale",
        "baseY": "110",
        "baseWidth": "66",
        "stepOneGame" : {
            "age": "52 ans",
            "address": "Paris",
            "politicalOrientation": "Conservateurs",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 145,
            "y": 130,
            "fontsize": "200%",
            "rotate": "rotate(15)",
            "scale": "scale(0.95)"
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
        "name": "Mme. Carré",
        "baseY": "103",
        "baseWidth": "80",
        "stepOneGame" : {
            "age": "31 ans",
            "address": "Tours",
            "politicalOrientation": "Extrême-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 130,
            "y": 130,
            "fontsize": "200%",
            "rotate": "rotate(-5)",
            "scale": "scale(0.8)"
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
        "name": "M. Lerond",
        "baseY": "115",
        "baseWidth": "64",
        "stepOneGame" : {
            "age": "47 ans",
            "address": "Nice",
            "politicalOrientation": "Centre-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 120,
            "y": 180,
            "fontsize": "230%",
            "rotate": "rotate(15)",
            "scale": "scale(0.7)"
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
        "name": "M. Cylindre",
        "baseY": "133",
        "baseWidth": "61",
        "stepOneGame" : {
            "age": "42 ans",
            "address": "Nantes",
            "politicalOrientation": "Ecologistes",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 145,
            "y": 220,
            "fontsize": "180%",
            "rotate": "rotate(23)",
            "scale": "scale(0.8)"
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
        "name": "Mme. Amphi",
        "baseY": "98",
        "baseWidth": "90",
        "stepOneGame" : {
            "age": "18 ans",
            "address": "Rennes",
            "politicalOrientation": "Centre-droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "signatures": 500,
            "valid": true,
            "x": 17,
            "y": 90,
            "fontsize": "200%",
            "rotate": "rotate(-5)",
            "scale": "scale(1)"
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