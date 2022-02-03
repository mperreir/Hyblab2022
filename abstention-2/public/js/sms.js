"use strict";

let selectedCity;
let percentageBet = 50;;

async function loadSms() {
    const citiesRq = await fetch('api/cities/');
    citiesMap = await citiesRq.json();
    const container = document.getElementById('container');

    const messages =
        [{
            type: "sms",
            sender: "+33* ** ** ** **",
            message: "Salut ! C’est <strong>Thomas</strong>.<br/> Je suis ton nouveau <strong> collègue </strong>.",
            style: "sms-bottom sms-left",
            id: "",
        },
        {
            type: "sms",
            sender: "THOMAS",
            message: "J’ai vu qu’on allait travailler <strong>ensemble</strong> sur le nouvel article de \“<strong>pour cent magazine</strong>\” !",
            style: "sms-center sms-left",
            id: "",
        }, {
            type: "sms",
            sender: "THOMAS",
            message: "C’est sur l’<strong>abstention</strong>, trop <strong>intéressant</strong> ! Tu as vu les chiffres de 2017 ? :D",
            style: "sms-top sms-left",
            id: "",
        },
        {
            type: "sms",
            sender: "MOI",
            message: "Hey Thomas ! Content de bosser avec toi ! Non, je n’ai pas vu les chiffres, pourquoi ? :)",
            id: "",
            style: "sms-bottom sms-right",

        }, {
            type: "sms",
            sender: "THOMAS",
            message: "Ça tombe bien ! Je te parie le repas de ce midi que tu devineras jamais le pourcentage de non votants !",
            style: "sms-top sms-left",
            id: "",
        }, {
            type: "sms",
            sender: "THOMAS",
            message: "Alors avec quelle ville veux-tu jouer ? ",
            style: "sms-bottom sms-left",
            id: "",

        },
        {
            type: "button",
            text: "Ville aléatoire",
            id: "random-city-btn",
            style: "",
        },
        {
            type: "button",
            text: "Choisis ta ville",
            id: "choose-city-btn",
            style: "",
        },
        {
            type: "city-search",
            style: "",
        },
        {
            type: "sms",
            sender: "THOMAS",
            message: "OK c’est parti pour <span id='sms-text-city-name'></span> ! Alors tu paries combien ? Ne t’inquiète pas... On arrondit à 5%.",
            style: "sms-bottom sms-left",
            id: "",
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
            message: "<strong><span id='sms-text-percentage'></span>% retenu !</strong> Allez amuse toi bien ! Télécharge les dossiers pour avoir les infos ! On se tient au courant pour le repas ahah",
            style: "sms-bottom sms-left",
            id: "",
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

    let smsTreadBtnHtml = await loadTemplate('templates/sms/sms_tread_button.ejs', []);
    document.getElementById('screen').insertAdjacentHTML('beforeend', smsTreadBtnHtml);


    let smsTread = document.getElementById('sms-tread');
    let displayedSMSIndex = 0;

    await createSMSElements(messages, smsTread);
    let smsTreadButton = document.getElementById("sms-tread-btn");

    displaySMS();

    smsTreadButton.addEventListener("click", () => {
        displaySMS();
    });



    function displaySMS() {
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        if (displayedSMSIndex === 6) {

            smsTreadButton.disabled = true;

            smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
            smsTread.children.item(displayedSMSIndex + 1).style.visibility = 'visible';
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) + getTranslateYSMS(smsTread, displayedSMSIndex + 1)),
            });
            displayedSMSIndex++;

        } else if (displayedSMSIndex === 10) {
            smsTreadButton.disabled = true;
            smsTread.children.item(displayedSMSIndex + 1).style.visibility = 'visible';
            smsTread.children.item(displayedSMSIndex + 2).style.visibility = 'visible';
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) + getTranslateYSMS(smsTread, displayedSMSIndex + 1) + getTranslateYSMS(smsTread, displayedSMSIndex + 2)),
            });
            displayedSMSIndex++;
            displayedSMSIndex++;
        } else if (displayedSMSIndex === 13) {
            smsTreadButton.disabled = true;
            smsTread.children.item(displayedSMSIndex + 1).style.visibility = 'visible';
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) + getTranslateYSMS(smsTread, displayedSMSIndex + 1)),
            });
            displayedSMSIndex++;
        } else if (displayedSMSIndex >= 4) {
            smsTreadButton.disabled = true;
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + getTranslateYSMS(smsTread, displayedSMSIndex),
                complete: () => {
                    if (displayedSMSIndex !== 9) {
                        smsTreadButton.disabled = false;

                    }
                }
            });
        }
        console.log(displayedSMSIndex);
        console.log(smsTread.children.item(displayedSMSIndex));

        displayedSMSIndex++;
    }

    document.getElementById('random-city-btn').addEventListener('click', async () => {
        selectedCity = await pickRandomCity();
        document.getElementById('random-city-btn').disabled = true;
        document.getElementById('choose-city-btn').disabled = true;
        document.getElementById('sms-text-city-name').innerHTML = citiesMap[selectedCity];
        document.getElementById('random-city-btn').style.opacity = "50%";
        displayedSMSIndex++;
        displaySMS();
    });

    document.getElementById('choose-city-btn').addEventListener('click', async () => {
        document.getElementById('sms-city-search').style.display = 'block';
        document.getElementById('choose-city-btn').disabled = true;
        document.getElementById('choose-city-btn').style.opacity = "50%";

        anime({
            targets: '.sms-tread>*',
            easing: 'easeInOutQuart',
            duration: 1000,
            translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) + 40),
            complete: () => {
                smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';

            }
        });
    });

    const autoComplete = handleCitySearch()
    autoComplete.input.addEventListener("selection", function (event) {
        const feedback = event.detail;
        // Prepare User's Selected Value
        const selection = feedback.selection.value;
        // Replace Input value with the selected value
        autoComplete.input.value = selection;
        selectedCity = Object.keys(citiesMap).find(key => citiesMap[key] === selection);
        console.log(selectedCity);

        document.getElementById('sms-text-city-name').innerHTML = selection;
        displayedSMSIndex++;
        displaySMS();
    });


    document.getElementById('choose-percentage-btn').addEventListener('click', async () => {
        percentageBet = document.getElementById("sms-slider-input").value;
        document.getElementById('choose-percentage-btn').disabled = true;
        document.getElementById('sms-text-percentage').innerHTML = percentageBet;
        displaySMS();
    });

    document.getElementById('download-btn').addEventListener('click', async () => {
        loadPresVille();
    });
}

async function pickRandomCity() {
    return Object.keys(citiesMap)[Math.floor(Math.random() * Object.keys(citiesMap).length)];
}


function getTranslateYSMS(smsTread, i) {
    const boundingRect = smsTread.children.item(i).getBoundingClientRect();
    return (boundingRect.bottom - boundingRect.top + 40);
}


function handleSlider() {
    const slider = document.getElementById("sms-slider-input");
    slider.value = percentageBet;
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
        }
        else if (message.type === 'number') {
            smsHtml = await loadTemplate('templates/sms/number.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
        else if (message.type === 'city-search') {
            smsHtml = await loadTemplate('templates/sms/city_search.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        } else if (message.type === 'image') {
            smsHtml = await loadTemplate('templates/sms/sms_img.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        } else if (message.type === 'image2') {
            smsHtml = await loadTemplate('templates/sms/sms_img2.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        } else if (message.type === 'image4') {
            smsHtml = await loadTemplate('templates/sms/sms_img4.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
        else {
            smsHtml = await loadTemplate('templates/sms/sms.ejs', message);
            smsTread.insertAdjacentHTML('beforeend', smsHtml);
        }
    }
}