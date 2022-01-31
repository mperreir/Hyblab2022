const init_p3 = function() {
 "use strict";

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

  const slide = document.getElementById("p3");
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
    'align-items' : 'center',
    'flex-direction' : 'column',
    'z-index' : '99'
  })
  const img = document.createElement("img");
  img.setAttribute("src", "img/elements/illu_p3.svg")
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
  diBox.style.height = "125px";

  diBox.style.width = "100%";
  diBox.style.margin = "0px auto";


  const bubble = document.createElement("img");
  bubble.src = "img/dialogBoxes/primeMinister_m.svg";
  diBox.appendChild(bubble);
  const originalText = "Une majorité de députés de votre camp n’est pas d’accord avec votre politique et a rallié l’opposition. Tous vos projets de loi sont bloqués. Que peux-tu faire ?";
  
  diag(diBox, originalText);
  const textContainer = diBox.querySelector("p");
  css([textContainer], {
    'font-size' : '16%',
    'font-family' : 'Nunito',
    'text-align' : 'justify', 
    'vertical-align' : 'center',
    'top' : '20px',
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
    x.style.left = "-50%";
    x.style.top = "15px"
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

  const colors = ["red", "#1be5b9", "red"];
  function changeText(nb, txt, btn) {
    if (state === nb){
      cancel.play();
      textContainer.innerHTML = originalText;
      btn.querySelector("img").remove();
      // shakeElement(diBox);
      btn.style.backgroundColor = "#D4C2F0";
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
        shakeElement(diBox);
      }
      x1.style.background= "#D4C2F0";
      x2.style.background= "#D4C2F0";
      x3.style.background= "#D4C2F0";
      textContainer.innerHTML = txt;
      btn.style.backgroundColor = colors[nb-1];
      state = nb;
    }

  }

  x1.addEventListener("click", () => changeText(1, t1, x1));
  x2.addEventListener("click", () => changeText(2, t2, x2));
  x3.addEventListener("click", () => changeText(3, t3, x3));

  css([x1, x2, x3], {
    'background-color' : '#D4C2F0',
    'color' : 'white',
    'width' : '80%',
    'height' : '50px',
    'padding': '10px 20px',
    'margin': '2% auto',
    'display' : 'block',
    'border': 'none',
    'border-radius': '12px',
    'position' : 'relative'
  })


  buttons.appendChild(x1);
  buttons.appendChild(x2);
  buttons.appendChild(x3);



  slide.appendChild(infos);
  slide.appendChild(buttons);
}