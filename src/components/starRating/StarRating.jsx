import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import './starRating.scss';


export const StarRating = (props) => {
    const { originalMoviesList, setOriginalMoviesList, filteredMoviesList, setFilteredMoviesList} = props;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    function filterMovies(ratingParam) {
        if(ratingParam == rating){
            setRating(0);
            setFilteredMoviesList(originalMoviesList);
            return;
        }

        setRating(ratingParam);
        let filteredList = originalMoviesList.filter(m => (m.vote_average >= (ratingParam-1)*2 && m.vote_average <= ratingParam*2));
        setFilteredMoviesList(filteredList);
    }

    useEffect(()=>{
        setRating(0);
    }, [originalMoviesList])

    return (
        <div className="starContainer">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            value={ratingValue}
                        />
                        <FaStar
                            className="starIcon"
                            size={30}
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onClick={() => filterMovies(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            }
            )}
        </div>
    );
};