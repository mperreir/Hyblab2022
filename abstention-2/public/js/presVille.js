async function loadPresVille() {
  const container = document.getElementById('container');
  const data = { ville: "Saint-herblain", pop: 46268, superficie: 30.02, metier:[ 0.04, 2.07, 9.05, 13.03, 14.11, 8.82, 21.27, 12.55]};
  const fileExplorerHtml = await loadTemplate('templates/pres_ville.ejs', data);
  container.innerHTML = fileExplorerHtml;
  metierdot("metier",data.metier);
  beforePrintHandler();
};