import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrack } from '../../../store/slices/musicSlice';

const AddTrackForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [artistId, setArtistId] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !file) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('albumId', albumId);
        formData.append('artistId', artistId);
        formData.append('file', file);

        try {
            await dispatch(addTrack(formData)).unwrap();
            setSuccess('Трек успешно добавлен!');
            setError('');
            setTitle('');
            setAlbumId('');
            setArtistId('');
            setFile(null);
        } catch (err) {
            setError('Ошибка при добавлении трека: ' + err.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Добавить новый трек</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Название трека:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="albumId">ID альбома:</label>
                    <input
                        type="text"
                        id="albumId"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="artistId">ID исполнителя:</label>
                    <input
                        type="text"
                        id="artistId"
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="file">MP3 файл:</label>
                    <input
                        type="file"
                        id="file"
                        accept=".mp3"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Добавить трек</button>
            </form>
        </div>
    );
};

export default AddTrackForm;