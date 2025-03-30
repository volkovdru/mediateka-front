import React, {useEffect} from 'react';
import {fetchTracks, selectError, selectLoading, selectTracks} from "../../../store/slices/musicSlice";
import {useDispatch, useSelector} from "react-redux";
import Player from "./Player";
import FileUploadForm from "./FileUploadForm";

const Tracks = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(selectTracks);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

    if (loading) {
        return 'Loading...';
    }

    if (error) {
        return (error.message);
    }

    return (
        <div>
            <Player tracks={tracks} />
            <FileUploadForm/>
        </div>
    );
};

export default Tracks;