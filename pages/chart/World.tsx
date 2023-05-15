import React, { useEffect } from "react";
import * as d3 from "d3";

export default function World() {
    useEffect(() => {
        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        const path = d3.geoPath();
        const projection = d3
            .geoMercator()
            .scale(70)
            .center([0, 20])
            .translate([width / 2, height / 2]);

        const data = new Map();
        const colorScale = d3
            .scaleThreshold()
            .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
            .range(d3.schemeBlues[7]);

        Promise.all([
            d3.json(
                "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
            ),
            d3.csv(
                "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv",
                function (d) {
                    data.set(d.code, +d.pop);
                }
            ),
        ]).then(function (loadData) {
            let topo = loadData[0];

            let mouseOver = function (d) {
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", 0.5);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "black");
            };

            let mouseLeave = function (d) {
                d3.selectAll(".Country")
                    .transition()
                    .duration(200)
                    .style("opacity", 0.8);
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("stroke", "transparent");
            };

            svg.append("g")
                .selectAll("path")
                .data(topo.features)
                .enter()
                .append("path")
                .attr("d", d3.geoPath().projection(projection))
                .attr("fill", function (d) {
                    d.total = data.get(d.id) || 0;
                    return colorScale(d.total);
                })
                .style("stroke", "transparent")
                .attr("class", function (d) {
                    return "Country";
                })
                .style("opacity", 0.8)
                .on("mouseover", mouseOver)
                .on("mouseleave", mouseLeave);
        });
    }, []);

    // 태그 공통시키기
    return <svg id="my_dataviz" width="400" height="300"></svg>;
}
