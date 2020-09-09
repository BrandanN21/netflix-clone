import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  // uses a temp memory to hold an array
  const [movies, setMovies] = useState([]);

  // a snippet of code which runs based on a specific condition/variable
  // when row loads run this request for the information from TMBD

  useEffect(() => {
    // if [], run once when the row loads and don't run it again
    // if != [], run once when loads, and run everytime [] changes
    // need to make an async call
    async function fetchData() {
      const request = await axios.get(fetchUrl); //outside variable
      console.table(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // *outside variable now becomes a dependency.. REQUIRED*

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* serveral row_poster(s) */}
        {movies.map((movie) => (
          <img
            className="row_poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>

      {/* container -> posters */}
    </div>
  );
}

export default Row;
