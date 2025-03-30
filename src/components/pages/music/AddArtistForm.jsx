import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArtist, selectAddArtistStatus, selectError } from '../../../store/slices/musicSlice';

const AddArtistForm = () => {
    const dispatch = useDispatch();
    const addArtistStatus = useSelector(selectAddArtistStatus);
    const error = useSelector(selectError);

    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            alert('Пожалуйста, введите имя артиста');
            return;
        }

        dispatch(addArtist({ name }))
            .unwrap()
            .then(() => {
                alert('Артист успешно добавлен!');
                setName(''); // Очищаем поле ввода
            })
            .catch((error) => {
                console.error('Ошибка при добавлении артиста:', error);
            });
    };

    return (
        <div>
            <h2>Добавить нового артиста</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Имя артиста:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={addArtistStatus === 'loading'}>
                    {addArtistStatus === 'loading' ? 'Добавление...' : 'Добавить артиста'}
                </button>
            </form>
            {addArtistStatus === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AddArtistForm;