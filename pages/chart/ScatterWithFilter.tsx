import React, { useEffect } from "react";
import * as d3 from "d3";

export default function ScatterWithFilter() {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    const x = d3.scaleLinear().domain([4, 8]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
    const color = d3
        .scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica"])
        .range(["#440154ff", "#21908dff", "#fde725ff"]);

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.csv(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
        ).then(function (data) {
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));
            svg.append("g").call(d3.axisLeft(y));

            svg.append("g")
                .selectAll("dot")
                .data(data)
                .join("circle")
                .attr("cx", function (d) {
                    return x(d.Sepal_Length);
                })
                .attr("cy", function (d) {
                    return y(d.Petal_Length);
                })
                .attr("r", 5)
                .style("fill", function (d) {
                    return color(d.Species);
                });
        });
    }, []);

    return <div id="my_dataviz"></div>;
}
