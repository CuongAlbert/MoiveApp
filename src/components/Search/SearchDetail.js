import React, { useState } from "react";
import { useEffect } from "react";
import useMovie from "../../hook/use-movie";
import classes from "./SearchDetail.module.css";

const API_KEY = "857e0c778ec65f68aaa52405b261adea";

const SearchDetail = (props) => {
  const { sendRequest } = useMovie();
  const [searchResults, setSearchResults] = useState();

  //lấy giá trị trong ô input từ SearchForm
  const query = props.query;

  const lastUrl = `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`;
  // console.log(lastUrl);

  useEffect(() => {
    setSearchResults(null);

    const getData = (data) => {
      setSearchResults(data.results);
      // console.log(data);
    };

    sendRequest(lastUrl, getData); // custom Hook lấy giá trị results sau khi search
  }, [query]);

  // console.log(searchResults);

  //Hàm click vào từng ảnh truyền data từng film
  const clickHandler = (film) => {
    props.clickHandler(film);
  };

  return (
    <div>
      {searchResults && <p className={classes.text}>Search Results</p>}
      <ul>
        {searchResults &&
          searchResults.map((film) => (
            <li>
              <img
                className={classes.img}
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                onClick={clickHandler.bind(this, film)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchDetail;
