import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CoffeeIcon from '@mui/icons-material/Coffee';

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    fontSize: '16px',
    fontStyle: 'italic',
    fontFamily: 'Arial, sans-serif',
}));

const LogoText = styled('div')(({ theme }) => ({

    marginLeft: '8px',
    color: theme.palette.text.primary, // Цвет текста из темы
}));

const Logo = () => {
    return (
        <LogoContainer>
            <CoffeeIcon />
            <LogoText>Mediateka</LogoText>
        </LogoContainer>
    );
};

export default Logo;