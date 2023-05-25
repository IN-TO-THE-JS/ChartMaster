import * as d3 from "d3";
import React, { useState, useRef, useEffect } from "react";

function Donut1() {
    const [width] = useState(600);
    const [height] = useState(400);
    const [basicData] = useState([
        [10, 30, 40, 20],
        [10, 40, 30, 20, 50, 10],
        [60, 30, 40, 20, 30],
    ]);
    const [data, setData] = useState([]);
    const ref = useRef();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    useEffect(() => {
        const svg = d3
            .select(ref.current)
            .attr("width", width)
            .attr("height", height);
    }, [width, height]);

    useEffect(() => {
        draw();
    }, [data, chartWidth, chartHeight, radius]);

    const draw = () => {
        const svg = d3.select(ref.current);
        const arc = d3
            .arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius);
        const pie = d3
            .pie()
            // .sort(d3.ascending)
            .sort(null)
            .value((d) => d);

        const arcs = pie(data);
        const color = d3.scaleOrdinal().range(d3.schemeCategory10);

        svg.selectAll("*").remove();

        const chart = svg
            .append("g")
            .attr(
                "transform",
                `translate(${margin.left + chartWidth / 2}, ${
                    margin.top + chartHeight / 2
                })`
            );
        chart
            .selectAll("path")
            .data(arcs)
            .join(
                (enter) =>
                    enter
                        .append("path")
                        .attr("fill", (d, i) => color(i))
                        .attr("stroke", "white")
                        .attr("stroke-width", "2px")
                        .call((enter) =>
                            enter
                                .transition()
                                .delay(function (d, i) {
                                    return i * 300;
                                })
                                .duration(500)
                                .attrTween("d", function (d) {
                                    const i = d3.interpolate(
                                        d.startAngle,
                                        d.endAngle
                                    );
                                    return function (t) {
                                        d.endAngle = i(t);
                                        return arc(d);
                                    };
                                })
                        ),
                (update) => update,
                (exit) =>
                    exit.call((exit) =>
                        exit
                            .transition()
                            .duration(1000)
                            .attrTween("d", function (d) {
                                const i = d3.interpolate(
                                    d.endAngle,
                                    d.startAngle
                                );
                                return function (t) {
                                    d.endAngle = i(t);
                                    return arc(d);
                                };
                            })
                            .remove()
                    )
            );

        const path = chart.selectAll("path").data(arcs);

        path.enter()
            .append("path")
            .attr("fill", (d, i) => color(i))
            .attr("d", arc)
            .attr("stroke", "white")
            .attr("stroke-width", "2px");

        path.exit().remove();

        const text = chart
            .selectAll("text")
            .data(arcs)
            .enter()
            .append("text")
            .attr("transform", function (d) {
                const pos = arc.centroid(d);
                return `translate(${pos[0]}, ${pos[1]})`;
            })
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-weight", "bold")
            .text(function (d) {
                return d.data;
            });

        chart
            .selectAll("text")
            .style("fill-opacity", 0)
            .transition()
            .duration(500)
            .style("fill-opacity", 1);
    };
    var i = 0;

    useEffect(() => {
        changeData();
    }, []);

    const changeData = () => {
        setData(basicData[i++]);
        if (i === basicData.length) i = 0;
    };

    return (
        <div>
            <button onClick={changeData}>Change Data</button>

            <div className="chart">
                <svg ref={ref}></svg>
            </div>
        </div>
    );
}

export default Donut1;
