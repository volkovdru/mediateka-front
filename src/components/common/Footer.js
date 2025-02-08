import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import menuItems from "./menuItems";

function Copyright() {
    return (
        <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
            {'Все права защищены © '}
            <Link color="text.secondary" href="https://mui.com/">
                Elvolver
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer() {
    return (
        <React.Fragment>
            <Divider/>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: {xs: 4, sm: 8},
                    py: {xs: 8, sm: 10},
                    textAlign: {sm: 'center', md: 'left'},
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            minWidth: {xs: '100%', sm: '60%'},
                        }}
                    >
                        <Box sx={{width: {xs: '100%', sm: '60%'}}}>
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{fontWeight: 600, mt: 2}}
                            >
                                Новостная лента
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
                                Подпишитесь на еженедельные обновления. Никакого спама!
                            </Typography>
                            <InputLabel htmlFor="email-newsletter">Email</InputLabel>
                            <Stack direction="row" spacing={1} useFlexGap>
                                <TextField
                                    id="email-newsletter"
                                    hiddenLabel
                                    size="small"
                                    variant="outlined"
                                    fullWidth
                                    aria-label="Enter your email address"
                                    placeholder="Ваш email адрес"
                                    slotProps={{
                                        htmlInput: {
                                            autoComplete: 'off',
                                            'aria-label': 'Enter your email address',
                                        },
                                    }}
                                    sx={{width: '250px'}}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{flexShrink: 0}}
                                >
                                    Подписаться
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', sm: 'flex'},
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                            Сервисы
                        </Typography>
                        {menuItems.map(item => (
                            <Link key={item.title} color="text.secondary" variant="body2" href="#">
                                {item.title}
                            </Link>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', sm: 'flex'},
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                            Компания
                        </Typography>
                        <Link color="text.secondary" variant="body2" href="#">
                            О нас
                        </Link>
                        <Link color="text.secondary" variant="body2" href="#">
                            Карьера
                        </Link>
                        <Link color="text.secondary" variant="body2" href="#">
                            Пресса
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', sm: 'flex'},
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body2" sx={{fontWeight: 'medium'}}>
                            Права
                        </Typography>
                        <Link color="text.secondary" variant="body2" href="#">
                            Условия
                        </Link>
                        <Link color="text.secondary" variant="body2" href="#">
                            Политика
                        </Link>
                        <Link color="text.secondary" variant="body2" href="#">
                            Контакты
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: {xs: 4, sm: 8},
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        <Link color="text.secondary" variant="body2" href="#">
                            Политика безопасности
                        </Link>
                        <Typography sx={{display: 'inline', mx: 0.5, opacity: 0.5}}>
                            &nbsp;•&nbsp;
                        </Typography>
                        <Link color="text.secondary" variant="body2" href="#">
                            Условия использования
                        </Link>
                        <Copyright/>
                    </div>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{justifyContent: 'left', color: 'text.secondary'}}
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://github.com/elvolver"
                            aria-label="GitHub"
                            sx={{alignSelf: 'center'}}
                        >
                            <FacebookIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://x.com/MaterialUI"
                            aria-label="X"
                            sx={{alignSelf: 'center'}}
                        >
                            <TwitterIcon/>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://www.linkedin.com/company/mui/"
                            aria-label="vk"
                            sx={{alignSelf: 'center'}}
                        >
                            <LinkedInIcon/>
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}
