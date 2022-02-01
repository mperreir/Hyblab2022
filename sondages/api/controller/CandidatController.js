/**
 * @name : CandidatController.js
 * @description : extract list of candidat and make a json with each candidat and his picture associated
 * @author : Team Genesis
 */

 let lastDataRetrieval = new Date(70, 1);

function Candidat(nom, prenom, img) {
    this.nom = nom;
    this.prenom = prenom;
    this.img = img;
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
            object.push(new Candidat(nom, prenom, img));
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