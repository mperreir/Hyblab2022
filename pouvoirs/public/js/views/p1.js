let boolp1 = true;

const diag = function(dBox, text) {
  dBox.style.display = "block";
  shakeElement(dBox);
  const textContainer = document.createElement("p");
  textContainer.innerHTML = text;
  dBox.appendChild(textContainer);
}


const init_p1 = function() {
 "use strict";

  if (boolp1) {
  boolp1 = False;

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
  slide.addEventListener('click', () => {
    animateLoading();
  })

  // info
  let state = 0;

  const infos = document.createElement("div");
  infos.style.height = '85%';
  css([infos], {
    'margin' : 'auto',
    'width' : '80%',
    'display' : 'flex',
    'justify-content' : 'space-evenly',
    'align-items' : 'start',
    'flex-direction' : 'column',
    'z-index' : '99'
  })
  const img = document.createElement("img");
  img.setAttribute("src", "img/elements/illu_p1.svg")
  img.setAttribute("height", "300px");


  let illustration = {
    illu: '300px',
    infos: '85%'
  }

  function animateLoading() {
    anime({
      targets: illustration,
      illu: '150px',
      infos: '55%',
      loop: false,
      easing: 'easeInOutCubic',
      update: function(anim) {
        img.style.height = illustration.illu;
        infos.style.height = illustration.infos;
      }
    })

    if (!wooshWasPlayed){
      wooshWasPlayed = true;
      woosh.play();
    }
  };


  const metabox = document.createElement("div");
  metabox.style.height = "auto";
  const diBox = document.createElement("div");
  metabox.appendChild(diBox);
  diBox.style.position = "relative";
  diBox.style.verticalAlign = "top";
  diBox.style.height = "288px";

  diBox.style.width = "100%";
  diBox.style.margin = "0px";
  
  const bubble = document.createElement("img");
  bubble.src = "img/dialogBoxes/advisor_xl.svg";
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
    x.style.height = "20px";
    x.style.position = "absolute";
    x.style.left = "-40%";
  })

  const buttons = document.createElement("div");
  buttons.classList.add("choices");
  buttons.style.height = "30%";
  var x1 = document.createElement("BUTTON");
  x1.innerHTML = "Je serai plus efficace en dirigeant seul.";
  var x2 = document.createElement("BUTTON");
  x2.innerHTML = "Je peux nommer un responsable.";
  var x3 = document.createElement("BUTTON");
  x3.innerHTML = "C'est mon gouvernement ! Je nomme tous ceux qui y siègent !"

  const t1 = "Mauvaise réponse ! La Vème république est une démocratie, et le Président ne peut pas..."
  const t2 = "Bonne réponse ! Le président nomme un Premier Ministre qui lui propose ensuite des mi...."
  const t3 = "Mauvaise réponse ! Il faut passer par un intermédiaire qui propose au président des ministres..."

  const colors = ["#FF2019", "#1be5b9", "#FF2019"];
  function changeText(nb, txt, btn) {
    if (state === nb){
      cancel.play();
      textContainer.innerHTML = originalText;
      btn.querySelector("img").remove();
      shakeElement(textContainer);
      btn.style.backgroundColor = "#6b00ee";
      state = 0;
    }
    else {
      [x1,x2,x3].forEach(x => {
        let circ = x.querySelector("img");
        if (circ != null){
          circ.remove();
        }
      });
      if (nb===2){
        goodAns.play();
        btn.appendChild(valid);
      }
      else{
        badAns.play();
        btn.appendChild(invalid);
      }
      x1.style.background= "#6b00ee";
      x2.style.background= "#6b00ee";
      x3.style.background= "#6b00ee";
      textContainer.innerHTML = txt;
      shakeElement(textContainer);
      btn.style.backgroundColor = colors[nb-1];
      state = nb;
    }

  }

  x1.addEventListener("click", () => changeText(1, t1, x1));
  x2.addEventListener("click", () => changeText(2, t2, x2));
  x3.addEventListener("click", () => changeText(3, t3, x3));

  css([x1, x2, x3], {
    'background-color' : '#6b00ee',
    'color' : 'white',
    'width' : '80%',
    'height' : '50px',
    'padding': '10px 20px',
    'margin': '5% auto',
    'display' : 'block',
    'border': 'none',
    'border-radius': '12px',
  })
  x3.style.height = "70px";


  buttons.appendChild(x1);
  buttons.appendChild(x2);
  buttons.appendChild(x3);



  slide.appendChild(infos);
  slide.appendChild(buttons);
}
}