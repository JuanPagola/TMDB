export const movieService = {
    getPopularMovies,
    getGenres,
    searchMovies
};

const key = '8f85638a99e648a99c56bf80eac70caa';

function getPopularMovies() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`, requestOptions).then(handleResponse);
}

function getGenres(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`, requestOptions).then(handleResponse);
}

function searchMovies(value){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${value}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        //const data = text && JSON.parse(text);
        let data = "";
        IsJsonString(text) ? data = text && JSON.parse(text) : data = text;

        if (!response.ok) {
            //const error = (data && data.message) || response.statusText;
            const error = data || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}