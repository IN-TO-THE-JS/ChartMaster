import React, { useEffect } from "react";
import * as d3 from "d3";

export default function ConnectedDotPlot() {
    const margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.csv(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_cleveland.csv"
        ).then(function (data) {
            const x = d3.scaleLinear().domain([-1, 6]).range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));

            const y = d3
                .scaleBand()
                .range([0, height])
                .domain(
                    data.map(function (d) {
                        return d.group;
                    })
                )
                .padding(1);
            svg.append("g").call(d3.axisLeft(y));

            svg.selectAll("myline")
                .data(data)
                .join("line")
                .attr("x1", function (d) {
                    return x(d.value1);
                })
                .attr("x2", function (d) {
                    return x(d.value2);
                })
                .attr("y1", function (d) {
                    return y(d.group);
                })
                .attr("y2", function (d) {
                    return y(d.group);
                })
                .attr("stroke", "grey")
                .attr("stroke-width", "1px");

            svg.selectAll("mycircle")
                .data(data)
                .join("circle")
                .attr("cx", function (d) {
                    return x(d.value1);
                })
                .attr("cy", function (d) {
                    return y(d.group);
                })
                .attr("r", "6")
                .style("fill", "#69b3a2");

            svg.selectAll("mycircle")
                .data(data)
                .join("circle")
                .attr("cx", function (d) {
                    return x(d.value2);
                })
                .attr("cy", function (d) {
                    return y(d.group);
                })
                .attr("r", "6")
                .style("fill", "#4C4082");
        });
    }, []);

    return <div id="my_dataviz"></div>;
}
