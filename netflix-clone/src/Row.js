import React, { useState, useEffect } from 'react';
import axios from './axios';

function Row({ title, fetchUrl }){
    // uses a temp memory to hold an array 
    const [movies, setMovies] = useState([]);

    // a snippet of code which runs based on a specific condition/variable
    // when row loads run this request for the information from TMBD

    useEffect(() =>{
        // if [], run once when the row loads and don't run it again
        // if != [], run once when loads, and run everytime [] changes
        // need to make an async call 
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            console.log(request)
            return request;
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>{title}</h2>
            
            {/* container -> posters */}
        </div>
    )
}

export default Row;