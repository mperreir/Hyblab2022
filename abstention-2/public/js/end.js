async function loadEnd() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Tu me dois un restaurant ! Tu pourras retenter de parier pour 2022 ! Hésite pas à faire passer ce pari à d’autres collègues et à tes amis pour voir ceux qui s’y connaissent !',
            style: 'sms-top sms-left sms-visible'
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Trop fort ! Je pensais pas que tut’y connaissais autant ! Je te dois un repas. Hésite pas à faire passer ce pari à d’autres collègues et à tes amis pour voir ceux qui s’y connaissent !',
            style: 'sms-bottom sms-left sms-visible'
        },
        {
            type: "sms",
            sender: "CREDITS",
            message: "<strong>Porteur de projet :</strong> <br> Denis Vannier <br><br> <strong>Polytech :</strong> <br> Malo Mottin <br> Félix Rabadan <br> Axel Rochetau <br> Rémi Audoin <br> Victorien Plot <br><br> <strong>AGR :</strong> <br> Mathis El Idrissi <br> Héloïse Scirpo",
            style: "sms-bottom sms-left"
        },
        {
            type: "image",
            source: "img/logo_hyblab.png",
            style: "sms-bottom sms-left sms-image"
        },
        {
            type: "image2",
            source1: "img/logo_agr.png",
            source2: "img/logo_polytech.png",
            style: "sms-bottom sms-left sms-image"
        },
        {
            type: "image",
            source: "img/logo_nantesuniversite.png",
            style: "sms-bottom sms-left sms-image"
        },
        {
            type: "image4",
            source1: "img/logo_nantesmetropole.png",
            source2: "img/logo_oml.png",
            source3: "img/logo_opensource.png",
            source4: "img/logo_cc.png",
            style: "sms-bottom sms-left sms-image"
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