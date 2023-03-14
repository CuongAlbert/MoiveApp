import React, { useEffect, useState } from "react";
import useMovie from "../../hook/use-movie";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  const { sendRequest } = useMovie();
  const [moviesData, setMoviesData] = useState();
  const [isOriginal, setIsOriginal] = useState(false);
  const request = props.request;

  useEffect(() => {
    //xem xét trường hợp list phim là original
    setIsOriginal(request.includes("discover/tv?"));
    const getData = (data) => {
      setMoviesData(data);
    };

    sendRequest(request, getData); // custom Hook lấy giá trị data
  }, []);

  //truyền hàm click vào ảnh từ MoviesList, giá trị đầu vào là data film
  const clickHandler = (film) => {
    props.clickHandler(film);
  };

  const originalClasses = !isOriginal
    ? classes.posters
    : `${classes.posters} ${classes.originals}`;

  return (
    <div className={classes.list}>
      <div className={originalClasses}>
        {moviesData &&
          // Render ảnh từng phim từ mảng results, original dùng poster, còn lại dùng backdrop
          moviesData.results.map((film) => (
            <img
              className={classes.poster}
              onClick={clickHandler.bind(this, film)}
              src={`http://image.tmdb.org/t/p/original${
                !isOriginal ? film.backdrop_path : film.poster_path
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export default MovieList;
