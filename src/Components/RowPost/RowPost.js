import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../Constants/constants";
import Youtube from "react-youtube";

function RowPost(props) {
  const [shows, setShows] = useState([]);
  const [urlId, setUrlId] = useState("");
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setShows(response.data.results);
      })
      .catch((err) => {
        alert("Network Error");
      });
  });
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleClick = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log("Empty array");
        }
      });
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {shows.map((obj) => (
          <img
            onClick={() => handleClick(obj.id)}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="Poster"
          />
        ))}
      </div>
      {urlId && <Youtube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
