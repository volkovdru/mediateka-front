import React, { useState, useRef, useEffect } from 'react';

const Player = ({ tracks }) => {
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

    return (
        <div>
            <h2>{tracks[currentTrackIndex].title}</h2>
            <audio
                ref={audioRef}
                src={tracks[currentTrackIndex].src}
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
    );
};

export default Player;