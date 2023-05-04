import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { charts } from "../data/charts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <header>
                    <Link href="/">
                        <img src="/logo.png" />
                    </Link>
                </header>

                <div>Choose a template</div>

                {charts.map((ctgry) => {
                    return (
                        <ul>
                            <h3>{ctgry.ctgry_name}</h3>
                            <span>{ctgry.ctgry_disc}</span>
                            {ctgry.ctgry_charts.map((chart, idx) => {
                                return (
                                    <li>
                                        <Link
                                            href={`/chart/${chart.chart_code}`}
                                        >
                                            <div>
                                                <img
                                                    src={`/img/${ctgry.ctgry_imgtag}_${idx}.png`}
                                                />
                                            </div>
                                            <h4>{chart.chart_name}</h4>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
                <footer>footer</footer>
            </main>
        </>
    );
}
