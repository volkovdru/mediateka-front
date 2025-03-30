import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import movieReducer from './slices/movieSlice';
import musicReducer from "./slices/musicSlice";
import audioPlayerReducer from "./slices/AudioPlayerSlice";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        music: musicReducer,
        audioPlayer: audioPlayerReducer // Добавляем редюсер плеера
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;