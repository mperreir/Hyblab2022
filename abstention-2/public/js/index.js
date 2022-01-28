"use strict";

function date() {
  const date = document.getElementById('date');
  let text;
  setInterval(() => {
    text = new Date()
  }, 60000);
  text = new Date();
  date.textContent = text.getHours() + ":" + text.getMinutes();
}

// const templateTest = fetch('templates/folder-absention.ejs').then(value => {
//     console.log(value.text().then(value => {
//         const rendered = ejs.render(value, { votingHab: 100000 });
//         document.getElementById('container').innerHTML = rendered;
//     }));
// });
// const container = document.getElementById("container");


// const test = {
//     data: "hello"
// };


// loadFileExplorer();
// smsScreen();
quizScreen();

async function loadTemplate(path, data) {
    const fileExplorerTemplate = await fetch(path);
    const fileExplorerHtml = await fileExplorerTemplate.text();
    return ejs.render(fileExplorerHtml, data);
}


