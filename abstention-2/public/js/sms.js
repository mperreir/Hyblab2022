"use strict";

let selectedCity;
let percentageBet;

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
            message: "OK c’est parti pour <span id='sms-text-city-name'></span>  ! Alors tu paries combien ? Ne t’inquiète pas... On arrondit à 5%.",
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
            type: "button",
            text: "Valider",
            id: "choose-percentage-btn",
            style: ""
        },
        {
            type: "sms",
            sender: "Thomas",
            message: "<strong><span id='sms-text-percentage'></span>% retenu !</strong> Aller amuse toi bien ! Télécharge les dossiers pour avoir les infos ! On se tient au courant pour le repas ahah",
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

    const delay = 200;
    let displayedSMSIndex = 0;

    await createSMSElements(messages, smsTread);


    const smsScrollingAnimation = anime({
        targets: '.sms-tread>*',
        easing: 'easeInOutQuart',
        duration: delay * 10,
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
            { translateY: '-=' + getTranslateYSMS(smsTread, 9) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 10) }
        ],
    })

    let displayedSMSInterval = setInterval(displaySMS, delay);

    setTimeout(() => { smsScrollingAnimation.pause(); pauseDisplaySMS() }, delay * 8);

    function displaySMS() {
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        console.log(displayedSMSIndex);
        displayedSMSIndex++;
        if (displayedSMSIndex === messages.length) {
            clearInterval(displayedSMSInterval);
        }
    }

    function pauseDisplaySMS() {
        clearInterval(displayedSMSInterval);
    }

    document.getElementById('random-city-btn').addEventListener('click', async () => {
        selectedCity = await pickRandomCity();
        displayedSMSInterval = setInterval(displaySMS, delay);
        console.log(selectedCity);
        smsScrollingAnimation.play();
        document.getElementById('random-city-btn').disabled = true;
        document.getElementById('sms-text-city-name').innerHTML = selectedCity;

        setTimeout(() => { smsScrollingAnimation.pause(); pauseDisplaySMS() }, delay * 4);

    })

    document.getElementById('choose-percentage-btn').addEventListener('click', async () => {
        percentageBet = document.getElementById("sms-slider-input").value;
        displayedSMSInterval = setInterval(displaySMS, delay);
        document.getElementById('random-city-btn').disabled = true;
        document.getElementById('sms-text-percentage').innerHTML = percentageBet;
        smsScrollingAnimation.play();

    })

    document.getElementById('download-btn').addEventListener('click', async () => {
        loadFileExplorer();

    })

}

async function pickRandomCity() {
    const source = await fetch('api/cities');
    const data = await source.json();

    return data[Math.floor(Math.random() * data.length)];
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


async function createSMSElements(messages, smsTread) {
    let smsHtml;
    for (const message of messages) {
        if (message.type === 'slider') {
            smsHtml = await loadTemplate('templates/sms/slider.ejs', []);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
            handleSlider();
        }
        else if (message.type === 'button') {
            smsHtml = await loadTemplate('templates/sms/button.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
            console.log(smsHtml);
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
}



