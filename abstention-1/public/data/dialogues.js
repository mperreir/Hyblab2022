const dialogues = [
    {
        "Dialogue": 1,
        "Texte": [
            {
                "Personne": "Charlie",
                "Replique": "Direction l’école, mon professeur pourra sûrement nous en apprendre davantage sur l’abstention.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Bonjour M. Martin, je travaille sur l’exposé que vous m’avez donné.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Je voulais donc vous interroger en premier. Avez-vous voté lors des élections de 2017 ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "M. Martin",
                "Replique": "Bonjour Charlie, ravi de te voir, je vois que tu es studieuse. Et bien non je ne suis pas allé voter.",
                "Quiz": 1,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Ok, si je comprends bien, l’abstention est donc un moyen, pour certains, de ne pas suivre un candidat en particulier...",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "...ou de montrer un désaccord vis-à-vis du système électoral actuel.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Merci pour tout, monsieur. Je dois y aller, je reviendrais vous voir en fin de journée.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "M. Martin",
                "Replique": "A plus tard, Charlie, bon courage pour tes autres interviews.",
                "Quiz": 0,
                "PFC": 0
            }
        ]
    },
    {
        "Dialogue": 2,
        "Texte": [
            {
                "Personne": "Charlie",
                "Replique": "Nous voici à la fête foraine, notre première destination.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Voyons si nous pouvons trouver une personne à interroger… J’aperçois quelqu’un.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": " Hey Arthur, comment vas-tu ? On m’a dit que tu n’as pas voté lors des dernières élections présidentielles, c’est vrai ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                "Replique": "Salut Charlie, et bien non, tu as raison je n’ai pas été voté car j’étais trop jeune.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                "Replique": " En France, il faut avoir 18 ans pour exercer ce droit.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Sais tu quelle proportion de jeunes sont dans ton cas à Bordeaux ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                "Replique": "Oui mais je ne te donnerais la réponse que si tu gagnes contre moi au pierre-feuille-ciseaux.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Pari tenu",
                "Quiz": 0,
                "PFC": 1 //Jeu de Pierre Feuille Ciseaux
            },
            {
                "Personne": "Arthur",
                //Données à rajouter dans ce dialogue
                "Replique": "Bien joué. Comme promis, il y a "+(Math.round(youngs_prop*100 * 100) / 100)+"% de jeunes qui ne peuvent pas voter à Bordeaux car ils n’ont pas encore 18 ans.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                //Données à rajouter dans ce dialogue
                "Replique": "D’ailleurs, savais-tu qu’il n’y a pas que les jeunes qui ne peuvent pas voter ? Ma mère qui n’a pas la nationalité française n’a pas le droit non plus.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                //Données à rajouter dans ce dialogue
                "Replique": "Comme elle, l’ensemble des étrangers de Bordeaux soit "+(Math.round(strangers_prop*100 * 100) / 100)+"% de la population ne peuvent pas voter.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Je vois, certaines personnes sont contraintes à l’abstention tout simplement car elles ne sont pas autorisées à voter.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Merci pour ces infos Arthur ! Sur ce, je te laisse, bon skate !",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Arthur",
                "Replique": "Bye !",
                "Quiz": 0,
                "PFC": 0
            }
        ]
    },
    {
        "Dialogue": 3,
        "Texte": [
            {
                "Personne": "Charlie",
                "Replique": "Je vois quelqu’un qui est en plein déménagement. Allons la saluer et voir ce qu’elle peut nous apprendre.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Bonjour madame, bienvenue à Bordeaux !",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Je voudrais vous poser quelques questions sur l’abstention pour un exposé...",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "...avez vous voté lors des dernières élections présidentielles ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Carine",
                "Replique": "Bonjour, enchantée.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Carine",
                "Replique": "Et bien oui effectivement, mais si les élections étaient demain, la situation serait différente.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Carine",
                "Replique": "Pour voter, il faut être inscrit sur les listes électorales.",
                "Quiz": 1,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "En résumé, les personnes qui ne sont pas inscrites dans les listes électorales avant une date limite ne peuvent pas non plus participer à l’élection.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Merci pour ces renseignements. Au revoir et bon courage pour ce déménagement.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Carine",
                "Replique": "Merci, au revoir.",
                "Quiz": 0,
                "PFC": 0
            }
        ]
    },
    {
        "Dialogue": 4,
        "Texte": [
            {
                "Personne": "Charlie",
                "Replique": "Nous arrivons à la mairie, le lieu parfait pour apprendre des choses sur les élections et leur niveau d’abstention.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Bonjour Monsieur le maire, pouvez-vous nous apporter davantage d’informations...",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "...sur le taux de participation aux dernières élections présidentielles à Bordeaux ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "M. le maire",
                "Replique": "Bien sûr, avec plaisir, que voulez-vous savoir ?",
                "Quiz": 1,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Je comprends mieux maintenant. L’abstention n’est pas quelque chose de définitif.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Certaines personnes peuvent ainsi choisir de voter ou non en fonction des circonstances de l’élection.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Merci M. le Maire. Au revoir.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "M. le maire",
                "Replique": "Au revoir.",
                "Quiz": 0,
                "PFC": 0
            }
        ]
    },
    {
        "Dialogue": 5,
        "Texte": [
            {
                "Personne": "Charlie",
                "Replique": "Nous arrivons devant le théâtre, le dernier lieu avant le retour à l’école.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Oh, mais ne serait-ce pas Mme Robert qui nourrit des pigeons.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Étant retraitée, peut-être pourra-t-elle nous parler des personnes qui sont dans la même situation qu’elle ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Mme Robert",
                "Replique": "Oh, bonjour Charlie, comment vas-tu ? Toi aussi tu profites de cette journée ensoleillée ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Bonjour Mme Robert !",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Oui et j’en profite également pour me renseigner sur le sujet de l’abstention.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Avez-vous voté aux dernières élections ?",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Mme Robert",
                "Replique": "Et bien non, tu sais, à mon âge, j’oublie souvent d’aller voter.",
                "Quiz": 1,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Je ne pensais pas que ces facteurs pouvaient influer sur l’abstention. Merci Mme Robert, j’ai beaucoup appris.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Mme Robert",
                "Replique": "De rien ma petite, reviens quand tu veux, au revoir.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Retournons à l’école pour faire le bilan avec M. Martin.",
                "Quiz": 0,
                "PFC": 0
            }
        ]
    },
    {
        "Dialogue": 6,
        "Texte": [
            {
                "Personne": "M. Martin",
                "Replique": "Alors Charlie, voyons ensemble ce que tu as appris aujourd’hui.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Voilà les notes que j’ai prises tout au long de ma journée.",
                "Quiz": 0, 
                "PFC": 0
                //Ici il faut se focus sur le carnet de notes
            },
            {
                "Personne": "Charlie",
                "Replique": "Un grand merci aux habitants pour leur temps.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "J’ai beaucoup appris aujourd’hui et j'espère que toi aussi.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "La prochaine fois, je t’emmènerai à la découverte d’autres villes comme Nantes ou Rennes pour voir les différences au niveau local.",
                "Quiz": 0,
                "PFC": 0
            },
            {
                "Personne": "Charlie",
                "Replique": "Sur ce, à plus !",
                "Quiz": 0,
                "PFC": 0
            },
        ]
    }
]

const NBDIALOGUES = dialogues.length;




const quiz = [
    {
        "Dialogue": 1,
        "Questions": [
            {
                "Id": 1,
                "Question": "Quelles sont les catégories socio-professionnelles qui s’abstiennent le plus ?",
                "Personne": "M. Martin",
                //Données à rajouter dans ce dialogue
                "Reponse": "Les professions intermédiaires comme les professeurs d’école, les employés et les ouvriers sont souvent les plus nombreux à s’abstenir. Bien que ce ne soit pas forcément visible à l’échelle de Bordeaux, à l’échelle nationale, c'est le cas. En effet, dans la zone d'influence de Bordeaux pour les villes à majorité d'étrangers, de professions intermédiaires, d'employés, d'ouvriers, de retraités ou encore de sans activités on compte respectivement "+(Math.round(abstention_by_category["ETRANGERS"]*100 * 100) / 100)+"%, "+(Math.round(abstention_by_category["PROF_INTERM_2017"]*100 * 100) / 100)+"%, "+(Math.round(abstention_by_category["EMPLOYES_2017"]*100 * 100) / 100)+"%, "+(Math.round(abstention_by_category["OUVRIERS_2017"]*100 * 100) / 100)+"%, "+(Math.round(abstention_by_category["RETRAITES_2017"]*100 * 100) / 100)+"% et "+(Math.round(abstention_by_category["SANS_ACTIV_2017"]*100 * 100) / 100)+"% d'abstention. Tandis qu'à l'échelle nationale, 50% des personnes cadres se sont abtenues aux élections de 2017 en France contre 63% pour les professions intermédiaires par exemple. Les personnes qui ont un statut cadre ont ainsi davantage tendance à aller voter que les autres professions. Les retraités participent aussi beaucoup aux élections avec seulement 40% d’abstention en 2017 en France. L’abstention est donc influencée par les catégories socio-professionnelles des électeurs."
            },
            {
                "Id": 2,
                "Question": "Le niveau d’étude a-t-il une influence sur le taux d’abstention ?",
                "Personne": "M. Martin",
                "Reponse": "Indirectement avec l’influence des catégories socio-professionnelles, le niveau d’étude influence également l’abstention. Une personne ayant un niveau Bac+5 a ainsi moins tendance à s’abstenir qu’une personne qui a arrêté les études avant le Bac."
            },
            {
                "Id": 3,
                "Question": "Pourquoi les personnes qui sont inscrites sur les listes électorales ne votent pas ?",
                "Personne": "M. Martin",
                "Reponse": "Plusieurs raisons peuvent venir expliquer cela. Pour moi, c’était d’abord car je trouvais que le vote n’est pas le meilleur moyen de se faire entendre. Faire des manifestations ou d’autres actes citoyens peuvent-être vus comme plus impactants. Pour d’autres, c’est un moyen de montrer une indifférence vis-à-vis des candidats ou de la politique elle-même. Cela peut aussi être vu comme une critique du système actuel."
            }
        ]
    },
    {
        "Dialogue": 3,
        "Questions": [
            {
                "Id": 1,
                "Question": "Comment se passe l’étape d’inscription sur les listes électorales ?",
                "Personne": "Carine",
                //Données à rajouter dans ce dialogue
                "Reponse": "Depuis 2019, on est inscrit d’office à ses 18 ans si on a été recensé à ses 16 ans. Toutefois, lors d’un recensement tardif ou d’un déménagement dans une nouvelle commune comme c’est mon cas actuellement, il faut faire la démarche d'inscription soi-même. Par exemple, sur la zone d'influence de Bordeaux, on sait que "+(Math.round(tx_adults_unregistered*100 * 100) / 100)+"% des adultes ne sont pas inscrits sur les listes électorales."       
            },
            {
                "Id": 2,
                "Question": "Savez-vous combien de temps à l’avance vous devez vous inscrire avant une élection ?",
                "Personne": "Carine",
                "Reponse": "Pour participer à des élections, il faut être inscrit sur les listes électorales au minimum 1 mois à l’avance avant la date de l’élection."
            },
            {
                "Id": 3,
                "Question": "Est-ce-que tout le monde pense toujours à s’inscrire sur ces listes ?",
                "Personne": "Carine",
                "Reponse": "Non pas forcément, le vote n’étant pas obligatoire en France, certaines personnes comme mon mari ne veulent tout simplement pas s’inscrire pour des raisons similaires aux personnes inscrites abstentionnistes."
            }
        ]
    },
    {
        "Dialogue": 4,
        "Questions": [
            {
                "Id": 1,
                "Question": "Le niveau d’abstention est-il différent selon le tour d’une élection ?",
                "Personne": "M. le maire",
                //Données à rajouter dans ce dialogue
                "Reponse": "Effectivement, lors des dernières élections présidentielles en 2017 par exemple, on a remarqué à Bordeaux que l’abstention était plus forte lors du second tour. En effet, "+nb_towns_abs_sup_t2+" communes sur les "+nb_towns+" que compte la zone d'influence de Bordeaux ont compté plus d'abstentions au second tour."
            },
            {
                "Id": 2,
                "Question": "Observez-vous d’autres phénomènes intéressants lors des tours d’une élection ?",
                "Personne": "M. le maire",
                //Données à rajouter dans ce dialogue
                "Reponse": "Si on se base sur les dernières élections présidentielles, on a aussi remarqué à Bordeaux que les nombres de votes blancs et de votes nuls étaient plus forts au second tour. En effet, au second tour, parmi "+nb_towns+" communes que compte la zone d'influence de Bordeaux, "+nb_towns_blank_sup_t2+" ont compté plus de votes blancs tandis que "+nb_towns_null_sup_t2+" ont compté plus de votes nuls. Même si ces actes sont différents de l’abstention, ils montrent eux aussi une volonté de ne pas choisir de candidats parmi ceux présentés."
            },
            {
                "Id": 3,
                "Question": "Qu’est-ce que le vote par intermittence ?",
                "Personne": "M. le maire",
                "Reponse": "L’abstention n’est pas forcément systématique. Certaines personnes votent ainsi par intermittence. L’électeur décide alors de prendre part au vote en fonction de l’enjeu, selon le tour ou l’échéance électorale."
            }
        ]
    },
    {
        "Dialogue": 5,
        "Questions": [
            {
                "Id": 1,
                "Question": "Les personnes retraitées s'abstiennent-elles beaucoup ?",
                "Personne": "Mme Robert",
                //Données à rajouter dans ce dialogue
                "Reponse": "Non pas forcément, les retraités sont même plutôt les champions de la participation. En effet, sur la zone d'influence de Bordeaux on recense chez les retraités un taux d'abstention de "+(Math.round(abstention_by_age_range["65_79_ANS_2017"]*100 * 100) / 100)+"%.Toutefois, passé un certain âge, l’abstention devient supérieure à la moyenne chez les personnes très âgées (42,7 % chez les 85 ans et plus lors du premier tour de 2017). A cet âge là, la politique ne les intéresse plus forcément."
            },
            {
                "Id": 2,
                "Question": "Observe-t-on d’autres disparités selon l’âge des électeurs ?",
                "Personne": "Mme Robert",
                //Données à rajouter dans ce dialogue
                "Reponse": "Oui en effet, le taux d’abstention est aussi élevé chez les plus jeunes avec un taux de 31,6 % chez les 25-29 ans au premier tour des élections présidentielles de 2017. Mais ces statistiques peuvent varier localement pour la même période. Dans ce sens, sur la zone d'influence de Bordeaux on recense chez les jeunes un taux d'abstention de "+(Math.round(abstention_by_age_range["25_39_ANS_2017"]*100 * 100) / 100)+"%. Il reste faible entre 40 et 50 ans (12,3 %). Le niveau d’abstention peut donc varier selon l’âge des personnes."
            },
            {
                "Id": 3,
                "Question": "D’autres facteurs influencent-ils l’abstention ?",
                "Personne": "Mme Robert",
                "Reponse": "La situation matrimoniale peut aussi l’influencer. En effet, si on est en couple ou avec des enfants, le risque d’abstention est limité. Avant de me quitter, mon Raymond était toujours là pour me rappeler d’aller voter."
            }
        ]
    }
]

//Test affichage en console des statistiques
//console.log(dialogues[1]["Texte"][5]["Replique"]);
//console.log(quiz[0]["Questions"][0]["Reponse"]);
//console.log(quiz[1]["Questions"][0]["Reponse"]);
//console.log(quiz[2]["Questions"][0]["Reponse"]);
//console.log(quiz[2]["Questions"][1]["Reponse"]);
//console.log(quiz[3]["Questions"][0]["Reponse"]);
//console.log(quiz[3]["Questions"][1]["Reponse"]);