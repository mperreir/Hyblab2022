function handleCitySearch() {


    // The autoComplete.js Engine instance creator
    return new autoComplete({
        data: {
            src: Object.values(citiesMap),
            cache: true,
        },
        diacritics: true,
        placeHolder: "Chercher une ville",

        resultsList: {
            class: "sms-city-search-results",

            tabSelect: true,
            position: "afterend",
            maxResults: 3,
            noResults: true,

        },
        resultItem: {
            class: "sms-city-search-results-item",
            element: (item, data) => {
                // Modify Results Item Style
                item.style = "display: flex;";
                // Modify Results Item Content
                item.innerHTML = `
          <span style="">
            ${data.match}
          </span>`;
            },
        },


    });
}
