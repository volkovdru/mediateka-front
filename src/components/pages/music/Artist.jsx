import React, {useEffect} from 'react';
import {fetchArtist, selectArtist, selectError, selectLoading} from "../../../store/slices/musicSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

const Artist = () => {
    const dispatch = useDispatch();
    const artist = useSelector(selectArtist);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchArtist(id));
        console.log("ARTIST")
    }, [dispatch, id]);

    if (loading) {
        return "Loading...";
    }

    if (artist) {
        console.log(artist);
    }

    if (!artist.albums) {
        return <div>No album data found.</div>;
    }

    return (
        <div>
            <p>Исполнитель</p>
            <h2>{artist.name}</h2>

            <h3>Студийные альбомы</h3>
            {artist.albums.map((album) => (
                <p key={album.name}><Link to={`/music/albums/${album.id}`}>{album.name}</Link></p>
            ))}
        </div>
    );
};

export default Artist;