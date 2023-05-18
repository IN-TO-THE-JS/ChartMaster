import React, { useEffect } from "react";
import * as d3 from "d3";

export default function DirectionalChords() {
    const margin = { top: 20, right: 30, bottom: 0, left: 10 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        d3.csv(
            "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv"
        ).then(function (data) {
            const keys = data.columns.slice(1);

            const x = d3
                .scaleLinear()
                .domain(
                    d3.extent(data, function (d) {
                        return d.year;
                    })
                )
                .range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height * 0.8})`)
                .call(
                    d3
                        .axisBottom(x)
                        .tickSize(-height * 0.7)
                        .tickValues([1900, 1925, 1975, 2000])
                )
                .select(".domain")
                .remove();
            svg.selectAll(".tick line").attr("stroke", "#b8b8b8");

            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height - 30)
                .text("Time (year)");

            const y = d3
                .scaleLinear()
                .domain([-100000, 100000])
                .range([height, 0]);

            const color = d3.scaleOrdinal().domain(keys).range(d3.schemeDark2);

            const stackedData = d3
                .stack()
                .offset(d3.stackOffsetSilhouette)
                .keys(keys)(data);

            const area = d3
                .area()
                .x(function (d) {
                    return x(d.data.year);
                })
                .y0(function (d) {
                    return y(d[0]);
                })
                .y1(function (d) {
                    return y(d[1]);
                });

            svg.selectAll("mylayers")
                .data(stackedData)
                .join("path")
                .attr("class", "myArea")
                .style("fill", function (d) {
                    return color(d.key);
                })
                .attr("d", area);
        });
    }, []);

    return <div id="my_dataviz"></div>;
}
