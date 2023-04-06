import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const BarChart1 = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // scale
    const xScale = d3
      .scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = d3.scaleLinear().domain([0, 150]).range([150, 0]);

    // axis
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (value, index) => xScale(index)) // index xScale 통해 스케일링한 값을 x좌표로
      .attr("y", yScale)
      .attr("width", xScale.bandwidth()) // xScale의 bandwidth만큼 width 설정
      .attr("height", (value, index) => 150 - yScale(value)); // svg 아래에 붙이기 위해서 svg viewBox 고려해 변경
  }, [data]);

  return (
    <div style={{ padding: "50px" }}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

function BarChart2({ width, height, data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    var selection = svg.selectAll("rect").data(data);
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height - 100]);

    selection
      .transition()
      .duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d));

    selection
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 45)
      .attr("y", (d) => height)
      .attr("width", 40)
      .attr("height", 0)
      .attr("fill", "orange")
      .transition()
      .duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => height)
      .attr("height", 0)
      .remove();
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

const BarChart3 = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);

    const xScale = d3
      .scaleBand()
      .range([0, 400])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .range([200, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => 200 - yScale(d.value))
      .transition()
      .duration(300)
      .attr("height", (d) => yScale(d.value))
      .attr("y", (d) => 200 - yScale(d.value));

    svg
      .append("g")
      .attr("transform", "translate(0,200)")
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <svg ref={ref} width={400} height={200}>
      <text x={200} y={30} textAnchor="middle" fontSize={18}>
        Bar Chart
      </text>
    </svg>
  );
};

export { BarChart1, BarChart2, BarChart3 };
