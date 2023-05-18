import React, { useEffect } from "react";
import * as d3 from "d3";

export default function CategoricalHeatmap() {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 },
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;
    const myGroups = ["A", "B", "C", "D"];
    const myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7"];
    const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
    const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g").call(d3.axisLeft(y));
        const color1 = d3
            .scaleLinear()
            .range(["#FDC3BF", "#CC503E"])
            .domain([26, 100]);
        const color2 = d3
            .scaleLinear()
            .range(["#B9E4D7", "#B9E4D7"])
            .domain([1, 25]);
        d3.csv(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv"
        ).then(function (data) {
            svg.selectAll()
                .data(data, function (d) {
                    return d.group + ":" + d.variable;
                })
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return x(d.group);
                })
                .attr("y", function (d) {
                    return y(d.variable);
                })
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", function (d) {
                    return d.value > 25 ? color1(d.value) : color2(d.value);
                });
        });
    }, []);
    return <div id="my_dataviz"></div>;
}
