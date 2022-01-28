async function loadStart() {
    const data = {};
    const container = document.getElementById("container");

    const startHtml = await loadTemplate('templates/start.ejs', data);
    container.innerHTML = startHtml;

    anime({
        targets: '.start-flag',
        translateY: '-96%',
        delay: 2000,
        duration: 1000,
        easing: 'easeOutQuad'
    })
    anime({
        targets: '.start-content',
        translateY: '-96%',
        delay: 2000,
        duration: 1000,
        easing: 'easeOutQuad'
    })

    const openButton = document.getElementById("open-button");
    openButton.addEventListener('click', () => smsScreen());

};