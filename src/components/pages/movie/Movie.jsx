import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMovie, selectError, selectLoading, selectMovie} from "../../../store/slices/movieSlice";
import {Link, useParams} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';

export default function Movie() {
    const dispatch = useDispatch();
    const movie = useSelector(selectMovie);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchMovie(id));
    }, [dispatch, id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!movie) {
        return <div>Фильм не найден</div>;
    }

    const {
        name,
        international_name,
        description,
        year,
        rating_kp,
        posters = [],
        film_series = [],
        participants = {},
        files = []
    } = movie;

    console.log(participants)

    const episodes = files.map(file => {
        const match = file.name.match(/S(\d{2})E(\d{2})/);
        if (match) {
            return {
                season: match[1], // номер сезона
                episode: match[2], // номер серии
                name: file.name,
                file: file.online,
                frame: file.frames[0],
            };
        }
        return null;
    }).filter(Boolean); // Убираем null значения

    return (
        <Box sx={{padding: 2}}>
            <Grid container spacing={2}>
                <Grid container size={12}>
                    <Grid size={{xs: 12, md: 4}}>
                        {posters.length > 0 && (
                            <CardMedia
                                component="img"
                                alt={name}
                                image={posters[0]}
                                sx={{
                                    width: '100%', // Занимает всю ширину контейнера
                                    height: 'auto', // Автоматическая высота для сохранения пропорций
                                    objectFit: 'cover',
                                    borderRadius: 1, // Закругленные углы
                                }}
                            />
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 8}}>
                        {/* Информация справа */}
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {name} ({year})
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {international_name}
                            </Typography>
                            <Typography variant="body1" sx={{marginTop: 1}}>
                                {description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{marginTop: 1}}>
                                Рейтинг: {rating_kp}
                            </Typography>
                            <Grid container spacing={2} sx={{marginTop: 2}}>
D                                {episodes.length > 0 && episodes.map((episode) => (
                                    <div>
                                        <Link to={episode.file}>
                                            <CardMedia
                                                component="img"
                                                alt={name}
                                                image={episode.frame}
                                                sx={{
                                                    width: '200px', // Занимает всю ширину контейнера
                                                    height: 'auto', // Автоматическая высота для сохранения пропорций
                                                    objectFit: 'cover',
                                                    borderRadius: 1, // Закругленные углы
                                                }}
                                            />
                                        </Link>
                                        <p>Сезон {episode.season} Эпизод {episode.episode}</p>
                                    </div>
                                ))}

                                {episodes.length === 0 && files.map((file) => (
                                    <Grid item xs={12} key={file.id}>
                                        <Button variant="outlined" href={file.online} target="_blank" sx={{ marginRight: 1 }}>
                                            Смотреть
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
                {Object.values(participants).length > 0 && (
                    <Grid container size={12}>
                        <Typography variant="h5" component="div" sx={{marginBottom: 2}}>
                            Участники
                        </Typography>
                    </Grid>
                )}
                <Grid container spacing={2} size={12}>
                        {Object.values(participants).map((participant) => (
                            <Grid size={{xs: 12, md: 2}}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 0,
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <CardMedia
                                        sx={{
                                            height: '200px',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderTopLeftRadius: 8,
                                            borderTopRightRadius: 8,
                                        }}
                                        image={participant.photo}
                                        title={participant.name}
                                    />
                                    <CardContent
                                        sx={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '10px',
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                fontWeight: 'bold',
                                                marginBottom: 1,
                                            }}
                                        >
                                            {participant.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontStyle: 'italic',
                                                marginBottom: 1,
                                            }}
                                        >
                                            {participant.role}
                                        </Typography>
                                        {participant.info && (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontSize: '0.875rem',
                                                    flex: 1,
                                                    paddingBottom: '10px',
                                                }}
                                            >
                                                {participant.info}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Grid>

            {/* Фильмы из серии */}
            {film_series.length > 0 && (
                <>
                    <Typography variant="h5" component="div" sx={{marginTop: 4}}>
                        Фильмы из серии
                    </Typography>
                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        {film_series.map((film) => (
                            <Grid item xs={6} sm={4} md={3} key={film.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt={film.name}
                                        image={film.poster}
                                        sx={{height: 200, objectFit: 'cover'}}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{film.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {film.year}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Ссылки на файлы */}
            {files.length > 0 && (
                <>

                    <Grid container spacing={2} sx={{marginTop: 2}}>
                        {files.map((file) => (
                            <Grid item xs={12} key={file.id}>
                                <Button variant="outlined" href={file.download} target="_blank">
                                    Скачать
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
}