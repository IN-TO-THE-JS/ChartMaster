import React, { useEffect } from "react";
import * as d3 from "d3";

export default function BubbleChart() {
    const margin = { top: 10, right: 20, bottom: 30, left: 50 },
        width = 500 - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3
            .select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv(
            "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv"
        ).then(function (data) {
            const x = d3.scaleLinear().domain([0, 12000]).range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));

            const y = d3.scaleLinear().domain([35, 90]).range([height, 0]);
            svg.append("g").call(d3.axisLeft(y));

            const z = d3
                .scaleLinear()
                .domain([200000, 1310000000])
                .range([4, 40]);

            const myColor = d3
                .scaleOrdinal()
                .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
                .range(d3.schemeSet2);

            svg.append("g")
                .selectAll("dot")
                .data(data)
                .join("circle")
                .attr("cx", (d) => x(d.gdpPercap))
                .attr("cy", (d) => y(d.lifeExp))
                .attr("r", (d) => z(d.pop))
                .style("fill", (d) => myColor(d.continent))
                .style("opacity", "0.7")
                .attr("stroke", "white")
                .style("stroke-width", "2px");
        });
    }, []);

    return <div id="my_dataviz"></div>;
}
