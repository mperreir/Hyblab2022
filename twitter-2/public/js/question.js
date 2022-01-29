window.onload = () => {
    if (sessionStorage.getItem("question").length == 1) {
        document.getElementById("point1").style.backgroundColor = "#1A367A"
    }
    if (sessionStorage.getItem("question").length == 2) {
        document.getElementById("point1").style.backgroundColor = "#1A367A"
        document.getElementById("point2").style.backgroundColor = "#1A367A"
    }
    else if (sessionStorage.getItem("question").length == 3) {
        document.getElementById("point1").style.backgroundColor = "#1A367A"
        document.getElementById("point2").style.backgroundColor = "#1A367A"
        document.getElementById("point3").style.backgroundColor = "#1A367A"
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
    var randomNumber;
    fetch("http://localhost:8080/twitter-2/api/randomQuestion/followers")
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem("mainCandidate", data.mainCandidat.displayFullName);
            sessionStorage.setItem("solutionCandidate", data.solutionCandidat.displayFullName);
            sessionStorage.setItem("ratio", data.ratio);
            

            let alea = Math.trunc(Math.random() * 10);
            randomNumber = NombreChoisi(alea);

            let candidate = document.getElementById("candidate");

            let ans1 = document.getElementById("ans1");
            let ans2 = document.getElementById("ans2");
            let ans3 = document.getElementById("ans3");
            console.log(data.solutionCandidat.displayFullName);

            candidate.innerHTML = data.mainCandidat.displayFullName;
            if (randomNumber == 1) {
                ans1.innerHTML = data.solutionCandidat.displayFullName;
                ans2.innerHTML = data.wrongCandidats[0].displayFullName;
                ans3.innerHTML = data.wrongCandidats[1].displayFullName;
            }
            else if (randomNumber == 2) {
                ans2.innerHTML = data.solutionCandidat.displayFullName;
                ans3.innerHTML = data.wrongCandidats[0].displayFullName;
                ans1.innerHTML = data.wrongCandidats[1].displayFullName;
            }
            else if (randomNumber == 3) {
                ans3.innerHTML = data.solutionCandidat.displayFullName;
                ans1.innerHTML = data.wrongCandidats[0].displayFullName;
                ans2.innerHTML = data.wrongCandidats[1].displayFullName;
            }

            click(randomNumber);
            

        });

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
    
}
