import React, { useState } from 'react';

const FileUploadForm = () => {
    const [files, setFiles] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files || files.length === 0) {
            setMessage('Пожалуйста, выберите файлы для загрузки.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await fetch('http://localhost:8080/api/tracks/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.text();
                setMessage(result);
            } else {
                setMessage('Ошибка при загрузке файлов.');
            }
        } catch (error) {
            setMessage('Ошибка при загрузке файлов: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Загрузка файлов</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="files" multiple onChange={handleFileChange} />
                <button type="submit">Загрузить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUploadForm;