import React, { useEffect, useState } from "react";
import useMovie from "../../hook/use-movie";

import classes from "./Banner.module.css";

const Banner = (props) => {
  const [backdrop, setBackdrop] = useState();
  const [name, setName] = useState();
  const [overview, setOverview] = useState();
  const { sendRequest } = useMovie();
  const requests = props.requests;

  useEffect(() => {
    const getData = (data) => {
      //lấy data film bất kỳ trong list film Originals
      const bannerFilm =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      setBackdrop(bannerFilm.backdrop_path);
      setName(bannerFilm.name ? bannerFilm.name : bannerFilm.title);
      setOverview(bannerFilm.overview ? bannerFilm.overview : name);
    };

    sendRequest(requests.fetchNetflixOriginals, getData);
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div>
        <img src={`https://image.tmdb.org/t/p/original${backdrop}`} />
        <div className={classes.banner}>
          <h1>{name}</h1>
          <div className={classes.buttons}>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p className={classes.text}>{overview}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
