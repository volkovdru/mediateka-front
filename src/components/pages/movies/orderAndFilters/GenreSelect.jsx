import {useDispatch, useSelector} from "react-redux";
import {selectGenres, setGenreFilter} from "../../../../store/slices/moviesSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, ListItemText} from "@mui/material";
import React from "react";

const GenreSelect = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const selectedGenres = useSelector((state) => state.movies.filters.genres);

    const handleGenreChange = (event) => {
        const selectedGenreIds = event.target.value;
        const selectedGenres = genres.filter((genre) => selectedGenreIds.includes(genre.id));
        dispatch(setGenreFilter(selectedGenres));
    };

    return (
        <FormControl sx={{width: 300}}>

            <Select
                labelId="genre-select-label"
                variant="outlined"
                multiple
                value={selectedGenres.map((g) => g.id)}
                onChange={handleGenreChange}
                displayEmpty
                renderValue={(selected) => {
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
                        <Checkbox checked={selectedGenres.some((g) => g.id === genre.id)}/>
                        <ListItemText primary={genre.name}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default GenreSelect;