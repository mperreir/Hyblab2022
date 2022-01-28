
const container = document.getElementById("first-section");
container.style.backgroundColor = "#EC8989";

const footer = document.querySelector('footer');

  
const button_first_procuration = document.createElement('button');
button_first_procuration.textContent = "Vote";
button_first_procuration.style.color = "#EC8989";
button_first_procuration.classList.add("red");
  
const button_second_procuration = document.createElement('button');
button_second_procuration.textContent = "Vote Blanc";
button_second_procuration.style.color = "#EC8989";
button_second_procuration.classList.add("red");

const logo = document.getElementById("logo");
const img = document.createElement("img");
img.src = "img/logo/logo rouge.svg";
img.id = "ok";
logo.appendChild(img);
  
footer.appendChild(button_first_procuration);
footer.appendChild(button_second_procuration);

