import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id) => {
    const response = await axios.get(`https://api.baza.net/portal/movie/${id}`);
    return response.data.data;
})

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movie: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload;
            })
            .addCase(fetchMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default movieSlice.reducer;
export const selectMovie = (state) => state.movie.movie;
export const selectLoading = (state) => state.movie.loading;
export const selectError = (state) => state.movie.error;