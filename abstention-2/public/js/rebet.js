async function loadRebet() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Alors toujours sûr des 00% ?',
            style: 'sms-top sms-left'
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'J’attends que tu perdes pour manger :p',
            style: 'sms-bottom sms-left'
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
            message: 'J’aurai fait pareil. Alors tu parierais sur combien? <br/> PS: Je mange saignant mon steak',
            style: 'sms-top sms-left'
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'D’accord on reste sur ça alors ;) J’aurai fait pareil.<br/>PS : Je mange saignant mon steak',
            style: 'sms-bottom sms-left'
        },
        {
            type: 'number',
            style: 'sms-bottom sms-right'
        },
        {
            type: 'slider'
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



    anime({
        targets: '.sms-tread>*',
        easing: 'easeInOutQuart',
        duration: delay * 4,
        delay: delay * 5,
        keyframes: [
            { translateY: '-=' + getTranslateYSMS(smsTread, 0) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 1) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 2) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 3) },
            { translateY: '-=' + getTranslateYSMS(smsTread, 4) },
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


