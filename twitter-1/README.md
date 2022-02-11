# Descriptif du projet

Porteur de projet : Le Télégramme

Sujet : Le twitommètre présidentiel

Nom d'équipe : #PlayLysée

Participants : 

- Le Télégramme : Blandine Le Cain, Nicolas Arzur, Yoann Peron

- AGR : Pierre Gabillaud, Elodie Menara, Marianne Peyrègne

- Polytech :  Sviatoslav Besnard, Chama El Majeny, Yvann Gouraud, Yi Lu

#But du projet

Le but de ce projet était de permettre à des utilisateurs d'avoir accès à l'actualité Twitter des candidats à la présidentielle. Les candidats suivis ici sont les 12 candidats déclarés pour la présidentielle au 30 janvier 2022 et ayant plus de 80 000 abonnés sur Twitter.
Ce projet est centré autour d'un jeu. Ce jeu présente à l'utilisateur différents tweets ayant fait parlé d'eux pendant la semaine et l'utilisateur doit essayer de retrouver à qui appartient le Tweet. Nous classons les tweets "populaires" sur la base du nombre de likes et de retweets qu'ils ont reçu.
Il est également possible pour l'utilisateur de rechercher les Top Tweets par candidats ou bien par catégorie. Les Tweets sont classés en 6 catégories : Education, Environnment, Economie, Sécurité, Santé et Culture.
Les tweets présents sur notre plateforme sont récupérés sur une semaine glissante depuis le 30 septembre 2021.
Les tweets sont classés en thématique grâce à de la reconnaissance de mots clés. Nous avons supposé que si plusieurs mots-clés relatifs à un même thème se trouvaient dans un tweet (par ex : école, professeur), celui-ci appartenait à la thématique liée (dans notre exemple, Education).

#Page Admin

Il est possible pour l'administrateur de la page d'accéder à une page admin (qui permet de modifier la source des données) en ajoutant /login.html à l'URL de la page.
