import React from 'react';
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import RatingSquare from "./RatingSquare";
import { Link as A } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    transition: 'transform 0.3s ease', // Плавный переход для карточки
    '&:hover': {
        cursor: 'pointer',
    },
}));

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 8,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 8,
    },
});

const SingleLineText = styled(Typography)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const StyledCardMedia = styled(CardMedia)({
    transition: 'transform 0.3s ease', // Плавный переход для изображения
    '&:hover': {
        transform: 'scale(1.05)', // Увеличение изображения на 5% при наведении
    },
    objectFit: 'cover', // Сохранение пропорций изображения
    width: '100%', // Ширина 100% для заполнения контейнера
    height: '100%', // Высота 100% для заполнения контейнера
});

const MovieCard = ({ id, name, posters, year, rating_kp }) => {

    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Grid size={{ xs: 6, md: 2 }} sx={{ position: 'relative' }}>
            <A to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(0)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                    sx={{
                        height: {sm: '300px'}
                    }}
                    >
                    <StyledCardMedia
                        component="img"
                        alt="Movie Poster"
                        image={posters[0]}
                        sx={{
                            height: { sm: '200px', md: '250px' },
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                    <RatingSquare rating={rating_kp}>
                        {rating_kp.toFixed(1)}
                    </RatingSquare>
                    <StyledCardContent>
                        <SingleLineText gutterBottom variant="h6" component="div">
                            {name}
                        </SingleLineText>
                        <Typography gutterBottom variant="caption" component="div">
                            {year}
                        </Typography>
                    </StyledCardContent>
                </StyledCard>
            </A>
        </Grid>
    );
};

export default MovieCard;