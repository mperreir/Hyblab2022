async function loadEnd() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Tu me dois un restaurant ! Tu pourras retenter de parier pour 2022 ! Hésite pas à faire passer ce pari à d’autres collègues et à tes amis pour voir ceux qui s’y connaissent !',
            style: 'sms-top sms-left',
            id: "",
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'Trop fort ! Je pensais pas que tu t’y connaissais autant ! Je te dois un repas. Hésite pas à faire passer ce pari à d’autres collègues et à tes amis pour voir ceux qui s’y connaissent !',
            style: 'sms-bottom sms-left',
            id: "",
        },
        {
            type: "sms",
            sender: "CREDITS",
            message: "<strong>Porteur de projet :</strong> <br> Denis Vannier <br><br> <strong>Polytech :</strong> <br> Malo Mottin <br> Félix Rabadan <br> Axel Rochetau <br> Rémi Audoin <br> Victorien Plot <br><br> <strong>AGR :</strong> <br> Mathis El Idrissi <br> Héloïse Scirpo",
            style: "sms-top sms-left",
            id: "",
        },
        {
            type: "image",
            source: "img/logo_hyblab.png",
            style: "sms-bottom sms-left sms-image",
            id: "",
        },
        {
            type: "image2",
            source1: "img/logo_agr.png",
            source2: "img/logo_polytech.png",
            style: "sms-top sms-left sms-image",
            id: "",
        },
        {
            type: "image",
            source: "img/logo_nantesuniversite.png",
            style: "sms-bottom sms-left sms-image",
            id: "",
        },
        {
            type: "image4",
            source1: "img/logo_nantesmetropole.png",
            source2: "img/logo_oml.png",
            source3: "img/logo_opensource.png",
            source4: "img/logo_cc.png",
            style: "sms-top sms-left sms-image",
            id: "",
        }
    ];


    const headerHtml = await loadTemplate('templates/header.ejs', {});
    container.innerHTML = headerHtml;
    date();

    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', {});
    document.getElementById('screen').innerHTML = screenHtml;


    let smsTreadBtnHtml = await loadTemplate('templates/sms/sms_tread_button.ejs', []);
    document.getElementById('screen').insertAdjacentHTML('beforeend', smsTreadBtnHtml)

    let smsTread = document.getElementById('sms-tread');
    let displayedSMSIndex = 0;


    percentageBet = 60;
    console.log(percentageBet - selectedCityData.pourcentage_total_absention);
    if (Math.abs(percentageBet - selectedCityData.pourcentage_total_absention) < 5) {
        messages.splice(0, 1);
    }
    else {
        messages.splice(1, 1);
    }

    await createSMSElements(messages, smsTread);
    let smsTreadButton = document.getElementById("sms-tread-btn");
    displaySMS();

    smsTreadButton.addEventListener("click", () => {
        displaySMS();
    });

    function displaySMS() {
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        if (displayedSMSIndex === 2) {
            smsTreadButton.disabled = true;
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) / 2),
                complete: () => {
                    if (displayedSMSIndex !== 9) {
                        smsTreadButton.disabled = false;

                    }
                }
            });
        } else if (displayedSMSIndex > 2) {
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
        if (displayedSMSIndex === 5) {
            smsTreadButton.style.display = "none";
        }
        console.log(displayedSMSIndex);

        displayedSMSIndex++;
    }


}