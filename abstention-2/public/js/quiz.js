"use strict";

async function quizScreen() {
  const container = document.getElementById("container");

  const quiz = [{
    quiz: {
      question: "À quel âge le droit de vote pourrait être décalé ?",
      answer: ["21 ans", "16 ans", "14 ans"],
      goodAnswer: 1
    }
  }, 
  // {
  //   quiz: {
  //     question: "Est-ce que les votes blancs sont pris en compte ?",
  //     answer: ["Non", "Oui", "Oui, mais que pour les départementales"],
  //     goodAnswer: 0
  //   }
  // },
   {
    quiz: {
      question: "Quand sont les prochaines présidentielles ?",
      answer: ["2025", "2023", "2022"],
      goodAnswer: 2
    }
  },
  {
    quiz: {
      question: "À quoi est lié le droit de vote ?",
      answer: ["Pays de résidence", "Âges", "Nationalité"],
      goodAnswer: 2
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

  let headerHtml = await loadTemplate('templates/header.ejs', [])
  container.innerHTML = headerHtml;
  date();

  let step = 0;
  let hearts = 3;

  async function newQuiz(i) {
    let quizHtml = await loadTemplate('templates/quiz/quiz.ejs', quiz[i])
    document.getElementById('screen').innerHTML = quizHtml;

    updateHearts();
    document.getElementById("goodAnswer").addEventListener("click", () => goodAnswer(step));

    const badClass = document.getElementsByClassName("badAnswer")
    Array.from(badClass).forEach(button => {
      button.addEventListener("click", () => badAnswer(step));
    });
  }

  await newQuiz(0);

  async function goodAnswer(i) {
    let quizHtml = await loadTemplate('templates/quiz/goodAnswer.ejs', code[i])
    document.getElementById('screen').innerHTML = quizHtml;

    updateHearts();
    document.getElementById("nextQuiz").addEventListener("click", () => {
      step++;
      if (step >= quiz.length) {
        //topSecret 
        loadTopSecret();
      } else {
        newQuiz(step);
      }
    });
  }

  async function badAnswer(i) {
    hearts--;//perd une vie
    if (hearts < 0) {
      loadTopSecret();
      //TODO appel topSecret
    } else {
      let quizHtml = await loadTemplate('templates/quiz/badAnswer.ejs', [])
      document.getElementById('screen').innerHTML = quizHtml;
      updateBigHeartsBad();
      document.getElementById("nextQuiz").addEventListener("click", () => {
        newQuiz(step);
      });
    }
  }

  function updateBigHeartsBad() {
    const heartsDiv = document.getElementById("hearts");
    switch (hearts) {
      case 0:
        heartsDiv.innerHTML =
       `<img class="heartsIcon big"src="img/coeur-grand-casse.svg">
        <img class="heartsIcon big"src="img/coeur-grand-casse.svg">
        <img class="heartsIcon big"src="img/coeur-grand-casse.svg">`;
        break;
      case 1:
        heartsDiv.innerHTML =
       `
       <img class="heartsIcon big"src="img/coeur-grand-plein.svg">
       <img class="heartsIcon big"src="img/coeur-grand-casse.svg">
       <img class="heartsIcon big"src="img/coeur-grand-casse.svg">
       `;
        break;
      case 2:
        heartsDiv.innerHTML =
       `<img class="heartsIcon big"src="img/coeur-grand-plein.svg" >
        <img class="heartsIcon big"src="img/coeur-grand-plein.svg" >
        <img class="heartsIcon big"src="img/coeur-grand-casse.svg" >`;
        break;
      default:
        heartsDiv.innerHTML =
       `<img class="heartsIcon big"src="img/coeur-grand-plein.svg">
        <img class="heartsIcon big"src="img/coeur-grand-plein.svg">
        <img class="heartsIcon big"src="img/coeur-grand-plein.svg">`;
        break;
    }
  }
  function updateHearts() {
    const heartsDiv = document.getElementById("hearts");
    switch (hearts) {
      case 0:
        heartsDiv.innerHTML =
       `<img class="heartsIcon"src="img/coeur-petit-contour.svg" >
        <img class="heartsIcon"src="img/coeur-petit-contour.svg" >
        <img class="heartsIcon"src="img/coeur-petit-contour.svg" >`;
        break;
      case 1:
        heartsDiv.innerHTML =
       `<img class="heartsIcon"src="img/coeur-petit-plein.svg" >
        <img class="heartsIcon"src="img/coeur-petit-contour.svg" >
        <img class="heartsIcon"src="img/coeur-petit-contour.svg" >`;
        break;
      case 2:
        heartsDiv.innerHTML =
       `<img class="heartsIcon"src="img/coeur-petit-plein.svg" >
        <img class="heartsIcon"src="img/coeur-petit-plein.svg" >
        <img class="heartsIcon"src="img/coeur-petit-contour.svg" >`;
        break;
      case 3:
        heartsDiv.innerHTML =
       `<img class="heartsIcon"src="img/coeur-petit-plein.svg" >
        <img class="heartsIcon"src="img/coeur-petit-plein.svg" >
        <img class="heartsIcon"src="img/coeur-petit-plein.svg" >`;
      default:
        break;
    }
  }
}
