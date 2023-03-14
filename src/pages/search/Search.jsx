import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchDetail from "../../components/Search/SearchDetail";
import MovieDetail from "../../components/Body/MovieDetail";
import SearchForm from "../../components/Search/SearchForm";

import classes from "./Search.module.css";

const Search = (props) => {
  const [input, setInput] = useState();
  const [movieData, setMovieData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  //Hàm show detail từng phim theo ảnh (giống trang Browse)
  const showDataFilm = (film) => {
    if (movieData === null) {
      setMovieData(film);
      setShowDetail(true);
    } else if (movieData.id !== film.id) {
      setMovieData(film);
      setShowDetail(true);
    } else {
      setShowDetail((pre) => !pre);
    }
    return movieData;
  };

  const closeHandler = () => {
    setShowDetail(false);
  };

  //Hàm khi bấm nút reset, reset input và movieData
  const resetHandler = () => {
    setMovieData(null);
    setInput("");
  };

  //hàm lấy giá trị trong ô input đem đi search
  const takeQuery = (input) => {
    setInput(input);
  };
  return (
    <div className="app">
      <Navbar />
      <SearchForm takeQuery={takeQuery} onClickHandler={resetHandler} />
      {input && <SearchDetail query={input} clickHandler={showDataFilm} />}
      {movieData && showDetail && (
        <div className={classes.detail}>
          <MovieDetail
            closeHandler={closeHandler}
            id={movieData.id}
            original_title={movieData.original_title}
            name={movieData.name}
            release_date={movieData.release_date}
            first_air_date={movieData.first_air_date}
            vote_average={movieData.vote_average}
            overview={movieData.overview}
            poster_path={movieData.poster_path}
            backdrop_path={movieData.backdrop_path}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
