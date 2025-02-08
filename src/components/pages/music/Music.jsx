import React from 'react';
import Player from "./Player";

const tracks = [
    {
        artist: 'Nirvana',
        title: 'Smells Like Teen Spirit',
        src: 'static/music/01. Smells Like Teen Spirit.mp3',
    },
    {
        artist: 'Nirvana',
        title: 'In Bloom',
        src: 'static/music/02. In Bloom.mp3',
    },
    {
        artist: 'Nirvana',
        title: 'Come As You Are',
        src: 'static/music/03. Come As You Are.mp3',
    },
    {
        artist: 'Nirvana',
        title: 'Breed',
        src: 'static/music/04. Breed.mp3',
    },

];

const Music = () => {
    return (
        <div>
            <h1>MP3 Плеер</h1>
            <Player tracks={tracks} />
        </div>
    );
};

export default Music;