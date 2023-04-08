import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const dummyData = [
    { ctgry_name: "Line, bar and pie charts", 
      ctgry_disc: "Basic types of chart, single or in a grid", 
      ctgry_imgtag: "LineBarPie", 
      ctgry_charts: [
        {chart_name: "Area chart", chart_sub: "proportional", chart_disc: "BarA 차트입니다.", },
        {chart_name: "Area chart", chart_sub: "stacked", chart_disc: "BarB 차트입니다.",   },
        {chart_name: "Bar chart", chart_sub: "", chart_disc: "BarC 차트입니다.",   },
        {chart_name: "Bar chart", chart_sub: "proportional", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Bar chart", chart_sub: "stacked", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Bar chart", chart_sub: "with filter", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "Likert scale", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
        {chart_name: "Column chart", chart_sub: "grouped", chart_disc: "BarD 차트입니다.",   },
      ] 
    },
    { ctgry_name: "Projection map", 
      ctgry_disc: "Make data maps with region-shading and/or points. Adapt an existing example or upload your own geographic boundary file.", 
      ctgry_imgtag: "ProjectionMap",
      ctgry_charts: [
        {chart_name: "DotA", chart_sub: "DotA Type chart", chart_disc: "DotA 차트입니다.",   },
        {chart_name: "DotB", chart_sub: "DotB Type chart", chart_disc: "DotB 차트입니다.",   },
        {chart_name: "DotC", chart_sub: "DotC Type chart", chart_disc: "DotC 차트입니다.",   },
        {chart_name: "DotD", chart_sub: "DotD Type chart", chart_disc: "DotD 차트입니다.",   },
        {chart_name: "DotE", chart_sub: "DotE Type chart", chart_disc: "DotE 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
        {chart_name: "DotF", chart_sub: "DotF Type chart", chart_disc: "DotF 차트입니다.",   },
      ] 
    },
    { ctgry_name: "Scatter", 
      ctgry_disc: "Powerful scatter plot with optional time slider, mini charts, and tracker lines", 
      ctgry_imgtag: "Scatter", 
      ctgry_charts: [
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
        {chart_name: "LineA", chart_sub: "LineA Type chart", chart_disc: "LineA 차트입니다.",   },
      ] 
    },
    { ctgry_name: "3D map", 
      ctgry_disc: "Map for displaying regions, lines and points with optional time slider", 
      ctgry_imgtag: "3DMap", 
      ctgry_charts: [
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
        {chart_name: "PieA", chart_sub: "PieA Type chart", chart_disc: "PieA 차트입니다.",   },
      ] 
    },
    { ctgry_name: "Bar chart race", 
      ctgry_disc: "Make your own bar chart race with Flourish", 
      ctgry_imgtag: "BarChartRace", 
      ctgry_charts: [
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
      ] 
    },
    { ctgry_name: "Bubble chart", 
      ctgry_disc: "Template to present data through scaled circles containing images and text", 
      ctgry_imgtag: "Bubble", 
      ctgry_charts: [
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
        {chart_name: "MixA", chart_sub: "MixA Type chart", chart_disc: "MixA 차트입니다.",   },
      ] 
    },
  ]
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <header>
          <Link href="/">
            <img src="/logo.png" />
          </Link>
        </header>

        <div>Choose a template</div>

        {dummyData.map(ctgry => {
          return (
            <ul>
              <h3>{ctgry.ctgry_name}</h3>
              <span>{ctgry.ctgry_disc}</span>
              {ctgry.ctgry_charts.map((chart, idx) => {
                return (
                  <li>
                    <Link href={`/chart/${chart.chart_name}`}>
                      <div><img src={`/img/${ctgry.ctgry_imgtag}_${idx}.png`} /></div>
                      <h4>{chart.chart_name}</h4>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        })}        

        <footer>
          footer
        </footer>

      </main>
    </>
  );
}
