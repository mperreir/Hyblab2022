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
                "Marine Le Pen":"#0D378A",
                "Anne Hidalgo":"#FF8080",
                "Jean-Luc Mélenchon":"#cc2443",
                "Nicolas Dupont-Aignan":"#0082C4",
                "Arnaud Montebourg":"#ffc0c0",
                "Yannick Jadot":"#00c000",
                "Emmanuel Macron":"#ffeb00",
                "Valérie Pécresse":"#0066cc",
                "Philippe Poutou":"#bb0000",
                "Xavier Bertrand":"#0066cc",
                "Michel Barnier":"#0066cc",
                "François Asselineau":"#118088",
                "Florian Philippot":"#404040",
                "Hélène Thouy":"#8D2E88",
                "Jean-Christophe Lagarde":"#00FFFF",
                "Jean-Frédéric Poisson":"#0000ff",
                "Sandrine Rousseau":"#00c000",
                "Laurent Wauquiez":"#0066cc",
                "François Baroin":"#0066cc",
                "Rachida Dati":"#0066cc",
                "Olivier Faure":"#FF8080",
                "Ségolène Royal":"#FF8080",
                "Bruno Retailleau":"#0066cc",
                "François Hollande":"#FF8080",
                "Eric Piolle":"#00c000",
                "Eric Ciotti":"#0066cc",
                "Philippe Juvin":"#0066cc",
                "Denis Payre":"#0066cc"
            };
            let couleur = '#ffffff';
            if (candidat in correspondace)
            {
                couleur = correspondace[candidat];
            }
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