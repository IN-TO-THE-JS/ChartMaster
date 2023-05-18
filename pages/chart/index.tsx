import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import { BarChart1, BarChart2, BarChart3 } from "./TestBarChart";
import styled from "styled-components";
import Link from "next/link";

const Styles = styled.div`
    .chartPage {
        height: 100vh;
        background-color: #f8f8f8;
    }
    header {
        border-bottom: 1px solid #ddd;
        display: flex;
        height: 3rem;
        background-color: white;
        .home {
            border: 1px solid #ddd;
            width: 3rem;
        }
        .export {
            background-color: black;
            color: white;
            font-weight: 700;
            height: 2rem;
            margin-top: 0.5rem;
        }
        .profile {
            border: 1px solid #ddd;
            width: 3rem;
        }
    }

    .ctrlA {
        background-color: #eee;
        height: 2rem;
    }
    .chartContainer {
        margin-right: 20rem;
        float: left;
        background-color: white;
        border-radius: 2px;
        box-shadow: 1px 1px 3px 2px #ddd;
        margin-top: 0.5rem;
    }
    .ctrlB {
        border-left: 1px solid #ddd;
        float: right;
        width: 20rem;
        height: calc(100% - 5rem);
    }
`;

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

    const Chart = dynamic(import(`../chart/${component}`));

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
        <Styles>
            <div className="chartPage">
                <header>
                    <Link href={"/"} className="home">
                        홈
                    </Link>
                    <div className="export">Export & Publish</div>
                    <div className="profile">Profile</div>
                </header>
                <div className="ctrlA">
                    <button onClick={changeData}>Change Data</button>
                </div>
                <div className="chartContainer">
                    <Chart />
                </div>
                <div className="ctrlB">controller B</div>
                {/* <BarChart1 />
      <BarChart3 data={barData} /> */}
                {/* <BarChart2 width={600} height={400} data={data} /> */}
                {/* <BarChart width={600} height={400} data={data} />
            <DonutChart width={600} height={400} data={data} /> */}
            </div>
        </Styles>
    );
};

export default Chart;
