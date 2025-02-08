import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import movieReducer from './slices/movieSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
    },
});

export default store;