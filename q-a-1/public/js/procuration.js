
const container = document.getElementById("first-section");
container.style.backgroundColor = "#EC8989";

const footer = document.querySelector('footer');

  
const button_first_procuration = document.createElement('button');
button_first_procuration.textContent = "Vote";
button_first_procuration.style.color = "#EC8989";
button_first_procuration.classList.add("red");
button_first_procuration.style.color = "rgb(224, 209, 209)";

  
const button_second_procuration = document.createElement('button');
button_second_procuration.textContent = "Vote Blanc";
button_second_procuration.style.color = "#EC8989";
button_second_procuration.classList.add("red");
button_second_procuration.style.color = "rgb(224, 209, 209)";
button_second_procuration.onclick = function(){
    document.location = "Vote_blanc.html";
}


const logo = document.getElementById("logo");
const img = document.createElement("img");
img.src = "img/logo/logo rouge.svg";
img.id = "ok";
logo.appendChild(img);
  
footer.appendChild(button_first_procuration);
footer.appendChild(button_second_procuration);

const QP1 = document.getElementById("QP1");
QP1.addEventListener("click", function(event){

    window.alert("Mauvaise Réponse !");
})

const QP2 = document.getElementById("QP2");
QP2.addEventListener("click", function(event){

    window.alert("Bonne Réponse, bien joué !");
    QP1.style.backgroundColor="red";
    QP2.style.backgroundColor="green";
    QP3.style.backgroundColor="red";

})

const QP3 = document.getElementById("QP3");
QP3.addEventListener("click", function(event){

    window.alert("Mauvaise Réponse !");
})

