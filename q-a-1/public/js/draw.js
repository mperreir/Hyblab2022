
const activateur = document.getElementById("activateur");
const activateur2 = document.getElementById("activateur2")

const svg=document.getElementById("svg1");
const svg2=document.getElementById("svg2");

activateur.addEventListener('click',function(){
    
    
    svg.classList.add("dessin_rond");
})

svg.addEventListener('click',function(){
    
    
    svg.classList.add("dessin_rond");
})

activateur2.addEventListener('click',function(){
    
    console.log("test");
    svg2.classList.add("dessin_rond");
})

svg2.addEventListener('click',function(){
    
    
    svg2.classList.add("dessin_rond");
})

