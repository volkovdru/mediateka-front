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
import Artist from "./components/pages/music/Artist";
import AddArtistForm from "./components/pages/music/AddArtistForm";
import Artists from "./components/pages/music/Artists";
import AddTrackForm from "./components/pages/music/AddTrackForm";
import Tracks from "./components/pages/music/Tracks";
import Album from "./components/pages/music/Album";


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
                    <Route path="/music" element={<Artists/>}/>
                    <Route path="/music/tracks" element={<Tracks />}/>
                    <Route path="/music/track/add" element={<AddTrackForm />}/>
                    <Route path="/music/artists" element={<Artists/>}/>
                    <Route path="/music/artists/:id" element={<Artist/>}/>
                    <Route path="/music/albums/:id" element={<Album/>}/>
                    <Route path="/music/artists/add" element={<AddArtistForm/>}/>
                    <Route path="*" element={<div>404 - Страница не найдена</div>}/>
                </Routes>
            </Container>
            <Footer/>
        </AppTheme>
    );
}

export default App;
