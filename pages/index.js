import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ShowGrid from "../components/showGrid";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [top10, setTop10] = useState(null);
  const [summary, setSummary] = useState(null);
  const [topEpisode, setTopEpisode] = useState(null);
  const [topNetwork, setTopNetwork] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const axios = require("axios");

  const reports = [
    {
      value: "top10",
      name: "Top 10",
      uri: "/tvshow/top10",
      func: setTop10,
      state: top10,
    },
    {
      value: "summary",
      name: "Summary",
      uri: "/tvshow/top10",
      func: setSummary,
      state: summary,
    },
    {
      value: "topEpisode",
      name: "Top Episode",
      uri: "/tvshow/top-episode",
      func: setTopEpisode,
      state: topEpisode,
    },
    {
      value: "topNetwork",
      name: "Top Network",
      uri: "/network/top",
      func: setTopNetwork,
      state: topNetwork,
    },
  ];

  const fetchReport = (report) => {
    if (!report.state) {
      axios
        .get("http://localhost:8080" + report.uri)
        .then((response) => {
          report.func(response.data);
          setSelectedReport(report.value);
        })
        .catch((error) => console.error(error));
    } else {
      setSelectedReport(report.value);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>PayEx - TV Shows Frontend</title>
        <meta name="description" content="Simple frontend for TV-shows API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <center>
          <h1>TV SHOWS</h1>
        </center>
        <div className={styles.showGrid}>
          <div className={styles.btnRow}>
            {reports.map((report) => (
              <button key={report.value} onClick={() => fetchReport(report)}>
                {report.name}
              </button>
            ))}
          </div>
          <ShowGrid />
        </div>
        {selectedReport && (
          <div className={styles.reportCard}>
            <p onClick={() => setSelectedReport(null)} className={styles.exit}>
              x
            </p>
            {reports.find((x) => x.value == selectedReport).state}
          </div>
        )}
      </main>
    </div>
  );
}
