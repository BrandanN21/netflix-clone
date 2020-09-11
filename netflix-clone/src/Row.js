import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // uses a temp memory to hold an array
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // a snippet of code which runs based on a specific condition/variable
  // when row loads run this request for the information from TMBD

  useEffect(() => {
    // if [], run once when the row loads and don't run it again
    // if != [], run once when loads, and run everytime [] changes
    // need to make an async call
    async function fetchData() {
      const request = await axios.get(fetchUrl); //outside variable
      //console.table(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // *outside variable now becomes a dependency.. REQUIRED*

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {/* serveral row_poster(s) */}
        {movies.map((movie) => (
          <img
            key={movie.id} //optimization, renders each one at a time rather than all at once
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
