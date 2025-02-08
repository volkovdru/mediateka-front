import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
    const state = getState();
    const { currentPage, filters, order, order_direction } = state.movies;
    const response = await axios.get(`https://api.baza.net/portal/movies`, {
        params: {
            limit: 24,
            offset: 24 * (currentPage - 1),
            order_direction,
            order,
            genre: filters.genre,
            country: filters.country,
            years: filters.years,
        },
    });
    return response.data.data;
});

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await axios.get(`https://api.baza.net/portal/genres`);
    return response.data.data;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        genres: [],
        loading: false,
        error: null,
        count: 0,
        currentPage: 1,
        filters: {
            genre: '',
            country: '',
            years: [],
        },
        order: 'updated',
        order_direction: 'desc',
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = {
                genre: '',
                country: '',
                years: [],
            };
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setOrderDirection: (state, action) => {
            state.order_direction = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies;
                state.count = action.payload.count;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    setCurrentPage,
    setFilters,
    resetFilters,
    setOrder,
    setOrderDirection,
} = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectMovies = (state) => state.movies.movies;
export const selectCount = (state) => state.movies.count;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;
export const selectFilters = (state) => state.movies.filters;
export const selectGenres = (state) => state.movies.genres;
export const selectCurrentPage = (state) => state.movies.currentPage;