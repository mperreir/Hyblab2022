
async function loadFolder() {
    const data = { votingHab: 100000, pcVotingHab: 30, pcMean: 35 };
    const container = document.getElementById('container');
    const folderHtml = await loadTemplate('templates/folder-absention.ejs', data);
    container.innerHTML = folderHtml;
}
