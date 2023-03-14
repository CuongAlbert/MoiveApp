import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import useMovie from "../../hook/use-movie";

import classes from "./MovieDetail.module.css";

const API_KEY = "857e0c778ec65f68aaa52405b261adea";

const MovieDetail = (props) => {
  const [renderVideo, setRenderVideo] = useState();
  const { sendRequest } = useMovie();

  //request: sau khi lấy được dữ liệu id truyền từ hàm showDataFilm ở component MoviesList
  let lastUrl = `/movie/${props.id}/videos?api_key=${API_KEY}`;

  // console.log("Request End point: ", lastUrl);

  useEffect(() => {
    // Xóa hết dữ liệu cũ
    setRenderVideo(null);

    let videoYoutube;

    const getData = (data) => {
      if (data.results !== null && data.results.length > 0) {
        videoYoutube = data.results?.filter((el) => el.site === "YouTube"); // lọc hết video có site là youtube
        // console.log("youtubeVideo:", videoYoutube);

        //lọc video có site youtube và type là Trailer
        const trailerVideo = videoYoutube.filter((el) => el.type === "Trailer");
        // lọc video có site youtube và type Teaser
        const teaserVideo = videoYoutube.filter((el) => el.type === "Teaser");

        // console.log("Trailer:", trailerVideo);
        // console.log("Teaser:", teaserVideo);

        if (trailerVideo !== []) {
          setRenderVideo(trailerVideo[0]); // Ưu tiên type Trailer, ko có dùng type Teaser
        } else {
          setRenderVideo(teaserVideo[0]);
        }
      }
    };

    sendRequest(lastUrl, getData); // gọi hàm từ custom Hook
  }, [props.id]); // Thay đổi khi id thay đổi (click vào ảnh khác)

  // console.log(renderVideo, "renderVideo");
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // truyền hàm tắt detail từ MoviesDetail
  const closeHandler = () => {
    props.closeHandler();
  };
  return (
    <React.Fragment>
      <div className={classes.detail}>
        <span className={classes.button_close} onClick={closeHandler}>
          X
        </span>
        <div className={classes.text}>
          <h1>{props.original_title ? props.original_title : props.name}</h1>
          <hr />
          <p>
            Release Date:{" "}
            {props.release_date ? props.release_date : props.first_air_date}
          </p>
          <p>Vote:{props.vote_average}</p>
          <p>
            {props.overview
              ? props.overview
              : props.original_title
              ? props.original_title
              : props.name}
          </p>
        </div>
        <div className={classes.movie}>
          {renderVideo && <YouTube videoId={renderVideo.key} opts={opts} />}
          {/* Nếu ko có video nào thỏa mãn thì thay thế bằng ảnh (dùng backdrop đẹp hơn poster) */}
          {!renderVideo && (
            <img
              src={`http://image.tmdb.org/t/p/original${props.backdrop_path}`}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieDetail;
