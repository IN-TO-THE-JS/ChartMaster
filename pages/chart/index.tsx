import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
// import { BarChart1, BarChart2, BarChart3 } from "./TestBarChart";

const datas = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30],
];
var i = 0;

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  };

  // const barData = [
  //   { name: "A", value: 10 },
  //   { name: "B", value: 20 },
  //   { name: "C", value: 15 },
  //   { name: "D", value: 30 },
  //   { name: "E", value: 25 },
  // ];
  return (
    <div>
      <button onClick={changeData}>Change Data</button>
      {/* <BarChart1 />
      <BarChart3 data={barData} /> */}
      {/* <BarChart2 width={600} height={400} data={data} /> */}
      <BarChart width={600} height={400} data={data} />
    </div>
  );
};

export default Chart;
