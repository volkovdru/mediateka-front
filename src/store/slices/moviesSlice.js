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
            order: order.value,
            genres: filters.genres.map(genre => genre.id),
            countries: filters.countries.map(country => country.id),
            years: filters.years.value,
        },
    });
    return response.data.data;
});

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await axios.get(`https://api.baza.net/portal/genres`);
    return response.data.data;
});

export const fetchCountries = createAsyncThunk('movies/fetchСountries', async () => {
    const response = await axios.get(`https://api.baza.net/portal/countries`);
    return response.data.data;
});

export const fetchSearchResults = createAsyncThunk(
    'movies/fetchSearchResults',
    async (query) => {
        const response = await axios.post('https://api.baza.net/portal/search', {
            query: query,
        });
        return response.data.data.movies;
    }
);

const initialState = {
    movies: [],
    genres: [],
    countries: [],
    loading: false,
    error: null,
    count: 0,
    currentPage: 1,
    filters: {
        genres: [],
        countries: [],
        years: []
    },
    orders: [
        {value: 'updated', name: 'По дате добавления'},
        {value: 'downloads', name: 'По популярности'},
        {value: 'rating_kp', name: 'По рейтингу'},
        {value: 'year', name: 'По году'},
    ],
    order: '',
    order_direction: 'desc',
    searchResults: [],
}


const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setYearsFilter: (state, action) => {
            state.filters = { ...state.filters, "years": action.payload };
        },
        setGenreFilter: (state, action) => {
            state.filters = { ...state.filters, "genres": action.payload };
        },
        setCountriesFilter: (state, action) => {
            state.filters = { ...state.filters, "countries": action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.order = initialState.order;
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
                state.genres = action.payload.filter(s=> s.name !== "!перезалить!"); //TODO: вынести фильтр отсюда
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        ;
    },
});

export const {
    setCurrentPage,
    setYearsFilter,
    setGenreFilter,
    setCountriesFilter,
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
export const selectOrder = (state) => state.movies.order;
export const selectOrderDirection = (state) => state.movies.order_direction;
export const selectGenres = (state) => state.movies.genres;
export const selectCountries = (state) => state.movies.countries;
export const selectOrders = (state) => state.movies.orders;
export const selectFilteredCountries = (state) => state.movies.filters.countries;
export const selectCurrentPage = (state) => state.movies.currentPage;
export const selectSearchResults = (state) => state.movies.searchResults;