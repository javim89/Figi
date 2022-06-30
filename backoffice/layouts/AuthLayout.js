import React from "react";
import theme from "../src/theme";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography, Container, CssBaseline, Avatar, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

const AuthLayout = ({ title, children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: "100vh"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    {children}
                </Box>
            </Container>
        </ThemeProvider>
    )
};

export default AuthLayout;