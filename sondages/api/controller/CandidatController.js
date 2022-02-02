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
            let couleur = '#ffffff';
            if (candidat = 'Marine Le Pen'){couleur = '#0D378A'}
            else if (candidat = 'Anne Hidalgo'){couleur = '#FF8080'}
            else if (candidat = 'Jean-Luc Mélenchon'){couleur = '#cc2443'}
            else if (candidat = 'Nicolas Dupont-Aignan'){couleur = '#0082C4'}
            else if (candidat = 'Arnaud Montebourg'){couleur = '#ffc0c0'}
            else if (candidat = 'Yannick Jadot'){couleur = '#00c000'}
            else if (candidat = 'Emmanuel Macron'){couleur = '#ffeb00'}
            else if (candidat = 'Valérie Pécresse'){couleur = '#0066cc'}
            else if (candidat = 'Philippe Poutou'){couleur = '#bb0000'}
            else if (candidat = 'Xavier Bertrand'){couleur = '#0066cc'}
            else if (candidat = 'Michel Barnier'){couleur = '#0066cc'}
            else if (candidat = 'François Asselineau'){couleur = '#118088'}
            else if (candidat = 'Florian Philippot'){couleur = '#404040'}
            else if (candidat = 'Hélène Thouy'){couleur = '#8D2E88'}
            else if (candidat = 'Jean-Christophe Lagarde'){couleur = '#00FFFF'}
            else if (candidat = 'Jean-Frédéric Poisson'){couleur = '#0000ff'}
            else if (candidat = 'Sandrine Rousseau'){couleur = '#00c000'}
            else if (candidat = 'Laurent Wauquiez'){couleur = '#0066cc'}
            else if (candidat = 'François Baroin'){couleur = '#0066cc'}
            else if (candidat = 'Rachida Dati'){couleur = '#0066cc'}
            else if (candidat = 'Olivier Faure'){couleur = '#FF8080'}
            else if (candidat = 'Ségolène Royal'){couleur = '#FF8080'}
            else if (candidat = 'Bruno Retailleau'){couleur = '#0066cc'}
            else if (candidat = 'François Hollande'){couleur = '#FF8080'}
            else if (candidat = 'Eric Piolle'){couleur = '#00c000'}
            else if (candidat = 'Eric Ciotti'){couleur = '#0066cc'}
            else if (candidat = 'Philippe Juvin'){couleur = '#0066cc'}
            else if (candidat = 'Denis Payre'){couleur = '#0066cc'}

            object.push(new Candidat(nom, prenom, img, couleur));
        })
        return object;
    }

    shouldWeUpdateData() {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        if (currentDate > lastDataRetrieval) {
            lastDataRetrieval = currentDate;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new CandidatController();