async function loadEnd() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Tu me dois un restaurant ! Tu pourras retenter de parier pour 2022 ! Hésite pas à faire passer ce pari à d’autres collègues et tes amis pour voir qui s’y connaissent !',
            style: 'sms-top sms-left sms-visible'
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Trop fort ! Je pensais pas que tut’y connaissais autant ! Je te dois un repas.Hésite pas à faire passer ce pari à d’autres collègues et tes amis pour voir qui s’y connaissent !',
            style: 'sms-bottom sms-left sms-visible'
        }
    ];


    const headerHtml = await loadTemplate('templates/header.ejs', {});
    container.innerHTML = headerHtml;
    date();

    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', {});
    document.getElementById('screen').innerHTML = screenHtml;

    let smsTread = document.getElementById('sms-tread');
    let smsHtml;

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
}