
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

const Croix1 =document.getElementById("Croix1");
const Croix2 =document.getElementById("Croix2");
const Croix3 =document.getElementById("Croix3");
const Croix4 =document.getElementById("Croix4");

const False1=document.getElementById("False1");
const False2=document.getElementById("False2");
const False3=document.getElementById("False3");
const False4=document.getElementById("False4");

Croix1.addEventListener('click', function()
{
    Croix1.classList.add("dessin_croix");
    
})

False1.addEventListener("click", function()
{
    Croix1.classList.add("dessin_croix");
})

Croix2.addEventListener('click', function()
{
    Croix2.classList.add("dessin_croix");
});

False2.addEventListener('click', function()
{
    Croix2.classList.add("dessin_croix");
})

Croix3.addEventListener("click", function()
{
    Croix3.classList.add("dessin_croix");
})

False3.addEventListener('click', function()
{
    Croix3.classList.add("dessin-croix");
})

Croix4.addEventListener('click', function()
{
    Croix4.classList.add("dessin_croix");
})

False1.addEventListener('click', function()
{
    Croix4.classList.add("dessin_croix");
})

