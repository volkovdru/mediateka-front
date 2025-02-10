import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MovieCard from "./MovieCard";
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import {
    fetchGenres,
    fetchMovies,
    resetFilters,
    selectCount,
    selectCurrentPage,
    selectError,
    selectFilters,
    selectLoading,
    selectMovies,
    setCurrentPage,
    setYearsFilter,
} from '../../../store/slices/moviesSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function getValue(year) {
    if (Array.isArray(year)) {
        return `${Math.min(...year)} - ${Math.max(...year)}`;
    }
    return year.toString(); // Всегда возвращаем строку
}

function YearSelect({ value, onChange }) {
    let years = [];

    years.push({
        name: "Выберите год",
        value: []
    });

    // Генерация списка годов
    for (let year = 2025; year >= 1910; year--) {
        if (year % 10 === 0 && year !== 2029) {
            let ar = [];
            for (let i = 1; i <= 10; i++) {
                ar.push(year - i);
            }
            years.push({
                name: getValue(ar),
                value: ar
            });
        } else if (year >= 2020) {
            years.push({
                name: year.toString(),
                value: [year]
            });
        }
    }

    return (
        <FormControl sx={{ minWidth: 120 }}>
            <Select
                value={value?.name || "Выберите год"}
                onChange={(e) => {
                    const selectedYear = years.find((year) => year.name === e.target.value);
                    onChange(selectedYear || []);
                }}
                displayEmpty
                renderValue={(selected) => selected}
                variant="outlined"
            >
                {years.map((year, index) => (
                    <MenuItem key={index} value={year.name}> {/* Используем name как значение */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {year.name}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export function Search() {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Поиск…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }} />
        </FormControl>
    );
}

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
    }, [dispatch, currentPage, filters]);

    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
    };

    const handleYearsFilterChange = (value) => {
        console.log("value", value);
        dispatch(setYearsFilter(value)); // value - это массив
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <YearSelect
                    value={filters.years || { name: "Выберите год", value: [] }} // Передаем объект по умолчанию
                    onChange={(value) => handleYearsFilterChange(value)}
                />
                <Button variant="outlined" onClick={handleResetFilters}>
                    Сбросить фильтр
                </Button>
                <Search />
            </Box>
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