"use strict";

async function loadSms() {
    const container = document.getElementById("container");

    const messages =

        [{
            type: "sms",
            sender: "+33* ** ** ** **",
            message: "Salut ! C’est <strong>Thomas</strong>.<br/> Je suis ton nouveau <strong> collègue </strong>.",
            style: "sms-bottom sms-left"
        },
        {
            type: "sms",
            sender: "THOMAS",
            message: "J’ai vu qu’on allait travailler <strong>ensemble</strong> sur le nouvel article de \“<strong>pour cent magazine</strong>\” !",
            style: "sms-center sms-left"
        }, {
            type: "sms",
            sender: "THOMAS",
            message: "C’est sur l’<strong>abstention</strong>, trop <strong>intéressant</strong> ! Tu as vu les chiffres de 2017 ? :D",
            style: "sms-top sms-left"
        },
        {
            type: "sms",
            sender: "MOI",
            message: "Hey Thomas ! Content de bosser avec toi !Non, je n’ai pas vu les chiffres, pourquoi ? :)",
            style: "sms-bottom sms-right"
        }, {
            type: "sms",
            sender: "THOMAS",
            message: "Ça tombe bien ! Je te pari le repas de ce midi que tu devineras jamais le pourcentage !",
            style: "sms-top sms-left"
        }, {
            type: "sms",
            sender: "THOMAS",
            message: "Alors avec quelle ville veux-tu jouer ? ",
            style: "sms-bottom sms-left"

        },
        {
            type: "button",
            text: "Ville aléatoire",
            id: "random-city-btn",
            style: ""
        },
        {
            type: "button",
            text: "Choisi ta ville",
            id: "choose-city-btn",
            style: ""
        },
        {
            type: "sms",
            sender: "THOMAS",
            message: "OK c’est parti pour « Nom de la ville » ! Alors tu paries combien ? Ne t’inquiète pas... On arrondit à 5%.",
            style: "sms-bottom sms-left"

        },
        {
            type: "number",
            style: "sms-bottom sms-right"
        },
        {
            type: "slider"
        },
        {
            type: "sms",
            sender: "Thomas",
            message: "\"pourcentage\” retenu ! Aller amuse toi bien ! Télécharge les dossiers pour avoir les infos ! On se tient au courant pour le repas ahah",
            style: "sms-bottom sms-left"
        },
        {
            type: "button",
            text: "Télécharger",
            id: "download-btn",
            style: "sms-button-blue"
        },
        ];


    const headerHtml = await loadTemplate('templates/header.ejs', []);
    container.innerHTML = headerHtml;
    date();

    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', []);
    document.getElementById('screen').innerHTML = screenHtml;

    let smsTread = document.getElementById('sms-tread');
    let smsHtml;

    const delay = 1000;
    let displayedSMSIndex = 0;

    for (const message of messages) {
        if (message.type === 'slider') {
            smsHtml = await loadTemplate('templates/sms/slider.ejs', []);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
            handleSlider();
        }
        else if (message.type === 'button') {
            smsHtml = await loadTemplate('templates/sms/button.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
        else if (message.type === 'number') {
            smsHtml = await loadTemplate('templates/sms/number.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
        else {
            smsHtml = await loadTemplate('templates/sms/sms.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
    }


    anime({
        targets: '.sms-tread>*',
        easing: 'easeInOutQuart',
        duration: delay * 9,
        delay: delay * 4,
        keyframes: [
            { translateY: '-=' + getTranslateYSMS(smsTread, 0) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 1) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 2) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 3) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 4) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 5) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 6) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 8) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 9) }
        ],
    })

    const displayedSMSInterval = setInterval(displaySMS, delay);

    function displaySMS() {
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        displayedSMSIndex++;
        if (displayedSMSIndex === messages.length) {
            clearInterval(displayedSMSInterval);
        }
    }
}


function getTranslateYSMS(smsTread, i) {
    const boundingRect = smsTread.children.item(smsTread.children.length - i - 1).getBoundingClientRect();
    return (boundingRect.bottom - boundingRect.top + 40);
}


function handleSlider() {
    const slider = document.getElementById("sms-slider-input");
    const min = slider.min
    const max = slider.max
    const value = slider.value

    const numberDiv = document.getElementById("sms-number");
    numberDiv.innerHTML = slider.value + "%";

    slider.style.background = `linear-gradient(to right, #e4e5fa 0%, #e4e5fa ${(value - min) / (max - min) * 100}%, #e4e5fa56 ${(value - min) / (max - min) * 100}%, #e4e5fa56 100%)`

    slider.oninput = function (e) {
        this.style.background = `linear-gradient(to right, #e4e5fa 0%, #e4e5fa ${(this.value - this.min) / (this.max - this.min) * 100}%, #e4e5fa56 ${(this.value - this.min) / (this.max - this.min) * 100}%, #e4e5fa56 100%)`;

        numberDiv.innerHTML = e.target.value + "%";

    };

}

// let sms = function () {
//   let smsScreen = document.querySelector('.screen')
//   let loadingText = '<b>•</b><b>•</b><b>•</b>';
//   let typingSpeed = 20;
//   let messages = [
//     'Hey there 👋',
//     'Test',
//     'mission 35',
//   ]
//   let createBubbleElements = function (message, position) {
//     let bubbleEl = document.createElement('div');
//     let messageEl = document.createElement('span');
//     let loadingEl = document.createElement('span');
//     bubbleEl.classList.add('bubble');
//     bubbleEl.classList.add('is-loading');
//     bubbleEl.classList.add('cornered');
//     bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
//     messageEl.classList.add('message');
//     loadingEl.classList.add('loading');
//     messageEl.innerHTML = message;
//     loadingEl.innerHTML = loadingText;
//     bubbleEl.appendChild(loadingEl);
//     bubbleEl.appendChild(messageEl);
//     bubbleEl.style.opacity = 0;
//     return {
//       bubble: bubbleEl,
//       message: messageEl,
//       loading: loadingEl
//     }
//   }

//   let sendMessage = function (message, position) {
//     let loadingDuration = (message.length * typingSpeed) + 500;//500 durée fixe min
//     let element = createBubbleElements(message, position)
//     smsScreen.appendChild(element.bubble)
//     smsScreen.appendChild(document.createElement('br'))
//     element.bubble.style.width = '20px'
//     element.bubble.style.height = '20px'
//     element.message.style.width = '20px'
//     element.message.style.height = '20px'
//     element.bubble.style.opacity = 1;

//     //animations 4 etapes
//     let bubbleSize = anime({
//       targets: elements.bubble,
//       width: ['0rem', dimensions.loading.w],
//       marginTop: ['2.5rem', 0],
//       marginLeft: ['-2.5rem', 0],
//       duration: 800,
//       easing: 'easeOutElastic'
//     });
//     let loadingLoop = anime({
//       targets: elements.bubble,
//       scale: [1.05, .95],
//       duration: 1100,
//       loop: true,
//       direction: 'alternate',
//       easing: 'easeInOutQuad'
//     });
//     let dotsStart = anime({
//       targets: elements.loading,
//       translateX: ['-2rem', '0rem'],
//       scale: [.5, 1],
//       duration: 400,
//       delay: 25,
//       easing: 'easeOutElastic',
//     });
//     let dotsPulse = anime({
//       targets: elements.bubble.querySelectorAll('b'),
//       scale: [1, 1.25],
//       opacity: [.5, 1],
//       duration: 300,
//       loop: true,
//       direction: 'alternate',
//       delay: function (i) { return (i * 100) + 50 }
//     });
//     setTimeout(function () {
//       loadingLoop.pause();
//       dotsPulse.restart({
//         opacity: 0,
//         scale: 0,
//         loop: false,
//         direction: 'forwards',
//         update: function (a) {
//           if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
//             elements.bubble.classList.remove('is-loading');
//             anime({
//               targets: elements.message,
//               opacity: [0, 1],
//               duration: 300,
//             });
//           }
//         }
//       });
//       bubbleSize.restart({
//         scale: 1,
//         width: [dimensions.loading.w, dimensions.bubble.w],
//         height: [dimensions.loading.h, dimensions.bubble.h],
//         marginTop: 0,
//         marginLeft: 0,
//         begin: function () {
//           if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
//         }
//       })
//     }, loadingDuration - 50);
//   }

//   let sendMessages = function () {
//     for (let index = 0; index < messages.length; index++) {
//       const message = messages[index];
//       sendMessage(message);
//       setTimeout(sendMessages, (message.length * typingSpeed) + anime.random(900, 1200));
//     }
//   }
//   sendMessages();
// }
