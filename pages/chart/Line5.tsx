import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { ds_line3 as ds } from "../../data/data";

export default function Line5() {
    useEffect(() => {
        const svg = d3.select("svg");
        const width = svg.attr("width");
        const height = svg.attr("height");
        const xScale = {};
        const yScale = {};
        const line = {};

        for (let i in ds) {
            xScale[i] = d3.scaleLinear().domain([0, 100]).range([0, width]);
            yScale[i] = d3.scaleLinear().domain([0, 200]).range([height, 0]);

            svg.append("g")
                .selectAll("dot")
                .data(ds[i].data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return xScale[i](d[0]);
                })
                .attr("cy", function (d) {
                    return yScale[i](d[1]);
                })
                .attr("r", 2)
                .style("fill", ds[i].color);

            line[i] = d3
                .line()
                .x(function (d) {
                    return xScale[i](d[0]);
                })
                .y(function (d) {
                    return yScale[i](d[1]);
                })
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .datum(ds[i].data)
                .attr("class", "line")
                .attr("d", line[i])
                .style("fill", "none")
                .style("stroke", ds[i].color)
                .style("stroke-width", "1");
        }
    }, []);

    return (
        <div className="container">
            <svg width="600" height="500"></svg>
        </div>
    );
}
