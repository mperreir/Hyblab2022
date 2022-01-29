

// ------------------------------ how to get the latest week? or do we simply get all cumulated results?


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
        .attr("transform", "rotate(-45)")

    return svg.node();
}



function ThemeGraphe() {
    const svg1 = document.getElementById("ThemeGraphe")
    data
    svg1.append(BarChart(data, {
        x: d => d.nameCandidates,
        y: d => d.nbTweetsByThemes,
        xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
        yFormat: "%",
        yLabel: "↑ Nombre de tweets",
        width: 600,
        height: 500,
        color: "steelblue"
    }))

    let selector = document.getElementById("top-select")

    selector.addEventListener('input', async () => {
        d3.select('#barplot').remove();

        let response = await fetch('./api/theme/count/'+ selector.value);
        let data = await response.json();

        data.sort((a, b) => (a.nbTweetsByThemes > b.nbTweetsByThemes ? -1 : 1))
        // ----------------- les 4 premiers candidats


        svg1.append(BarChart(data, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })

    theme2.addEventListener('click', () => {

        d3.select('#barplot').remove();
        data = CountByThemes(1);
        svg1.append(BarChart(data, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })

    theme3.addEventListener('click', () => {

        d3.select('#barplot').remove();
        data = CountByThemes(1);
        svg1.append(BarChart(data, {
            x: d => d.nameCandidates,
            y: d => d.nbTweetsByThemes,
            xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
            yFormat: "%",
            yLabel: "↑ Nombre de tweets",
            width: 600,
            height: 500,
            color: "steelblue"
        }))
    })

}
