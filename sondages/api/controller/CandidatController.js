/**
 * @name : CandidatController.js
 * @description : extract list of candidat and make a json with each candidat and his picture associated
 * @author : Team Genesis
 */

'use strict'


let lastDataRetrieval = new Date(70, 1);

/**
 * Initialise a new candidate
 * @param nom The name of the candidate
 * @param prenom The firstname of the candidate
 * @param img The image of the candidate
 * @param couleur The color of the candidate's party
 */
function Candidat(nom, prenom, img, couleur) {
    this.nom = nom;
    this.prenom = prenom;
    this.img = img;
    this.couleur = couleur;
}


class CandidatController {
    /**
     * Makes a list of candidates and, if these colours are registered, assigns the right colour to the right candidate
     * @param data Polling data
     * @return {*[]} An object containing the processed candidates with their colours
     */
    listCandidat(data) {
        /* We make an object for each candidat (with his name, his first name and the name of his picture) */
        let object = [];
        data.forEach(candidate => {
            let tab = candidate.split(' ');
            let firstName = tab[0];
            tab.splice(0, 1);
            let name = tab.join(' ');
            let img = firstName + '_' + name;
            let correspondence = {
                'Marine Le Pen': '#2E3845',
                'Anne Hidalgo': '#DF3E3E',
                'Jean-Luc Mélenchon': '#DF3E3E',
                'Nicolas Dupont-Aignan': '#2E3845',
                'Arnaud Montebourg': '#DF3E3E',
                'Yannick Jadot': '#899853',
                'Emmanuel Macron': '#ffb400',
                'Valérie Pécresse': '#1FB2BA',
                'Philippe Poutou': '#963E3E', /* <3 Guillaume <3 */
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
            let color = '#c8c8c8';
            if (candidate in correspondence) {
                color = correspondence[candidate];
            }
            object.push(new Candidat(name, firstName, img, color));
        })
        return object;
    }

    /**
     * Compares the current date with the last date of data retrieval
     * @return {boolean}
     */
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