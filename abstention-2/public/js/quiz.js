"use strict";

async function quizScreen() {
  const container = document.getElementById("container");

  const quiz = [{
    quiz: {
      question: "À quel âge le droit de vote pourrait être décalé ?",
      answer: ["21 ans", "16 ans", "14 ans"],
      goodAnswer: 1
    }
  }, {
    quiz: {
      question: "Est-ce que les votes blancs sont pris en compte ?",
      answer: ["Non", "Oui", "Oui, mais que pour les départementales"],
      goodAnswer: 1
    }
  }, {
    quiz: {
      question: "Quand sont les prochaines présidentielles ?",
      answer: ["2025", "2023", "2022"],
      goodAnswer: 1
    }
  }, {
    quiz: {
      question: "À quoi est lié le droit de vote ?",
      answer: ["Pays de résidence", "Âges", "Nationalité"],
      goodAnswer: 1
    }
  }, {
    quiz: {
      question: "Quelles tranches d’âges vote le moins ?",
      answer: ["24-35 ans", "18-24 ans", "35-44 ans"],
      goodAnswer: 1
    }
  }
  ]

  const code = [{
    number: "2"
  },
  {
    number: "0"
  },
  {
    number: "4"
  },
  {
    number: "6"
  },
  ]

  async function newQuiz(i) {
    let headerHtml = await loadTemplate('templates/header.ejs', [])
    container.innerHTML = headerHtml;
    date();
    let quizHtml = await loadTemplate('templates/quiz/quiz.ejs', quiz[i])
    document.getElementById('screen').innerHTML = quizHtml;
  }
  await newQuiz(0);

  document.getElementById("goodAnswer").addEventListener("click", goodAnswer(0));
  document.getElementsByClassName("badAnswer").addEventListener("click", badAnswer(0));

  function goodAnswer(i) {
    loadTemplate('templates/header.ejs', []).then(value => {
      container.innerHTML = value;
      date();
      loadTemplate('templates/quiz/goodAnswer.ejs', code[i]).then(value => {
        document.getElementById('screen').innerHTML = value;
      });
    })
  }

  function badAnswer(i) {
    loadTemplate('templates/header.ejs', []).then(value => {
      container.innerHTML = value;
      date();
      loadTemplate('templates/quiz/badAnswer.ejs', code[i]).then(value => {
        document.getElementById('screen').innerHTML = value;
      });
    })
  }
}
