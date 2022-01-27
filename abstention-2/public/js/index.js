"use strict";


const test = {
    data: "hello"
};

loadFileExplorer();

async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}



