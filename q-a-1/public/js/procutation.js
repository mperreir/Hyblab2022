
const footer = document.querySelector('footer');
  
const button_first_choice = document.createElement('button');
button_first_choice.textContent = "A remplir";
button_first_choice.classList.add("red");
  
const button_second_choice = document.createElement('button');
button_second_choice.textContent = "A remplir";
button_second_choice.classList.add("red");

const logo = document.getElementById("logo");
const img = document.createElement("img");
img.src = "img/logo/logo rouge.svg";
img.id = "ok_procuration";
logo.appendChild(img);
  
footer.appendChild(button_first_choice);
footer.appendChild(button_second_choice);

