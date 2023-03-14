import React from "react";
import Banner from "../../components/Banner/Banner";
import MoviesList from "../../components/Body/MoviesList";
import Navbar from "../../components/Navbar/Navbar";

function Browse(props) {
  return (
    <div className="app">
      <Navbar />
      <Banner requests={props.requests} />
      <MoviesList requests={props.requests} />
    </div>
  );
}

export default Browse;
