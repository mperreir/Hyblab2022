

const footer = document.querySelector('footer');
  
const button_first_choice = document.createElement('button');
button_first_choice.textContent = "PROCURATION";
button_first_choice.classList.add("blue");
  
const button_second_choice = document.createElement('button');
button_second_choice.textContent = "BUREAU DE VOTE";
button_second_choice.classList.add("blue");
  
  
footer.appendChild(button_first_choice);
footer.appendChild(button_second_choice);
