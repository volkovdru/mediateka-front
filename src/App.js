import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './components/common/AppAppBar';
import Footer from './components/common/Footer';
import {Route, Routes} from "react-router-dom";
import Music from "./components/pages/music/Music";
import Movie from "./components/pages/movie/Movie";
import MoviesPage from "./pages/MoviesPage";


const App = (props) => {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
            <AppAppBar/>
            <Container
                component="main"
                sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
            >

                <Routes>
                    <Route path="/" element={<MoviesPage/>}/>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movie/:id" element={<Movie/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="*" element={<div>404 - Страница не найдена</div>}/>
                </Routes>
            </Container>
            <Footer/>
        </AppTheme>
    );
}

export default App;
