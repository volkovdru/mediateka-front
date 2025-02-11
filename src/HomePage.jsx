import React from 'react';
import Movies from "./components/pages/movies/Movies";
import Latest from "./components/common/Latest";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {useDispatch, useSelector} from "react-redux";
import {resetFilters, selectFilters, selectGenres, setGenreFilter, setYearsFilter} from "./store/slices/moviesSlice";
import {Checkbox, ListItemText} from "@mui/material";

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

function Search() {
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

function GenreSelect() {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector((state) => state.movies.filters.genres);

    const handleGenreChange = (event) => {
        const selectedGenreIds = event.target.value;
        const selectedGenres = genres.filter((genre) => selectedGenreIds.includes(genre.id));
        dispatch(setGenreFilter(selectedGenres));
    };

    return (
        <FormControl sx={{ width: 300 }}>

            <Select
                labelId="genre-select-label"
                variant="outlined"
                multiple
                value={selectedGenres.map((g) => g.id)}
                onChange={handleGenreChange}
                displayEmpty
                renderValue={(selected) => {
                    console.log(selected);
                    if (selected.length === 0) {
                        return "Выберите жанры"
                    }
                    return selected.map((id) => genres.find((g) => g.id === id)?.name).join(', ');
                }}
                MenuProps={{
                    disableAutoFocusItem: true,
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                        },
                    },
                }}
                inputProps={{
                    'aria-label': 'Жанры',
                }}
                label="Жанры"
            >
                {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                        <Checkbox checked={selectedGenres.some((g) => g.id === genre.id)} />
                        <ListItemText primary={genre.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

const HomePage = () => {
    const dispatch = useDispatch();
    const handleYearsFilterChange = (value) => {
        console.log("value", value);
        dispatch(setYearsFilter(value)); // value - это массив
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    const filters = useSelector(selectFilters);

    return (
        <Container
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 0, gap: 4 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <YearSelect
                        value={filters.years || { name: "Выберите год", value: [] }} // Передаем объект по умолчанию
                        onChange={(value) => handleYearsFilterChange(value)}
                    />
                    <GenreSelect />
                    <Button variant="outlined" onClick={handleResetFilters}>
                        Сбросить фильтр
                    </Button>
                    <Search />
                </Box>
            </Box>
            <Movies />
            <Latest />
        </Container>
    );
};

export default HomePage;