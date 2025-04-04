import * as React from 'react';
import { useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { Link } from 'react-router-dom';
import menuItems from "./menuItems";
import Logo from "./Logo";
import Search from "../pages/movies/orderAndFilters/Search";
import AudioPlayer from "../pages/music/AudioPlayer";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)` : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <AppBar
                position="fixed"
                enableColorOnDark
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <Container>
                    <StyledToolbar variant="dense" disableGutters>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                            <Logo />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                {menuItems.map(item => (
                                    <Link key={item.title} to={item.href} style={{ textDecoration: 'none' }}>
                                        <Button variant="text" color="info" size="small">
                                            {item.title}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                            <Search />
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <AudioPlayer />
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                            <Button color="primary" variant="text" size="small">
                                Вход
                            </Button>
                            <Button color="primary" variant="contained" size="small">
                                Регистрация
                            </Button>
                            <ColorModeIconDropdown />
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <ColorModeIconDropdown size="medium" />
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                PaperProps={{
                                    sx: { top: 'var(--template-frame-height, 0px)' },
                                }}
                            >
                                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <IconButton onClick={toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </Box>
                                    <MenuItem>Features</MenuItem>
                                    <MenuItem>Testimonials</MenuItem>
                                    <Divider sx={{ my: 3 }} />
                                    <MenuItem>
                                        <Button color="primary" variant="contained" fullWidth>
                                            Регистрация
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color="primary" variant="outlined" fullWidth>
                                            Вход
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Drawer>
                        </Box>
                    </StyledToolbar>
                </Container>
            </AppBar>
        </>
    );
}