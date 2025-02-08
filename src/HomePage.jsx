import React from 'react';
import Movies from "./components/pages/movies/Movies";
import Latest from "./components/common/Latest";
import Container from "@mui/material/Container";

const HomePage = () => {
    return (
        <Container
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 0, gap: 4 }}
        >
            <Movies />
            <Latest />
        </Container>
    );
};

export default HomePage;