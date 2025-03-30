import React, {useEffect} from 'react';
import {
    fetchArtist,
    selectArtist,
    selectLoading,
    selectError,
    selectArtists,
    fetchArtists
} from "../../../store/slices/musicSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import logo from "../../common/Logo";

const Artist = () => {
    const dispatch = useDispatch();
    const artists = useSelector(selectArtists);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch, id]);

    if (loading) {
        return 'Loading...';
    }

    if (error) {
        return (error.message);
    }

    return (
        <div>
            {artists.map((artist) => (
                <Link to={`/music/artists/${artist.id}`} key={artist.id}>
                    <p>{artist.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default Artist;