

const footer = document.querySelector('footer');
  
const button_first_choice = document.createElement('button');
button_first_choice.textContent = "Retour";
button_first_choice.classList.add("blue");
  
const button_second_choice = document.createElement('button');
button_second_choice.textContent = "Suivant";
button_second_choice.classList.add("blue");
  
  
footer.appendChild(button_first_choice);
footer.appendChild(button_second_choice);

const logo = document.getElementById("logo");
const img = document.createElement("img");
img.src = "img/logo/logo first.svg";
img.id = "ok";
logo.appendChild(img);