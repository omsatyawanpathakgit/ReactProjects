const API_KEY  = "a2f31994239dd797dcb1e2f1bbadcc5b";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular movies.');
    }
    const data = await response.json();
    return data.results;
}

export const getPopularTVShows = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch popular TV shows.');
    }
    const data = await response.json();

    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query)}`);
    if (!response.ok) {
        throw new Error('Failed to search movies.');
    }
    const data = await response.json();
    return data.results;
}

export const getMoviePosterUrl = (posterPath) => {
    if (!posterPath) {
        return 'https://via.placeholder.com/320x420?text=No+Poster';
    }

    return `${IMAGE_BASE_URL}${posterPath}`;
}

export const getTVShowPosterUrl = (posterPath) => {
    if (!posterPath) {
        return 'https://via.placeholder.com/320x420?text=No+Poster';
    }

    return `${IMAGE_BASE_URL}${posterPath}`;
}

