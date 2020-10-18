import React, { useState } from 'react';
import { movieService } from '../../movieApi/movieApi';
import './header.scss'

export const Header = (props) => {
    const { setOriginalMoviesList, setFilteredMoviesList } = props;
    const [searchValue, setSerachValue] = useState('');

    async function getFilteredMovies() {
        let searchResponse = '';
        if (searchValue.trim() != '') {
            searchResponse = await movieService.searchMovies(searchValue);
        }
        else {
            searchResponse = await movieService.getPopularMovies();
        }
        setOriginalMoviesList(searchResponse.results);
        setFilteredMoviesList(searchResponse.results);
        setSerachValue('');
    }

    function handleChange(e) {
        setSerachValue(e.target.value);
    }

    return (
        <>
            <div className={'header'}>
                <div>
                    <input
                        type="text"
                        name="search"
                        value={searchValue}
                        onChange={handleChange}
                        placeholder="Search any movie..."
                    />
                    <div className='discover' onClick={getFilteredMovies}>
                        Discover new movies
                    </div>
                </div>
            </div>
        </>
    );
}