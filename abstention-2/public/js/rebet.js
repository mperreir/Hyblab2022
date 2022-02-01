async function loadRebet() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Alors toujours sûr des 00% ?',
            style: 'sms-top sms-left',
            id: "",
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'J’attends que tu perdes pour manger :p',
            style: 'sms-bottom sms-left',
            id: "",
        },
        {
            type: 'button',
            text: 'Je reste sur ma décision ;)',
            id: 'keep-percentage-btn',
            style: ''
        },
        {
            type: 'button',
            text: 'Je rectifie mon pari',
            id: 'change-percentage-btn',
            style: ''
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'J’aurai fais pareil. Alors tu parierais sur combien? <br/> PS: Je mange saignant mon steak',
            id: "sms-keep-percentage-answer",
            style: 'sms-top sms-left sms-not-displayed'
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'D’accord on reste sur ça alors ;) J’aurai fais pareil.<br/>PS : Je mange saignant mon steak',
            id: "sms-change-percentage-answer",
            style: 'sms-bottom sms-left sms-not-displayed',
        },
        {
            type: 'number',
            style: 'sms-bottom sms-right'
        },
        {
            type: 'slider'
        },
        {
            type: "button",
            text: "Valider",
            id: "submit-percentage-btn",
            style: ""
        },
    ];


    const headerHtml = await loadTemplate('templates/header.ejs', {});
    container.innerHTML = headerHtml;
    date();

    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', {});
    document.getElementById('screen').innerHTML = screenHtml;

    let smsTread = document.getElementById('sms-tread');
    let smsHtml;

    const delay = 1000;
    let displayedSMSIndex = 0;

    for (const message of messages) {
        if (message.type === 'slider') {
            smsHtml = await loadTemplate('templates/sms/slider.ejs', {});
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


    let displayedSMSInterval = setInterval(displaySMS, delay);

    setTimeout(() => { pauseDisplaySMS() }, delay * 4);

    function displaySMS() {
        console.log(smsTread.children.item(displayedSMSIndex));
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        displayedSMSIndex++;
        if (displayedSMSIndex === messages.length) {
            clearInterval(displayedSMSInterval);
        }
    }

    function pauseDisplaySMS() {
        clearInterval(displayedSMSInterval);
    }

    document.getElementById('change-percentage-btn').addEventListener('click', async () => {
        displayedSMSInterval = setInterval(displaySMS, delay);
        document.getElementById('change-percentage-btn').disabled = true;
        document.getElementById('keep-percentage-btn').disabled = true;
        document.getElementById('change-percentage-btn').style.opacity = "50%";

        document.getElementById('sms-change-percentage-answer').style.display = "none";

        anime({
            targets: '.sms-tread>*',
            easing: 'easeInOutQuart',
            duration: delay * 3,
            delay: delay,
            keyframes: [
                { translateY: '-=' + getTranslateYSMS(smsTread, 0) },
                { translateY: '-=' + getTranslateYSMS(smsTread, 1) },
                { translateY: '-=' + getTranslateYSMS(smsTread, 2) },
            ],
        })
    });

    document.getElementById('keep-percentage-btn').addEventListener('click', async () => {
        // displayedSMSInterval = setInterval(displaySMS, delay / 3);
        displaySMS();
        displaySMS();
        // setTimeout(() => { pauseDisplaySMS() }, delay / 3 + 1);
        setTimeout(() => { loadFileExplorer() }, delay * 3);

        document.getElementById('keep-percentage-btn').disabled = true;
        document.getElementById('change-percentage-btn').disabled = true;

        document.getElementById('keep-percentage-btn').style.opacity = "50%";

        document.getElementById('sms-keep-percentage-answer').style.display = "none";

        anime({
            targets: '.sms-tread>*',
            easing: 'easeInOutQuart',
            duration: delay,
            keyframes: [
                { translateY: '-=' + getTranslateYSMS(smsTread, 0) },
            ],
        })
    });

    document.getElementById('submit-percentage-btn').addEventListener('click', async () => {
        percentageBet = document.getElementById("submit-percentage-btn").value;
        loadFileExplorer();
    });
}


