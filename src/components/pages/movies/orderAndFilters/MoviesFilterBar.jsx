import React from 'react';
import Box from "@mui/material/Box";
import YearSelect from "./YearSelect";
import GenreSelect from "./GenreSelect";
import CountrySelect from "./CountrySelect";
import OrderSelect from "./OrderSelect";
import ResetFilterButton from "./ResetFilterButton";
import Search from "./Search";

const MoviesFilterBar = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                <YearSelect/>
                <GenreSelect/>
                <CountrySelect/>
                <OrderSelect/>
                <ResetFilterButton/>
                <Search/>
            </Box>
        </Box>
    );
};

export default MoviesFilterBar;