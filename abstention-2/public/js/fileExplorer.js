async function loadFileExplorer() {
    const container = document.getElementById('container');

    const fileExplorerHtml = await loadTemplate('templates/file_explorer/file_explorer.ejs', FOLDER_TITLES);
    container.innerHTML = fileExplorerHtml;

    const fileProgressBars = document.getElementsByClassName('file-explorer-item-file-progress-bar');

    let i = 0;
    for (const fileData of FOLDER_DATA.filesData) {
        if (fileData.progress !== 100) {
            fileProgressBars[i].style.width = `${fileData.progress}%`;
            i++;
        }
    }
};