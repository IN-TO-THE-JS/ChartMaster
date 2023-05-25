import React, { useEffect } from "react";
import * as d3 from "d3";

export default function US3() {
    useEffect(() => {
        // The svg
        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        // Map and projection
        const projection = d3
            .geoMercator()
            .scale(350) // This is the zoom
            .translate([850, 440]); // You have to play with these values to center your map

        // Path generator
        const path = d3.geoPath().projection(projection);

        // Load external data and boot
        d3.json(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json"
        ).then(function (data) {
            // Draw the map
            svg.append("g")
                .selectAll("path")
                .data(data.features)
                .join("path")
                .attr("fill", "#69a2a2")
                .attr("d", path)
                .attr("stroke", "white");

            // Add the labels
            svg.append("g")
                .selectAll("labels")
                .data(data.features)
                .join("text")
                .attr("x", function (d) {
                    return path.centroid(d)[0];
                })
                .attr("y", function (d) {
                    return path.centroid(d)[1];
                })
                .text(function (d) {
                    return d.properties.iso3166_2;
                })
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .style("font-size", 11)
                .style("fill", "white");
        });
    }, []);
    return <svg id="my_dataviz" width="440" height="300"></svg>;
}
