async function loadFileExplorer() {

    selectedCityData = await fetchCityData(selectedCity);

    
    const citiesRq = await fetch('api/cities/');
    citiesMap = await citiesRq.json();
    const metropoleRq = await fetch('api/metropole/');
    metropoleData = await metropoleRq.json();
    metropoleData = metropoleData.nantes;
    const container = document.getElementById("container");
    const headerHtml = await loadTemplate('templates/header.ejs', []);
    container.innerHTML = headerHtml;
    const screen = document.getElementById('screen');
    
    const fileExplorerHtml = await loadTemplate('templates/file_explorer/file_explorer.ejs', FOLDER_TITLES);
    screen.innerHTML = fileExplorerHtml;
    
    for (const [folderName, visited] of Object.entries(visitedFolders)) {
        if (visited) {
            document.getElementById(FOLDER_TITLES.filesData.find(f => f.folderName === folderName).tag).children[0].classList.add('file-explorer-item-file-visited');
        }
    }
    const fileProgressBars = document.getElementsByClassName('file-explorer-item-file-progress-bar');

    let i = 0;
    let folderElement;
    for (const fileData of FOLDER_TITLES.filesData) {
        if (fileData.progress !== 100) {
            fileProgressBars[i].style.width = `${fileData.progress}%`;
            i++;
        }
        if (fileData.progress === 100) {
            folderElement = document.getElementById(fileData.tag).addEventListener('click', () => {
                loadFolder(fileData.folderName);
            });
        }
    }
};
