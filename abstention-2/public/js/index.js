"use strict";
const container = document.getElementById("container");

const test = {
    data: "hello"
};
loadTemplate('templates/sms.ejs', test).then(value => { container.innerHTML = value ;
date();
loadTemplate('templates/sms1.ejs', test).then(value => {document.getElementById('screen').innerHTML = value})
})

async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}
