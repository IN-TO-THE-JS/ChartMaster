import React, { useEffect } from "react";
import * as d3 from "d3";

export default function Area2() {
    const margin = { top: 20, right: 30, bottom: 30, left: 55 },
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
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).ticks(5));

            const y = d3.scaleLinear().domain([0, 200000]).range([height, 0]);
            svg.append("g").call(d3.axisLeft(y));

            const color = d3
                .scaleOrdinal()
                .domain(keys)
                .range([
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                ]);

            const stackedData = d3.stack().keys(keys)(data);

            svg.selectAll("mylayers")
                .data(stackedData)
                .join("path")
                .style("fill", function (d) {
                    return color(d.key);
                })
                .attr(
                    "d",
                    d3
                        .area()
                        .x(function (d, i) {
                            return x(d.data.year);
                        })
                        .y0(function (d) {
                            return y(d[0]);
                        })
                        .y1(function (d) {
                            return y(d[1]);
                        })
                );
        });
    }, []);

    return <div id="my_dataviz"></div>;
}
