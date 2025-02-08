import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/common/AppAppBar';
import Footer from './components/common/Footer';
import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import Music from "./components/pages/music/Music";
import Movies from "./components/pages/movies/Movies";
import Movie from "./components/pages/movie/Movie";


export default function Blog(props) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Container
                component="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/movies" element={<Movies/>}/>
                    <Route path="/movie/:id" element={<Movie/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="*" element={<div>404 - Страница не найдена</div>}/>
                </Routes>
            </Container>
            <Footer/>
        </AppTheme>
    );
}
