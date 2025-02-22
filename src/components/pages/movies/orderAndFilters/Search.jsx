import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {debounce} from 'lodash';
import {
    Box,
    CircularProgress,
    FormControl,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    OutlinedInput,
    Paper
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
    fetchSearchResults,
    selectError,
    selectLoading,
    selectSearchResults
} from "../../../../store/slices/moviesSlice";
import {Link} from "react-router-dom";

const Search = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchResults = useSelector(selectSearchResults);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const debouncedSearch = debounce((query) => {
        if (query.trim().length > 1) { // Минимум 2 символа для поиска
            dispatch(fetchSearchResults(query));
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, 300);

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <Box sx={{position: 'relative', width: {xs: '100%', md: '25ch'}}}>
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    size="small"
                    id="search"
                    placeholder="Поиск…"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setIsOpen(true)}
                    autoComplete="off"
                    sx={{flexGrow: 1}}
                    startAdornment={
                        <InputAdornment position="start" sx={{color: 'text.primary'}}>
                            <SearchRoundedIcon fontSize="small"/>
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'search',
                    }}
                />
            </FormControl>

            {isOpen && (
                <Paper
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        maxHeight: 300,
                        overflow: 'auto',
                        mt: 1,
                        zIndex: 9999,
                        boxShadow: 3,
                        borderRadius: 1
                    }}
                >
                    {loading ? (
                        <Box sx={{p: 2, display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress size={24}/>
                        </Box>
                    ) : error ? (
                        <ListItem>
                            <ListItemText primary={`Ошибка: ${error}`}/>
                        </ListItem>
                    ) : searchResults?.length > 0 ? (
                        <List dense>
                            {searchResults.map((result) => (

                                <ListItem
                                    key={result.id}
                                    onClick={handleClose}
                                >
                                    <Link to={`/movie/${result.movie_id}`} style={{
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}>
                                        <ListItemText primary={result.name}/>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <ListItem>
                            <ListItemText primary="Ничего не найдено"/>
                        </ListItem>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default Search;