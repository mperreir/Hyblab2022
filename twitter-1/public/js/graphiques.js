
// -----------------------------------------require fails

const db = require("./database.json")

// ------------------------------ how to get the latest week? or do we simply get all cumulated results?

function CountByThemes(theme_id) {
    let listCount = [];
    for (let i = 0; i < Object.keys(db.candidats).length; i++) {
        let newCount = Object()
        newCount.nameCandidates = db.candidats[i].name
        let arrayTweets = db.tweets
        let result = arrayTweets.filter(arrayTweets => arrayTweets.theme_id === theme_id && arrayTweets.name === db.candidats[i].name)
        newCount.nbTweetsByThemes = result.length
        listCount.push(newCount)
    }
    return listCount
}


// function CountByAllThemes(){
//     let listCount = [];
//     for (let i = 0; i < Object.keys(db.candidats).length; i++) {
//         let newCount = Object()
//         newCount.nameCandidates = db.candidats[i].name
//         newCount.nbTweetsByThemes = db.candidats[i].tweets
//         listCount.push(newCount)
//     }
//     return listCount
// }


// let data0 = [
//     { nameCandidates: 'Jean-Luc Mélenchon', nbTweetsByThemes: '40990' },
//     { nameCandidates: 'Fabien Roussel', nbTweetsByThemes: '6222' },
//     { nameCandidates: 'Nathalie Arthaud', nbTweetsByThemes: '3501' },
//     { nameCandidates: 'Anasse Kazib', nbTweetsByThemes: '18000' },
//     { nameCandidates: 'Philippe Poutou', nbTweetsByThemes: '4542' },
//     { nameCandidates: 'Anne Hidalgo', nbTweetsByThemes: '113964' },
//     { nameCandidates: '☰ Arnaud Montebourg', nbTweetsByThemes: '4763' },
//     { nameCandidates: 'Pierre Larrouturou', nbTweetsByThemes: '14235' },
//     { nameCandidates: 'Stéphane Le Foll', nbTweetsByThemes: '11468' },
//     { nameCandidates: 'Yannick Jadot', nbTweetsByThemes: '39341' },
//     { nameCandidates: 'Antoine Waechter', nbTweetsByThemes: '269' },
//     { nameCandidates: 'Emmanuel Macron', nbTweetsByThemes: '10922' },
//     { nameCandidates: 'Jean-Christophe Lagarde', nbTweetsByThemes: '8617' },
//     { nameCandidates: 'Xavier Bertrand', nbTweetsByThemes: '13182' },
//     { nameCandidates: 'Valérie Pécresse', nbTweetsByThemes: '20550' },
//     { nameCandidates: 'Michel Barnier', nbTweetsByThemes: '4761' },
//     { nameCandidates: 'Eric Ciotti', nbTweetsByThemes: '29176' },
//     { nameCandidates: 'Denis Payre', nbTweetsByThemes: '13732' },
//     { nameCandidates: 'Marine Le Pen', nbTweetsByThemes: '23244' },
//     { nameCandidates: 'N. Dupont-Aignan', nbTweetsByThemes: '23235' },
//     { nameCandidates: 'Florian Philippot', nbTweetsByThemes: '21448' },
//     { nameCandidates: 'Antoine MARTINEZ', nbTweetsByThemes: '4275' },
//     { nameCandidates: 'François Asselineau', nbTweetsByThemes: '21451' },
//     { nameCandidates: 'Eric Zemmour', nbTweetsByThemes: '3959' },
//     { nameCandidates: 'Jean Lassalle', nbTweetsByThemes: '5090' },
//     { nameCandidates: 'Clara Egger', nbTweetsByThemes: '96' },
//     { nameCandidates: 'Alexandre Langlois', nbTweetsByThemes: '2731' },
//     { nameCandidates: 'Hélène Thouy 2022', nbTweetsByThemes: '793' },
//     { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: '13864' },
//     {
//         nameCandidates: '🇫🇷 🇪🇺 Pr Philippe Juvin, MD PhD',
//         nbTweetsByThemes: '6535'
//     },
//     { nameCandidates: 'Jean-Frédéric Poisson', nbTweetsByThemes: '9183' },
//     { nameCandidates: 'Jacline Mouraud', nbTweetsByThemes: '2042' },
//     { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: '13870' }
// ]

let data1 =[
    { nameCandidates: 'Jean-Luc Mélenchon', nbTweetsByThemes: 2761 },
    { nameCandidates: 'Fabien Roussel', nbTweetsByThemes: 1089 },
    { nameCandidates: 'Nathalie Arthaud', nbTweetsByThemes: 147 },
    { nameCandidates: 'Anasse Kazib', nbTweetsByThemes: 2346 },
    { nameCandidates: 'Philippe Poutou', nbTweetsByThemes: 215 },
    { nameCandidates: 'Anne Hidalgo', nbTweetsByThemes: 2407 },
    { nameCandidates: '☰ Arnaud Montebourg', nbTweetsByThemes: 363 },
    { nameCandidates: 'Pierre Larrouturou', nbTweetsByThemes: 567 },
    { nameCandidates: 'Stéphane Le Foll', nbTweetsByThemes: 237 },
    { nameCandidates: 'Yannick Jadot', nbTweetsByThemes: 1582 },
    { nameCandidates: 'Antoine Waechter', nbTweetsByThemes: 268 },
    { nameCandidates: 'Emmanuel Macron', nbTweetsByThemes: 417 },
    { nameCandidates: 'Jean-Christophe Lagarde', nbTweetsByThemes: 155 },
    { nameCandidates: 'Xavier Bertrand', nbTweetsByThemes: 678 },
    { nameCandidates: 'Valérie Pécresse', nbTweetsByThemes: 468 },
    { nameCandidates: 'Michel Barnier', nbTweetsByThemes: 251 },
    { nameCandidates: 'Eric Ciotti', nbTweetsByThemes: 1953 },
    { nameCandidates: 'Denis Payre', nbTweetsByThemes: 1055 },
    { nameCandidates: 'Marine Le Pen', nbTweetsByThemes: 1066 },
    { nameCandidates: 'N. Dupont-Aignan', nbTweetsByThemes: 1024 },
    { nameCandidates: 'Florian Philippot', nbTweetsByThemes: 1385 },
    { nameCandidates: 'Antoine MARTINEZ', nbTweetsByThemes: 316 },
    { nameCandidates: 'François Asselineau', nbTweetsByThemes: 1505 },
    { nameCandidates: 'Eric Zemmour', nbTweetsByThemes: 1778 },
    { nameCandidates: 'Jean Lassalle', nbTweetsByThemes: 234 },
    { nameCandidates: 'Clara Egger', nbTweetsByThemes: 61 },
    { nameCandidates: 'Alexandre Langlois', nbTweetsByThemes: 213 },
    { nameCandidates: 'Hélène Thouy 2022', nbTweetsByThemes: 453 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 745 },
    {
        nameCandidates: '🇫🇷 🇪🇺 Pr Philippe Juvin, MD PhD',
        nbTweetsByThemes: 383
    },
    { nameCandidates: 'Jean-Frédéric Poisson', nbTweetsByThemes: 290 },
    { nameCandidates: 'Jacline Mouraud', nbTweetsByThemes: 295 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 745 }
]

let data2 = [
    { nameCandidates: 'Jean-Luc Mélenchon', nbTweetsByThemes: 105 },
    { nameCandidates: 'Fabien Roussel', nbTweetsByThemes: 78 },
    { nameCandidates: 'Nathalie Arthaud', nbTweetsByThemes: 14 },
    { nameCandidates: 'Anasse Kazib', nbTweetsByThemes: 63 },
    { nameCandidates: 'Philippe Poutou', nbTweetsByThemes: 16 },
    { nameCandidates: 'Anne Hidalgo', nbTweetsByThemes: 66 },
    { nameCandidates: '☰ Arnaud Montebourg', nbTweetsByThemes: 5 },
    { nameCandidates: 'Pierre Larrouturou', nbTweetsByThemes: 13 },
    { nameCandidates: 'Stéphane Le Foll', nbTweetsByThemes: 3 },
    { nameCandidates: 'Yannick Jadot', nbTweetsByThemes: 72 },
    { nameCandidates: 'Antoine Waechter', nbTweetsByThemes: 1 },
    { nameCandidates: 'Emmanuel Macron', nbTweetsByThemes: 19 },
    { nameCandidates: 'Jean-Christophe Lagarde', nbTweetsByThemes: 11 },
    { nameCandidates: 'Xavier Bertrand', nbTweetsByThemes: 22 },
    { nameCandidates: 'Valérie Pécresse', nbTweetsByThemes: 6 },
    { nameCandidates: 'Michel Barnier', nbTweetsByThemes: 0 },
    { nameCandidates: 'Eric Ciotti', nbTweetsByThemes: 16 },
    { nameCandidates: 'Denis Payre', nbTweetsByThemes: 9 },
    { nameCandidates: 'Marine Le Pen', nbTweetsByThemes: 42 },
    { nameCandidates: 'N. Dupont-Aignan', nbTweetsByThemes: 210 },
    { nameCandidates: 'Florian Philippot', nbTweetsByThemes: 599 },
    { nameCandidates: 'Antoine MARTINEZ', nbTweetsByThemes: 16 },
    { nameCandidates: 'François Asselineau', nbTweetsByThemes: 170 },
    { nameCandidates: 'Eric Zemmour', nbTweetsByThemes: 20 },
    { nameCandidates: 'Jean Lassalle', nbTweetsByThemes: 12 },
    { nameCandidates: 'Clara Egger', nbTweetsByThemes: 1 },
    { nameCandidates: 'Alexandre Langlois', nbTweetsByThemes: 7 },
    { nameCandidates: 'Hélène Thouy 2022', nbTweetsByThemes: 4 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 21 },
    {
        nameCandidates: '🇫🇷 🇪🇺 Pr Philippe Juvin, MD PhD',
        nbTweetsByThemes: 83
    },
    { nameCandidates: 'Jean-Frédéric Poisson', nbTweetsByThemes: 26 },
    { nameCandidates: 'Jacline Mouraud', nbTweetsByThemes: 39 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 21 }
]

let data3 = [
    { nameCandidates: 'Jean-Luc Mélenchon', nbTweetsByThemes: 110 },
    { nameCandidates: 'Fabien Roussel', nbTweetsByThemes: 113 },
    { nameCandidates: 'Nathalie Arthaud', nbTweetsByThemes: 25 },
    { nameCandidates: 'Anasse Kazib', nbTweetsByThemes: 74 },
    { nameCandidates: 'Philippe Poutou', nbTweetsByThemes: 12 },
    { nameCandidates: 'Anne Hidalgo', nbTweetsByThemes: 65 },
    { nameCandidates: '☰ Arnaud Montebourg', nbTweetsByThemes: 51 },
    { nameCandidates: 'Pierre Larrouturou', nbTweetsByThemes: 27 },
    { nameCandidates: 'Stéphane Le Foll', nbTweetsByThemes: 0 },
    { nameCandidates: 'Yannick Jadot', nbTweetsByThemes: 83 },
    { nameCandidates: 'Antoine Waechter', nbTweetsByThemes: 2 },
    { nameCandidates: 'Emmanuel Macron', nbTweetsByThemes: 17 },
    { nameCandidates: 'Jean-Christophe Lagarde', nbTweetsByThemes: 0 },
    { nameCandidates: 'Xavier Bertrand', nbTweetsByThemes: 49 },
    { nameCandidates: 'Valérie Pécresse', nbTweetsByThemes: 15 },
    { nameCandidates: 'Michel Barnier', nbTweetsByThemes: 9 },
    { nameCandidates: 'Eric Ciotti', nbTweetsByThemes: 19 },
    { nameCandidates: 'Denis Payre', nbTweetsByThemes: 42 },
    { nameCandidates: 'Marine Le Pen', nbTweetsByThemes: 40 },
    { nameCandidates: 'N. Dupont-Aignan', nbTweetsByThemes: 48 },
    { nameCandidates: 'Florian Philippot', nbTweetsByThemes: 23 },
    { nameCandidates: 'Antoine MARTINEZ', nbTweetsByThemes: 0 },
    { nameCandidates: 'François Asselineau', nbTweetsByThemes: 31 },
    { nameCandidates: 'Eric Zemmour', nbTweetsByThemes: 45 },
    { nameCandidates: 'Jean Lassalle', nbTweetsByThemes: 6 },
    { nameCandidates: 'Clara Egger', nbTweetsByThemes: 0 },
    { nameCandidates: 'Alexandre Langlois', nbTweetsByThemes: 0 },
    { nameCandidates: 'Hélène Thouy 2022', nbTweetsByThemes: 0 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 26 },
    {
        nameCandidates: '🇫🇷 🇪🇺 Pr Philippe Juvin, MD PhD',
        nbTweetsByThemes: 5
    },
    { nameCandidates: 'Jean-Frédéric Poisson', nbTweetsByThemes: 1 },
    { nameCandidates: 'Jacline Mouraud', nbTweetsByThemes: 5 },
    { nameCandidates: 'Georges Kuzmanovic 🇨🇵', nbTweetsByThemes: 26 }
]


function BarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 20, // the top margin, in pixels
    marginRight = 0, // the right margin, in pixels
    marginBottom = 100, // the bottom margin, in pixels
    marginLeft = 50, // the left margin, in pixels
    width = 640, // the outer width of the chart, in pixels
    height = 400, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.05, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor" // bar fill color
} = {}) {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

    // Construct scales, axes, and formats.
    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    // Compute titles.
    if (title === undefined) {
        const formatValue = yScale.tickFormat(100, yFormat);
        title = i => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
        const O = d3.map(data, d => d);
        const T = title;
        title = i => T(O[i], i, data);
    }

    const svg = d3.create("svg")
        .attr("id", "barplot")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const bar = svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth());

    if (title) bar.append("title")
        .text(title);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font", "10px times")
        .attr("dx", "-.8em")
        .attr("dy", "-.5em")
        .attr("transform", "rotate(-90)")

    return svg.node();
}


// ---------------------------CountbyThemes shoulb be placed in api as a part of backend
async function ThemeGraphe() {
    const svg1 = document.getElementById("sm")

    svg1.append(BarChart(data1, {
        x: d => d.nameCandidates,
        y: d => d.nbTweetsByThemes,
        xDomain: d3.groupSort(data1, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
        yFormat: "%",
        yLabel: "↑ Nombre de tweets",
        width: 600,
        height: 500,
        color: "steelblue"
    }))

    // let theme0 = document.getElementById("0")
    let theme1 = document.getElementById("1")
    let theme2 = document.getElementById("2")
    let theme3 = document.getElementById("3")

    // theme0.addEventListener('click', () => {
    //
    //     d3.select('#barplot').remove();
    //
    //     svg1.append(BarChart(data0, {
    //         x: d => d.nameCandidates,
    //         y: d => d.nbTweetsByThemes,
    //         xDomain: d3.groupSort(data0, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
    //         yFormat: "%",
    //         yLabel: "↑ Nombre de tweets",
    //         width: 600,
    //         height: 500,
    //         color: "steelblue"
    //     }))
    // })

    theme1.addEventListener('click', () => {

        d3.select('#barplot').remove();

        svg1.append(BarChart(data1, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data1, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })

    theme2.addEventListener('click', () => {

        d3.select('#barplot').remove();

        svg1.append(BarChart(data2, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data2, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })

    theme3.addEventListener('click', () => {

        d3.select('#barplot').remove();

        svg1.append(BarChart(data3, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data3, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })
}

// theme0.addEventListener('click', () => {
//
//     d3.select('#barplot').remove();
//     data = CountByAllThemes();
//     svg1.append(BarChart(data, {
//     x: d => d.nameCandidates,
//     y: d => d.nbTweetsByThemes,
//     xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
//     yFormat: "%",
//     yLabel: "↑ Nombre de tweets",
//     width: 600,
//     height: 500,
//     color: "steelblue"
//     }))
// })

// theme1.addEventListener('click', () => {
//
//     d3.select('#barplot').remove();
//     data = CountByThemes(1);
//     svg1.append(BarChart(data, {
//     x: d => d.nameCandidates,
//     y: d => d.nbTweetsByThemes,
//     xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
//     yFormat: "%",
//     yLabel: "↑ Nombre de tweets",
//     width: 600,
//     height: 500,
//     color: "steelblue"
//     }))
// })
//
// theme2.addEventListener('click', () => {
//
//     d3.select('#barplot').remove();
//     data = CountByThemes(1);
//     svg1.append(BarChart(data, {
//         x: d => d.nameCandidates,
//         y: d => d.nbTweetsByThemes,
//         xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
//         yFormat: "%",
//         yLabel: "↑ Nombre de tweets",
//         width: 600,
//         height: 500,
//         color: "steelblue"
//     }))
// })
//
// theme3.addEventListener('click', () => {
//
//     d3.select('#barplot').remove();
//     data = CountByThemes(1);
//     svg1.append(BarChart(data, {
//         x: d => d.nameCandidates,
//         y: d => d.nbTweetsByThemes,
//         xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
//         yFormat: "%",
//         yLabel: "↑ Nombre de tweets",
//         width: 600,
//         height: 500,
//         color: "steelblue"
//     }))
// })




ThemeGraphe()