/**
 * @name : CandidatController.js
 * @description : extract list of candidat and make a json with each candidat and his picture associated
 * @author : Team Genesis
 */

let lastDataRetrieval = new Date(70, 1);

function Candidat(nom, prenom, img, couleur) {
    this.nom = nom;
    this.prenom = prenom;
    this.img = img;
    this.couleur = couleur;
}

class CandidatController {
    listCandidat(data) {
        // we make an object for each candidat (whith his name, his first name and the name of his picture)
        let object = [];
        data.forEach(candidat => {
            let tab = candidat.split(' ');
            let prenom = tab[0];
            tab.splice(0, 1);
            let tab2 = tab;
            let nom = tab2.join(' ');
            let img = prenom + '_' + nom;
            let correspondace = {
                'Marine Le Pen': '#2E3845',
                'Anne Hidalgo': '#DF3E3E',
                'Jean-Luc Mélenchon': '#DF3E3E',
                'Nicolas Dupont-Aignan': '#2E3845',
                'Arnaud Montebourg': '#DF3E3E',
                'Yannick Jadot': '#899853',
                'Emmanuel Macron': '#ffb400',
                'Valérie Pécresse': '#1FB2BA',
                'Philippe Poutou': '#963E3E',
                'Xavier Bertrand': '#1FB2BA',
                'Michel Barnier': '#1FB2BA',
                'François Asselineau': '#C8C8C8',
                'Florian Philippot': '#2E3845',
                'Hélène Thouy': '#C8C8C8',
                'Jean-Christophe Lagarde': '#1FB2BA',
                'Jean-Frédéric Poisson': '#1FB2BA',
                'Sandrine Rousseau': '#899853',
                'Laurent Wauquiez': '#1FB2BA',
                'François Baroin': '#1FB2BA',
                'Rachida Dati': '#1FB2BA',
                'Olivier Faure': '#DF3E3E',
                'Ségolène Royal': '#DF3E3E',
                'Bruno Retailleau': '#1FB2BA',
                'François Hollande': '#DF3E3E',
                'Eric Piolle': '#899853',
                'Eric Ciotti': '#1FB2BA',
                'Philippe Juvin': '#1FB2BA',
                'Denis Payre': '#1FB2BA'
            }
            let couleur = '#ffffff';
            if (candidat in correspondace) {
                couleur = correspondace[candidat];
            }
            object.push(new Candidat(nom, prenom, img, couleur));
        })
        return object;
    }

    shouldWeUpdateData() {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (currentDate > lastDataRetrieval) {
            lastDataRetrieval = currentDate;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new CandidatController();