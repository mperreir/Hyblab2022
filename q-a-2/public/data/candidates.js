const candidates = [
    {
        "id": 0,
        "nameId": "hexagon",
        "name": "M. Hexagone",
        "baseY": "99",
        "baseWidth": "75",
        "color": "#3154FF",
        "head_img": "head_hexagone.svg",
        "stepOneGame" : {
            "age": "35 ans",
            "address": "Paris",
            "politicalOrientation": "Droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale":"scale(0.8)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Compte courant",
                    "valid": true
                },
                "1": {
                    "statement": "Compte bancaire en Espagne",
                    "valid": true
                },
                "2": {
                    "statement": "Maison de vacances en Suisse",
                    "valid": true
                },
                "3": {
                    "statement": "Assurance vie",
                    "valid": true
                }
            },
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
        "color": "#FF6700",
        "head_img": "head_losange.svg",
        "stepOneGame" : {
            "age": "54 ans",
            "address": "Angers",
            "politicalOrientation": "Gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(1)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Actions dans une entreprise française",
                    "valid": true
                },
                "1": {
                    "statement": "Compte bancaire courant",
                    "valid": true
                },
                "2": {
                    "statement": "Résidence principale",
                    "valid": true
                },
                "3": {
                    "statement": "Trois voitures",
                    "valid": true
                }
            },
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
        "color": "#FFABE5",
        "head_img": "head_rec.svg",
        "stepOneGame" : {
            "age": "66 ans",
            "address": "Paris",
            "politicalOrientation": "Centre-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(1)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Assurance vie",
                    "valid": true
                },
                "1": {
                    "statement": "Dettes",
                    "valid": true
                },
                "2": {
                    "statement": "Appartement à Paris",
                    "valid": true
                },
                "3": {
                    "statement": "Voiture de luxe",
                    "valid": true
                }
            },
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
        "name": "Mme. Triangle",
        "baseY": "110",
        "baseWidth": "66",
        "color": "#7352FF",
        "head_img": "head_equilateral.svg",
        "stepOneGame" : {
            "age": "52 ans",
            "address": "Paris",
            "politicalOrientation": "Extrême-droite",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(0.8)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Château dans la Somme",
                    "valid": true
                },
                "1": {
                    "statement": "Compte bancaire courant",
                    "valid": true
                },
                "2": {
                    "statement": "Appartement aux Etats-Unis",
                    "valid": true
                },
                "3": {
                    "statement": "Actions dans une entreprise française",
                    "valid": true
                }
            },
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
        "color": "#FF2E3F",
        "head_img": "head_carre.svg",
        "stepOneGame" : {
            "age": "31 ans",
            "address": "Tours",
            "politicalOrientation": "Extrême-gauche",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(1)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Bâteau motorisé",
                    "valid": true
                },
                "1": {
                    "statement": "Maison à Marseille",
                    "valid": true
                },
                "2": {
                    "statement": "Assurance vie",
                    "valid": true
                },
                "3": {
                    "statement": "Actions dans une entreprise allemande",
                    "valid": true
                }
            },
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
        "color": "#FFEE1A",
        "head_img": "head_rond.svg",
        "stepOneGame" : {
            "age": "47 ans",
            "address": "Nice",
            "politicalOrientation": "Centre",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(0.9)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Maison en Bretagne",
                    "valid": true
                },
                "1": {
                    "statement": "Compte bancaire en Belgique",
                    "valid": true
                },
                "2": {
                    "statement": "Compte bancaire (Livret A)",
                    "valid": true
                },
                "3": {
                    "statement": "Maison en Finlande",
                    "valid": true
                }
            },
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
        "color": "#89F798",
        "head_img": "head_cylindre.svg",
        "stepOneGame" : {
            "age": "42 ans",
            "address": "Nantes",
            "politicalOrientation": "Ecologistes",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(1)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Assurance vie",
                    "valid": true
                },
                "1": {
                    "statement": "Voiture de luxe",
                    "valid": true
                },
                "2": {
                    "statement": "Maison à Amiens",
                    "valid": true
                },
                "3": {
                    "statement": "Appartement à Berlin",
                    "valid": true
                }
            },
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
        "color": "#76C8FF",
        "head_img": "head_amphi.svg",
        "stepOneGame" : {
            "age": "18 ans",
            "address": "Rennes",
            "politicalOrientation": "Centre-droit",
            "legalStatus": "Casier vierge",
            "valid": true
        },
        "stepTwoGame" : {
            "valid": true,
            "scale": "scale(0.8)",
        },
        "stepThreeGame": {
            "statements": {
                "0": {
                    "statement": "Compte bancaire (Livret A)",
                    "valid": true
                },
                "1": {
                    "statement": "Maison de vacances en Italie",
                    "valid": true
                },
                "2": {
                    "statement": "Hélicoptère",
                    "valid": true
                },
                "3": {
                    "statement": "Actions dans une entreprise suédoise",
                    "valid": true
                }
            },
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