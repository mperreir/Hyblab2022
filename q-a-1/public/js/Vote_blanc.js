const C1 = document.getElementById("C1");
C1.addEventListener("click", function(event){

    window.alert("Aïe Aïe Aïe ce n'est pas la bonne réponse ! ")
    C1.style.backgroundColor = "red";
})

const C2 = document.getElementById("C2");
C2.addEventListener("click", function(event){

    window.alert("Bien joué champion, c'est la bonne réponse ! ")
    C1.style.backgroundColor = "red";
    C2.style.backgroundColor = "green";
    C3.style.backgroundColor = "red";

})

const C3 = document.getElementById("C3");
C3.addEventListener("click", function(event){

    window.alert("Aïe Aïe Aïe ce n'est pas la bonne réponse ! ")
    C3.style.backgroundColor = "red";
})

const C4 = document.getElementById("C4");
C4.addEventListener("click", function(event){
    C4.style.backgroundColor = "red";
    window.alert("Aïe Aïe Aïe ce n'est pas la bonne réponse ! ")
})

const C5 = document.getElementById("C5");
C5.addEventListener("click", function(event){
    
    C5.style.backgroundColor = "red";
    window.alert("Aïe Aïe Aïe ce n'est pas la bonne réponse !")
})

const C6 = document.getElementById("C6");
C6.addEventListener("click", function(event){

    window.alert("Bien joué champion, c'est la bonne réponse !")
    C4.style.backgroundColor = "red";
    C5.style.backgroundColor = "red";
    C6.style.backgroundColor = "green";
    
})