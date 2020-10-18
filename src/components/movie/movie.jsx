import React, { useState, useEffect, createRef } from 'react';
import './movie.scss';
import rockPic from '../../assets/RockPic.jpg';
import rockSmall from '../../assets/RockSmall.png';

export const Movie = (props) => {
    const { adult, backdrop_path, genre_ids, id, original_language, original_title, overview,
        popularity, poster_path, release_date, title, video, vote_average, vote_count } = props.data;
    const { genres } = props.genres;
    const [displayDetails, setDisplayDetails] = useState(false);
    const movieGenresFiltered = getGenres();

    function getGenres() {
        const movieGenres = genres.filter(g => genre_ids.includes(g.id));
        return movieGenres;
    }

    return (
        <>
            {displayDetails === true &&
                <div className='overlayDetails'>
                    <div className='detailContent'>
                        <span className='closeIcon' onClick={() => setDisplayDetails(false)}>
                            X
                        </span>
                        <h3>{title}</h3>
                        <div className='detailList'>
                            {poster_path != null ? <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} /> : <img className='rockSmall' src={rockSmall} />}
                            <div>
                                <span>Original title: {original_title}</span>
                                {original_language && <span>Lang: {original_language}</span>}
                                {release_date && <span>Released: {release_date}</span>}
                                {adult == true ? <span>Public: Adults only</span> : <span>Public: Everyone</span>}
                                <span>Rating: {vote_average}</span>
                                <span>Votes Qty: {vote_count}</span>
                                {movieGenresFiltered.length > 0 && <div> Genres: </div>}
                                {Object.values(movieGenresFiltered).map((data, key) => {
                                    return (
                                        <div
                                            className='genre'
                                            key={key}
                                        >
                                            {data.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {overview &&
                            <div className='overView'>
                                <span>Overview:</span>
                                <div>{overview}</div>
                            </div>
                        }
                    </div>
                </div>
            }
            <div className="movieContainer"
                onClick={() => setDisplayDetails(true)}
            >
                {poster_path != null ? <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} /> : <><img className="rockPic" src={rockPic} /><div>{title}</div><div>No Img found</div></>}
            </div>
        </>
    );
}