"use strict";
const diag = function(dBox, text) {
  dBox.style.display = "block";
  shakeElement(dBox);
  const textContainer = document.createElement("p");
  textContainer.innerHTML = text;
  dBox.appendChild(textContainer);
}


const init_p1 = function() {

 swiper.disable();

  function css(elements, style) {
    elements.forEach(element => {
      for (const property in style)
      element.style[property] = style[property];
    })
  }

  const woosh = createAudio("data/sounds/swoosh.mp3", false,0.7, 1);
  const goodAns = createAudio("data/sounds/good_choice.mp3", false,0.7, 1);
  const badAns = createAudio("data/sounds/bad_choice.mp3", false,0.7, 1);
  const cancel = createAudio("data/sounds/cancel.wav", false,0.7, 1);
  let wooshWasPlayed = false;

  const slide = document.getElementById("p1");


  // info
  let state = 0;

  const infos = document.createElement("div");
  infos.style.height = '85%';
  css([infos], {
    'margin' : 'auto',
    'width' : '80%',
    'display' : 'flex',
    'justify-content' : 'space-evenly ',
    'align-items' : 'center',
    'flex-direction' : 'column',
    'z-index' : '99'
  })
  const img = document.createElement("img");
  img.setAttribute("src", "img/elements/illu_p1.svg")
  img.style.height = "40%";


  let illustration = {
    illu: '40%',
    infos: '85%'
  }

  function animateLoading() {
    slide.removeEventListener('click', animateLoading);
    anime({
      targets: illustration,
      infos: '55%',
      loop: false,
      easing: 'easeInOutCubic',
      update: function(anim) {
        infos.style.height = illustration.infos;
      }
    })
    if (!wooshWasPlayed){
      wooshWasPlayed = true;
      woosh.play();
    }
  };

  setTimeout(animateLoading, 2000);
  slide.addEventListener('click', animateLoading);

  const metabox = document.createElement("div");
  const diBox = document.createElement("div");
  metabox.appendChild(diBox);
  diBox.style.position = "relative";

  diBox.style.width = "100%";
  diBox.style.margin = "0px";
  
  const bubble = document.createElement("img");
  bubble.src = "img/dialogBoxes/advisor_xl.svg";
  bubble.style.verticalAlign = "top";
  // diBox.style.height = bubble.clientHeight;
  diBox.appendChild(bubble);
  const originalText = "Moua est accueilli par un membre de l'Élysée. Le conseiller de l'ex président lui demande : </br><br><b>Comment souhaitez-vous gérer la France pendant l'absence momentanée du Président ?</b>";
  
  diag(diBox, originalText);
  const textContainer = diBox.querySelector("p");
  css([textContainer], {
    'font-size' : '16%',
    'font-family' : 'Nunito',
    'text-align' : 'justify', 
    'vertical-align' : 'center',
    'top' : '35px',
    'position' : 'absolute',
    'width' : '80%',
    'left' : '10%',
    'margin' : 'auto'
  })



  infos.appendChild(img);

  infos.appendChild(metabox);


  // buttons

  const valid = document.createElement('img');
  valid.src = "img/elements/button_valid.svg";
  const invalid = document.createElement('img');
  invalid.src = "img/elements/button_invalid.svg";
  [valid, invalid].forEach(x => {
    x.style.height = "50%";
    x.style.position = "absolute";
    x.style.left = "-50%";
    x.style.top = "25%"
  })

  const buttons = document.createElement("div");
  buttons.classList.add("choices");
  buttons.style.height = "25%";
  // buttons.style.overflow = "auto";
  var x1 = document.createElement("BUTTON");
  x1.innerHTML = "Je serai plus efficace en dirigeant seul.";
  var x2 = document.createElement("BUTTON");
  x2.innerHTML = "Je peux nommer un responsable.";

  const t1 = "Mauvaise réponse ! La Vème république est une démocratie, et le Président ne peut pas...";
  const t2 = "Bonne réponse ! Le président nomme un Premier Ministre qui lui propose ensuite des mi....";

  const colors = ["#FF2019", "#1be5b9"];
  function changeText(nb, txt, btn) {
    if (state === nb){
      swiper.disable();
      cancel.play();
      textContainer.innerHTML = originalText;
      btn.querySelector("img").remove();
      btn.style.backgroundColor = "#D4C2F0";
      state = 0;
    }
    else {
      [x1,x2].forEach(x => {
        let circ = x.querySelector("img");
        if (circ != null){
          circ.remove();
        }
      });
      if (nb===2){
        goodAns.play();
        btn.appendChild(valid);
        swiper.enable();
      }
      else{
        swiper.disable();
        badAns.play();
        btn.appendChild(invalid);
        shakeElement(diBox);
      }
      x1.style.background= "#D4C2F0";
      x2.style.background= "#D4C2F0";
      textContainer.innerHTML = txt;
      btn.style.backgroundColor = colors[nb-1];
      state = nb;
    }

  }

  x1.addEventListener("click", () => changeText(1, t1, x1));
  x2.addEventListener("click", () => changeText(2, t2, x2));

  css([x1, x2], {
    'background-color' : '#D4C2F0',
    'font-size' : '25%',
    'color' : 'white',
    'width' : '80%',
    'height' : '45%',
    'padding': '0px 20px',
    'margin': '2.5% auto',
    'display' : 'block',
    'border': 'none',
    'border-radius': '12px',
    'position' : 'relative',
    'box-sizing': 'border-box',
    '-moz-box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    'vertical-align' : 'middle'
  })


  buttons.appendChild(x1);
  buttons.appendChild(x2);


  slide.appendChild(infos);
  slide.appendChild(buttons);
}