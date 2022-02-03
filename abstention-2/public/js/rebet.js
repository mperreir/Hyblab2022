async function loadRebet() {
    const container = document.getElementById('container');

    const messages = [
        {
            type: 'sms',
            sender: 'THOMAS',
            message: `Alors toujours sûr des ${percentageBet}% ?`,
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
            message: 'J’aurai fait pareil. Alors tu parierais sur combien? <br/> PS: Je mange saignant mon steak',
            style: 'sms-top sms-left',
            id: "sms-change-percentage-answer",
        },
        {
            type: 'sms',
            sender: 'THOMAS',
            message: 'D’accord on reste sur ça alors ;) J’aurai fait pareil.<br/>PS : Je mange saignant mon steak',
            id: "sms-keep-percentage-answer",
            style: 'sms-bottom sms-left ',

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

    let screenHtml = await loadTemplate('templates/sms/sms_tread.ejs', []);
    document.getElementById('screen').innerHTML = screenHtml;

    let smsTreadBtnHtml = await loadTemplate('templates/sms/sms_tread_button.ejs', []);
    document.getElementById('screen').insertAdjacentHTML('beforeend', smsTreadBtnHtml);

    let smsTread = document.getElementById('sms-tread');
    let displayedSMSIndex = 0;

    await createSMSElements(messages, smsTread);
    let smsTreadButton = document.getElementById("sms-tread-btn");

    displaySMS();

    smsTreadButton.addEventListener("click", displaySMS);



    function displaySMS() {
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
        if (displayedSMSIndex === 2) {
            smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';
            smsTread.children.item(displayedSMSIndex + 1).style.visibility = 'visible';
            displayedSMSIndex++;
            smsTreadButton.disabled = true;
        }
        else if (displayedSMSIndex === 4) {
            smsTreadButton.disabled = true;
            anime({
                targets: '.sms-tread>*',
                easing: 'easeInOutQuart',
                duration: 1000,
                translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) / 2),
                complete: () => {
                    smsTreadButton.disabled = false;
                }
            });
            displayedSMSIndex++;
        } else if (displayedSMSIndex === 6) {
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
        } else if (displayedSMSIndex > 4) {
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
        displayedSMSIndex++;
    }

    document.getElementById('change-percentage-btn').addEventListener('click', async () => {
        document.getElementById('change-percentage-btn').disabled = true;
        document.getElementById('keep-percentage-btn').disabled = true;
        document.getElementById('change-percentage-btn').style.opacity = "50%";
        document.getElementById('sms-keep-percentage-answer').style.display = "none";


        displaySMS();

    });

    document.getElementById('keep-percentage-btn').addEventListener('click', async () => {

        document.getElementById('keep-percentage-btn').disabled = true;
        document.getElementById('change-percentage-btn').disabled = true;

        document.getElementById('keep-percentage-btn').style.opacity = "50%";
        document.getElementById('sms-change-percentage-answer').style.display = "none";
        displayedSMSIndex++;
        smsTread.children.item(displayedSMSIndex).style.visibility = 'visible';

        smsTreadButton.disabled = true;
        anime({
            targets: '.sms-tread>*',
            easing: 'easeInOutQuart',
            duration: 1000,
            translateY: "-=" + (getTranslateYSMS(smsTread, displayedSMSIndex) / 3),
            complete: () => {
                smsTreadButton.disabled = false;
            }
        });
        // displaySMS();
        smsTreadButton.removeEventListener("click", displaySMS);
        smsTreadButton.addEventListener("click", () => {
            loadFileExplorer();
        });

    });

    document.getElementById('submit-percentage-btn').addEventListener('click', async (e) => {
        percentageBet = document.getElementById("sms-slider-input").value;
        loadFileExplorer();
    });
}


