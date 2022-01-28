async function loadFileExplorer() {
    const data =
    {
        filesData: [
            {
                title: "Votes blancs",
                progress: 66
            },
            {
                title: "Nouveaux habitants",
                progress: 66

            },
            {
                title: "Non-votants",
                progress: 100
            },
            {
                title: "Mineurs",
                progress: 33
            },
            {
                title: "Abstention",
                progress: 100
            },
            {
                title: "Étrangers",
                progress: 33
            },
            {
                title: "Les pourcentages finaux second tour 2017",
                progress: 16.5
            }
        ]
    };
    const container = document.getElementById("container");

    const fileExplorerHtml = await loadTemplate('templates/file_explorer/file_explorer.ejs', data);
    container.innerHTML = fileExplorerHtml;

    const fileProgressBars = document.getElementsByClassName("file-explorer-item-file-progress-bar");

    let i = 0;
    for (const fileData of data.filesData) {
        if (fileData.progress !== 100) {
            fileProgressBars[i].style.width = fileData.progress + "%";
            i++;
        }
    }
};