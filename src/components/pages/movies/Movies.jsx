import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import MovieCard from "./MovieCard";
import {useDispatch, useSelector} from 'react-redux';
import Pagination from "@mui/material/Pagination";
import {PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    fetchCountries,
    fetchGenres,
    fetchMovies,
    selectCount,
    selectCurrentPage,
    selectError,
    selectFilters,
    selectLoading,
    selectMovies,
    setCurrentPage,
} from '../../../store/slices/moviesSlice';


export default function Movies() {
    const dispatch = useDispatch();
    const movies = useSelector(selectMovies);
    const count = useSelector(selectCount);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const filters = useSelector(selectFilters);
    const currentPage = useSelector(selectCurrentPage);

    const pageCount = Math.floor(count / 24) + 1;

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchGenres());
        dispatch(fetchCountries());
    }, [dispatch, currentPage, filters]);

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Grid container spacing={2} columns={12}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </Grid>
            <Grid container spacing={2} columns={12} justifyContent="center" alignItems="center">
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
                        />
                    )}
                />
            </Grid>
        </Box>
    );
}