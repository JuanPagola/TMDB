import React, { useState, useEffect, createRef } from 'react';
import { Header } from '../components/header/header';
import { movieService } from '../movieApi/movieApi';
import { Movie } from '../components/movie/movie';
import noSearch from '../assets/noSearch.png';
import noRating from '../assets/noRating.png';
import { StarRating } from '../components/starRating/StarRating';
import './landing.scss';

export const Landing = () => {
    const [originalMoviesList, setOriginalMoviesList] = useState('uninitiated');
    const [filteredMoviesList, setFilteredMoviesList] = useState('uninitiated');
    const [genresList, setGenresList] = useState('');

    useEffect(() => {
        fetchMovies();

        async function fetchMovies() {
            const moviesResponse = await movieService.getPopularMovies();
            setOriginalMoviesList(moviesResponse.results);
            setFilteredMoviesList(moviesResponse.results)

            const genresResponse = await movieService.getGenres();
            setGenresList(genresResponse);
        }
    }, [])

    return (
        <div className="landingContainer">
            <Header
                setOriginalMoviesList={setOriginalMoviesList}
                setFilteredMoviesList={setFilteredMoviesList}
            />
            {originalMoviesList.length > 0 && originalMoviesList != 'uninitiated' &&
                <div className="ratingContainer">
                    <span>Filter by rating: </span>
                    <StarRating
                        originalMoviesList={originalMoviesList}
                        setOriginalMoviesList={setOriginalMoviesList}
                        filteredMoviesList={filteredMoviesList}
                        setFilteredMoviesList={setFilteredMoviesList}
                    />
                </div>
            }
            <div className={'landingContent'}>
                {originalMoviesList && genresList &&
                    <>
                        {Object.values(filteredMoviesList).map((data, key) => {
                            return (
                                <Movie
                                    key={key}
                                    data={data}
                                    genres={genresList}
                                />
                            )
                        })}
                    </>
                }
            </div>
            {originalMoviesList.length < 1 &&
                <div className="noSearch">
                    <img  src={noSearch} />
                    <div>No movies found please try again</div>
                </div>
            }
            {filteredMoviesList.length < 1 && originalMoviesList.length > 0 &&
                <div className="noRating">
                    <img src={noRating} />
                    <div>No movies withing this rating range</div>
                </div>
            }
        </div>
    );
}