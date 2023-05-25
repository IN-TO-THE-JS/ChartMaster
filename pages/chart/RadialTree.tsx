import React, { useEffect } from "react";
import * as d3 from "d3";

export default function RadialTree() {
    const margin = { top: 100, right: 0, bottom: 0, left: 0 },
        width = 460 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height) / 2;

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                `translate(${width / 2 + margin.left}, ${
                    height / 2 + margin.top
                })`
            );

        d3.csv(
            "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv"
        ).then(function (data) {
            const x = d3
                .scaleBand()
                .range([0, 2 * Math.PI])
                .align(0) // This does nothing
                .domain(data.map((d) => d.Country));
            const y = d3
                .scaleRadial()
                .range([innerRadius, outerRadius])
                .domain([0, 14000]);

            svg.append("g")
                .selectAll("path")
                .data(data)
                .join("path")
                .attr("fill", "#69b3a2")
                .attr(
                    "d",
                    d3
                        .arc()
                        .innerRadius(innerRadius)
                        .outerRadius((d) => y(d["Value"]))
                        .startAngle((d) => x(d.Country))
                        .endAngle((d) => x(d.Country) + x.bandwidth())
                        .padAngle(0.01)
                        .padRadius(innerRadius)
                );

            svg.append("g")
                .selectAll("g")
                .data(data)
                .join("g")
                .attr("text-anchor", function (d) {
                    return (x(d.Country) + x.bandwidth() / 2 + Math.PI) %
                        (2 * Math.PI) <
                        Math.PI
                        ? "end"
                        : "start";
                })
                .attr("transform", function (d) {
                    return (
                        "rotate(" +
                        (((x(d.Country) + x.bandwidth() / 2) * 180) / Math.PI -
                            90) +
                        ")" +
                        "translate(" +
                        (y(d["Value"]) + 10) +
                        ",0)"
                    );
                })
                .append("text")
                .text(function (d) {
                    return d.Country;
                })
                .attr("transform", function (d) {
                    return (x(d.Country) + x.bandwidth() / 2 + Math.PI) %
                        (2 * Math.PI) <
                        Math.PI
                        ? "rotate(180)"
                        : "rotate(0)";
                })
                .style("font-size", "11px")
                .attr("alignment-baseline", "middle");
        });
    });

    return <div id="my_dataviz"></div>;
}
