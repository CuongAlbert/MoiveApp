import React, { useState } from "react";

import MovieDetail from "./MovieDetail";
import MovieList from "./MovieList";
import classes from "./MoviesList.module.css";

const MoviesList = (props) => {
  const [movieData, setMovieData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const requests = props.requests;

  // hàm lấy giá trị data của film khi click vào ảnh
  // có 3 trường hợp:
  // ban đầu chưa click movieData === null, sau đó click và ảnh khác hiển thị data khác, và trường hợp click lại vào ảnh thì ẩn detail
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
  console.log(movieData);

  //hàm tắt hiển thị detail
  const closeHandler = () => {
    setShowDetail(false);
  };

  return (
    <React.Fragment>
      <div className="main-container">
        <div>
          <h2>ORIGINALS</h2>
          <MovieList
            request={requests.fetchNetflixOriginals}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>XU HƯỚNG</h2>
          <MovieList
            request={requests.fetchTrending}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>XẾP HẠNG CAO</h2>
          <MovieList
            request={requests.fetchTopRated}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>HÀNH ĐỘNG</h2>
          <MovieList
            request={requests.fetchActionMovies}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>HÀI</h2>
          <MovieList
            request={requests.fetchComedyMovies}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>KINH DỊ</h2>
          <MovieList
            request={requests.fetchHorrorMovies}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>LÃNG MẠN</h2>
          <MovieList
            request={requests.fetchRomanceMovies}
            clickHandler={showDataFilm}
          />
        </div>
        <div>
          <h2>TÀI LIỆU</h2>
          <MovieList
            request={requests.fetchDocumentaries}
            clickHandler={showDataFilm}
          />
        </div>
      </div>
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
    </React.Fragment>
  );
};

export default MoviesList;
