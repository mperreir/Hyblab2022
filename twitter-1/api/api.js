'use strict';

const path = require('path');

const db = require(path.join(__dirname, "../back/db"));
const textProcessing = require(path.join(__dirname, '/../back/textProcessing'));
const {tweets_name} = require("../back/db");

const multer = require('multer');
const express = require("express");
const upload = multer();

module.exports = (passport) => {
    const app = express();
    // Sample endpoint that sends the partner's name
    app.get('/topic', function (req, res) {
        let topic;

        // Get partner's topic from folder name
        topic = path.basename(path.join(__dirname, '/..'))
        // Send it as a JSON object
        res.json({'topic': topic});
    });

    app.get('/game/1/new_question', (req, res) => {
        let candidats = db.fetch(db.candidats_name);
        let candidat1;
        let candidat2;
        let tweet;
        let is_first_response_true = true;

        let cpt_while = 0;

        do {
            candidat1 = candidats[Math.floor(Math.random() * candidats.length)];
            const candidats_2 = candidats.filter(c => candidat1.id !== c.id);
            candidat2 = candidats[Math.floor(Math.random() * candidats_2.length)]

            tweet = db.getTweetsSemaine()
                .filter(t => t.user_id === candidat1.id
                    && t.is_retweet === "False"
                    && t.text.length > 100)
                .sort((a, b) => b.favorite_count - a.favorite_count)
                .slice(0, 3)
                .sort(() => 0.5 - Math.random())[0];

            // arret de la boucle si pas de tweet trouvé
            if (cpt_while > 3) {
                res.status(500).send();
                return;
            }
            cpt_while++;
        } while (tweet === undefined);

        // Supprime les url des tweets
        tweet.text = tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

        if (Math.random() > 0.5) {
            const tmp = candidat1;
            candidat1 = candidat2;
            candidat2 = tmp;
            is_first_response_true = false;
        }

        let question = {
            text: tweet.text,
            possible_response_1: candidat1,
            possible_response_2: candidat2,
            is_response_1_true: is_first_response_true,
            true_response: is_first_response_true ? candidat1 : candidat2,
            original_tweet: tweet,
        };

        res.json(question);
    });

    app.get('/theme/all', (req, res) => {
        let themes = db.fetch(db.themes_name);
        res.json(themes);
    });

    app.get('/tweets/tops/:theme_id', (req, res) => {
        const candidats = db.getCandidats();
        let tweets = db.getTweetsSemaine()
            .filter(tweet => tweet.themeScore >= 1
                && tweet.theme_id === parseInt(req.params.theme_id));
        tweets.sort((a, b) => b.favorite_count - a.favorite_count);
        tweets = tweets.slice(0, 3);
        tweets = tweets.map(tweet => {
            const candidat = candidats.filter(candidat => candidat.id === tweet.user_id);
            tweet.name = candidat.length > 0 ? candidat[0].name : "ERROR : CANDIDAT INCONNU";
            return tweet;
        })
        res.json(tweets);
    });

    app.get('/candidat/all', (req, res) => {
        let candidats = db.getCandidats();
        res.json(candidats);
    });

    app.get('/candidat/filtre', (req, res) => {
        let candidats = db.getCandidats()
            .filter(t => t.followers > 80000);
        res.json(candidats);
    });

    app.get('/candidat/:id_candidat/stats', (req, res) => {
        const candidat = db.getCandidats();
        const all_tweets = db.getTweets()
            .filter(t => t.user_id === req.params.id_candidat);
        const this_week_tweets = db.getTweetsSemaine()
            .filter(t => t.user_id === req.params.id_candidat);

        const total_like = all_tweets.reduce((total, tweet) => total + parseInt(tweet.favorite_count), 0);
        const total_like_week = this_week_tweets.reduce((total, tweet) => total + parseInt(tweet.favorite_count), 0);

        const total_retweets = all_tweets.reduce((total, tweet) => total + parseInt(tweet.retweets_count), 0);
        const total_retweets_week = this_week_tweets.reduce((total, tweet) => total + parseInt(tweet.retweets_count), 0);

        const stats = {
            total_tweets: all_tweets.length,
            total_week_tweets: this_week_tweets.length,
            total_like: total_like,
            total_like_week: total_like_week,
            total_retweets: total_retweets,
            total_retweets_week: total_retweets_week,
        }

        res.json(stats);
    });

    app.post('/admin/tweets/update',
            [require('connect-ensure-login').ensureLoggedIn(), upload.single('tweets_file')],
            (req, res) => {
        if (req.file !== undefined && req.file.buffer !== undefined) {
            // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
            if (req.file.originalname.slice((req.file.originalname.lastIndexOf(".") - 1 >>> 0) + 2) !== 'csv')
                res.status(400).send('Erreur : .csv requit.');
            db.tweets_update(req.file.buffer.toString(), () => {
                res.redirect('back');
            });
        } else {
            res.status(400).send('Erreur fichier non reçu.');
        }
    });

    app.post('/admin/candidats/update',
            [require('connect-ensure-login').ensureLoggedIn(), upload.single('candidats_file')],
            (req, res) => {
        if (req.file !== undefined && req.file.buffer !== undefined) {
            // https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
            if (req.file.originalname.slice((req.file.originalname.lastIndexOf(".") - 1 >>> 0) + 2) !== 'csv')
                res.status(400).send('Erreur : .csv requit.');
            db.candidats_update(req.file.buffer.toString(), () => {
                res.redirect('back');
            });
        } else {
            res.status(400).send('Erreur fichier non reçu.');
        }
    });

    // Authentification pour accéder aux parties privées de l'api (on n'en a pas dans cet exemple)
    // et aux templates privés
    // C'est ici qu'on utilise passport pour créer une session utilisateur
    app.post('/login', function (req, res, next) {
        if (!req.body.username) {
            return res.status(400).redirect('../login.html');
        }
        if (!req.body.password) {
            return res.status(400).redirect('../login.html');
        }
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                return res.status(418).redirect('../login.html');
            }
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).redirect('../admin/index.html');
            });
        })(req, res, next);
    });

    return app;
}


// const labeler = new textProcessing.Labeler(textProcessing.themesTests);
// let tweets;
// textProcessing.Parser.getTweetsJSONFromFile("twitter-1/back/data/tweets/tweets_candidats.csv", (ts) => {
//     tweets = ts;
//     tweets = labeler.labellingTweets(tweets);
//     console.log(tweets);
// });

// Export our API
// module.exports = app;

