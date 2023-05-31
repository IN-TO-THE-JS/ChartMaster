import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import { BarChart1, BarChart2, BarChart3 } from "./TestBarChart";
import styled from "styled-components";
import Link from "next/link";
import ExportModal from "../export/ExportModal";

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

const Chart = () => {
    const [isExportModalOn, setIsExportModalOn] = useState(false);
    const router = useRouter();
    const { component } = router.query;

    const Chart = dynamic(import(`../chart/${component}`));

    const changeData = () => {
        console.log("Change data.");
    };

    const handleClickExport = () => {
        setIsExportModalOn(!isExportModalOn);
        console.log(isExportModalOn);
    };

    return (
        <Styles>
            <div className="chartPage">
                <header>
                    <Link href={"/"} className="home">
                        홈
                    </Link>

                    <div className="profile">Profile</div>
                    {isExportModalOn ? (
                        <ExportModal />
                    ) : (
                        <button className="export" onClick={handleClickExport}>
                            Export & Publish
                        </button>
                    )}
                </header>
                <div className="ctrlA">
                    <button onClick={changeData}>Change Data</button>
                </div>
                <div className="chartContainer">
                    <Chart />
                </div>
                <div className="ctrlB">controller B</div>
            </div>
        </Styles>
    );
};

export default Chart;
