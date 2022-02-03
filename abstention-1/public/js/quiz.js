function lancerQuiz(numScene){
    let quizZone = document.querySelector("#QuizZone");
    let question1 = document.querySelectorAll("#reponseA");
    let question2 = document.querySelectorAll("#reponseB");
    let question3 = document.querySelectorAll("#reponseC");
    let reponse = document.querySelector("#reponse");
    let p = document.querySelector("#reponse p");
    let retour = document.querySelector("#quizzRetour");

    for(let i=0; i<quiz.length; i++){
        if(quiz[i].Dialogue == numScene){
            question1[0].innerText = quiz[i].Questions[0].Question;
            question2[0].innerText = quiz[i].Questions[1].Question;
            question3[0].innerText = quiz[i].Questions[2].Question;
        }
    }

    question1[0].addEventListener('click', function(){
        reponse.scrollTo(0,0);
        quizZone.style.visibility = "hidden";
        reponse.style.visibility = "visible";
        retour.style.visibility = "visible";
        for(let i=0; i<quiz.length; i++){
            if(quiz[i].Dialogue == numScene){
                p.textContent = quiz[i].Questions[0].Reponse;
                p.style.backgroundColor = "blue";
            }
        }
    })

    question2[0].addEventListener('click', function(){
        reponse.scrollTo(0,0);
        quizZone.style.visibility = "hidden";
        reponse.style.visibility = "visible";
        retour.style.visibility = "visible";
        for(let i=0; i<quiz.length; i++){
            if(quiz[i].Dialogue == numScene){
                p.textContent = quiz[i].Questions[1].Reponse;
                p.style.backgroundColor = "#29BA9B";
            }
        }
    })

    question3[0].addEventListener('click', function(){
        reponse.scrollTo(0,0);
        quizZone.style.visibility = "hidden";
        reponse.style.visibility = "visible";
        retour.style.visibility = "visible";
        for(let i=0; i<quiz.length; i++){
            if(quiz[i].Dialogue == numScene){
                p.textContent = quiz[i].Questions[2].Reponse;
                p.style.backgroundColor = "#E66E78";
            }
        }
    })

    retour.addEventListener('click', function(){
        quizZone.style.visibility = "visible";
        reponse.style.visibility = "hidden";
        retour.style.visibility = "hidden";
    })
};