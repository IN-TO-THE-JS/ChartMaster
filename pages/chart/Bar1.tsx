import * as d3 from "d3";
import React, { useState, useRef, useEffect } from "react";

function Bar1() {
    const [width] = useState(600);
    const [height] = useState(400);
    const [basicData] = useState([
        [10, 30, 40, 20],
        [10, 40, 30, 20, 50, 10],
        [60, 30, 40, 20, 30],
    ]);
    const [data, setData] = useState([]);

    const ref = useRef();

    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3
            .select(ref.current)
            .attr("width", width)
            .attr("height", height);
    }, [width, height]);

    useEffect(() => {
        draw();
    }, [data, chartWidth, chartHeight]);

    const draw = () => {
        const svg = d3.select(ref.current);
        const xScale = d3
            .scaleBand()
            .domain(d3.range(data.length))
            .range([0, chartWidth])
            .paddingInner(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data)])
            .range([chartHeight, 0])
            .nice();

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        svg.selectAll("*").remove();

        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const selection = chart.selectAll("rect").data(data);

        selection
            .exit()
            .transition()
            .duration(300)
            .attr("y", chartHeight)
            .attr("height", 0)
            .remove();

        selection
            .transition()
            .duration(300)
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => chartHeight - yScale(d));

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", chartHeight)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .attr("fill", "orange")
            .transition()
            .duration(300)
            .attr("y", (d) => yScale(d))
            .attr("height", (d) => chartHeight - yScale(d));

        chart
            .append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        chart.append("g").call(yAxis);
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

export default Bar1;
