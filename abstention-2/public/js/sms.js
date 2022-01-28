"use strict";

async function smsScreen() {
    const container = document.getElementById("container");

    const messages = {
        messages:
            [{
                sender: "+33* ** ** ** **",
                message: "Salut ! C’est <strong>Thomas</strong>.<br/> Je suis ton nouveau <strong> collègue </strong>.",
                style: "sms-bottom"
            }, {
                sender: "THOMAS",
                message: "J’ai vu qu’on allait travailler <strong>ensemble</strong> sur le nouvel article de \“<strong>pour cent magazine</strong>\” !",
                style: "sms-center"
            }, {
                sender: "THOMAS",
                message: "C’est sur l’<strong>abstention</strong>, trop <strong>intéressant</strong> ! Tu as vu les chiffres de 2017 ? :D",
                style: "sms-top"
            }, {
                sender: "MOI",
                message: "Hey Thomas ! Content de bosser avec toi !Non, je n’ai pas vu les chiffres, pourquoi ? :)",
                style: "sms-bottom"

            }, {
                sender: "THOMAS",
                message: "OK c’est parti pour « Nom de la ville » ! Alors tu paries combien ? Ne t’inquiète pas... On arrondit à 5%.",
                style: "sms-bottom"

            }
            ]
    }

    const headerHtml = await loadTemplate('templates/header.ejs', []);
    container.innerHTML = headerHtml;
    date();
    // const screenHtml = await loadTemplate('templates/sms/sms.ejs', messages);
    // document.getElementById('screen').innerHTML = screenHtml;
    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', messages.messages[0]);
    document.getElementById('screen').innerHTML = screenHtml;

    let screenHtml = await loadTemplate('templates/sms/sms.ejs', messages.messages[0]);
    document.getElementById('screen').innerHTML = screenHtml;

    screenHtml = await loadTemplate('templates/sms/sms.ejs', messages.messages[1]);
    document.getElementById('screen').insertAdjacentHTML('beforeend', screenHtml);
    screenHtml = await loadTemplate('templates/sms/sms.ejs', messages.messages[2]);
    document.getElementById('screen').insertAdjacentHTML('beforeend', screenHtml);


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
