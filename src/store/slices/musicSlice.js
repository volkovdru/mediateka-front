import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArtist = createAsyncThunk('music/fetchArtist', async (id) => {
    const response = await axios.get(`http://localhost:8080/api/artists/${id}`);
    return response.data;
})

export const fetchArtists = createAsyncThunk('music/fetchArtists', async () => {
    const response = await axios.get(`http://localhost:8080/api/artists`);
    return response.data;
})

export const fetchTracks = createAsyncThunk('music/fetchTracks', async () => {
    const response = await axios.get(`http://localhost:8080/api/tracks`);
    return response.data;
})

export const fetchAlbum = createAsyncThunk('music/fetchAlbum', async (id) => {
    const response = await axios.get(`http://localhost:8080/api/albums/${id}`);
    return response.data;
})

export const fetchAlbumsByArtist = createAsyncThunk('music/fetchAlbumsByArtist', async (id) => {
    const response = await axios.get(`http://localhost:8080/api/artists/${id}/albums`);
    return response.data;
})

export const addArtist = createAsyncThunk('music/addArtist', async (artistData) => {
    const response = await axios.post('http://localhost:8080/api/artists', artistData);
    return response.data;
});

export const addTrack = createAsyncThunk('tracks/addTrack', async (formData) => {
    const response = await axios.post('http://localhost:8080/api/tracks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
    });
    return response.data;
});

export const addTracks = createAsyncThunk('tracks/addTracks', async (formData) => {
    const response = await axios.post('http://localhost:8080/api/tracks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
    });
    return response.data;
});

const musicSlice = createSlice({
    name: 'music',
    initialState: {
        artist: {},
        artists: [],
        album: {},
        albums: [],
        tracks: [],
        loading: true,
        error: null,
        addArtistStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.artist = action.payload;
            })
            .addCase(fetchArtist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.album = action.payload;
            })
            .addCase(fetchAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.loading = false;
                state.artists = action.payload;
            })
            .addCase(fetchArtists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTracks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTracks.fulfilled, (state, action) => {
                state.loading = false;
                state.tracks = action.payload;
            })
            .addCase(fetchTracks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAlbumsByArtist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAlbumsByArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.albums = action.payload;
            })
            .addCase(fetchAlbumsByArtist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addArtist.pending, (state) => {
                state.addArtistStatus = 'loading';
            })
            .addCase(addArtist.fulfilled, (state, action) => {
                state.addArtistStatus = 'succeeded';
                state.artist = action.payload; // Обновляем текущего артиста
            })
            .addCase(addArtist.rejected, (state, action) => {
                state.addArtistStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export default musicSlice.reducer;
export const selectArtist = (state) => state.music.artist;
export const selectAlbum = (state) => state.music.album;
export const selectArtists = (state) => state.music.artists;
export const selectTracks = (state) => state.music.tracks;
export const selectAlbums = (state) => state.music.albums;
export const selectLoading = (state) => state.music.loading;
export const selectError = (state) => state.music.error;
export const selectAddArtistStatus = (state) => state.music.addArtistStatus;