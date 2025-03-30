import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../../store/slices/musicSlice';
import {styled} from "@mui/material/styles";
import {useTheme} from "@mui/material";

const Player = ({ tracks }) => {
    const loading = useSelector(selectLoading);
    const theme = useTheme();


    if (loading) {
        return 'Loading...';
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // Воспроизведение/пауза
    const playPauseHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Переключение на следующий трек
    const nextTrackHandler = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
    };

    // Переключение на предыдущий трек
    const prevTrackHandler = () => {
        const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(prevIndex);
    };

    // Обновление текущего времени воспроизведения
    const timeUpdateHandler = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    // Обработчик изменения прогресса
    const progressChangeHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    // Форматирование времени в минуты и секунды
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Автоматическое воспроизведение при смене трека
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play(); // Воспроизвести новый трек, если плеер был активен
        }
    }, [currentTrackIndex]); // Срабатывает при изменении currentTrackIndex

    // Обработчик клика по треку в списке
    const handleTrackClick = (index) => {
        setCurrentTrackIndex(index);
        if (isPlaying) {
            audioRef.current.play(); // Воспроизвести новый трек, если плеер был активен
        }
    };

    return (
        <div>
            {/* Список треков */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Список треков</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tracks.map((track, index) => (
                        <li
                            key={index}
                            onClick={() => handleTrackClick(index)}
                            style={{
                                padding: theme.spacing(1), // Используем spacing из темы (8px по умолчанию)
                                cursor: 'pointer',
                                backgroundColor: index === currentTrackIndex
                                    ? theme.palette.action.selected
                                    : 'transparent',
                                borderRadius: theme.shape.borderRadius, // Используем borderRadius из темы
                                marginBottom: theme.spacing(0.5),
                                color: index === currentTrackIndex
                                    ? theme.palette.text.primary
                                    : theme.palette.text.secondary,
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                }
                            }}
                        >
                            {track.artist} - {track.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Плеер */}
            <div>
                <h2 >{tracks[currentTrackIndex].artist} - {tracks[currentTrackIndex].title}</h2>
                <p>{tracks[currentTrackIndex].album}</p>
                <audio
                    ref={audioRef}
                    src={`http://localhost:8080/uploads/${tracks[currentTrackIndex].src}`}
                    onEnded={nextTrackHandler}
                    onTimeUpdate={timeUpdateHandler}
                    onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                />
                <div>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={progressChangeHandler}
                    />
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
                <div>
                    <button onClick={prevTrackHandler}>Предыдущий</button>
                    <button onClick={playPauseHandler}>
                        {isPlaying ? 'Пауза' : 'Воспроизвести'}
                    </button>
                    <button onClick={nextTrackHandler}>Следующий</button>
                </div>
            </div>
        </div>
    );
};

export default Player;