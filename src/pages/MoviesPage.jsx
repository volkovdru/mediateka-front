import React from 'react';
import Movies from "../components/pages/movies/Movies";
import Latest from "../components/common/Latest";
import Container from "@mui/material/Container";
import MoviesFilterBar from "../components/pages/movies/orderAndFilters/MoviesFilterBar";


const MoviesPage = () => {
    return (
        <Container
            component="main"
            sx={{display: 'flex', flexDirection: 'column', my: 0, gap: 4}}
        >
            <MoviesFilterBar/>
            <Movies/>
            <Latest/>
        </Container>
    );
};

export default MoviesPage;