import React, { useEffect } from "react";
import * as d3 from "d3";
import { ds_treemap as ds } from "../../data/data";

export default function Treemap() {
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };
    const width = 445 - margin.left - margin.right;
    const height = 445 - margin.top - margin.bottom;

    function draw(data, svg) {
        const root = d3.hierarchy(data).sum(function (d) {
            return d.value;
        });
        d3.treemap().size([width, height]).padding(1)(root);
        svg.selectAll("rect")
            .data(root.leaves())
            .join("rect")
            .attr("x", function (d) {
                return d.x0;
            })
            .attr("y", function (d) {
                return d.y0;
            })
            .attr("width", function (d) {
                return d.x1 - d.x0;
            })
            .attr("height", function (d) {
                return d.y1 - d.y0;
            })
            .style("stroke", "white")
            .style("fill", "#0C0");
        svg.selectAll("text") // label
            .data(root.leaves())
            .join("text")
            .attr("x", function (d) {
                return d.x0 + 5;
            })
            .attr("y", function (d) {
                return d.y0 + 20;
            })
            .text(function (d) {
                return d.data.name;
            })
            .attr("font-size", "15px")
            .attr("fill", "white");
    }

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        draw(ds, svg); // read json data
    }, []);

    return (
        <div id="my_dataviz">
            <svg width="600" height="500"></svg>
        </div>
    );
}
