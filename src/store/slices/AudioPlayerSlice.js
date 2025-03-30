import { createSlice } from '@reduxjs/toolkit';

const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        playlist: [],
        currentTrack: null,
        currentTime: 0,
        isPlaying: false,
    },
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = action.payload;
            if (action.payload.length > 0) {
                state.currentTrack = action.payload[0];
            }
            state.currentTime = 0;
            state.isPlaying = true;
        },
        playTrack: (state) => {
            state.isPlaying = true;
        },
        pauseTrack: (state, action) => {
            state.currentTime = action.payload;
            state.isPlaying = false;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
            state.currentTime = 0;
        },
        nextTrack: (state) => {
            if (state.playlist.length === 0) return;
            const currentIndex = state.playlist.findIndex(
                track => track.id === state.currentTrack.id
            );
            const nextIndex = (currentIndex + 1) % state.playlist.length;
            state.currentTrack = state.playlist[nextIndex];
            state.currentTime = 0;
        },
        prevTrack: (state) => {
            if (state.playlist.length === 0) return;
            const currentIndex = state.playlist.findIndex(
                track => track.id === state.currentTrack.id
            );
            const prevIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length;
            state.currentTrack = state.playlist[prevIndex];
            state.currentTime = 0;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
    },
});

export const {
    setPlaylist,
    playTrack,
    pauseTrack,
    setCurrentTrack,
    nextTrack,
    prevTrack,
    setCurrentTime
} = audioPlayerSlice.actions;

export const selectIsPlaying = (state) => state.audioPlayer.isPlaying;
export const selectPlaylist = (state) => state.audioPlayer.playlist;
export const selectCurrentTrack = (state) => state.audioPlayer.currentTrack;
export const selectCurrentTime = (state) => state.audioPlayer.currentTime;

export default audioPlayerSlice.reducer;