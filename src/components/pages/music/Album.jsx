import React, {useEffect} from 'react';
import {fetchAlbum, selectAlbum, selectError, selectLoading} from "../../../store/slices/musicSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Player from "./Player";
import Button from "@mui/material/Button";
import {setPlaylist} from "../../../store/slices/AudioPlayerSlice";

const Artist = () => {
    const dispatch = useDispatch();
    const album = useSelector(selectAlbum);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchAlbum(id));
    }, [dispatch, id]);

    if (loading) {
        return "Loading...";
    }

    if (!album.tracks) {

        return <div>No album data found.</div>;
    }

    return (
        <div>
            <h2>{album.name}</h2>
            <Button onClick={() => dispatch(setPlaylist(album.tracks))}>
                Воспроизвести
            </Button>
            <Player tracks={album.tracks} />
        </div>
    );
};

export default Artist;