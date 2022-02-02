
window.onload = () => {

    window.scrollTo(0, 25);

    var x;
    if (sessionStorage.getItem("question").length == 1) {
        document.getElementById("point1").style.backgroundColor = "#1A367A";
        x = 1;
    }
    if (sessionStorage.getItem("question").length == 2) {
        document.getElementById("point1").style.backgroundColor = "#1A367A";
        document.getElementById("point2").style.backgroundColor = "#1A367A";
        x = 2;
    }
    else if (sessionStorage.getItem("question").length == 3) {
        document.getElementById("point1").style.backgroundColor = "#1A367A";
        document.getElementById("point2").style.backgroundColor = "#1A367A";
        document.getElementById("point3").style.backgroundColor = "#1A367A";
    }

    var randomNumber;
    fetchCandidates(x);

}
function NombreChoisi(number) {
    if (0 <= number && number < 3) {
        return 1;
    }
    else if (3 <= number && number < 6) {
        return 2;
    }
    else if (6 <= number && number <= 9) {
        return 3;
    }
}

function click(randomNumber) {
    document.getElementById("ans" + randomNumber).addEventListener("click", () => {
        sessionStorage.setItem('answer', '1');
        window.location.href = "./question-result.html";
    });
    document.getElementById("ans" + ((randomNumber % 3) + 1)).addEventListener("click", () => {
        sessionStorage.setItem('answer', '0');
        window.location.href = "./question-result.html";
    });
    document.getElementById("ans" + ((((randomNumber % 3) + 1) % 3) + 1)).addEventListener("click", () => {
        sessionStorage.setItem('answer', '0');
        window.location.href = "./question-result.html";
    });
    document.getElementById("exit").addEventListener("click", () => {
        window.location.href = "./index.html";
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomTheme() {
    const themes = ['followers', 'education', 'sante', 'environnement', 'economie'];
    return themes[random(0, themes.length - 1)];
}

function fetchCandidates(x) {
    const theme = randomTheme();
    fetch(`api/randomQuestion/${theme}`)
        .then(res => res.json())
        .then(data => {
            if (data.mainCandidat.displayShortName != sessionStorage.getItem("alreadyGivenCandidate1") && data.mainCandidat.displayShortName != sessionStorage.getItem("alreadyGivenCandidate2")) {
                // console.log("cand déjà donné 1 :" + sessionStorage.getItem("alreadyGivenCandidate1"));
                // console.log("cand déjà donné 2 :" + sessionStorage.getItem("alreadyGivenCandidate2"));
                sessionStorage.setItem("alreadyGivenCandidate" + x, data.mainCandidat.displayShortName);
                sessionStorage.setItem("mainCandidate", data.mainCandidat.displayShortName);
                sessionStorage.setItem("usernameMainCandidate", data.mainCandidat.userName);
                sessionStorage.setItem("solutionCandidate", data.solutionCandidat.displayShortName);
                sessionStorage.setItem("ratio", data.ratio);
                sessionStorage.setItem("theme", theme);
                sessionStorage.setItem("wordsTheme", data.wordsTheme);
                sessionStorage.setItem("percentage1", data.ratioMainCandidat);
                sessionStorage.setItem("percentage2", data.ratioSolutionCandidat);

                let alea = Math.trunc(Math.random() * 10);
                let randomNumber = NombreChoisi(alea);

                document.querySelector('#questionPart1').innerHTML = data.questionPart1;
                document.querySelector('#questionPart2').innerHTML = data.questionPart2;

                let candidate = document.getElementById("candidate");

                let ans1 = document.getElementById("ans1");
                let ans2 = document.getElementById("ans2");
                let ans3 = document.getElementById("ans3");

                candidate.innerHTML = data.mainCandidat.displayShortName;
                if (randomNumber == 1) {
                    ans1.innerHTML = data.solutionCandidat.displayShortName;
                    ans2.innerHTML = data.wrongCandidats[0].displayShortName;
                    ans3.innerHTML = data.wrongCandidats[1].displayShortName;
                }
                else if (randomNumber == 2) {
                    ans2.innerHTML = data.solutionCandidat.displayShortName;
                    ans3.innerHTML = data.wrongCandidats[0].displayShortName;
                    ans1.innerHTML = data.wrongCandidats[1].displayShortName;
                }
                else if (randomNumber == 3) {
                    ans3.innerHTML = data.solutionCandidat.displayShortName;
                    ans1.innerHTML = data.wrongCandidats[0].displayShortName;
                    ans2.innerHTML = data.wrongCandidats[1].displayShortName;
                }

                click(randomNumber);


            }
            else {
                fetchCandidates();
            }
        })

}

