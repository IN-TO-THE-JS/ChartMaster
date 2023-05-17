import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import { BarChart1, BarChart2, BarChart3 } from "./TestBarChart";

const datas = [
    [10, 30, 40, 20],
    [10, 40, 30, 20, 50, 10],
    [60, 30, 40, 20, 30],
];
var i = 0;

const Chart = () => {
    const [data, setData] = useState([]);
    const router = useRouter();
    const { component } = router.query;

    const Test = dynamic(import(`../chart/${component}`));

    const ActiveComponent = useEffect(() => {
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
            공통 부분
            {/* <BarChart1 />
      <BarChart3 data={barData} /> */}
            {/* <BarChart2 width={600} height={400} data={data} /> */}
            {/* <BarChart width={600} height={400} data={data} />
            <DonutChart width={600} height={400} data={data} /> */}
            <Test />
        </div>
    );
};

export default Chart;
