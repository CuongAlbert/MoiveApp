import React from "react";
import { useState } from "react";

import classes from "./SearchForm.module.css";

const iconSearch = (
  <svg
    className="svg-inline--fa fa-search fa-w-16"
    fill="#ccc"
    aria-hidden="true"
    data-prefix="fas"
    width="32px"
    heigh="32px"
    data-icon="search"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
  </svg>
);

const SearchForm = (props) => {
  const [query, setQuery] = useState();

  //lấy giá trị nhập trong ô input
  const changeHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setQuery(e.target.value);
    }
  };
  // console.log(query);

  // Hàm khi click button Search, truyền từ component SearchDetail
  const submitHandler = (e) => {
    e.preventDefault();

    //hàm lấy giá trị input truyền sang Search.jsx
    props.takeQuery(query);
  };

  // Hàm khi click button Reset, truyền từ component Search Detail
  const onClickHandler = () => {
    setQuery("");
    props.onClickHandler();
  };

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <div className={classes.search}>
        <input type="text" onChange={changeHandler} value={query}></input>
        <div className={classes.icon}>{iconSearch}</div>
      </div>
      <hr />
      <div className={classes.btn}>
        <button type="reset" onClick={onClickHandler}>
          RESET
        </button>
        <button type="submit">SEARCH</button>
      </div>
    </form>
  );
};

export default SearchForm;
