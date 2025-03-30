import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alpha, styled } from '@mui/material/styles';
import {
    nextTrack,
    pauseTrack,
    playTrack,
    prevTrack,
    setCurrentTrack,
    selectCurrentTime,
    selectCurrentTrack,
    selectIsPlaying,
    selectPlaylist
} from '../../../store/slices/AudioPlayerSlice';
import { ClickAwayListener, Collapse, List, ListItem, ListItemText, IconButton } from '@mui/material';
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const PlayerContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(0, 2),
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    position: 'relative',
    minWidth: 400,
}));

const TrackInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 0,
    color: theme.palette.text.primary,
    cursor: 'pointer',
}));

const PlaylistDropdown = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '100%', // Изменено с bottom на top
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    maxHeight: 300,
    overflowY: 'auto',
    zIndex: 10,
    marginTop: theme.spacing(1), // Добавлен отступ сверху
}));

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const isPlaying = useSelector(selectIsPlaying);
    const currentTrack = useSelector(selectCurrentTrack);
    const playlist = useSelector(selectPlaylist);
    const storedCurrentTime = useSelector(selectCurrentTime);
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showPlaylist, setShowPlaylist] = useState(false);

    // Инициализация аудио
    useEffect(() => {
        audioRef.current = new Audio();
        const audio = audioRef.current;
        audio.preload = 'auto';

        const handleTimeUpdate = () => {
            const newTime = audio.currentTime;
            setCurrentTime(newTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', () => dispatch(nextTrack()));

        return () => {
            audio.pause();
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', () => dispatch(nextTrack()));
            audio.src = '';
        };
    }, [dispatch]);

    // Управление воспроизведением
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentTrack?.src) return;

        const shouldUpdateSource = !audio.src.includes(currentTrack.src);

        if (shouldUpdateSource) {
            audio.src = `http://localhost:8080/uploads/${currentTrack.src}`;
            audio.currentTime = storedCurrentTime || 0;
        } else {
            audio.currentTime = storedCurrentTime;
        }

        if (isPlaying) {
            audio.play().catch(e => console.error("Play error:", e));
        } else {
            audio.pause();
        }
    }, [currentTrack, isPlaying, storedCurrentTime]);

    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(pauseTrack(currentTime));
        } else {
            dispatch(playTrack());
        }
    };

    const handleNext = () => {
        dispatch(nextTrack());
    };

    const handlePrevious = () => {
        dispatch(prevTrack());
    };

    const handleSeek = (e, newValue) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newValue;
            setCurrentTime(newValue);
        }
    };

    const togglePlaylist = () => {
        setShowPlaylist(!showPlaylist);
    };

    const handleTrackSelect = (track) => {
        dispatch(setCurrentTrack(track));
        dispatch(playTrack());
        setShowPlaylist(false);
    };

    const handleClickAway = () => {
        setShowPlaylist(false);
    };

    if (!currentTrack?.src) return null;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <PlayerContainer>
                <IconButton onClick={handlePrevious} size="small" sx={{ color: 'text.primary' }}>
                    <SkipPreviousRounded fontSize="medium" />
                </IconButton>

                <IconButton
                    onClick={handlePlayPause}
                    size="medium"
                    sx={{ color: 'text.primary' }}
                >
                    {isPlaying ?
                        <PauseRounded fontSize="medium" /> :
                        <PlayArrowRounded fontSize="medium" />
                    }
                </IconButton>

                <IconButton onClick={handleNext} size="small" sx={{ color: 'text.primary' }}>
                    <SkipNextRounded fontSize="medium" />
                </IconButton>

                <TrackInfo onClick={togglePlaylist}>
                    <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                        {currentTrack.artist || 'Unknown Artist'} - {currentTrack.title || 'Unknown Track'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" paddingRight={1}>
                            {formatTime(currentTime)}
                        </Typography>
                        <Slider
                            value={currentTime}
                            max={duration || 0}
                            onChange={handleSeek}
                            sx={{ flexGrow: 1, color: 'primary.main', height: 4 }}
                        />
                        <Typography variant="caption" paddingLeft={1}>
                            {formatTime(duration)}
                        </Typography>
                    </Box>
                </TrackInfo>

                <Collapse in={showPlaylist}>
                    <PlaylistDropdown>
                        <List dense>
                            {playlist.map((track, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => handleTrackSelect(track)}
                                    sx={{
                                        backgroundColor: track.id === currentTrack.id ?
                                            'action.selected' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={`${track.artist || 'Unknown Artist'} - ${track.title || 'Unknown Track'}`}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            color: track.id === currentTrack.id ?
                                                'primary.main' : 'text.primary',
                                            variant: 'body2'
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </PlaylistDropdown>
                </Collapse>
            </PlayerContainer>
        </ClickAwayListener>
    );
};

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default AudioPlayer;