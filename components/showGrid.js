import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/showGrid.module.css";

export default function ShowGrid(props) {
  const [listType, setListType] = useState();
  const [shows, setShows] = useState();

  const axios = require("axios");

  const fetchShows = () => {
    const request = axios.get("http://localhost:8080/tvshow/all");
    request
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className={styles.showGrid}>
      {shows &&
        shows.map((show) => (
          <div key={show.id} className={styles.showContainerWrapper}>
            <div className={styles.showOverlay}>
              <h3>{show.name}</h3>
              <p>Rating: {show.rating}</p>
            </div>
            <div className={styles.showContainer}>
              <img src={show.imageUrl} width={180} />
            </div>
          </div>
        ))}
    </div>
  );
}
