"use strict";

async function quizScreen() {
  const container = document.getElementById("container");

  const quiz =
    [{
      quiz: {
        question: "À quel âge le droit de vote pourrait être décalé ?",
        answer: ["21 ans", "16 ans", "14 ans"]
      }
    }, {
      quiz: {
        question: "Est-ce que les votes blancs sont pris en compte ?",
        answer: ["Non", "Oui", "Oui, mais que pour les départementales"]
      }
    }, {
      quiz: {
        question: "Quand sont les prochaines présidentielles ?",
        answer: ["2025", "2023", "2022"]
      }
    }, {
      quiz: {
        question: "À quoi est lié le droit de vote ?",
        answer: ["Pays de résidence", "Âges", "Nationalité"]
      }
    }, {
      quiz: {
        question: "Quelles tranches d’âges vote le moins ?",
        answer: ["24-35 ans", "18-24 ans", "35-44 ans"]
      }
    }
    ]

  const quizTest = quiz[0]

  loadTemplate('templates/header.ejs', []).then(value => {
    container.innerHTML = value;
    date();
    loadTemplate('templates/quiz.ejs', quizTest).then(value => {
      document.getElementById('screen').innerHTML = value;
    });
  })
}
