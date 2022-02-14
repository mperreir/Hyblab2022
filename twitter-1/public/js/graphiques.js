const title_choice = [
    "CETTE SEMAINE",
    "SUR LA SECURITE CETTE SEMAINE",
    "SUR LA SANTE CETTE SEMAINE",
    "SUR L'ECONOMIE CETTE SEMAINE",
    "SUR L'EDUCATION CETTE SEMAINE",
    "SUR L'ENVIRONNEMENT CETTE SEMAINE",
    "SUR LA CULTURE CETTE SEMAINE"
]
function BarChart(data, {
    x = (d, i) => i, // given d in data, returns the (ordinal) x-value
    y = d => d, // given d in data, returns the (quantitative) y-value
    title, // given d in data, returns the title text
    marginTop = 50, // the top margin, in pixels
    marginRight = 30, // the right margin, in pixels
    marginBottom = 0, // the bottom margin, in pixels
    marginLeft = 0, // the left margin, in pixels
    width = 400, // the outer width of the chart, in pixels
    height = 120, // the outer height of the chart, in pixels
    xDomain, // an array of (ordinal) x-values
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // y-scale type
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    xPadding = 0.3, // amount of x-range to reserve to separate bars
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    color = "currentColor", // bar fill color
    textColor = "textColor",
    labelColor = "black",
    choiceTitle = 0
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
    const yAxis = d3.axisLeft(yScale).ticks(3);

    // Compute titles.
    title = i => `${X[i]}\n${Y[i]}`+' tweets';

    // Create svg
    const svg = d3.create("svg")
        .attr("id", "barplot")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    // Draw rectangles
    const bar = svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("class", "bar-rectangle")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth())


    // Add statistics
    svg.selectAll(".bar-title")
        .data(I)
        .enter()
        .append("text")
        .classed('bar-title', true)
        .attr('text-anchor', 'middle')
        .attr("x", d => xScale(X[d]) + xScale.bandwidth()/2)
        .attr("y", d => yScale(Y[d])+15)
        .text(d => `${Y[d]}`)
        .style("font", "sans-serif")
        .attr("fill", labelColor);


    // Add candidates' names
    svg.selectAll(".candidates-name")
        .data(I)
        .enter()
        .append("text")
        .classed('candidates-name', true)
        .attr('text-anchor', 'middle')
        .attr("x", d => xScale(X[d]) + xScale.bandwidth()/2)
        .attr("y", d => yScale(Y[d])-5)
        .text(d => `${X[d]}`)
        .style("font", "sans-serif")
        .style("font-size", "10px")
        .style("font-weight", 700)
        .style("text-transform", "uppercase")
        .attr("fill", textColor)


    // Add Title 1
    svg.append("text")
        .attr("id", "comment")
        .attr("x", (width-marginRight)/2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text("IlS TWEETENT LE PLUS")
        .attr("fill", textColor)
        .style("font-weight",700)


    // Add Title 2
    svg.append("text")
        .attr("id", "comment")
        .attr("x", (width-marginRight)/2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .text(title_choice[choiceTitle])
        .attr("fill", textColor)
        .style("font-weight", 700)


    return svg.node();
}



// Draw bar chart according to the selector of themes
async function ThemeGraphe() {
    const svg1 = document.getElementById("ThemeGraphe");
    let data = await fetch("api/theme/count/all")
        .then((response) => response.json())
        .then((result) => {
            return result;
        });


    svg1.append(await BarChart(data, {
        x: d => d.nameCandidates,
        y: d => d.nbTweetsByThemes,
        color: "#EF7767",
        textColor: "black"
    }))

    let selector = document.getElementById("top-select")
    selector.addEventListener('input', async () => {
        d3.select('#barplot').remove();
        if(parseInt(selector.value) === 0){
            data = await fetch("api/theme/count/all")
                .then((response) => response.json())
                .then((result) => {
                    return result;
                });
            svg1.append(await BarChart(data, {
                x: d => d.nameCandidates,
                y: d => d.nbTweetsByThemes,
                xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
                color: "#EF7767",
                textColor: "black",
                choiceTitle: 0
            }))
        }
        else{
            data = await fetch("api/theme/count/"+selector.value)
                .then((response) => response.json())
                .then((result) => {
                    return result;
                });
            svg1.append(await BarChart(data, {
                x: d => d.nameCandidates,
                y: d => d.nbTweetsByThemes,
                xDomain: d3.groupSort(data, ([d]) => -d.nbTweetsByThemes, d => d.nameCandidates), // sort by descending frequency
                color: "white",
                textColor: "white",
                choiceTitle: parseInt(selector.value)
            }))
        }
    })
}


ThemeGraphe()